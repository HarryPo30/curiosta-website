import type { Cart, Region } from "@medusajs/medusa";

// NOTE: explicitly add keys here so that app does not set or get data from local storage 'accidentally'.
type LocalStorageKeys = "cartId" | "cart" | "custId" | "region" | 'countryId';


/**
 * A custom hook to simplify the usage of the local storage.
 *
 * @function
 * @returns `get` and `set` method which supports any kind of payload and automatically parses object using JSON.stringify().
 */
const useLocalStorage = () => {
  const setLocalStorage = <T = any>(key: LocalStorageKeys, payload: T) => {
    try {
      const value =
        typeof payload === "object" ? JSON.stringify(payload) : payload;
      localStorage.setItem(key, value as string);
    } catch (error) {
      console.warn(`Error setting local storage key "${key}": `, error);
    }
  };

  const getLocalStorage = <ReturnPayloadType = string>(
    key: LocalStorageKeys
  ) => {
    try {
      let value = localStorage.getItem(key);
      if (value === null) {
        return null;
      }
      try {
        value = JSON.parse(value);
      } catch (error) { }
      return value as ReturnPayloadType | null;
    } catch (error) {
      console.warn(`Error getting local storage key "${key}": `, error);
      return null;
    }
  };

  const removeLocalStorage = (key: LocalStorageKeys) => {
    localStorage.removeItem(key)
  }

  return { get: getLocalStorage, set: setLocalStorage, remove: removeLocalStorage };
};

export default useLocalStorage;
