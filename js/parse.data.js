import { objLength, propDivider, propLength, aliasDivider } from "./config.js";
import { generateId } from "./utils.js";

function dataWalker(item, callback, flat = true) {
  const levels = [];
  const body = item.json;
  const data = item.data;
  const defs = item.defs;

  if (callback(levels, body, data, defs) !== false) {
    bypass(levels, body, data, defs);
  }

  function reducer(name) {
    return (acc, list) => acc.concat(list.map((o) => o[name]));
  }

  function flatReducer(name) {
    return (acc, o) => acc.concat(o[name]);
  }

  function bypass(levels, json, data, defs) {
    Object.entries(json).forEach(([name, body]) => {
      if (body.type === 'meta' && !body.single) {
        let nextData;
        let nextDefs;
        let nextJson = body.value;
        let nextLevels = [...levels, name];

        if (levels.length === 0) {
          if (flat) {
            nextData = item.data[name];
            nextDefs = item.defs[name];
          } else {
            nextData = [item.data[name]];
            nextDefs = [item.defs[name]];
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

function createAliasId(alias = 'alias') {
  if (alias.includes('_')) {
    alias = alias.split('_')[0];
  }
  return alias + '_' + generateId();
}

function createObjId() {
  return 'obj_' + generateId();
}

function createPropId(name = 'prop') {
  if (name.includes('_')) {
    name = name.split('_')[0];
  }
  return name + '_' + generateId(objLength);
}

function regenerate(parsed) {
  const data = {
    map: {}
  };
  const map = {};
  Object.keys(parsed).forEach((alias) => {

    const newAlias = createAliasId(alias);
    const value = parsed[alias];
    value.id = map[alias] = newAlias;

    if (!value.module) {
      dataWalker(value, (levels, json, data, defs) => {
        const names = Object.keys(json);
        const renames = names.map(createPropId);

        names.forEach((name, index) => {
          map[name] = renames[index];
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
  return { data, map };
}

export default function parseData(text) {
  const parsed = JSON.parse(text || '{}');
  return regenerate(parsed);
}
