import lgIntuition from '/images/lg.intuition.svg';

import './intuition-logo.css';

function IntuitionLogo( { shrink = false }: { shrink?: boolean }) {
	return (
		<div className={`logo ${shrink ? 'shrink' : ''}`}>
			<img src={lgIntuition} alt="Intuition" />
		</div>
	)
}

export default IntuitionLogo;
