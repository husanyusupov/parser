export default function convertCSS(parsed, map) {
  const regColor = /var\(--(color-i[a-z0-9]{8})\)/g;
  const colorProps = new Set([
    'fill', 'stroke', 'stop-color', 
    'color', 'outline-color',
    'text-shadow', 'box-shadow', 'background-color', 'background-image',
    'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    '-webkit-text-stroke-color'
  ]);
  const collection = parsed.tree.selectorCollection.map;
  const variables = parsed.tree.selectorCollection.variables;
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
        let value = String(rule.value);
        
        if (colorProps.has(rule.name)) {
          value = value.replace(regColor, (_, name) => variables[name]);
        }
        
        style[rule.name] = value;
      }
    }
  });

  return css;
}
