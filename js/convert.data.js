import fast_copy from "../node_modules/fast-copy/dist/fast-copy.esm.js";
import {regenerate} from "./parse.data.js";

export default function convertData (parsed, map) {
  const collection = parsed.tree.dataCollection.map;

  Object.keys(collection).forEach((alias) => {
    const data = collection[alias];
    data.defs = {};
    Object.keys(data.json).forEach((name) => {
      data.defs[name] = data.json[name].defaults;
      delete data.json[name].defaults;
      if (!data.data.hasOwnProperty(name)) {
        data.data[name] = fast_copy(data.defs[name]);
      }
    })
  });

  return regenerate(collection, map);
}
