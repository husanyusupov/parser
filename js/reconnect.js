import { propDivider, propReg, uniqueRegEnd } from "./config.js";

function change(obj, prop, keys) {
    const value = obj[prop];
    if (value) {
        const ind = value.indexOf('.');
        let first, rest = '';
        if (ind > -1) {
            first = value.slice(0, ind);
            rest = value.slice(ind);
        } else {
            first = value;
        }
        const key = keys.find(key => key.split(propDivider)[0] === first);
        if (key) {
            obj[prop] = key + rest;
        } else {
            throw Error(`Key not found for prop: ${first}`);
        }
    }
}

export default function reconnect(dataCollection, tree, map) {
    function bypass(id, scope) {
        const tag = tree.map[id];
        const use = tag?.fn?.use;
        const each = tag?.fn?.each;

        if (use) {
            if (use in map) {
                const newUse = map[use];
                scope = scope[newUse].json;
                tag.fn.use = newUse;
            } else {
                throw Error(`Key not found for fn.use: ${use}`);
            }
        }

        if (each) {
            const key = Object.keys(scope).find(key => key.replace(propReg, '') === each);
            if (key) {
                scope = scope[key].value;
                tag.fn.each = key;
            } else {
                throw Error(`Key not found for fn.each: ${each}`);
            }
        }

        if (tag?.children?.length) {
            tag.children.forEach(child => bypass(child, scope));
        }
        
        const keys = Object.keys(scope);
        
        if (tag.textContent) {
            change(tag, 'textContent', keys);
        }

        if (tag.attrs) {
            Object.keys(tag.attrs).forEach(name => change(tag.attrs, name, keys));
        }

        if (tag.fn?.if) {
            change(tag.fn, 'if', keys);
        }

    }

    bypass(tree.root, dataCollection.map);
}