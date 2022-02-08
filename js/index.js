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
    const allMap = {};
    let symbols;

    const allCss = parsed.tree.selectorCollection.map;
    const allData = parsed.tree.dataCollection.map;

    if (parsed.symbols?.length) {
      symbols = parsed.symbols.map((parsedSymbol) => {
        let css = parsedSymbol.tree?.selectorCollection?.map;
        let data = parsedSymbol.tree?.dataCollection?.map;

        // удаление селекторов символа из основного дерева
        if (css) {
          for (const key in css) {
            if (css.hasOwnProperty(key) && allCss.hasOwnProperty(key)) {
              delete allCss[key]
            }
          }
        }

        // удаление данных символа из основного дерева
        if (data) {
          for (const key in data) {
            if (data.hasOwnProperty(key) && allData.hasOwnProperty(key)) {
              delete allData[key]
            }
          }
        }

        // сборка данных для символа
        const map = {};
        const symbol = {};
        const layout = {};
        layout.dataCollection = convertData(parsedSymbol, map);
        layout.tree = convertHTML(parsedSymbol, map);
        layout.selectorCollection = convertCSS(parsedSymbol, map);

        symbol.layout = layout;
        symbol.name = parsedSymbol.name;
        symbol.id = allMap[parsedSymbol.id] = 'symbol_' + generateId();

        return symbol;
      });
    }

    // создание данных дизайна
    const design = {};
    const layout = {};

    layout.dataCollection = convertData(parsed, allMap);
    layout.tree = convertHTML(parsed, allMap);
    layout.selectorCollection = convertCSS(parsed, allMap);

    design.layout = layout;
    design.name = parsed.name;
    design.id = 'design_' + generateId();

    resultText.value = JSON.stringify(design);

    symbols.forEach((symbol) => {
      const textarea = document.createElement('textarea');
      textarea.readOnly = true;
      textarea.value = JSON.stringify(symbol);
      resultText.insertAdjacentElement('afterend', textarea);
    });

    Object.keys(design.layout.tree.map).forEach((id) => {
      const tag = design.layout.tree.map[id];
      const include = tag.fn?.include;

      if (include) {
        const symbol = symbols.find((symbol) => {
          return symbol.id === include;
        });
        console.log(include, symbol);
      }
    })
  }

  reader.readAsText(file);
}
