import { ReactNode } from 'react';

import st from './contentList.module.css';
import { UIColours } from '../../../features/constants/UIColours';

function ContentList( { children, colour, style, className = '' }: { children: ReactNode[] | ReactNode, colour: UIColours, style: "list" | "grid" | "menagerie_grid", className?: string }) {
	return (
		<div className={[st.contentList, st[colour], st[style], className].join(" ")}>
			{children}
		</div>
	)
}

export default ContentList;
