import st from './sectionBlock.module.css';
import { ReactNode } from "react";
import { addSectionRef } from "./useSectionNav";
import { useToggleableBooleanState } from '../../../features/uiHooks';
import TriangleNotch from '../triangleNotch/triangleNotch';

export const SectionBlock = ( { children, name, className, innerClassName, sectionRefs, icon }: { children: ReactNode, name: string, className?: string, innerClassName?: string, sectionRefs: React.RefObject<HTMLElement[]>, icon?: string }) => {
	const [isOpen, toggleIsOpen] = useToggleableBooleanState(true);

	return (
		<section className={`${st.sectionBlock} ${className || ''} ${(isOpen && st.open || st.closed)}`} ref={el => addSectionRef(el!, sectionRefs)} id={name}>
			<h1 className={`${st.title} textHoverEffect`} onClick={toggleIsOpen}><span>{icon ? <img src={icon} alt={name} /> : <></>} {name}</span> <TriangleNotch isOpen={isOpen} /></h1>
			<div className={`${st.sectionContent} ${innerClassName}`}>{children}</div>
		</section>
	)
}