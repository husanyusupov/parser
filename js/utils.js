import {idLength} from "./config.js";

export function generateId(length = idLength) {
  const id = 'i' + Math.random().toString(36).substr(2, length - 1);
  if (id.length === length) {
    return id;
  }
  return generateId(length);
}
