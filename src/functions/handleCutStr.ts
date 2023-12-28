export const handleCutStr = (str: string | null | undefined, cutSymbols:number): string | null => {
	if (!str) return null;
	if (str.length <= cutSymbols) return str;
	return str.slice(0, cutSymbols) + "...";
}
