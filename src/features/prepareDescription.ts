export interface DescriptionModifiers {
	list: boolean; // Converts '--' to '<br />--'
	expertiseDisplay: boolean; // Converts '[x|y|z...]' to 'x <span>(y, z, ...)</span>'
	purchasedPoints?: number;
}

export const prepareDescription = (description: string, modifiers: DescriptionModifiers, expertiseDisplayClass: string = '') => {
	let workingDescription = description;

	if (modifiers.expertiseDisplay) {
		const pattern = /\[(.*?)\]/g; // Matches [x|y|z|...]
		const matches = workingDescription.match(pattern);
		matches?.forEach((match) => {
			const matchString = match.replace(/\[|\]/g, '');
			const matchParts = matchString.split('|');
			const purchaseIndex = modifiers.purchasedPoints && modifiers.purchasedPoints - 1 || 0;
			const remainingMatchParts = matchParts.splice(purchaseIndex);
			workingDescription = workingDescription.replace(match, `${remainingMatchParts[0]} <span class="${expertiseDisplayClass}">(${remainingMatchParts.splice(1).join(", ")})</span>`);
		});
	}

	if (modifiers.list) {
		workingDescription = workingDescription.replace(/--/g, '<br>--')
	}

	return workingDescription;
}