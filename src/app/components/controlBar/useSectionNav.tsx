import { useEffect, useRef, useState } from "react";
import { SectionNavDefinition } from "./sectionNav";

// Setup a section navigator
export const useSectionNav = (): [React.RefObject<HTMLElement[]>, SectionNavDefinition[]] => {
	const sectionRefs = useRef<(HTMLElement)[]>([]);
	const [sectionDefinitions, setSectionDefinitions] = useState<SectionNavDefinition[]>([]);
	useEffect(() => {
		const sectionRefDefinitions: SectionNavDefinition[] = sectionRefs.current.map((sectionRef: HTMLElement) => { return { name: sectionRef?.getAttribute('id'), element: sectionRef } });
		setSectionDefinitions(sectionRefDefinitions);
	}, [sectionRefs]);

	return [ sectionRefs, sectionDefinitions ];
}

export const addSectionRef = (el: HTMLElement, sectionRefs: React.RefObject<HTMLElement[]>) => {
	if (el != null && !sectionRefs.current.find(ref => ref == el)) {
		sectionRefs.current[sectionRefs.current.length] = el;
	}
}