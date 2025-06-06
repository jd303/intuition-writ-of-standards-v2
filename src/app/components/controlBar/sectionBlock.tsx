import st from './sectionBlock.module.css';
import { ReactNode } from "react";
import { addSectionRef } from "./useSectionNav";
import { useToggleableBooleanState } from '../../../features/uiHooks';
import TriangleNotch from '../triangleNotch/triangleNotch';

export const SectionBlock = ( { children, name, className, innerClassName, sectionRefs, icon, style = "default" }: { children: ReactNode, name: string, className?: string, innerClassName?: string, sectionRefs: React.RefObject<HTMLElement[]>, icon?: string, style?: "default" | "plain" }) => {
	const storageKey = `sectionblock-${name}`;
	const initialValue = localStorage.getItem(storageKey);
	
	let initialState;
	if (initialValue && initialValue == "false") initialState = false;
	else initialState = true;

	const [isOpen, toggleIsOpen] = useToggleableBooleanState(initialState);
	const toggleOpen = () => {
		localStorage.setItem(storageKey, (!isOpen).toString());
		toggleIsOpen();
	}

	return (
		<section className={`${st.sectionBlock} ${className || ''} ${(isOpen && st.open || st.closed)} ${st[style]}`} ref={el => addSectionRef(el!, sectionRefs)} id={name} data-name={name}>
			<h1 className={`${st.title}`} onClick={toggleOpen}><span>{icon ? <img src={icon} alt={name} /> : <></>} {name.replace(/_/g, " ")}</span> {style == "default" && <TriangleNotch isOpen={isOpen} />}</h1>
			<div className={`${st.sectionContent} ${innerClassName}`}>{children}</div>
		</section>
	)
}