import { PREFIX_LOCAL_STORAGE } from '../constants';

export const isNil = (value: any): value is undefined | null =>
  typeof value === 'undefined' || value === null;

export const isEmpty = (value: any): boolean => {
  if (isNil(value)) {
    return true;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value.length === 0;
};

export const getDataFromStorage = (storageKey: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  const cachedData = localStorage.getItem(PREFIX_LOCAL_STORAGE + storageKey) || '';
  if (isEmpty(cachedData)) {
    return null;
  }
  return JSON.parse(cachedData);
};

export const setDataToStorage = (storageKey: string, data: any) => {
  localStorage.setItem(PREFIX_LOCAL_STORAGE + storageKey, JSON.stringify(data));
};
