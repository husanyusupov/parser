import {generateId} from "./utils.js";

function attr(tag, name, value) {
  if (name === 'class') {
    tag.className = value;
  }
  const match = name.match(/mosaic-fn-(each|use|include)/);
  if (match) {
    if (!tag.fn) {
      tag.fn = {};
    }
    tag.fn[match[1]] = value;
  }
}

function retrieveTree(element) {
  const tree = {
    root: '',
    map: {}
  };
  const map = {};

  function bypass(element, parent = '') {
    const id = generateId();
    if (element.id) {
      map[element.id] = id;
    }
    const tag = {
      id: id,
      parent: parent,
      tagName: element.tagName.toLowerCase()
    };
    let textContent;

    if (element.hasAttributes()) {
      [...element.attributes].forEach(({name, value}) => attr(tag, name, value));
    }

    if (element.children.length) {
      tag.children = [...element.children].map(e => bypass(e, tag.id));
    } else if ((textContent = element.textContent.trim())) {
      tag.textContent = textContent;
    }

    tree.map[tag.id] = tag;

    return tag.id;
  }

  tree.root = bypass(element);

  return { tree, map };
}

export default function parseHtml(text) {
  const iframe = document.createElement('iframe');
  iframe.hidden = true;
  document.body.append(iframe);
  iframe.contentDocument.body.innerHTML = text;
  const parsed = retrieveTree(iframe.contentDocument.body.firstElementChild);
  iframe.remove();
  return parsed;
}
