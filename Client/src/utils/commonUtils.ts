import toast from "react-hot-toast";

/**
 * A function that creates a toast that says the given description is not implemented yet
 * @param description the description of the feature that is not implemented yet
 */
export const TodoFn = (description: string) => () => toast(description + " is not implemented yet", { icon: "⏳" });
