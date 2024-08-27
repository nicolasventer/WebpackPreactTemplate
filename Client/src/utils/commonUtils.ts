import toast from "react-hot-toast";

/**
 * A function that creates a toast that says the given description is not implemented yet
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
