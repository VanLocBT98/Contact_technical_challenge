export function capitalizeKeys<T>(obj: Record<string, T>): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      result[capitalizedKey] = obj[key];
    }
  }
  return result;
}