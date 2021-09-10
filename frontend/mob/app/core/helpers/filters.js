export const getBetweenDatesFilter = (year, month) => {
	const initialDate = new Date(year, month - 1, 1).toISOString().substring(0, 10);
	const finalDate = new Date(year, month, 0).toISOString().substring(0, 10);
	
	return { initialDate, finalDate };
}