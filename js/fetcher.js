import http from "http";
import fs from "fs";
import path from "path";
import { URL, fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/i1.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/i2.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/i3.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/i4.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/i5.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/i6.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/1address.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/1comment.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/1mail.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/1people.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/1phone.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/1time.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/facebook.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/google.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/instagram.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/ok.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/skype.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/telegram.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/twitter.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/vk.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/yahoo.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/youtube.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrdownw.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrleftw.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrrightw.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrupw.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/crossw.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/header.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/p1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/p2.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/p3.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/address.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/mail.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/phone.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/addressw.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/mailw.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/phonew.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/e1.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/burger_1.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/cross.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrdown.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrleft_3.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrright.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/arrup.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/whatsapp_1.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/time.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/timew.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54797422_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54827406_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54859732_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54859739_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54860057_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54860331_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54860339_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54861201_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54861206_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54861208_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54875786_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54877993_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54887339_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/log1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/log4.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/log5.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/log6.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/log7.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/logo2.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/logo3.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/logo1.png",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54860333_22_3.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/c2.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/c4.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/s1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/s5.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/s3.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/present.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/inf_1.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/contacts_2.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/calculator.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/proj1_1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/proj2_1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54583275_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54584420_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54677914_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54744628_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54827560_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/burgerw_1.svg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54659315_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54894025_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54894579_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54894580_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54894581_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54894889_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54894985_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54895308_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54896091_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54911118_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54998145_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55004154_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55036852_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55040098_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55040119_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55040199_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55044897_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55045001_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55045004_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54718934_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54913770_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55037501_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54914121_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55057205_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55057267_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54305725_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54602095_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54877471_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54500792_22_1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55045011_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54645945_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55058086_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/rewiev_01.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/rewiev_02.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/rewiev_03.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo2.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo3.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo4.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo5.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo6.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo2_1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54603482_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54633881_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54694652_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/54721359_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/55059851_22.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/peo4_1.jpg",
  "http:\/\/mos-prosuburban.21.oml.ru\/d\/2821991\/d\/logo.png"
];

files.forEach((fileUrl) => {
  const parsedUrl = new URL(fileUrl);
  const filePath = '.' + parsedUrl.pathname;
  const filename = path.basename(fileUrl);
  const fileDir = filePath.replace(filename, '');

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true})
  }

  console.log(filePath);

  const file = fs.createWriteStream(filePath);
  const request = http.get(fileUrl, function(response) {
    response.pipe(file);
  });
});
