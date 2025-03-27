import { ReactNode } from 'react';
import st from './contentPageContainer.module.css';

function ContentPageContainer( { children, className }: { children: ReactNode, className?: string } ) {
	return (
		<div className={`${st.contentPageContainer} ${className}`}>{children}</div>
	)
}

export default ContentPageContainer;
