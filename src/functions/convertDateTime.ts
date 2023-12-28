export const convertDateTime = (date:string) => {
	return new Date(new Date(date)).toLocaleString("ru", {timeZone: 'Europe/Moscow'});
}
