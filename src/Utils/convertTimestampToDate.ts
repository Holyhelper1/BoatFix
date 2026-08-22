export function convertTimestampToDate(
  timestamp: { seconds: number; nanoseconds?: number } | null | undefined
): string {
  if (!timestamp || typeof timestamp.seconds !== "number") {
    return "Дата неизвестна";
  }

  const date = new Date(timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6);
  if (isNaN(date.getTime())) return "Дата неизвестна";

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `Дата: ${day}/${month}/${year} Время: ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}
