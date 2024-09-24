export function meLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  console.log(`Retrieved ${key} from local storage:`, value); // Add log here
  return JSON.parse(value || 'null');
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(`Stored ${key} in local storage:`, value); // Add log here
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
  console.log(`Removed ${key} from local storage`); // Add log here
}
