export interface DescriptionModifiers {
	list: boolean; // Converts '--' to '<br />--'
	expertiseDisplay: boolean; // Converts '[x|y|z...]' to 'x <span>(y, z, ...)</span>'
}

export const prepareDescription = (description: string, modifiers: DescriptionModifiers, expertiseDisplayClass: string = '') => {
	let workingDescription = description;

	if (modifiers.expertiseDisplay) {
		const pattern = /\[(.*?)\]/g; // Matches [x]
		const matches = workingDescription.match(pattern);
		matches?.forEach((match) => {
			const matchString = match.replace(/\[|\]/g, '');
			const matchParts = matchString.split('|');
			workingDescription = workingDescription.replace(match, `${matchParts[0]} <span class="${expertiseDisplayClass}">(${matchParts.splice(1).join(", ")})</span>`);
		});
	}

	if (modifiers.list) {
		workingDescription = workingDescription.replace(/--/g, '<br>--')
	}

	return workingDescription;
}