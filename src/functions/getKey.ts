export const getAdminKey = ():string | null => {
	const key = globalThis.localStorage.getItem('key');
	return key ? key : null;
}
