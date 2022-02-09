export default function convertHTML (parsed, map) {
  const tree = {
    root: '',
    map: {}
  };

  function getUpdatedPath(property) {
    return map[property];
  }

  function getAlias(tag) {
    return '$' + (tag.widgetName || 'mc') + '_' + tag.id;
  }

  function bypass(id, path = '') {
    const originTag = parsed.tree.tags[id];

    const tag = {
      id: originTag.id,
      parent: originTag.parent,
      tagName: originTag.tagName,
      className: originTag.className,
    };

    if (originTag.dataSource === 's3') {
      if (!tag.fn) tag.fn = {};
      path = getAlias(originTag);
      tag.fn.use = getUpdatedPath(path);
    }

    if (originTag.fn?.each) {
      if (!tag.fn) tag.fn = {};
      path += '/' + originTag.fn.each;
      tag.fn.each = getUpdatedPath(path);
    }

    if (originTag.fn?.label) {
      if (!tag.fn) tag.fn = {};
      tag.fn.label = originTag.fn.label;
    }

    if (originTag.fn?.goto) {
      if (!tag.fn) tag.fn = {};
      tag.fn.goto = originTag.fn.goto;
    }

    if (originTag.className === 'include') {
      if (!tag.fn) tag.fn = {};
      tag.fn.include = getUpdatedPath(originTag.symbol);
    }

    if (originTag.data) {
      Object.keys(originTag.data).forEach((key) => {
        const property = originTag.data[key];
        let match = property.match(/(.+?)(\..+)/);
        let value;
        if (match) {
          value = getUpdatedPath(path + '/' + match[1]) + match[2];
        } else {
          value = getUpdatedPath(path + '/' + property);
        }
        if (key === 'text') {
          tag.textContent = value;
        } else {
          if (!tag.attrs) tag.attrs = {};
          tag.attrs[key] = value;
        }
      })
    }

    if (!tag.textContent && originTag.children?.length) {
      tag.children = originTag.children.map((id) => {
        return bypass(id, path);
      });
    }

    tree.map[tag.id] = tag;

    return tag.id;
  }

  tree.root = bypass(parsed.tree.root);

  return tree;
}
