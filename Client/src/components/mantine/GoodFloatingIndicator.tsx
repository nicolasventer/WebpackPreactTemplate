import { FloatingIndicator, Input, UnstyledButton } from "@mantine/core";
import { useState } from "preact/hooks";
import classes from "./GoodFloatingIndicator.module.css";

/**
 * Good implementation of a floating indicator
 * @param props
 * @param props.data Array of strings to display
 * @param props.label Label for the input
 * @param props.activeState Active state for the indicator
 * @returns a good implementation of a floating indicator
 */
export const GoodFloatingIndicator = ({
	data,
	label,
	activeState,
}: {
	data: readonly string[];
	label?: string;
	activeState?: [number, (value: number) => void];
}) => {
	const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
	const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
	const [active, setActive] = activeState ?? useState(0);

	const setControlRef = (index: number) => (node: HTMLButtonElement | null) => {
		controlsRefs[index] = node;
		setControlsRefs(controlsRefs);
	};

	const controls = data.map((item, index) => (
		<UnstyledButton
			key={item}
			className={classes.control}
			ref={setControlRef(index)}
			onClick={() => setActive(index)}
			mod={{ active: active === index }}
		>
			<span className={classes.controlLabel}>{item}</span>
		</UnstyledButton>
	));

	return (
		<>
			{label && (
				<Input.Wrapper>
					<Input.Label>{label}</Input.Label>
					<div className={classes.root} ref={setRootRef}>
						{controls}
						<FloatingIndicator target={controlsRefs[active]} parent={rootRef} className={classes.indicator} />
					</div>
				</Input.Wrapper>
			)}
		</>
	);
};
