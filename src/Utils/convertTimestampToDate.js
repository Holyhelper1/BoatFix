export function convertTimestampToDate(timestamp) {
    // Проверка на наличие нужных свойств
    if (!timestamp || typeof timestamp.seconds !== 'number' || typeof timestamp.nanoseconds !== 'number') {
      throw new Error('Invalid timestamp format');
    }
  
    // 1. Рассчитайте общее количество секунд
    const totalSeconds = timestamp.seconds + timestamp.nanoseconds / 1e9; // nano в секунды
  
    // 2. Преобразуйте в миллисекунды
    const totalMilliseconds = totalSeconds * 1000; // секунды в миллисекунды
  
    // 3. Создайте объект Date
    const date = new Date(totalMilliseconds);
  
    // 4. Извлеките компоненты даты
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Январь - 0, Декабрь - 11
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    // 5. Форматируем строку даты
    return `Дата: ${day}/${month}/${year} Время: ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
  
  // Пример использования
//   const timestamp = {
//     nanoseconds: 422000000,
//     seconds: 1741722112
//   };
  
//   const formattedDate = convertTimestampToDate(timestamp);
//   console.log(formattedDate);
  