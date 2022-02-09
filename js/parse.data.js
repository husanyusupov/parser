import {objLength, aliasReg, aliasDivider} from "./config.js";
import {generateId, objSet} from "./utils.js";

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

function createAliasId(alias) {
  const match = alias.match(aliasReg);
  if (match) {
    return match[1] + generateId();
  }
  return alias + aliasDivider + generateId();
}

function createObjId() {
  return 'obj_' + generateId();
}

function createPropId(name = 'prop') {
  // if (name.includes('_')) {
  //   name = name.split('_')[0];
  // }
  return name + '_' + generateId(objLength);
}

function reducer(name) {
  return function (acc, list) {
    Array.prototype.push.apply(acc, list.map((o) => o[name]));
    return acc;
  };
}

function flatReducer(name) {
  return function (acc, o) {
    Array.prototype.push.apply(acc, o[name]);
    return acc;
  };
}

function dataWalker(item, callback, flat = true) {
  const levels = [];
  const body = item.json;
  const data = item.data;
  const defs = item.defs;

  if (callback(levels, body, data, defs) !== false) {
    bypass(levels, body, data, defs);
  }

  function bypass(levels, json, data, defs) {
    for (const [name, body] of Object.entries(json)) {
      if (body.type === 'meta' && !body.single) {
        let nextData;
        let nextDefs;
        let nextJson = body.value;
        let nextLevels = [...levels, name];

        if (levels.length === 0) {
          if (flat) {
            nextData = data[name];
            nextDefs = defs[name];
          } else {
            nextData = [data[name]];
            nextDefs = [defs[name]];
          }
        } else {
          if (flat) {
            nextData = data.reduce(flatReducer(name), []);
            nextDefs = defs.reduce(flatReducer(name), []);
          } else {
            nextData = data.reduce(reducer(name), []);
            nextDefs = defs.reduce(reducer(name), []);
          }
        }

        if (callback(nextLevels, nextJson, nextData, nextDefs) !== false) {
          bypass(nextLevels, nextJson, nextData, nextDefs);
        }
      }
    }
  }
}

export function regenerate(parsed, map = {}) {
  const data = {
    map: {}
  };
  Object.keys(parsed).forEach((alias) => {

    const newAlias = createAliasId(alias);
    const value = parsed[alias];
    value.id = map[alias] = newAlias;

    if (!value.module) {
      dataWalker(value, (levels, json, data, defs) => {
        const names = Object.keys(json);
        const renames = names.map(createPropId);

        names.forEach((name, index) => {
          const key = [alias, ...levels, name].join('/');
          map[key] = renames[index];
        });

        changeKeys(json, names, renames);

        if (levels.length === 0) {
          changeKeys(data, names, renames);
          changeKeys(defs, names, renames);
        } else {
          data.forEach(d => {
            changeKeys(d, names, renames);
            d.id = createObjId();
          });
          defs.forEach(d => {
            changeKeys(d, names, renames);
            d.id = createObjId();
          });
        }
      });
    }

    data.map[newAlias] = value;
  });
  return data;
}

export default function parseData(text, map) {
  const parsed = JSON.parse(text || '{}');
  return regenerate(parsed, map);
}
