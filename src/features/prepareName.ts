export const prepareName = (name: string) => {
	return name?.replace(/ /g, "_").toLowerCase();
}