export function convertTimestampToDate(timestamp) {
  if (!timestamp || typeof timestamp.seconds !== 'number' || typeof timestamp.nanoseconds !== 'number') {
    throw new Error('Invalid timestamp format');
  }
  
  const totalSeconds = timestamp.seconds + timestamp.nanoseconds / 1e9;
  const totalMilliseconds = totalSeconds * 1000;

  const date = new Date(totalMilliseconds);

  const day = date.getDate(); 
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `Дата: ${day}/${month}/${year} Время: ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
