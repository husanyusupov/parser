export const singleTags = new Set(['img', 'br', 'hr', 'input', 'link']);
export const classListMethods = new Set(['add', 'remove', 'toggle']);
export const cssBlackListProps = new Set([
  'border-image-outset',
  'border-image-repeat',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'background-repeat-x',
  'background-repeat-y',
  'background-position-x',
  'background-position-y',
]);
export const cssReplaceProps = new Map([
  ['background-position-x', 'background-position'],
  ['background-repeat-x', 'background-repeat'],
]);
export const idLength = 9;
export const uniquePrefix = '--u-';
export const aliasDivider = '_';
export const idRegStr = `[0-9a-z]{${idLength}}`;
export const idReg = new RegExp(idRegStr);
export const uniqueRegStr = `${uniquePrefix}(${idRegStr})`;
export const uniqueReg = new RegExp(uniqueRegStr);
export const uniqueRegAll = new RegExp(uniqueRegStr, 'g');
export const uniqueRegStart = new RegExp('^' + uniqueRegStr);
export const uniqueRegEnd = new RegExp(uniqueRegStr + '$');
export const propLength = 5;
export const propDivider = '_';
export const propRegStr = `${propDivider}[0-9a-z]{${propLength}}$`;
export const propReg = new RegExp(propRegStr);
export const objLength = 5;
export const aliasReg = new RegExp(`(.+${aliasDivider})${idRegStr}$`);
