const SUN_ICON =
	'https://cdn-icons-png.flaticon.com/512/1888/1888282.png';
const RAIN_ICON =
	'https://cdn-icons-png.flaticon.com/512/4724/4724094.png';
const CLOUDY_ICON =
	'https://cdn-icons-png.flaticon.com/512/704/704845.png';
const SNOW_ICON = 'https://cdn-icons-png.flaticon.com/512/2315/2315309.png';

export const createWetherIcon = (weatherPhrase) => {
	if (weatherPhrase.includes('солн')) {
		return SUN_ICON;
	} else if (weatherPhrase.includes('дожд')) {
		return RAIN_ICON;
	} else if (weatherPhrase.includes('ясн')) {
		return SUN_ICON;
	} else if (weatherPhrase.includes('пасмурн')) {
		return CLOUDY_ICON;
	} else if (weatherPhrase.includes('облачно')) {
		return CLOUDY_ICON;
	} else if (weatherPhrase.includes('снег')) {
		return SNOW_ICON;
	} else if (weatherPhrase.includes('снеж')) {
		return SNOW_ICON;
	}
};
