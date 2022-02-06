export default function convertCSS (parsed, map) {
  const collection = parsed.tree.selectorCollection.map;
  const css = {
    map: {}
  };

  Object.keys(collection).forEach((selectorText) => {
    const obj = collection[selectorText];

    css.map[selectorText] = {
      media: obj.media,
      selectorText: obj.selectorText,
      style: {
        map: {}
      }
    }

    const style = css.map[selectorText].style.map;

    for (let key in obj.rules) {
      if (obj.rules.hasOwnProperty(key)) {
        const rule = obj.rules[key];
        style[rule.name] = rule.value;
      }
    }
  });

  return css;
}
