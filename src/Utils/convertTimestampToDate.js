// данные приходят по гринвичу
// export function convertTimestampToDate(timestamp) {
//     if (!timestamp || typeof timestamp.seconds !== 'number' || typeof timestamp.nanoseconds !== 'number') {
//       throw new Error('Invalid timestamp format');
//     }

//     const totalSeconds = timestamp.seconds + timestamp.nanoseconds / 1e9;
  
//     const totalMilliseconds = totalSeconds * 1000;
  
//     const date = new Date(totalMilliseconds);

//     const day = date.getUTCDate();
//     const month = date.getUTCMonth() + 1;
//     const year = date.getUTCFullYear();
//     const hours = date.getUTCHours();
//     const minutes = date.getUTCMinutes();
  
//     return `Дата: ${day}/${month}/${year} Время: ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
//   }
  
  // Пример использования
//   const timestamp = {
//     nanoseconds: 422000000,
//     seconds: 1741722112
//   };
  
//   const formattedDate = convertTimestampToDate(timestamp);
//   console.log(formattedDate);
  
// данные по месному времени
export function convertTimestampToDate(timestamp) {
  if (!timestamp || typeof timestamp.seconds !== 'number' || typeof timestamp.nanoseconds !== 'number') {
    throw new Error('Invalid timestamp format');
  }

  const totalSeconds = timestamp.seconds + timestamp.nanoseconds / 1e9;
  const totalMilliseconds = totalSeconds * 1000;

  const date = new Date(totalMilliseconds);

  const day = date.getDate(); // Локальный день
  const month = date.getMonth() + 1; // Локальный месяц (прибавим 1, так как месяцы начинаются с 0)
  const year = date.getFullYear(); // Локальный год
  const hours = date.getHours(); // Локальные часы
  const minutes = date.getMinutes(); // Локальные минуты

  return `Дата: ${day}/${month}/${year} Время: ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
