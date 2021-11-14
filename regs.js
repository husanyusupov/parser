let replace_last_comma = /,(\n*\s*[}\]])/g; // replace(reg, '$1')
let quote_keys = /([-\w]+)(\s?:)/g; // replace(reg, '"$1"$2')