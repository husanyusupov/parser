import parseCss from "./parse.css.js";
import parseData from "./parse.data.js";
import parseHtml from "./parse.html.js";
import reconnect from "./reconnect.js";
import { generateId } from "./utils.js";
import convertHTML from "./convert.html.js";
import convertCSS from "./convert.css.js";
import convertData from "./convert.data.js";

const design = document.getElementById('design');
const form = document.getElementById('form');
const resultText = document.getElementById('result');

form.addEventListener('submit', generate);
form.addEventListener('focusout', save);
design.addEventListener('change', onDesign);

form.elements.html.value = localStorage.getItem('html');
form.elements.css.value = localStorage.getItem('css');
form.elements.data.value = localStorage.getItem('data');
form.elements.name.value = localStorage.getItem('name');
form.elements.type.value = localStorage.getItem('type');

function generate(e) {
  e.preventDefault();

  const map = {};
  const data = parseData(form.elements.data.value, map);
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
  const tagName = target.tagName.toLowerCase();
  const isTextarea = tagName === 'textarea';
  const isInput = tagName === 'input';

  if (isTextarea || isInput) {
    const value = target.value;
    localStorage.setItem(target.name, value);
  }
}

function onDesign(e) {
  const reader = new FileReader();
  const file = e.target.files[0];

  reader.onloadend = function () {
    const parsed = JSON.parse(reader.result);
    const map = {};
    const result = {};
    const layout = {};

    layout.dataCollection = convertData(parsed, map);
    layout.tree = convertHTML(parsed, map);
    layout.selectorCollection = convertCSS(parsed, map);

    result.layout = layout;
    result.name = parsed.name;
    result.id = 'design_' + generateId();

    resultText.value = JSON.stringify(result);
  }

  reader.readAsText(file);
}
