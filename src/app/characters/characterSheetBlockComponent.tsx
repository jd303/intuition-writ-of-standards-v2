import st from './characterSheetBlockComponent.module.css';
import { ReactNode } from "react";

function SheetBlock({ children, className = '', layout = 'none' }: { children: ReactNode, className?: string, layout?: "flex-column" | "flex-row" | "none" }) {
	return (
		<div className={`${st.block} ${className}`} data-layout={layout}>
			{children}
		</div>
	)
}

export default SheetBlock;
