import {generateId} from "./utils.js";

function regenerate(parsed) {
  const map = {};
  Object.keys(parsed).forEach((key, value) => {
    const alias = 'data--u-' + generateId();
    map[key] = alias;
    parsed[alias] = value;
    // TODO: generate ids for properties
    delete parsed[key];
  });
  return map;
}
export default function parseData(text) {
  const parsed = JSON.parse(text || '{}');

  const map = regenerate(parsed);

  return [parsed, map];
}
