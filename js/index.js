import parseCss from "./parse.css.js";
import parseData from "./parse.data.js";
import parseHtml from "./parse.html.js";
import reconnect from "./reconnect.js";

const preview = document.getElementById('preview');
const genBtn = document.getElementById('generate');
const resultText = document.getElementById('result');

const htmlText = document.getElementById('html');
const cssText = document.getElementById('css');
const dataText = document.getElementById('data');

const previewDoc = preview.contentDocument;

genBtn.addEventListener('click', generate);
htmlText.addEventListener('blur', save);
cssText.addEventListener('blur', save);
dataText.addEventListener('blur', save);

htmlText.value = localStorage.getItem(htmlText.id);
cssText.value = localStorage.getItem(cssText.id);
dataText.value = localStorage.getItem(dataText.id);

function generate() {

  const { data, map } = parseData(dataText.value);
  const html = parseHtml(htmlText.value);
  const css = parseCss(cssText.value);

  reconnect(data, html, map);

  const layout = {
    tree: html, 
    selectorCollection: css, 
    dataCollection: data
  };

  resultText.value = JSON.stringify(layout);
}

function save(e) {
  const target = e.target;
  const value = target.value;
  localStorage.setItem(target.id, value);
}
