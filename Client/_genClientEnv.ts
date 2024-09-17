import Bun from "bun";
import { env } from "process";

Bun.write(
	"./src/clientEnv.ts",
	`/* eslint-disable quote-props */\r\nexport const clientEnv = ${JSON.stringify(
		{ BASE_URL: env.BASE_URL ?? "" },
		null,
		"\t"
	)} as const;\r\n`
);
console.log("clientEnv.ts generated successfully.");
