import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';


let template = process.argv[2];

if (!template) {
    console.log('template name required!');
    process.exit(9);
}

if (!template.endsWith('.html')) {
    template += '.html';
}

const filePath = path.resolve('./templates', template);

(async () => {
    console.time('time');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file://' + filePath);
    // await page.screenshot({ path: 'example.png' });
    // const css = await page.$eval('style', (e) => e.innerHTML);
    // const json = await page.$eval('script', (e) => e.innerHTML);
    // const html = await page.$eval('body', (e) => e.innerHTML);
    // console.log(css);
    // console.log(json);
    // console.log(html);
    const content = await page.content();
    console.log(content);
    console.timeEnd('time');
  
    await browser.close();
  })();

try {
    const data = fs.readFileSync(filePath, 'utf8');
    // const doc = new DOMParser().parseFromString(data, 'text/html');

    // console.log(Object.values(doc.documentElement.childNodes[1].childNodes[3].childNodes).map(v=>v.nodeName));
    // console.log(Object.keys(doc.documentElement.childNodes[1].childNodes[3]));
} catch (e) {
    console.error(e);
}
