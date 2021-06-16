import { propDivider, propLength, uniquePrefix } from "./config.js";
import {generateId} from "./utils.js";

function dataWalker(item, callback, flat = true) {
  const levels = [];
  const body = item.json;
  const data = item.data;

  if (callback(levels, body, data) !== false) {
    bypass(levels, body, data);
  }

  function reducer(name) {
    return (acc, list) => acc.concat(list.map((o) => o[name]));
  }

  function flatReducer(name) {
    return (acc, o) => acc.concat(o[name]);
  }

  function bypass(levels, json, data) {
    Object.entries(json).forEach(([name, body]) => {
      if (body.type === 'meta' && !body.single) {
        let nextData;
        let nextJson = body.value;
        let nextLevels = [...levels, name];

        if (levels.length === 0) {
          if (flat) {
            nextData = item.data[name];
          } else {
            nextData = [item.data[name]];
          }
        } else {
          if (flat) {
            nextData = data.reduce(flatReducer(name), []);
          } else {
            nextData = data.reduce(reducer(name), []);
          }
        }

        if (callback(nextLevels, nextJson, nextData) !== false) {
          bypass(nextLevels, nextJson, nextData);
        }
      }
    });
  }
}

function changeKeys(obj, keys, newKeys) {
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const newKey = newKeys[index];
    if (key === newKey) {
      throw Error(`Keys are equal: ${key} === ${newKey}`);
    }
    obj[newKey] = obj[key];
    delete obj[key];
  }
}

function regenerate(parsed) {
  const result = {
    map: {}
  };
  Object.keys(parsed).forEach((key) => {
    const alias = key + uniquePrefix + generateId();
    const value = parsed[key];

    dataWalker(value, (levels, json, data) => {
      const keys = Object.keys(json);
      const renamed = keys.map(key => key + propDivider + generateId(propLength));

      changeKeys(json, keys, renamed);

      if (levels.length === 0) {
        changeKeys(data, keys, renamed);
      } else {
        data.forEach(d => {
          changeKeys(d, keys, renamed);
        })
      }
    });

    result.map[alias] = value;
  });
  return result;
}
export default function parseData(text) {
  const parsed = JSON.parse(text || '{}');

  const result = regenerate(parsed);

  return result;
}
