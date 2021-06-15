import {idLength} from "./config.js";

export function generateId() {
  const id = 'i' + Math.random().toString(36).substr(2, idLength - 1);
  if (id.length === idLength) {
    return id;
  }
  return generateId();
}
