// Flag data is intentionally local and plain JavaScript.
// To add a flag:
// 1. Give it an id, name, difficulty, viewBox, palette, previewColors, and regions.
// 2. Each region is a clickable SVG shape: rect, circle, polygon, or path.
// 3. Put SVG-specific values inside attrs so the renderer can stay reusable.
// 4. Simplify detailed emblems into clean, tappable placeholder regions for young players.

const COLORS = {
  black: '#111111',
  blue: '#1f5fbf',
  argentinaBlue: '#75aadb',
  australiaNavy: '#012169',
  bahamasAqua: '#00abc9',
  brazilBlue: '#254aa5',
  brown: '#8b5a2b',
  darkGreen: '#0b6e3f',
  ethiopiaBlue: '#0f47af',
  green: '#168a4a',
  latviaRed: '#9e1b32',
  orange: '#f28c28',
  red: '#d62828',
  surinameGreen: '#377e3f',
  surinameRed: '#b40a2d',
  saffron: '#ff9933',
  swedenBlue: '#006aa7',
  skyBlue: '#3da5ff',
  white: '#ffffff',
  yellow: '#f5c542'
};

const color = (name) => ({ name, hex: COLORS[name] });

const starPoints = (cx, cy, outer, inner, points = 5) => {
  const step = Math.PI / points;
  const start = -Math.PI / 2;

  return Array.from({ length: points * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = start + index * step;
    return `${(cx + Math.cos(angle) * radius).toFixed(1)},${(cy + Math.sin(angle) * radius).toFixed(1)}`;
  }).join(' ');
};

const starPath = (cx, cy, outer, inner, points = 5) => `M ${starPoints(cx, cy, outer, inner, points)} Z`;

const usStarPath = () => {
  const stars = [];
  const rowGap = 9.6;
  const colGap = 10.6;

  for (let row = 0; row < 9; row += 1) {
    const starsInRow = row % 2 === 0 ? 6 : 5;
    const startX = row % 2 === 0 ? 13 : 18.3;
    const y = 10 + row * rowGap;

    for (let column = 0; column < starsInRow; column += 1) {
      stars.push(starPath(startX + column * colGap, y, 3.1, 1.3));
    }
  }

  return stars.join(' ');
};

const region = ({
  id,
  label,
  type,
  attrs,
  correctColor,
  stroke = COLORS.black,
  strokeWidth = 4,
  hint
}) => ({
  id,
  label,
  type,
  attrs,
  correctColor,
  stroke,
  strokeWidth,
  hint
});

const commonPalette = [
  color('blue'),
  color('white'),
  color('red'),
  color('black'),
  color('yellow'),
  color('green'),
  color('orange'),
  color('brown'),
  color('saffron'),
  color('argentinaBlue'),
  color('swedenBlue'),
  color('skyBlue')
];

const flagBase = {
  viewBox: '0 0 300 200'
};

export const flags = [
  {
    ...flagBase,
    id: 'france',
    name: 'France',
    difficulty: 'easy',
    mapPosition: { x: 49, y: 36 },
    palette: [color('blue'), color('white'), color('red')],
    previewColors: [COLORS.blue, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'blue-stripe', label: 'Left stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.blue, hint: 'The blue stripe is next to the flagpole.' }),
      region({ id: 'white-stripe', label: 'Middle stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.white, hint: 'The middle stripe stays white.' }),
      region({ id: 'red-stripe', label: 'Right stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'The red stripe goes on the free end.' })
    ]
  },
  {
    ...flagBase,
    id: 'germany',
    name: 'Germany',
    difficulty: 'easy',
    mapPosition: { x: 51, y: 34 },
    palette: [color('black'), color('red'), color('yellow'), color('white')],
    previewColors: [COLORS.black, COLORS.red, COLORS.yellow],
    regions: [
      region({ id: 'black-stripe', label: 'Top stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.black, hint: 'Black is on top.' }),
      region({ id: 'red-stripe', label: 'Middle stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.red, hint: 'Red is in the middle.' }),
      region({ id: 'yellow-stripe', label: 'Bottom stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.yellow, hint: 'Yellow is on the bottom.' })
    ]
  },
  {
    ...flagBase,
    id: 'italy',
    name: 'Italy',
    difficulty: 'easy',
    mapPosition: { x: 52, y: 39 },
    palette: [color('green'), color('white'), color('red')],
    previewColors: [COLORS.green, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'green-stripe', label: 'Left stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.green, hint: 'Green goes on the flagpole side.' }),
      region({ id: 'white-stripe', label: 'Middle stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.white, hint: 'White stays in the center.' }),
      region({ id: 'red-stripe', label: 'Right stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'Red goes on the right.' })
    ]
  },
  {
    ...flagBase,
    id: 'japan',
    name: 'Japan',
    difficulty: 'easy',
    mapPosition: { x: 84, y: 40 },
    palette: [color('white'), color('red')],
    previewColors: [COLORS.white, COLORS.red],
    regions: [
      region({ id: 'white-field', label: 'Background', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.white, hint: 'The background is white.' }),
      region({ id: 'red-circle', label: 'Center circle', type: 'circle', attrs: { cx: 150, cy: 100, r: 48 }, correctColor: COLORS.red, hint: 'The sun circle is red.' })
    ]
  },
  {
    ...flagBase,
    id: 'bangladesh',
    name: 'Bangladesh',
    difficulty: 'easy',
    mapPosition: { x: 72, y: 48 },
    palette: [color('green'), color('red'), color('white')],
    previewColors: [COLORS.green, COLORS.red],
    regions: [
      region({ id: 'green-field', label: 'Background', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.green, hint: 'The background is green.' }),
      region({ id: 'red-circle', label: 'Circle', type: 'circle', attrs: { cx: 135, cy: 100, r: 50 }, correctColor: COLORS.red, hint: 'The circle is red and slightly left of center.' })
    ]
  },
  {
    ...flagBase,
    id: 'ukraine',
    name: 'Ukraine',
    difficulty: 'easy',
    mapPosition: { x: 56, y: 34 },
    palette: [color('blue'), color('yellow'), color('white')],
    previewColors: [COLORS.blue, COLORS.yellow],
    regions: [
      region({ id: 'blue-stripe', label: 'Top stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.blue, hint: 'Blue is on top.' }),
      region({ id: 'yellow-stripe', label: 'Bottom stripe', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.yellow, hint: 'Yellow is on the bottom.' })
    ]
  },
  {
    ...flagBase,
    id: 'poland',
    name: 'Poland',
    difficulty: 'easy',
    mapPosition: { x: 53, y: 33 },
    palette: [color('white'), color('red')],
    previewColors: [COLORS.white, COLORS.red],
    regions: [
      region({ id: 'white-stripe', label: 'Top stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.white, hint: 'White is on top.' }),
      region({ id: 'red-stripe', label: 'Bottom stripe', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.red, hint: 'Red is on the bottom.' })
    ]
  },
  {
    ...flagBase,
    id: 'nigeria',
    name: 'Nigeria',
    difficulty: 'easy',
    mapPosition: { x: 49, y: 57 },
    palette: [color('green'), color('white')],
    previewColors: [COLORS.green, COLORS.white, COLORS.green],
    regions: [
      region({ id: 'left-green-stripe', label: 'Left stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.green, hint: 'Green is on the left.' }),
      region({ id: 'white-stripe', label: 'Middle stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.white, hint: 'White is in the middle.' }),
      region({ id: 'right-green-stripe', label: 'Right stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.green, hint: 'Green is also on the right.' })
    ]
  },
  {
    ...flagBase,
    id: 'ghana',
    name: 'Ghana',
    difficulty: 'medium',
    mapPosition: { x: 46, y: 58 },
    palette: [color('red'), color('yellow'), color('green'), color('black'), color('white')],
    previewColors: [COLORS.red, COLORS.yellow, COLORS.green],
    regions: [
      region({ id: 'red-stripe', label: 'Top stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.red, hint: 'Red is the top stripe.' }),
      region({ id: 'yellow-stripe', label: 'Middle stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.yellow, hint: 'Yellow is the middle stripe.' }),
      region({ id: 'green-stripe', label: 'Bottom stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.green, hint: 'Green is the bottom stripe.' }),
      region({ id: 'black-star', label: 'Center star', type: 'polygon', attrs: { points: starPoints(150, 100, 34, 14) }, correctColor: COLORS.black, hint: 'The star in the center is black.' })
    ]
  },
  {
    ...flagBase,
    id: 'mexico',
    name: 'Mexico',
    difficulty: 'medium',
    mapPosition: { x: 21, y: 48 },
    palette: [color('green'), color('white'), color('red'), color('brown'), color('yellow'), color('black')],
    previewColors: [COLORS.green, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'green-stripe', label: 'Left stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.green, hint: 'Green is on the left.' }),
      region({ id: 'white-stripe', label: 'Middle stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.white, hint: 'White is in the middle.' }),
      region({ id: 'red-stripe', label: 'Right stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'Red is on the right.' }),
      region({ id: 'emblem-wreath', label: 'Green wreath', type: 'path', attrs: { d: 'M132 122 C121 108 124 87 139 77 C131 92 132 107 145 119 Z M168 122 C179 108 176 87 161 77 C169 92 168 107 155 119 Z' }, correctColor: COLORS.green, strokeWidth: 2, hint: 'The simple wreath around the emblem is green.' }),
      region({ id: 'emblem-eagle', label: 'Simple eagle', type: 'path', attrs: { d: 'M150 73 C164 77 172 89 168 102 C161 96 154 94 148 101 C143 107 137 111 128 111 C133 102 135 91 142 84 C145 80 147 76 150 73 Z' }, correctColor: COLORS.brown, strokeWidth: 2.5, hint: 'Use brown for the simplified eagle shape.' }),
      region({ id: 'emblem-base', label: 'Emblem base', type: 'path', attrs: { d: 'M130 126 C142 136 158 136 170 126 L166 135 C156 144 144 144 134 135 Z' }, correctColor: COLORS.red, strokeWidth: 2, hint: 'The small base under the emblem is red.' })
    ]
  },
  {
    ...flagBase,
    id: 'south-africa',
    name: 'South Africa',
    difficulty: 'hard',
    mapPosition: { x: 53, y: 79 },
    palette: [color('green'), color('yellow'), color('black'), color('white'), color('red'), color('blue')],
    previewColors: [COLORS.red, COLORS.green, COLORS.blue],
    regions: [
      region({ id: 'top-red', label: 'Top red field', type: 'polygon', attrs: { points: '0,0 300,0 300,78 124,78 0,16' }, correctColor: COLORS.red, hint: 'Red fills the top outside area.' }),
      region({ id: 'bottom-blue', label: 'Bottom blue field', type: 'polygon', attrs: { points: '0,200 300,200 300,122 124,122 0,184' }, correctColor: COLORS.blue, hint: 'Blue fills the bottom outside area.' }),
      region({ id: 'white-top-band', label: 'Upper white border', type: 'polygon', attrs: { points: '0,16 124,78 300,78 300,98 120,98 0,38' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'A white border sits above the green Y.' }),
      region({ id: 'white-bottom-band', label: 'Lower white border', type: 'polygon', attrs: { points: '0,184 124,122 300,122 300,102 120,102 0,162' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'A white border sits below the green Y.' }),
      region({ id: 'green-y', label: 'Green Y shape', type: 'path', attrs: { d: 'M0 40 L116 98 L300 98 L300 122 L116 122 L0 180 L0 148 L82 110 L0 72 Z' }, correctColor: COLORS.green, hint: 'The big Y shape is green.' }),
      region({ id: 'yellow-band', label: 'Yellow triangle border', type: 'polygon', attrs: { points: '0,26 88,100 0,174 0,140 48,100 0,60' }, correctColor: COLORS.yellow, hint: 'Yellow wraps around the black triangle.' }),
      region({ id: 'black-triangle', label: 'Black triangle', type: 'polygon', attrs: { points: '0,48 62,100 0,152' }, correctColor: COLORS.black, hint: 'The triangle at the flagpole is black.' })
    ]
  },
  {
    ...flagBase,
    id: 'brazil',
    name: 'Brazil',
    difficulty: 'medium',
    mapPosition: { x: 35, y: 67 },
    palette: [color('green'), color('yellow'), { name: 'Brazil Blue', hex: COLORS.brazilBlue }, color('white')],
    previewColors: [COLORS.green, COLORS.yellow, COLORS.brazilBlue],
    regions: [
      region({ id: 'green-field', label: 'Background', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.green, hint: 'Brazil has a green background.' }),
      region({ id: 'yellow-diamond', label: 'Diamond', type: 'polygon', attrs: { points: '150,25 270,100 150,175 30,100' }, correctColor: COLORS.yellow, hint: 'The diamond is yellow.' }),
      region({ id: 'blue-circle', label: 'Blue globe', type: 'circle', attrs: { cx: 150, cy: 100, r: 46 }, correctColor: COLORS.brazilBlue, hint: 'The circle in the diamond is blue.' }),
      region({ id: 'white-band', label: 'Simplified white band', type: 'path', attrs: { d: 'M105 92 C132 82 171 84 197 104 L190 115 C164 96 133 96 110 106 Z' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The simple band across the circle is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'united-states',
    name: 'United States',
    difficulty: 'hard',
    mapPosition: { x: 20, y: 38 },
    palette: [color('red'), color('white'), color('blue')],
    previewColors: [COLORS.red, COLORS.white, COLORS.blue],
    regions: [
      ...Array.from({ length: 13 }, (_, index) =>
        region({
          id: `stripe-${index + 1}`,
          label: `${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} stripe`,
          type: 'rect',
          attrs: { x: 0, y: index * (200 / 13), width: 300, height: 200 / 13 },
          correctColor: index % 2 === 0 ? COLORS.red : COLORS.white,
          strokeWidth: 1.5,
          hint: 'United States stripes alternate red and white, starting with red.'
        })
      ),
      region({ id: 'blue-canton', label: 'Blue canton', type: 'rect', attrs: { x: 0, y: 0, width: 126, height: 108 }, correctColor: COLORS.blue, hint: 'The blue rectangle is in the upper-left corner.' }),
      region({ id: 'star-group', label: 'Fifty stars', type: 'path', attrs: { d: usStarPath() }, correctColor: COLORS.white, strokeWidth: 0.7, hint: 'All 50 stars are white.' })
    ]
  },
  {
    ...flagBase,
    id: 'kenya',
    name: 'Kenya',
    difficulty: 'medium',
    mapPosition: { x: 55, y: 62 },
    palette: [color('black'), color('white'), color('red'), color('green')],
    previewColors: [COLORS.black, COLORS.red, COLORS.green],
    regions: [
      region({ id: 'black-stripe', label: 'Top black stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 56 }, correctColor: COLORS.black, hint: 'Black is the top stripe.' }),
      region({ id: 'upper-white-border', label: 'Upper white border', type: 'rect', attrs: { x: 0, y: 56, width: 300, height: 12 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'A thin white border sits above the red stripe.' }),
      region({ id: 'red-stripe', label: 'Middle red stripe', type: 'rect', attrs: { x: 0, y: 68, width: 300, height: 64 }, correctColor: COLORS.red, hint: 'Red is in the center.' }),
      region({ id: 'lower-white-border', label: 'Lower white border', type: 'rect', attrs: { x: 0, y: 132, width: 300, height: 12 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'A thin white border sits below the red stripe.' }),
      region({ id: 'green-stripe', label: 'Bottom green stripe', type: 'rect', attrs: { x: 0, y: 144, width: 300, height: 56 }, correctColor: COLORS.green, hint: 'Green is the bottom stripe.' }),
      region({ id: 'left-spear', label: 'Left spear', type: 'polygon', attrs: { points: '123,46 129,43 173,154 167,157' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The crossed spears are white.' }),
      region({ id: 'right-spear', label: 'Right spear', type: 'polygon', attrs: { points: '171,43 177,46 133,157 127,154' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The crossed spears are white.' }),
      region({ id: 'shield', label: 'Shield body', type: 'path', attrs: { d: 'M150 54 C176 70 176 130 150 146 C124 130 124 70 150 54 Z' }, correctColor: COLORS.red, hint: 'The simplified shield body is red.' }),
      region({ id: 'shield-center', label: 'Shield center', type: 'path', attrs: { d: 'M150 60 C158 76 158 124 150 140 C142 124 142 76 150 60 Z' }, correctColor: COLORS.black, strokeWidth: 2, hint: 'The center of the shield is black.' }),
      region({ id: 'shield-dots', label: 'Shield marks', type: 'path', attrs: { d: 'M132 88 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M158 88 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M132 116 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M158 116 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The small shield marks are white.' })
    ]
  },
  {
    ...flagBase,
    id: 'spain',
    name: 'Spain',
    difficulty: 'medium',
    mapPosition: { x: 47, y: 40 },
    palette: [color('red'), color('yellow'), color('orange'), color('white'), color('blue')],
    previewColors: [COLORS.red, COLORS.yellow, COLORS.red],
    regions: [
      region({ id: 'top-red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 50 }, correctColor: COLORS.red, hint: 'Red is the top stripe.' }),
      region({ id: 'yellow-stripe', label: 'Wide yellow stripe', type: 'rect', attrs: { x: 0, y: 50, width: 300, height: 100 }, correctColor: COLORS.yellow, hint: 'Yellow is the wide center stripe.' }),
      region({ id: 'bottom-red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 150, width: 300, height: 50 }, correctColor: COLORS.red, hint: 'Red is also on the bottom.' }),
      region({ id: 'coat-shield', label: 'Coat of arms shield', type: 'path', attrs: { d: 'M80 78 H106 V108 C106 119 93 126 80 108 Z' }, correctColor: COLORS.red, strokeWidth: 3, hint: 'The simple shield in the coat of arms is red.' }),
      region({ id: 'coat-crown', label: 'Coat of arms crown', type: 'path', attrs: { d: 'M78 72 L84 60 L91 72 L98 60 L106 72 Z' }, correctColor: COLORS.orange, strokeWidth: 3, hint: 'The crown above the shield is orange.' }),
      region({ id: 'coat-panel', label: 'Small blue panel', type: 'rect', attrs: { x: 89, y: 86, width: 9, height: 18 }, correctColor: COLORS.blue, strokeWidth: 2, hint: 'The tiny center panel is blue.' })
    ]
  },
  {
    ...flagBase,
    id: 'canada',
    name: 'Canada',
    difficulty: 'medium',
    mapPosition: { x: 19, y: 28 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'left-red-bar', label: 'Left red bar', type: 'rect', attrs: { x: 0, y: 0, width: 75, height: 200 }, correctColor: COLORS.red, hint: 'Canada has a red bar on the left.' }),
      region({ id: 'white-field', label: 'White middle field', type: 'rect', attrs: { x: 75, y: 0, width: 150, height: 200 }, correctColor: COLORS.white, hint: 'The middle field stays white.' }),
      region({ id: 'right-red-bar', label: 'Right red bar', type: 'rect', attrs: { x: 225, y: 0, width: 75, height: 200 }, correctColor: COLORS.red, hint: 'Canada has a red bar on the right.' }),
      region({ id: 'maple-leaf', label: 'Maple leaf', type: 'polygon', attrs: { points: '150,38 160,70 184,56 176,86 203,94 174,108 190,134 160,129 150,166 140,129 110,134 126,108 97,94 124,86 116,56 140,70' }, correctColor: COLORS.red, strokeWidth: 3, hint: 'The maple leaf is red.' })
    ]
  },
  {
    ...flagBase,
    id: 'argentina',
    name: 'Argentina',
    difficulty: 'medium',
    mapPosition: { x: 32, y: 80 },
    palette: [{ name: 'Argentina Blue', hex: COLORS.argentinaBlue }, color('white'), color('yellow')],
    previewColors: [COLORS.argentinaBlue, COLORS.white, COLORS.argentinaBlue],
    regions: [
      region({ id: 'top-blue-stripe', label: 'Top blue stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.argentinaBlue, hint: 'Argentina has a light blue stripe on top.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is the middle stripe.' }),
      region({ id: 'bottom-blue-stripe', label: 'Bottom blue stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.argentinaBlue, hint: 'Argentina has a light blue stripe on the bottom.' }),
      region({ id: 'sun', label: 'Sun', type: 'circle', attrs: { cx: 150, cy: 100, r: 23 }, correctColor: COLORS.yellow, strokeWidth: 3, hint: 'The simplified sun in the center is yellow.' }),
      region({ id: 'sun-rays', label: 'Sun rays', type: 'polygon', attrs: { points: starPoints(150, 100, 36, 25, 12) }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'The sun rays are yellow too.' })
    ]
  },
  {
    ...flagBase,
    id: 'india',
    name: 'India',
    difficulty: 'medium',
    mapPosition: { x: 69, y: 50 },
    palette: [{ name: 'Saffron', hex: COLORS.saffron }, color('white'), color('green'), color('blue')],
    previewColors: [COLORS.saffron, COLORS.white, COLORS.green],
    regions: [
      region({ id: 'saffron-stripe', label: 'Top saffron stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.saffron, hint: 'Saffron orange is on top.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is in the middle.' }),
      region({ id: 'green-stripe', label: 'Bottom green stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.green, hint: 'Green is on the bottom.' }),
      region({ id: 'ashoka-wheel', label: 'Simplified Ashoka wheel', type: 'circle', attrs: { cx: 150, cy: 100, r: 25 }, correctColor: COLORS.blue, strokeWidth: 3, hint: 'The simplified wheel is blue.' }),
      region({ id: 'wheel-spokes', label: 'Wheel spokes', type: 'path', attrs: { d: 'M147 75 H153 V125 H147 Z M125 97 H175 V103 H125 Z M130 84 L134 80 L170 116 L166 120 Z M166 80 L170 84 L134 120 L130 116 Z' }, correctColor: COLORS.blue, strokeWidth: 1.5, hint: 'The wheel spokes are blue.' })
    ]
  },
  {
    ...flagBase,
    id: 'greece',
    name: 'Greece',
    difficulty: 'medium',
    mapPosition: { x: 54, y: 42 },
    palette: [color('blue'), color('white')],
    previewColors: [COLORS.blue, COLORS.white, COLORS.blue],
    regions: [
      ...Array.from({ length: 9 }, (_, index) =>
        region({
          id: `stripe-${index + 1}`,
          label: `${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} stripe`,
          type: 'rect',
          attrs: { x: 0, y: index * (200 / 9), width: 300, height: 200 / 9 },
          correctColor: index % 2 === 0 ? COLORS.blue : COLORS.white,
          strokeWidth: 1.5,
          hint: 'Greece has blue and white stripes, starting with blue.'
        })
      ),
      region({ id: 'blue-canton', label: 'Blue canton', type: 'rect', attrs: { x: 0, y: 0, width: 112, height: 112 }, correctColor: COLORS.blue, strokeWidth: 2, hint: 'The square in the upper-left is blue.' }),
      region({ id: 'cross-vertical', label: 'Vertical white cross bar', type: 'rect', attrs: { x: 44, y: 0, width: 24, height: 112 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The cross bars are white.' }),
      region({ id: 'cross-horizontal', label: 'Horizontal white cross bar', type: 'rect', attrs: { x: 0, y: 44, width: 112, height: 24 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The cross bars are white.' })
    ]
  },
  {
    ...flagBase,
    id: 'sweden',
    name: 'Sweden',
    difficulty: 'easy',
    mapPosition: { x: 52, y: 25 },
    palette: [{ name: 'Sweden Blue', hex: COLORS.swedenBlue }, color('yellow')],
    previewColors: [COLORS.swedenBlue, COLORS.yellow, COLORS.swedenBlue],
    regions: [
      region({ id: 'blue-field', label: 'Blue field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.swedenBlue, hint: 'Sweden has a blue field.' }),
      region({ id: 'vertical-yellow-cross', label: 'Vertical yellow cross bar', type: 'rect', attrs: { x: 88, y: 0, width: 34, height: 200 }, correctColor: COLORS.yellow, hint: 'The cross is yellow.' }),
      region({ id: 'horizontal-yellow-cross', label: 'Horizontal yellow cross bar', type: 'rect', attrs: { x: 0, y: 83, width: 300, height: 34 }, correctColor: COLORS.yellow, hint: 'The cross is yellow.' })
    ]
  },
  {
    ...flagBase,
    id: 'switzerland',
    name: 'Switzerland',
    difficulty: 'easy',
    mapPosition: { x: 50, y: 37 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.red, hint: 'Switzerland has a red field.' }),
      region({ id: 'vertical-white-cross', label: 'Vertical white cross bar', type: 'rect', attrs: { x: 132, y: 45, width: 36, height: 110 }, correctColor: COLORS.white, hint: 'The Swiss cross is white.' }),
      region({ id: 'horizontal-white-cross', label: 'Horizontal white cross bar', type: 'rect', attrs: { x: 95, y: 82, width: 110, height: 36 }, correctColor: COLORS.white, hint: 'The Swiss cross is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'turkey',
    name: 'Turkey',
    difficulty: 'medium',
    mapPosition: { x: 57, y: 42 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white],
    regions: [
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.red, hint: 'Turkey has a red background.' }),
      region({ id: 'crescent-outer', label: 'Outer crescent circle', type: 'circle', attrs: { cx: 120, cy: 100, r: 50 }, correctColor: COLORS.white, hint: 'The outer part of the crescent is white.' }),
      region({ id: 'crescent-cutout', label: 'Crescent red cutout', type: 'circle', attrs: { cx: 137, cy: 100, r: 40 }, correctColor: COLORS.red, hint: 'The cutout that shapes the crescent is red.' }),
      region({ id: 'white-star', label: 'White star', type: 'polygon', attrs: { points: starPoints(190, 100, 27, 11) }, correctColor: COLORS.white, hint: 'The star is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'croatia',
    name: 'Croatia',
    difficulty: 'medium',
    mapPosition: { x: 53, y: 39 },
    palette: [color('red'), color('white'), color('blue')],
    previewColors: [COLORS.red, COLORS.white, COLORS.blue],
    regions: [
      region({ id: 'red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.red, hint: 'Croatia has red on the top stripe.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is the middle stripe.' }),
      region({ id: 'blue-stripe', label: 'Bottom blue stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.blue, hint: 'Blue is the bottom stripe.' }),
      region({ id: 'shield-red-squares', label: 'Red checker shield squares', type: 'path', attrs: { d: 'M124 76 H142 V94 H124 Z M160 76 H178 V94 H160 Z M142 94 H160 V112 H142 Z M124 112 H142 V130 H124 Z M160 112 H178 V130 H160 Z' }, correctColor: COLORS.red, strokeWidth: 2, hint: 'The checker shield has red squares.' }),
      region({ id: 'shield-white-squares', label: 'White checker shield squares', type: 'path', attrs: { d: 'M142 76 H160 V94 H142 Z M124 94 H142 V112 H124 Z M160 94 H178 V112 H160 Z M142 112 H160 V130 H142 Z' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The checker shield also has white squares.' })
    ]
  },
  {
    ...flagBase,
    id: 'hungary',
    name: 'Hungary',
    difficulty: 'easy',
    mapPosition: { x: 53, y: 37 },
    palette: [color('red'), color('white'), color('green')],
    previewColors: [COLORS.red, COLORS.white, COLORS.green],
    regions: [
      region({ id: 'red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.red, hint: 'Red is the top stripe.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is the middle stripe.' }),
      region({ id: 'green-stripe', label: 'Bottom green stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.green, hint: 'Green is the bottom stripe.' })
    ]
  },
  {
    ...flagBase,
    id: 'latvia',
    name: 'Latvia',
    difficulty: 'easy',
    mapPosition: { x: 55, y: 30 },
    palette: [{ name: 'Dark Red', hex: COLORS.latviaRed }, color('white')],
    previewColors: [COLORS.latviaRed, COLORS.white, COLORS.latviaRed],
    regions: [
      region({ id: 'top-red-stripe', label: 'Top dark red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 80 }, correctColor: COLORS.latviaRed, hint: 'Latvia uses a dark red stripe on top.' }),
      region({ id: 'white-stripe', label: 'Thin white middle stripe', type: 'rect', attrs: { x: 0, y: 80, width: 300, height: 40 }, correctColor: COLORS.white, hint: 'The middle stripe is white.' }),
      region({ id: 'bottom-red-stripe', label: 'Bottom dark red stripe', type: 'rect', attrs: { x: 0, y: 120, width: 300, height: 80 }, correctColor: COLORS.latviaRed, hint: 'Latvia uses a dark red stripe on the bottom.' })
    ]
  },
  {
    ...flagBase,
    id: 'lithuania',
    name: 'Lithuania',
    difficulty: 'easy',
    mapPosition: { x: 55, y: 32 },
    palette: [color('yellow'), color('green'), color('red')],
    previewColors: [COLORS.yellow, COLORS.green, COLORS.red],
    regions: [
      region({ id: 'yellow-stripe', label: 'Top yellow stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.yellow, hint: 'Yellow is the top stripe.' }),
      region({ id: 'green-stripe', label: 'Middle green stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.green, hint: 'Green is the middle stripe.' }),
      region({ id: 'red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.red, hint: 'Red is the bottom stripe.' })
    ]
  },
  {
    ...flagBase,
    id: 'denmark',
    name: 'Denmark',
    difficulty: 'easy',
    mapPosition: { x: 51, y: 30 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.red, hint: 'Denmark has a red field.' }),
      region({ id: 'vertical-white-cross', label: 'Vertical white cross bar', type: 'rect', attrs: { x: 88, y: 0, width: 34, height: 200 }, correctColor: COLORS.white, hint: 'The Nordic cross is white.' }),
      region({ id: 'horizontal-white-cross', label: 'Horizontal white cross bar', type: 'rect', attrs: { x: 0, y: 82, width: 300, height: 34 }, correctColor: COLORS.white, hint: 'The Nordic cross is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'greenland',
    name: 'Greenland',
    difficulty: 'medium',
    mapPosition: { x: 36, y: 12 },
    palette: [color('white'), color('red')],
    previewColors: [COLORS.white, COLORS.red],
    regions: [
      region({ id: 'white-top', label: 'Top white field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.white, hint: 'Greenland has white on the top half.' }),
      region({ id: 'red-bottom', label: 'Bottom red field', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.red, hint: 'Greenland has red on the bottom half.' }),
      region({ id: 'red-half-circle', label: 'Upper half of the disc', type: 'path', attrs: { d: 'M77 100 A44 44 0 0 1 165 100 Z' }, correctColor: COLORS.red, hint: 'The top half of the circle is red.' }),
      region({ id: 'white-half-circle', label: 'Lower half of the disc', type: 'path', attrs: { d: 'M77 100 A44 44 0 0 0 165 100 Z' }, correctColor: COLORS.white, hint: 'The bottom half of the circle is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'north-korea',
    name: 'North Korea',
    difficulty: 'medium',
    mapPosition: { x: 79, y: 38 },
    palette: [color('blue'), color('white'), color('red')],
    previewColors: [COLORS.blue, COLORS.red, COLORS.blue],
    regions: [
      region({ id: 'top-blue-stripe', label: 'Top blue stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 38 }, correctColor: COLORS.blue, hint: 'Blue is on the top edge.' }),
      region({ id: 'upper-white-stripe', label: 'Upper white stripe', type: 'rect', attrs: { x: 0, y: 38, width: 300, height: 14 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'Thin white stripes border the red center.' }),
      region({ id: 'red-stripe', label: 'Wide red middle stripe', type: 'rect', attrs: { x: 0, y: 52, width: 300, height: 96 }, correctColor: COLORS.red, hint: 'The wide center stripe is red.' }),
      region({ id: 'lower-white-stripe', label: 'Lower white stripe', type: 'rect', attrs: { x: 0, y: 148, width: 300, height: 14 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'Thin white stripes border the red center.' }),
      region({ id: 'bottom-blue-stripe', label: 'Bottom blue stripe', type: 'rect', attrs: { x: 0, y: 162, width: 300, height: 38 }, correctColor: COLORS.blue, hint: 'Blue is on the bottom edge.' }),
      region({ id: 'white-disc', label: 'White disc', type: 'circle', attrs: { cx: 88, cy: 100, r: 36 }, correctColor: COLORS.white, hint: 'The circle near the flagpole is white.' }),
      region({ id: 'red-star', label: 'Red star', type: 'polygon', attrs: { points: starPoints(88, 100, 27, 11) }, correctColor: COLORS.red, strokeWidth: 2, hint: 'The star inside the circle is red.' })
    ]
  },
  {
    ...flagBase,
    id: 'australia',
    name: 'Australia',
    difficulty: 'hard',
    mapPosition: { x: 87, y: 79 },
    palette: [{ name: 'Navy', hex: COLORS.australiaNavy }, color('white'), color('red')],
    previewColors: [COLORS.australiaNavy, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'navy-field', label: 'Navy field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.australiaNavy, hint: 'Australia has a dark blue background.' }),
      region({ id: 'union-white-diagonal-a', label: 'White diagonal cross band', type: 'polygon', attrs: { points: '0,0 20,0 150,82 150,100 130,100 0,18' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad diagonal bands in the Union Jack are white.' }),
      region({ id: 'union-white-diagonal-b', label: 'Other white diagonal cross band', type: 'polygon', attrs: { points: '130,0 150,0 150,18 20,100 0,100 0,82' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad diagonal bands in the Union Jack are white.' }),
      region({ id: 'union-red-diagonal-a', label: 'Red diagonal cross band', type: 'polygon', attrs: { points: '0,0 10,0 150,88 150,100 140,100 0,12' }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The thin diagonal bands in the Union Jack are red.' }),
      region({ id: 'union-red-diagonal-b', label: 'Other red diagonal cross band', type: 'polygon', attrs: { points: '140,0 150,0 150,12 10,100 0,100 0,88' }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The thin diagonal bands in the Union Jack are red.' }),
      region({ id: 'union-white-horizontal', label: 'White horizontal cross bar', type: 'rect', attrs: { x: 0, y: 40, width: 150, height: 20 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad cross in the Union Jack is white.' }),
      region({ id: 'union-white-vertical', label: 'White vertical cross bar', type: 'rect', attrs: { x: 65, y: 0, width: 20, height: 100 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad cross in the Union Jack is white.' }),
      region({ id: 'union-red-horizontal', label: 'Red horizontal cross bar', type: 'rect', attrs: { x: 0, y: 45, width: 150, height: 10 }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The narrow cross in the Union Jack is red.' }),
      region({ id: 'union-red-vertical', label: 'Red vertical cross bar', type: 'rect', attrs: { x: 70, y: 0, width: 10, height: 100 }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The narrow cross in the Union Jack is red.' }),
      region({ id: 'commonwealth-star', label: 'Commonwealth star', type: 'polygon', attrs: { points: starPoints(75, 146, 22, 9, 7) }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The large star under the Union Jack is white.' }),
      region({ id: 'southern-cross-stars', label: 'Southern Cross stars', type: 'path', attrs: { d: `${starPath(218, 48, 13, 5, 7)} ${starPath(246, 78, 11, 4.5, 7)} ${starPath(213, 126, 12, 5, 7)} ${starPath(177, 95, 11, 4.5, 7)} ${starPath(252, 132, 8, 3.5, 5)}` }, correctColor: COLORS.white, strokeWidth: 1.5, hint: 'The Southern Cross stars are white.' })
    ]
  },
  {
    ...flagBase,
    id: 'russia',
    name: 'Russia',
    difficulty: 'easy',
    mapPosition: { x: 66, y: 25 },
    palette: [color('white'), color('blue'), color('red')],
    previewColors: [COLORS.white, COLORS.blue, COLORS.red],
    regions: [
      region({ id: 'white-stripe', label: 'Top stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is on top.' }),
      region({ id: 'blue-stripe', label: 'Middle stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.blue, hint: 'Blue is in the middle.' }),
      region({ id: 'red-stripe', label: 'Bottom stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.red, hint: 'Red is on the bottom.' })
    ]
  },
  {
    ...flagBase,
    id: 'ethiopia',
    name: 'Ethiopia',
    difficulty: 'medium',
    mapPosition: { x: 57, y: 60 },
    palette: [color('green'), color('yellow'), color('red'), { name: 'Blue', hex: COLORS.ethiopiaBlue }],
    previewColors: [COLORS.green, COLORS.yellow, COLORS.red],
    regions: [
      region({ id: 'green-stripe', label: 'Top green stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.green, hint: 'Green is the top stripe.' }),
      region({ id: 'yellow-stripe', label: 'Middle yellow stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.yellow, hint: 'Yellow is the middle stripe.' }),
      region({ id: 'red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.red, hint: 'Red is on the bottom.' }),
      region({ id: 'blue-disc', label: 'Blue emblem disc', type: 'circle', attrs: { cx: 150, cy: 100, r: 42 }, correctColor: COLORS.ethiopiaBlue, hint: 'The center emblem sits on a blue circle.' }),
      region({ id: 'yellow-star', label: 'Yellow emblem star', type: 'polygon', attrs: { points: starPoints(150, 100, 28, 11) }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'The star in the emblem is yellow.' })
    ]
  },
  {
    ...flagBase,
    id: 'suriname',
    name: 'Suriname',
    difficulty: 'medium',
    mapPosition: { x: 32, y: 62 },
    palette: [{ name: 'Green', hex: COLORS.surinameGreen }, color('white'), { name: 'Red', hex: COLORS.surinameRed }, color('yellow')],
    previewColors: [COLORS.surinameGreen, COLORS.white, COLORS.surinameRed],
    regions: [
      region({ id: 'top-green-stripe', label: 'Top green stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 40 }, correctColor: COLORS.surinameGreen, hint: 'Suriname has green stripes at the top and bottom.' }),
      region({ id: 'upper-white-stripe', label: 'Upper white stripe', type: 'rect', attrs: { x: 0, y: 40, width: 300, height: 20 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'A thin white stripe borders the red center.' }),
      region({ id: 'red-stripe', label: 'Wide red middle stripe', type: 'rect', attrs: { x: 0, y: 60, width: 300, height: 80 }, correctColor: COLORS.surinameRed, hint: 'The wide center stripe is red.' }),
      region({ id: 'lower-white-stripe', label: 'Lower white stripe', type: 'rect', attrs: { x: 0, y: 140, width: 300, height: 20 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'A thin white stripe borders the red center.' }),
      region({ id: 'bottom-green-stripe', label: 'Bottom green stripe', type: 'rect', attrs: { x: 0, y: 160, width: 300, height: 40 }, correctColor: COLORS.surinameGreen, hint: 'Suriname has green stripes at the top and bottom.' }),
      region({ id: 'yellow-star', label: 'Center star', type: 'polygon', attrs: { points: starPoints(150, 100, 34, 14) }, correctColor: COLORS.yellow, hint: 'The center star is yellow.' })
    ]
  },
  {
    ...flagBase,
    id: 'bahamas',
    name: 'Bahamas',
    difficulty: 'medium',
    mapPosition: { x: 26, y: 43 },
    palette: [{ name: 'Aqua', hex: COLORS.bahamasAqua }, color('yellow'), color('black')],
    previewColors: [COLORS.bahamasAqua, COLORS.yellow, COLORS.bahamasAqua],
    regions: [
      region({ id: 'top-aqua-stripe', label: 'Top aqua stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.bahamasAqua, hint: 'Aqua blue is on the top stripe.' }),
      region({ id: 'yellow-stripe', label: 'Middle yellow stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.yellow, hint: 'Yellow is the center stripe.' }),
      region({ id: 'bottom-aqua-stripe', label: 'Bottom aqua stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.bahamasAqua, hint: 'Aqua blue is on the bottom stripe.' }),
      region({ id: 'black-triangle', label: 'Black triangle', type: 'polygon', attrs: { points: '0,0 128,100 0,200' }, correctColor: COLORS.black, hint: 'The triangle on the flagpole side is black.' })
    ]
  },
  {
    ...flagBase,
    id: 'jamaica',
    name: 'Jamaica',
    difficulty: 'hard',
    mapPosition: { x: 28, y: 52 },
    palette: [color('green'), color('yellow'), color('black')],
    previewColors: [COLORS.green, COLORS.yellow, COLORS.black],
    regions: [
      region({ id: 'top-green-triangle', label: 'Top green triangle', type: 'polygon', attrs: { points: '0,0 300,0 150,82' }, correctColor: COLORS.green, hint: 'The top triangle is green.' }),
      region({ id: 'bottom-green-triangle', label: 'Bottom green triangle', type: 'polygon', attrs: { points: '0,200 300,200 150,118' }, correctColor: COLORS.green, hint: 'The bottom triangle is green.' }),
      region({ id: 'left-black-triangle', label: 'Left black triangle', type: 'polygon', attrs: { points: '0,18 126,100 0,182' }, correctColor: COLORS.black, hint: 'The left triangle is black.' }),
      region({ id: 'right-black-triangle', label: 'Right black triangle', type: 'polygon', attrs: { points: '300,18 174,100 300,182' }, correctColor: COLORS.black, hint: 'The right triangle is black.' }),
      region({ id: 'diagonal-yellow-a', label: 'Yellow diagonal band', type: 'polygon', attrs: { points: '0,0 24,0 300,176 300,200 276,200 0,24' }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'Jamaica has yellow diagonal bands.' }),
      region({ id: 'diagonal-yellow-b', label: 'Other yellow diagonal band', type: 'polygon', attrs: { points: '276,0 300,0 300,24 24,200 0,200 0,176' }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'Jamaica has yellow diagonal bands.' })
    ]
  },
  {
    ...flagBase,
    id: 'ireland',
    name: 'Ireland',
    difficulty: 'easy',
    mapPosition: { x: 46, y: 32 },
    palette: [color('green'), color('white'), color('orange')],
    previewColors: [COLORS.green, COLORS.white, COLORS.orange],
    regions: [
      region({ id: 'green-stripe', label: 'Green stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.green, hint: 'Green is on the flagpole side.' }),
      region({ id: 'white-stripe', label: 'White stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.white, hint: 'White stays in the middle.' }),
      region({ id: 'orange-stripe', label: 'Orange stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.orange, hint: 'Orange goes on the free end.' })
    ]
  },
  {
    ...flagBase,
    id: 'netherlands',
    name: 'Netherlands',
    difficulty: 'easy',
    mapPosition: { x: 49, y: 33 },
    palette: [color('red'), color('white'), color('blue')],
    previewColors: [COLORS.red, COLORS.white, COLORS.blue],
    regions: [
      region({ id: 'red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.red, hint: 'Red is the top stripe.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is the middle stripe.' }),
      region({ id: 'blue-stripe', label: 'Bottom blue stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.blue, hint: 'Blue is the bottom stripe.' })
    ]
  },
  {
    ...flagBase,
    id: 'belgium',
    name: 'Belgium',
    difficulty: 'easy',
    mapPosition: { x: 49, y: 35 },
    palette: [color('black'), color('yellow'), color('red')],
    previewColors: [COLORS.black, COLORS.yellow, COLORS.red],
    regions: [
      region({ id: 'black-stripe', label: 'Black stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.black, hint: 'Black is on the flagpole side.' }),
      region({ id: 'yellow-stripe', label: 'Yellow stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.yellow, hint: 'Yellow is in the middle.' }),
      region({ id: 'red-stripe', label: 'Red stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'Red is on the free end.' })
    ]
  },
  {
    ...flagBase,
    id: 'austria',
    name: 'Austria',
    difficulty: 'easy',
    mapPosition: { x: 52, y: 37 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'top-red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.red, hint: 'Austria has red on top.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is the middle stripe.' }),
      region({ id: 'bottom-red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.red, hint: 'Red is also on the bottom.' })
    ]
  },
  {
    ...flagBase,
    id: 'romania',
    name: 'Romania',
    difficulty: 'easy',
    mapPosition: { x: 55, y: 38 },
    palette: [color('blue'), color('yellow'), color('red')],
    previewColors: [COLORS.blue, COLORS.yellow, COLORS.red],
    regions: [
      region({ id: 'blue-stripe', label: 'Blue stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.blue, hint: 'Blue is on the flagpole side.' }),
      region({ id: 'yellow-stripe', label: 'Yellow stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.yellow, hint: 'Yellow is in the middle.' }),
      region({ id: 'red-stripe', label: 'Red stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'Red is on the free end.' })
    ]
  },
  {
    ...flagBase,
    id: 'indonesia',
    name: 'Indonesia',
    difficulty: 'easy',
    mapPosition: { x: 76, y: 65 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white],
    regions: [
      region({ id: 'red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.red, hint: 'Red is the top half.' }),
      region({ id: 'white-stripe', label: 'Bottom white stripe', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.white, hint: 'White is the bottom half.' })
    ]
  },
  {
    ...flagBase,
    id: 'vietnam',
    name: 'Vietnam',
    difficulty: 'easy',
    mapPosition: { x: 76, y: 55 },
    palette: [color('red'), color('yellow')],
    previewColors: [COLORS.red, COLORS.yellow],
    regions: [
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.red, hint: 'Vietnam has a red background.' }),
      region({ id: 'yellow-star', label: 'Yellow star', type: 'polygon', attrs: { points: starPoints(150, 100, 54, 22) }, correctColor: COLORS.yellow, hint: 'The large center star is yellow.' })
    ]
  },
  {
    ...flagBase,
    id: 'finland',
    name: 'Finland',
    difficulty: 'medium',
    mapPosition: { x: 55, y: 23 },
    palette: [color('white'), color('blue')],
    previewColors: [COLORS.white, COLORS.blue, COLORS.white],
    regions: [
      region({ id: 'white-field', label: 'White field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.white, hint: 'Finland has a white background.' }),
      region({ id: 'vertical-blue-cross', label: 'Vertical blue cross bar', type: 'rect', attrs: { x: 92, y: 0, width: 42, height: 200 }, correctColor: COLORS.blue, hint: 'The vertical part of the Nordic cross is blue.' }),
      region({ id: 'horizontal-blue-cross', label: 'Horizontal blue cross bar', type: 'rect', attrs: { x: 0, y: 78, width: 300, height: 42 }, correctColor: COLORS.blue, hint: 'The horizontal part of the Nordic cross is blue.' })
    ]
  },
  {
    ...flagBase,
    id: 'norway',
    name: 'Norway',
    difficulty: 'medium',
    mapPosition: { x: 50, y: 23 },
    palette: [color('red'), color('white'), color('blue')],
    previewColors: [COLORS.red, COLORS.white, COLORS.blue],
    regions: [
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.red, hint: 'Norway has a red background.' }),
      region({ id: 'vertical-white-cross', label: 'Vertical white border', type: 'rect', attrs: { x: 84, y: 0, width: 56, height: 200 }, correctColor: COLORS.white, hint: 'White borders the blue cross.' }),
      region({ id: 'horizontal-white-cross', label: 'Horizontal white border', type: 'rect', attrs: { x: 0, y: 72, width: 300, height: 56 }, correctColor: COLORS.white, hint: 'White borders the blue cross.' }),
      region({ id: 'vertical-blue-cross', label: 'Vertical blue cross bar', type: 'rect', attrs: { x: 98, y: 0, width: 28, height: 200 }, correctColor: COLORS.blue, hint: 'The inner cross is blue.' }),
      region({ id: 'horizontal-blue-cross', label: 'Horizontal blue cross bar', type: 'rect', attrs: { x: 0, y: 86, width: 300, height: 28 }, correctColor: COLORS.blue, hint: 'The inner cross is blue.' })
    ]
  },
  {
    ...flagBase,
    id: 'czechia',
    name: 'Czechia',
    difficulty: 'medium',
    mapPosition: { x: 52, y: 36 },
    palette: [color('white'), color('red'), color('blue')],
    previewColors: [COLORS.white, COLORS.red, COLORS.blue],
    regions: [
      region({ id: 'white-stripe', label: 'Top white stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.white, hint: 'White is on top.' }),
      region({ id: 'red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.red, hint: 'Red is on the bottom.' }),
      region({ id: 'blue-triangle', label: 'Blue triangle', type: 'polygon', attrs: { points: '0,0 140,100 0,200' }, correctColor: COLORS.blue, hint: 'The triangle on the flagpole side is blue.' })
    ]
  },
  {
    ...flagBase,
    id: 'portugal',
    name: 'Portugal',
    difficulty: 'medium',
    mapPosition: { x: 46, y: 41 },
    palette: [color('green'), color('red'), color('yellow'), color('blue'), color('white')],
    previewColors: [COLORS.green, COLORS.red, COLORS.yellow],
    regions: [
      region({ id: 'green-field', label: 'Green field', type: 'rect', attrs: { x: 0, y: 0, width: 120, height: 200 }, correctColor: COLORS.green, hint: 'Green is on the flagpole side.' }),
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 120, y: 0, width: 180, height: 200 }, correctColor: COLORS.red, hint: 'Red fills the larger right side.' }),
      region({ id: 'yellow-armillary', label: 'Yellow emblem circle', type: 'circle', attrs: { cx: 120, cy: 100, r: 42 }, correctColor: COLORS.yellow, hint: 'The simplified armillary sphere is yellow.' }),
      region({ id: 'white-shield', label: 'White shield', type: 'path', attrs: { d: 'M101 72 H139 V107 C139 124 120 136 101 107 Z' }, correctColor: COLORS.white, strokeWidth: 2.5, hint: 'The small shield is white.' }),
      region({ id: 'blue-shield-dots', label: 'Blue shield dots', type: 'path', attrs: { d: 'M113 88 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M113 104 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M113 120 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0' }, correctColor: COLORS.blue, strokeWidth: 1.8, hint: 'The simple shield marks are blue.' })
    ]
  },
  {
    ...flagBase,
    id: 'morocco',
    name: 'Morocco',
    difficulty: 'medium',
    mapPosition: { x: 47, y: 45 },
    palette: [color('red'), color('green')],
    previewColors: [COLORS.red, COLORS.green],
    regions: [
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.red, hint: 'Morocco has a red background.' }),
      region({ id: 'green-star', label: 'Green star', type: 'polygon', attrs: { points: starPoints(150, 100, 52, 21) }, correctColor: COLORS.green, hint: 'The center star is green.' })
    ]
  },
  {
    ...flagBase,
    id: 'egypt',
    name: 'Egypt',
    difficulty: 'medium',
    mapPosition: { x: 55, y: 49 },
    palette: [color('red'), color('white'), color('black'), color('yellow')],
    previewColors: [COLORS.red, COLORS.white, COLORS.black],
    regions: [
      region({ id: 'red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.red, hint: 'Red is the top stripe.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.white, hint: 'White is the middle stripe.' }),
      region({ id: 'black-stripe', label: 'Bottom black stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.black, hint: 'Black is the bottom stripe.' }),
      region({ id: 'gold-eagle', label: 'Gold eagle', type: 'path', attrs: { d: 'M150 76 C166 80 178 92 183 110 C170 104 161 104 154 113 L154 126 H146 V113 C139 104 130 104 117 110 C122 92 134 80 150 76 Z' }, correctColor: COLORS.yellow, strokeWidth: 2.5, hint: 'The simplified eagle in the center is gold.' })
    ]
  },
  {
    ...flagBase,
    id: 'south-korea',
    name: 'South Korea',
    difficulty: 'medium',
    mapPosition: { x: 80, y: 39 },
    palette: [color('white'), color('red'), color('blue'), color('black')],
    previewColors: [COLORS.white, COLORS.red, COLORS.blue],
    regions: [
      region({ id: 'white-field', label: 'White field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.white, hint: 'South Korea has a white background.' }),
      region({ id: 'red-half', label: 'Red upper circle half', type: 'path', attrs: { d: 'M110 100 A40 40 0 0 1 190 100 L110 100 Z' }, correctColor: COLORS.red, hint: 'The upper half of the center symbol is red.' }),
      region({ id: 'blue-half', label: 'Blue lower circle half', type: 'path', attrs: { d: 'M110 100 A40 40 0 0 0 190 100 L110 100 Z' }, correctColor: COLORS.blue, hint: 'The lower half of the center symbol is blue.' }),
      region({ id: 'black-trigrams', label: 'Black corner trigrams', type: 'path', attrs: { d: 'M58 44 H104 V52 H58 Z M58 60 H104 V68 H58 Z M58 76 H104 V84 H58 Z M196 44 H242 V52 H196 Z M196 60 H215 V68 H196 Z M223 60 H242 V68 H223 Z M196 76 H242 V84 H196 Z M58 116 H104 V124 H58 Z M58 132 H77 V140 H58 Z M85 132 H104 V140 H85 Z M58 148 H104 V156 H58 Z M196 116 H215 V124 H196 Z M223 116 H242 V124 H223 Z M196 132 H242 V140 H196 Z M196 148 H215 V156 H196 Z M223 148 H242 V156 H223 Z' }, correctColor: COLORS.black, strokeWidth: 1.5, hint: 'The corner trigram bars are black.' })
    ]
  },
  {
    ...flagBase,
    id: 'thailand',
    name: 'Thailand',
    difficulty: 'medium',
    mapPosition: { x: 75, y: 57 },
    palette: [color('red'), color('white'), color('blue')],
    previewColors: [COLORS.red, COLORS.white, COLORS.blue],
    regions: [
      region({ id: 'top-red-stripe', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 32 }, correctColor: COLORS.red, hint: 'Thailand starts with a red stripe.' }),
      region({ id: 'upper-white-stripe', label: 'Upper white stripe', type: 'rect', attrs: { x: 0, y: 32, width: 300, height: 28 }, correctColor: COLORS.white, hint: 'A white stripe sits above the wide blue stripe.' }),
      region({ id: 'blue-stripe', label: 'Wide blue stripe', type: 'rect', attrs: { x: 0, y: 60, width: 300, height: 80 }, correctColor: COLORS.blue, hint: 'The center blue stripe is the widest.' }),
      region({ id: 'lower-white-stripe', label: 'Lower white stripe', type: 'rect', attrs: { x: 0, y: 140, width: 300, height: 28 }, correctColor: COLORS.white, hint: 'A white stripe sits below the wide blue stripe.' }),
      region({ id: 'bottom-red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 168, width: 300, height: 32 }, correctColor: COLORS.red, hint: 'Thailand ends with a red stripe.' })
    ]
  },
  {
    ...flagBase,
    id: 'philippines',
    name: 'Philippines',
    difficulty: 'hard',
    mapPosition: { x: 80, y: 57 },
    palette: [color('blue'), color('red'), color('white'), color('yellow')],
    previewColors: [COLORS.blue, COLORS.red, COLORS.white],
    regions: [
      region({ id: 'blue-stripe', label: 'Top blue stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.blue, hint: 'Blue is the top half.' }),
      region({ id: 'red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.red, hint: 'Red is the bottom half.' }),
      region({ id: 'white-triangle', label: 'White triangle', type: 'polygon', attrs: { points: '0,0 132,100 0,200' }, correctColor: COLORS.white, hint: 'The triangle at the flagpole is white.' }),
      region({ id: 'yellow-sun', label: 'Yellow sun', type: 'polygon', attrs: { points: starPoints(50, 100, 32, 15, 8) }, correctColor: COLORS.yellow, hint: 'The sun inside the triangle is yellow.' }),
      region({ id: 'yellow-stars', label: 'Three yellow stars', type: 'path', attrs: { d: `${starPath(24, 32, 11, 4.5)} ${starPath(104, 100, 11, 4.5)} ${starPath(24, 168, 11, 4.5)}` }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'The three small stars are yellow.' })
    ]
  },
  {
    ...flagBase,
    id: 'united-kingdom',
    name: 'United Kingdom',
    difficulty: 'hard',
    mapPosition: { x: 47, y: 32 },
    palette: [{ name: 'Navy', hex: COLORS.australiaNavy }, color('white'), color('red')],
    previewColors: [COLORS.australiaNavy, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'navy-field', label: 'Navy field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.australiaNavy, hint: 'The Union Jack has a dark blue background.' }),
      region({ id: 'white-diagonal-a', label: 'White diagonal band', type: 'polygon', attrs: { points: '0,0 28,0 300,172 300,200 272,200 0,28' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad diagonal bands are white.' }),
      region({ id: 'white-diagonal-b', label: 'Other white diagonal band', type: 'polygon', attrs: { points: '272,0 300,0 300,28 28,200 0,200 0,172' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad diagonal bands are white.' }),
      region({ id: 'red-diagonal-a', label: 'Red diagonal band', type: 'polygon', attrs: { points: '0,0 14,0 300,182 300,200 286,200 0,18' }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The narrow diagonal bands are red.' }),
      region({ id: 'red-diagonal-b', label: 'Other red diagonal band', type: 'polygon', attrs: { points: '286,0 300,0 300,18 14,200 0,200 0,182' }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The narrow diagonal bands are red.' }),
      region({ id: 'white-horizontal-cross', label: 'White horizontal cross', type: 'rect', attrs: { x: 0, y: 70, width: 300, height: 60 }, correctColor: COLORS.white, hint: 'The broad straight cross is white.' }),
      region({ id: 'white-vertical-cross', label: 'White vertical cross', type: 'rect', attrs: { x: 120, y: 0, width: 60, height: 200 }, correctColor: COLORS.white, hint: 'The broad straight cross is white.' }),
      region({ id: 'red-horizontal-cross', label: 'Red horizontal cross', type: 'rect', attrs: { x: 0, y: 83, width: 300, height: 34 }, correctColor: COLORS.red, strokeWidth: 2, hint: 'The center straight cross is red.' }),
      region({ id: 'red-vertical-cross', label: 'Red vertical cross', type: 'rect', attrs: { x: 133, y: 0, width: 34, height: 200 }, correctColor: COLORS.red, strokeWidth: 2, hint: 'The center straight cross is red.' })
    ]
  },
  {
    ...flagBase,
    id: 'new-zealand',
    name: 'New Zealand',
    difficulty: 'hard',
    mapPosition: { x: 93, y: 86 },
    palette: [{ name: 'Navy', hex: COLORS.australiaNavy }, color('white'), color('red')],
    previewColors: [COLORS.australiaNavy, COLORS.red, COLORS.white],
    regions: [
      region({ id: 'navy-field', label: 'Navy field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.australiaNavy, hint: 'New Zealand has a dark blue background.' }),
      region({ id: 'union-white-diagonal-a', label: 'White diagonal cross band', type: 'polygon', attrs: { points: '0,0 20,0 150,82 150,100 130,100 0,18' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad diagonal bands in the Union Jack are white.' }),
      region({ id: 'union-white-diagonal-b', label: 'Other white diagonal cross band', type: 'polygon', attrs: { points: '130,0 150,0 150,18 20,100 0,100 0,82' }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad diagonal bands in the Union Jack are white.' }),
      region({ id: 'union-red-diagonal-a', label: 'Red diagonal cross band', type: 'polygon', attrs: { points: '0,0 10,0 150,88 150,100 140,100 0,12' }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The thin diagonal bands in the Union Jack are red.' }),
      region({ id: 'union-red-diagonal-b', label: 'Other red diagonal cross band', type: 'polygon', attrs: { points: '140,0 150,0 150,12 10,100 0,100 0,88' }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The thin diagonal bands in the Union Jack are red.' }),
      region({ id: 'union-white-horizontal', label: 'White horizontal cross bar', type: 'rect', attrs: { x: 0, y: 40, width: 150, height: 20 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad cross in the Union Jack is white.' }),
      region({ id: 'union-white-vertical', label: 'White vertical cross bar', type: 'rect', attrs: { x: 65, y: 0, width: 20, height: 100 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The broad cross in the Union Jack is white.' }),
      region({ id: 'union-red-horizontal', label: 'Red horizontal cross bar', type: 'rect', attrs: { x: 0, y: 45, width: 150, height: 10 }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The narrow cross in the Union Jack is red.' }),
      region({ id: 'union-red-vertical', label: 'Red vertical cross bar', type: 'rect', attrs: { x: 70, y: 0, width: 10, height: 100 }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The narrow cross in the Union Jack is red.' }),
      region({ id: 'white-star-borders', label: 'White star borders', type: 'path', attrs: { d: `${starPath(218, 52, 17, 7)} ${starPath(248, 82, 15, 6)} ${starPath(216, 132, 16, 6.5)} ${starPath(178, 100, 14, 5.5)}` }, correctColor: COLORS.white, strokeWidth: 1.5, hint: 'The Southern Cross stars have white borders.' }),
      region({ id: 'red-stars', label: 'Red star centers', type: 'path', attrs: { d: `${starPath(218, 52, 11, 4.5)} ${starPath(248, 82, 10, 4)} ${starPath(216, 132, 10.5, 4)} ${starPath(178, 100, 9, 3.5)}` }, correctColor: COLORS.red, strokeWidth: 1.5, hint: 'The centers of the stars are red.' })
    ]
  },
  {
    ...flagBase,
    id: 'china',
    name: 'China',
    difficulty: 'medium',
    mapPosition: { x: 77, y: 40 },
    palette: [color('red'), color('yellow')],
    previewColors: [COLORS.red, COLORS.yellow],
    regions: [
      region({ id: 'red-field', label: 'Red field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.red, hint: 'China has a red background.' }),
      region({ id: 'big-star', label: 'Large star', type: 'polygon', attrs: { points: starPoints(55, 52, 24, 10) }, correctColor: COLORS.yellow, hint: 'The big star is yellow.' }),
      region({ id: 'small-stars', label: 'Four small stars', type: 'path', attrs: { d: `${starPath(110, 24, 9, 3.7)} ${starPath(132, 44, 9, 3.7)} ${starPath(132, 74, 9, 3.7)} ${starPath(110, 96, 9, 3.7)}` }, correctColor: COLORS.yellow, strokeWidth: 1.5, hint: 'The four little stars are yellow too.' })
    ]
  },
  {
    ...flagBase,
    id: 'colombia',
    name: 'Colombia',
    difficulty: 'easy',
    mapPosition: { x: 30, y: 60 },
    palette: [color('yellow'), color('blue'), color('red')],
    previewColors: [COLORS.yellow, COLORS.blue, COLORS.red],
    regions: [
      region({ id: 'yellow-stripe', label: 'Top yellow stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.yellow, hint: 'The wide top stripe is yellow.' }),
      region({ id: 'blue-stripe', label: 'Middle blue stripe', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 50 }, correctColor: COLORS.blue, hint: 'Blue is the middle stripe.' }),
      region({ id: 'red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 150, width: 300, height: 50 }, correctColor: COLORS.red, hint: 'Red is the bottom stripe.' })
    ]
  },
  {
    ...flagBase,
    id: 'peru',
    name: 'Peru',
    difficulty: 'easy',
    mapPosition: { x: 29, y: 69 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'left-red-stripe', label: 'Left red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'Red is on the flagpole side.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.white, hint: 'White stays in the middle.' }),
      region({ id: 'right-red-stripe', label: 'Right red stripe', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'Red is on the right.' })
    ]
  },
  {
    ...flagBase,
    id: 'costa-rica',
    name: 'Costa Rica',
    difficulty: 'easy',
    mapPosition: { x: 22, y: 56 },
    palette: [color('blue'), color('white'), color('red')],
    previewColors: [COLORS.blue, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'top-blue-stripe', label: 'Top blue stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 33.33 }, correctColor: COLORS.blue, hint: 'Blue is the top stripe.' }),
      region({ id: 'upper-white-stripe', label: 'Upper white stripe', type: 'rect', attrs: { x: 0, y: 33.33, width: 300, height: 33.33 }, correctColor: COLORS.white, hint: 'A white stripe sits below the top blue stripe.' }),
      region({ id: 'red-stripe', label: 'Wide red middle stripe', type: 'rect', attrs: { x: 0, y: 66.66, width: 300, height: 66.68 }, correctColor: COLORS.red, hint: 'The wide center stripe is red.' }),
      region({ id: 'lower-white-stripe', label: 'Lower white stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 33.33 }, correctColor: COLORS.white, hint: 'A white stripe sits above the bottom blue stripe.' }),
      region({ id: 'bottom-blue-stripe', label: 'Bottom blue stripe', type: 'rect', attrs: { x: 0, y: 166.67, width: 300, height: 33.33 }, correctColor: COLORS.blue, hint: 'Blue is the bottom stripe.' })
    ]
  },
  {
    ...flagBase,
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
    difficulty: 'easy',
    mapPosition: { x: 63, y: 50 },
    palette: [color('red'), color('green'), color('white'), color('black')],
    previewColors: [COLORS.green, COLORS.white, COLORS.black],
    regions: [
      region({ id: 'red-bar', label: 'Red bar', type: 'rect', attrs: { x: 0, y: 0, width: 75, height: 200 }, correctColor: COLORS.red, hint: 'A red bar runs down the flagpole side.' }),
      region({ id: 'green-stripe', label: 'Top green stripe', type: 'rect', attrs: { x: 75, y: 0, width: 225, height: 66.67 }, correctColor: COLORS.green, hint: 'Green is the top stripe.' }),
      region({ id: 'white-stripe', label: 'Middle white stripe', type: 'rect', attrs: { x: 75, y: 66.67, width: 225, height: 66.67 }, correctColor: COLORS.white, hint: 'White is the middle stripe.' }),
      region({ id: 'black-stripe', label: 'Bottom black stripe', type: 'rect', attrs: { x: 75, y: 133.34, width: 225, height: 66.66 }, correctColor: COLORS.black, hint: 'Black is the bottom stripe.' })
    ]
  },
  {
    ...flagBase,
    id: 'iceland',
    name: 'Iceland',
    difficulty: 'medium',
    mapPosition: { x: 42, y: 22 },
    palette: [color('blue'), color('white'), color('red')],
    previewColors: [COLORS.blue, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'blue-field', label: 'Blue field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.blue, hint: 'Iceland has a blue background.' }),
      region({ id: 'vertical-white-cross', label: 'Vertical white border', type: 'rect', attrs: { x: 84, y: 0, width: 56, height: 200 }, correctColor: COLORS.white, hint: 'White borders the red cross.' }),
      region({ id: 'horizontal-white-cross', label: 'Horizontal white border', type: 'rect', attrs: { x: 0, y: 72, width: 300, height: 56 }, correctColor: COLORS.white, hint: 'White borders the red cross.' }),
      region({ id: 'vertical-red-cross', label: 'Vertical red cross bar', type: 'rect', attrs: { x: 98, y: 0, width: 28, height: 200 }, correctColor: COLORS.red, hint: 'The inner cross is red.' }),
      region({ id: 'horizontal-red-cross', label: 'Horizontal red cross bar', type: 'rect', attrs: { x: 0, y: 86, width: 300, height: 28 }, correctColor: COLORS.red, hint: 'The inner cross is red.' })
    ]
  },
  {
    ...flagBase,
    id: 'chile',
    name: 'Chile',
    difficulty: 'medium',
    mapPosition: { x: 29, y: 80 },
    palette: [color('blue'), color('white'), color('red')],
    previewColors: [COLORS.blue, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'white-field', label: 'Top white field', type: 'rect', attrs: { x: 100, y: 0, width: 200, height: 100 }, correctColor: COLORS.white, hint: 'The top-right area is white.' }),
      region({ id: 'red-field', label: 'Bottom red field', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.red, hint: 'The bottom half is red.' }),
      region({ id: 'blue-canton', label: 'Blue square', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 100 }, correctColor: COLORS.blue, hint: 'The square in the corner is blue.' }),
      region({ id: 'white-star', label: 'White star', type: 'polygon', attrs: { points: starPoints(50, 50, 30, 12) }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The star in the blue square is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'cuba',
    name: 'Cuba',
    difficulty: 'medium',
    mapPosition: { x: 25, y: 48 },
    palette: [color('blue'), color('white'), color('red')],
    previewColors: [COLORS.blue, COLORS.white, COLORS.red],
    regions: [
      region({ id: 'stripe-1', label: 'Top blue stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 40 }, correctColor: COLORS.blue, hint: 'Cuba has three blue stripes and two white ones.' }),
      region({ id: 'stripe-2', label: 'Second stripe', type: 'rect', attrs: { x: 0, y: 40, width: 300, height: 40 }, correctColor: COLORS.white, hint: 'The second stripe is white.' }),
      region({ id: 'stripe-3', label: 'Middle stripe', type: 'rect', attrs: { x: 0, y: 80, width: 300, height: 40 }, correctColor: COLORS.blue, hint: 'The middle stripe is blue.' }),
      region({ id: 'stripe-4', label: 'Fourth stripe', type: 'rect', attrs: { x: 0, y: 120, width: 300, height: 40 }, correctColor: COLORS.white, hint: 'The fourth stripe is white.' }),
      region({ id: 'stripe-5', label: 'Bottom blue stripe', type: 'rect', attrs: { x: 0, y: 160, width: 300, height: 40 }, correctColor: COLORS.blue, hint: 'The bottom stripe is blue.' }),
      region({ id: 'red-triangle', label: 'Red triangle', type: 'polygon', attrs: { points: '0,0 130,100 0,200' }, correctColor: COLORS.red, strokeWidth: 2, hint: 'The triangle on the flagpole side is red.' }),
      region({ id: 'white-star', label: 'White star', type: 'polygon', attrs: { points: starPoints(43, 100, 24, 10) }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The star inside the triangle is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'israel',
    name: 'Israel',
    difficulty: 'medium',
    mapPosition: { x: 57, y: 48 },
    palette: [color('white'), color('blue')],
    previewColors: [COLORS.white, COLORS.blue, COLORS.white],
    regions: [
      region({ id: 'white-field', label: 'White field', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 200 }, correctColor: COLORS.white, hint: 'Israel has a white background.' }),
      region({ id: 'top-blue-stripe', label: 'Top blue stripe', type: 'rect', attrs: { x: 0, y: 30, width: 300, height: 20 }, correctColor: COLORS.blue, hint: 'A blue stripe runs near the top.' }),
      region({ id: 'bottom-blue-stripe', label: 'Bottom blue stripe', type: 'rect', attrs: { x: 0, y: 150, width: 300, height: 20 }, correctColor: COLORS.blue, hint: 'A blue stripe runs near the bottom.' }),
      region({ id: 'star-of-david', label: 'Star of David', type: 'path', attrs: { d: 'M150 70 L124 115 L176 115 Z M150 130 L124 85 L176 85 Z' }, correctColor: COLORS.blue, strokeWidth: 2.5, hint: 'The six-pointed star in the center is blue.' })
    ]
  },
  {
    ...flagBase,
    id: 'pakistan',
    name: 'Pakistan',
    difficulty: 'medium',
    mapPosition: { x: 66, y: 47 },
    palette: [color('green'), color('white')],
    previewColors: [COLORS.green, COLORS.white],
    regions: [
      region({ id: 'white-bar', label: 'White bar', type: 'rect', attrs: { x: 0, y: 0, width: 75, height: 200 }, correctColor: COLORS.white, strokeWidth: 2, hint: 'A white bar runs down the flagpole side.' }),
      region({ id: 'green-field', label: 'Green field', type: 'rect', attrs: { x: 75, y: 0, width: 225, height: 200 }, correctColor: COLORS.green, hint: 'The rest of the flag is green.' }),
      region({ id: 'crescent-outer', label: 'Outer crescent circle', type: 'circle', attrs: { cx: 178, cy: 105, r: 38 }, correctColor: COLORS.white, hint: 'The crescent is white.' }),
      region({ id: 'crescent-cutout', label: 'Crescent green cutout', type: 'circle', attrs: { cx: 192, cy: 97, r: 31 }, correctColor: COLORS.green, hint: 'The cutout that shapes the crescent is green.' }),
      region({ id: 'white-star', label: 'White star', type: 'polygon', attrs: { points: starPoints(214, 78, 18, 7) }, correctColor: COLORS.white, strokeWidth: 2, hint: 'The star next to the crescent is white.' })
    ]
  },
  {
    ...flagBase,
    id: 'singapore',
    name: 'Singapore',
    difficulty: 'medium',
    mapPosition: { x: 76, y: 63 },
    palette: [color('red'), color('white')],
    previewColors: [COLORS.red, COLORS.white],
    regions: [
      region({ id: 'red-top', label: 'Top red stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 100 }, correctColor: COLORS.red, hint: 'Red is the top half.' }),
      region({ id: 'white-bottom', label: 'Bottom white stripe', type: 'rect', attrs: { x: 0, y: 100, width: 300, height: 100 }, correctColor: COLORS.white, hint: 'White is the bottom half.' }),
      region({ id: 'crescent-outer', label: 'Outer crescent circle', type: 'circle', attrs: { cx: 70, cy: 50, r: 32 }, correctColor: COLORS.white, hint: 'The crescent moon is white.' }),
      region({ id: 'crescent-cutout', label: 'Crescent red cutout', type: 'circle', attrs: { cx: 86, cy: 50, r: 26 }, correctColor: COLORS.red, hint: 'The cutout that shapes the crescent is red.' }),
      region({ id: 'white-stars', label: 'Five white stars', type: 'path', attrs: { d: `${starPath(124, 33, 9, 3.7)} ${starPath(145, 48, 9, 3.7)} ${starPath(137, 73, 9, 3.7)} ${starPath(111, 73, 9, 3.7)} ${starPath(103, 48, 9, 3.7)}` }, correctColor: COLORS.white, strokeWidth: 1.5, hint: 'The five little stars are white.' })
    ]
  },
  {
    ...flagBase,
    id: 'venezuela',
    name: 'Venezuela',
    difficulty: 'medium',
    mapPosition: { x: 33, y: 59 },
    palette: [color('yellow'), color('blue'), color('red'), color('white')],
    previewColors: [COLORS.yellow, COLORS.blue, COLORS.red],
    regions: [
      region({ id: 'yellow-stripe', label: 'Top yellow stripe', type: 'rect', attrs: { x: 0, y: 0, width: 300, height: 66.67 }, correctColor: COLORS.yellow, hint: 'Yellow is the top stripe.' }),
      region({ id: 'blue-stripe', label: 'Middle blue stripe', type: 'rect', attrs: { x: 0, y: 66.67, width: 300, height: 66.67 }, correctColor: COLORS.blue, hint: 'Blue is the middle stripe.' }),
      region({ id: 'red-stripe', label: 'Bottom red stripe', type: 'rect', attrs: { x: 0, y: 133.34, width: 300, height: 66.66 }, correctColor: COLORS.red, hint: 'Red is the bottom stripe.' }),
      region({ id: 'white-stars', label: 'Arc of white stars', type: 'path', attrs: { d: `${starPath(96, 89, 6, 2.5)} ${starPath(112, 93, 6, 2.5)} ${starPath(128, 96, 6, 2.5)} ${starPath(142, 98, 6, 2.5)} ${starPath(158, 98, 6, 2.5)} ${starPath(172, 96, 6, 2.5)} ${starPath(188, 93, 6, 2.5)} ${starPath(204, 89, 6, 2.5)}` }, correctColor: COLORS.white, strokeWidth: 1.2, hint: 'The little stars curve in an arc and are white.' })
    ]
  },
  {
    ...flagBase,
    id: 'mongolia',
    name: 'Mongolia',
    difficulty: 'hard',
    mapPosition: { x: 74, y: 35 },
    palette: [color('red'), color('blue'), color('yellow')],
    previewColors: [COLORS.red, COLORS.blue, COLORS.red],
    regions: [
      region({ id: 'left-red-band', label: 'Left red band', type: 'rect', attrs: { x: 0, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'Mongolia has red bands on the left and right.' }),
      region({ id: 'blue-band', label: 'Middle blue band', type: 'rect', attrs: { x: 100, y: 0, width: 100, height: 200 }, correctColor: COLORS.blue, hint: 'The middle band is blue.' }),
      region({ id: 'right-red-band', label: 'Right red band', type: 'rect', attrs: { x: 200, y: 0, width: 100, height: 200 }, correctColor: COLORS.red, hint: 'The right band is red too.' }),
      region({ id: 'soyombo-flame', label: 'Emblem flame', type: 'polygon', attrs: { points: '44,40 50,18 56,40' }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'The flame at the top of the emblem is yellow.' }),
      region({ id: 'soyombo-sun', label: 'Emblem sun', type: 'circle', attrs: { cx: 50, cy: 52, r: 6 }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'The sun shape is yellow.' }),
      region({ id: 'soyombo-circle', label: 'Emblem circle', type: 'circle', attrs: { cx: 50, cy: 100, r: 11 }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'The round center of the emblem is yellow.' }),
      region({ id: 'soyombo-bars', label: 'Emblem bars', type: 'path', attrs: { d: 'M36 78 H64 V85 H36 Z M36 115 H64 V122 H36 Z' }, correctColor: COLORS.yellow, strokeWidth: 2, hint: 'The two flat bars in the emblem are yellow.' })
    ]
  }
];

export const allPaletteColors = commonPalette;
