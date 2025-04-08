import st from './sectionBlock.module.css';
import { ReactNode, useState } from "react";
import { addSectionRef } from "./useSectionNav";
import icoChevronDown from '/public/images/icons/ico.chevron.down.svg';

export const SectionBlock = ( { children, name, className, innerClassName, sectionRefs, icon }: { children: ReactNode, name: string, className?: string, innerClassName?: string, sectionRefs: React.RefObject<HTMLElement[]>, icon?: string }) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const toggleOpen = () => {
		setIsOpen(!isOpen);
	}

	return (
		<section className={`${st.sectionBlock} ${className} ${(isOpen && st.open || st.closed)}`} ref={el => addSectionRef(el!, sectionRefs)} id={name}>
			<h1 className={st.title} onClick={toggleOpen}><span>{icon ? <img src={icon} alt={name} /> : <></>} {name}</span> <img className={st.icoOpenState} src={icoChevronDown} /></h1>
			<div className={`${st.sectionContent} ${innerClassName}`}>{children}</div>
		</section>
	)
}