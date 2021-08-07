import {cssBlackListProps, cssReplaceProps} from "./config.js";

function cssWalker(styleTag, predicate) {
  const context = styleTag.ownerDocument.defaultView;

  function bypass(rules, media = 'screen') {
    Array.from(rules).forEach(function (rule) {
      if (rule instanceof context.CSSStyleRule) {
        predicate(rule, media);
      } else if (rule instanceof context.CSSMediaRule) {
        bypass(rule.cssRules, rule.conditionText);
      }
    });
  }

  bypass(styleTag.sheet.cssRules);
}

function retrieveCss(styleTag) {
  const selectors = {
    map: {}
  };
  cssWalker(styleTag, (rule, media) => {
    const selector = {
      media: media,
      selectorText: rule.selectorText.trim(),
      style: {
        map: {}
      }
    };
    Array.from(rule.style).forEach((name) => {
      if (cssReplaceProps.has(name)) name = cssReplaceProps.get(name);
      if (cssBlackListProps.has(name)) return;
      selector.style.map[name] = rule.style[name];
    });
    selectors.map[`${selector.media}/${selector.selectorText}`] = selector;
  });
  return selectors;
}

export default function parseCss(text) {
  const iframe = document.createElement('iframe');
  iframe.hidden = true;
  document.body.append(iframe);
  iframe.contentDocument.body.innerHTML = `<style>${text}</style>`;
  const parsed = retrieveCss(iframe.contentDocument.body.firstElementChild);
  iframe.remove();
  return parsed;
}
