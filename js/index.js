import parseCss from "./parse.css.js";
import parseData from "./parse.data.js";
import parseHtml from "./parse.html.js";
import reconnect from "./reconnect.js";
import { generateId } from "./utils.js";

const preview = document.getElementById('preview');
const form = document.getElementById('form');
const resultText = document.getElementById('result');

form.addEventListener('submit', generate);
form.addEventListener('focusout', save);

form.elements.html.value = localStorage.getItem('html');
form.elements.css.value = localStorage.getItem('css');
form.elements.data.value = localStorage.getItem('data');

function generate(e) {
  e.preventDefault();

  const { data, map } = parseData(form.elements.data.value);
  const html = parseHtml(form.elements.html.value);
  const css = parseCss(form.elements.css.value);
  const type = form.elements.type.value;

  reconnect(data, html, map);

  const layout = {
    tree: html, 
    selectorCollection: css, 
    dataCollection: data
  };
  
  const result = {};

  switch (type) {
    case 'widget':
    case 'design':
    case 'symbol':
    case 'library':
      result.layout = layout;
      result.name = form.elements.name.value;
      result.id = type + '_' + generateId();
  }

  resultText.value = JSON.stringify(result);
}

function save(e) {
  const target = e.target;

  if (target.tagName.toLowerCase() === 'textarea') {
    const value = target.value;
    localStorage.setItem(target.id, value);
  }
}
