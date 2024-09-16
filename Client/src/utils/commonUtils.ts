import toast from "react-hot-toast";

/**
 * Creates a toast that says the given description is not implemented yet
 * @param description the description of the feature that is not implemented yet
 */
export const TodoFn = (description: string) => () => toast(`${description} is not implemented yet`, { icon: "⏳" });

/**
 * Calculates the width size object based on the given size.
 * The width size object is a string that represents the minimum value between the given size in viewport width (vw) and the given size multiplied by 10 pixels.
 *
 * @template T - The type of the size parameter.
 * @param {T} size - The size value to calculate the width size object.
 * @param {number} [scale=10] - The scale value to multiply the size value by to get the pixel value.
 * @returns The width size object as a string.
 */
export const widthSizeObj = <T extends number>(size: T, scale = 10) => `min(${size}vw, ${size * scale}px)` as const;

/**
 * Class that generates unique ids for objects.
 * @example
 * const exampleGenerator = new IdGenerator("key");
 * const a = exampleGenerator.withId({ name: "John" }); // { name: "John", key: 0 }
 * const b = exampleGenerator.withId(10); // { key: 1, data: 10 }
 * @template T - The type of the key parameter.
 * @param {T} key - The key to use for the id.
 * @returns The id generator object.
 */
export class IdGenerator<T extends string> {
	constructor(private key: T) {}
	private id = 0;
	/**
	 * Adds an id to the given object.
	 * @template U - The type of the data.
	 * @param {U} obj - If the data is an object, it adds the id to the object. Otherwise, it returns an object with the id and the data.
	 * @returns The object with the id.
	 */
	withId = <U>(
		obj: U
	): U extends object
		? U & { [K in T]: number }
		: { [K in T]: number } & {
				/** The data */
				data: U;
		  } => (typeof obj === "object" ? ({ ...obj, [this.key]: this.id++ } as any) : ({ [this.key]: this.id++, data: obj } as any));
}

/**
 * Debounces the given function.
 * @param fn The function to debounce.
 * @param ms The milliseconds to wait before calling the function.
 * @returns The debounced function.
 */
export const debounceFn = (fn: Function, ms: number) => {
	// eslint-disable-next-line no-undef
	let timeout: Timer;
	return <T extends any[]>(...args: T) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), ms);
	};
};
