import st from './blockHeading.module.css';
import { ReactNode } from 'react';

function BlockHeading( { icon, label, addendum, size = 'regular' }: { icon?: string, label: string, addendum?: ReactNode, size?: "regular" | "small" } ) {
	return (
		<div className={`${st.heading} ${st[size]} ${icon ? st.hasIcon : ''}`}>
			{icon && <img src={icon} alt="Icon" />}
			<span>{label}</span>
			<span>{addendum}</span>
		</div>
	)
}

export default BlockHeading;
