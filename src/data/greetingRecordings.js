const commonsAudioUrl = (fileName) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${fileName}`;

const commonsSourceUrl = (fileName) =>
  `https://commons.wikimedia.org/wiki/File:${fileName}`;

const clip = (fileName, credit) => ({
  credit,
  sourceUrl: commonsSourceUrl(fileName),
  src: commonsAudioUrl(fileName)
});

const recording = (...clips) => ({ clips });

const bonjour = clip('Fr-bonjour.ogg', 'Vion Nicolas / The Shtooka Project, CC BY 2.0 FR');
const englishHello = clip('En-us-hello.ogg', 'Dvortygirl, public domain');
const dutchHallo = clip('Nl-hallo.ogg', 'GerardM, CC BY-SA 3.0 / GFDL');
const germanHallo = clip('De-hallo.ogg', 'Jeuwre, CC BY-SA 4.0');
const koreanAnnyeonghaseyo = clip('%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94.ogg', 'HappyMidnight, CC BY-SA 4.0');
const portugueseOla = clip('Pt-ol%C3%A1.oga', 'Memie, CC BY-SA 3.0');
const spanishHola = clip('Es-hola.oga', 'Josemoya, CC BY-SA 3.0 / GFDL');
const hebrewShalom = clip('He-Shalom.ogg', 'Nadavspi~commonswiki, CC BY-SA 3.0');
const mandarinNihao = clip('Zh%20n%C7%90%20h%C7%8Eo.ogg', 'Sjors Provoost, CC BY-SA 3.0');
const greekYassas = clip('EL-%CE%B3%CE%B5%CE%B9%CE%B1-%CF%83%CE%B1%CF%82.ogg', 'Sarri.greek, CC BY-SA 4.0');

export const greetingRecordings = {
  france: recording(bonjour),
  germany: recording(germanHallo),
  italy: recording(clip('It-ciao.ogg', 'Fibonacci, CC BY-SA 3.0')),
  japan: recording(clip('Ja-konnichiwa.ogg', 'Spesco, CC BY-SA 4.0')),
  ukraine: recording(clip('Uk-%D0%BF%D1%80%D0%B8%D0%B2%D1%96%D1%82.ogg', 'Halya Raptova and Nicolas Vion / The Shtooka Project, CC BY 3.0 US')),
  poland: recording(clip('Pl-cze%C5%9B%C4%87.ogg', 'Tomasz "odder" Kozlowski, CC BY-SA 2.5')),
  nigeria: recording(clip('Sannu.ogg', 'Muhammadu5060, CC0')),
  mexico: recording(spanishHola),
  brazil: recording(portugueseOla),
  'united-states': recording(englishHello),
  spain: recording(spanishHola),
  canada: recording(englishHello, bonjour),
  argentina: recording(spanishHola),
  greece: recording(greekYassas),
  sweden: recording(clip('Sv-hej.ogg', 'M. Kihlstedt and N. Vion / The Shtooka Project, CC BY 2.0 FR')),
  turkey: recording(clip('Merhaba.ogg', 'Erkan Yilmaz, GFDL')),
  hungary: recording(clip('Hu-szia.ogg', 'Panda10, CC BY-SA 3.0')),
  denmark: recording(clip('Da-hej.ogg', 'Thrane, CC BY-SA 3.0 / GFDL')),
  'north-korea': recording(koreanAnnyeonghaseyo),
  australia: recording(clip('En-au-hello.ogg', 'Commander Keane, CC BY-SA 4.0')),
  russia: recording(clip('Ru-%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82.ogg', 'The Shtooka Project, CC BY 2.0 FR')),
  suriname: recording(dutchHallo),
  bahamas: recording(englishHello),
  netherlands: recording(dutchHallo),
  belgium: recording(dutchHallo, bonjour),
  portugal: recording(portugueseOla),
  'south-korea': recording(koreanAnnyeonghaseyo),
  'united-kingdom': recording(englishHello),
  china: recording(mandarinNihao),
  colombia: recording(spanishHola),
  peru: recording(spanishHola),
  'costa-rica': recording(spanishHola),
  chile: recording(spanishHola),
  cuba: recording(spanishHola),
  venezuela: recording(spanishHola),
  israel: recording(hebrewShalom),
  singapore: recording(englishHello),
  england: recording(englishHello),
  bolivia: recording(spanishHola),
  cameroon: recording(bonjour, englishHello),
  'trinidad-and-tobago': recording(englishHello),
  cyprus: recording(greekYassas),
  'cape-verde': recording(portugueseOla),
  mozambique: recording(portugueseOla)
};
