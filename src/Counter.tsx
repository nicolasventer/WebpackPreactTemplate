import { useState } from "preact/hooks";

export const Counter = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>+</button>
			<button onClick={() => setCount(count - 1)}>-</button>
		</div>
	);
};
