import { ChangeEvent, useState } from 'react';
import st from './sectionNav.module.css';

export interface SectionNavDefinition {
	name: string | null | undefined;
	element: Element | null;
}

function SectionNav( { sections, label }: { sections: SectionNavDefinition[], label: string }) {
	const [currentSection, setCurrentSection] = useState(sections[0]);

	const scrollToSection = (event: ChangeEvent<HTMLSelectElement>) => {
		const newSection = sections.find((section) => section.name == event.target.value);
		if (newSection) {
			setCurrentSection(newSection);
			newSection.element?.scrollIntoView({ behavior: "smooth" });
		}
	}

	return (
		<div className={st.sectionNavContainer}>
			<label htmlFor={`sectionnav-${currentSection?.name}`}>{label}</label>
			<select value={currentSection?.name || ''} id={`sectionnav-${currentSection?.name}`} onChange={scrollToSection}>
				{sections.map((section, index) => (
					<option key={`section-${index}`} value={section.name || ''}>{section.name?.replace('_',' ')}</option>
				))}
			</select>
		</div>
	)
}

export default SectionNav;
