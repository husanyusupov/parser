import {idLength} from "./config.js";

export function generateId(length = idLength) {
  const id = 'i' + Math.random().toString(36).substr(2, length - 1);
  if (id.length === length) {
    return id;
  }
  return generateId(length);
}

export function objSet(obj, path, value) {
  let i, k;
  for (i = 0; i < path.length; i++) {
    k = path[i];
    if (i === path.length - 1) {
      obj[k] = value;
    } else {
      if (!obj[k]) {
        obj[k] = {};
      }
      obj = obj[k];
    }
  }
}

export function objGet(obj, path) {
  let i, k;
  for (i = 0; i < path.length; i++) {
    k = path[i];
    if (obj && obj.hasOwnProperty(k)) {
      obj = obj[k];
    }
  }
  return obj;
}

export function objDelete(obj, path) {
  path = path.slice(0);
  let i, k, o;
  if (has(obj, path)) {
    for (i = path.length - 1; i >= 0; i--) {
      k = path.splice(i, 1)[0];
      o = objGet(obj, path);
      if (o && o.hasOwnProperty(k)) {
        delete o[k];
        if (Object.keys(o).length) {
          break;
        }
      }
    }
  }
}

export function objHas(obj, path) {
  let i, k, h;
  for (i = 0; i < path.length; i++) {
    k = path[i];
    h = obj && obj.hasOwnProperty(k);
    if (!h) {
      break;
    }
    obj = obj[k];
  }
  return h;
}