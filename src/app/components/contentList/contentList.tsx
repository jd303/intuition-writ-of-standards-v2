import { ReactNode } from 'react';

import st from './contentList.module.css';
import { UIColours } from '../../../features/UIColours';

function ContentList( { children, colour, style, className = '' }: { children: ReactNode[] | ReactNode, colour: UIColours, style: "list" | "grid", className: string }) {
	return (
		<section className={[st.contentList, st[colour], st[style], className].join(" ")}>
			{children}
		</section>
	)
}

export default ContentList;
