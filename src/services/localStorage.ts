export function meLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  console.log(`Retrieved ${key} from local storage:`, value);

  try {
    return JSON.parse(value || 'null');
  } catch (error) {
    console.error('Error parsing local storage value:', error);
    return null;
  }
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, value);
  console.log(`Stored ${key} in local storage:`, value);
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
  console.log(`Removed ${key} from local storage`);
}
