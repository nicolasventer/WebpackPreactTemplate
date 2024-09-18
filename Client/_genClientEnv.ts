import Bun from "bun";
import { env } from "process";

export default '/* eslint-disable quote-props */\n\n/** the client environment */\nexport type ClientEnv = {\n\t/** the base url */\n\tBASE_URL: string;\n};\n\n/** the client environment variables */\nexport const clientEnv: ClientEnv = {\n\tBASE_URL: "/SchemaGenerator",\n} as const;\n';

type Parameter = {
	description: string;
	name: string;
};

const parameters: Parameter[] = [
	{
		description: "the base url",
		name: "BASE_URL",
	},
];

const clientEnv = {};
for (const { name } of parameters) clientEnv[name] = env[name] ?? "";

Bun.write(
	"./src/clientEnv.ts",
	`/* eslint-disable quote-props */

/** the client environment */
export type ClientEnv = {
${parameters
	.map(
		({ description, name }) => `\t/** ${description} */
\t${name}: string;
`
	)
	.join("")}};

/** the client environment variables */
export const clientEnv: ClientEnv = ${JSON.stringify(clientEnv, null, "\t")};
`
);
console.log("clientEnv.ts generated successfully.");
