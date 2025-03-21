import { ReactNode } from 'react';

import st from './contentList.module.css';

function ContentList( { children, color }: { children: ReactNode[] | ReactNode, color: "grey" | "cream" }) {
	return (
		<section className={[st.contentList, st[color]].join(" ")}>
			{children}
		</section>
	)
}

export default ContentList;
