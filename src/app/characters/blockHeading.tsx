import st from './blockHeading.module.css';
import { ReactNode } from 'react';

function BlockHeading( { icon, label, addendum, size = 'regular', className }: { icon?: string, label: string, addendum?: ReactNode, size?: "regular" | "small", className?: string } ) {
	return (
		<div className={`${st.heading} ${st[size]} ${icon ? st.hasIcon : ''} ${className || ''}`}>
			{icon && <img src={icon} alt="Icon" />}
			<span>{label}</span>
			<span>{addendum}</span>
		</div>
	)
}

export default BlockHeading;
