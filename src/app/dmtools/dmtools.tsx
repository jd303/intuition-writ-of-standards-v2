import st from './dmtools.module.css';

const tempDcs = [
	{ dc: 0, roll: 6 },
	{ dc: 1, roll: 10 },
	{ dc: 2, roll: 14 },
	{ dc: 3, roll: 18 },
	{ dc: 4, roll: 22 },
	{ dc: 5, roll: 26 },
	{ dc: 6, roll: 30 }
];

export default function DMToolsPage() {
	return (
		<div className="dmTools mainContent">
			<h1>DC Table</h1>
			<div className={"mainContent " + st.dmToolsLayout}>
				<div className={st.dcTable}>
					{tempDcs.map((dc, index) => (
						<div key={`'dc-${index}`} className={st.dc}><div className={st.name}>DC {dc.dc}:</div> {dc.roll}</div>
					))}
				</div>
			</div>
		</div>
	);
}