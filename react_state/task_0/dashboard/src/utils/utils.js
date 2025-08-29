export function getCurrentYear() {
	const currentYear = new Date().getFullYear();
	return currentYear;
}

export function getFooterCopy(isIndex) {
	return isIndex ? 'Holberton School' : 'Holberton School main dashboard';
}

export function getLatestNotification() {
	return "<strong>Urgent requirement</strong> - complete by EOD"
}
