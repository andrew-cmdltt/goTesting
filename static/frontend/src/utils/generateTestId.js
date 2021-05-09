export function generateTestId(max, min) {
	let rand = min + Math.random() * (max - min);
	return Math.round(rand);
}