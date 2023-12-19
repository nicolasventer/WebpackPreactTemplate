import { ReactNode, useState } from "react";

export const Collapsible = ({ children, open }: { children: ReactNode; open?: boolean }) => {
	const [open_, setOpen_] = useState(open);

	return (
		<div>
			<button onClick={() => setOpen_(!open_)}>Toggle</button>
			{open_ && <div>{children}</div>}
		</div>
	);
};
