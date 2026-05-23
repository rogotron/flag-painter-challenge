# Flag Painter Challenge

A kid-friendly React + Vite game where players choose a country, paint outlined SVG flag regions, and check whether each region has the right color.

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

- `src/App.jsx` manages country selection, painting, scoring, checking answers, reset, and hints.
- `src/data/flags.js` stores every flag locally as reusable SVG region data.
- `src/components/FlagCanvas.jsx` renders clickable inline SVG regions from the data model.
- `src/components/ColorPalette.jsx` renders per-flag paint swatches.
- `src/components/CountrySelect.jsx` renders country cards and difficulty filters.
- `src/styles.css` contains the responsive game styling.

## Flag Data Model

Every flag in `src/data/flags.js` has:

- `id`: unique country id.
- `name`: display name.
- `difficulty`: `easy`, `medium`, or `hard`.
- `viewBox`: SVG coordinate system, such as `0 0 300 200`.
- `palette`: paint colors available for that flag.
- `previewColors`: small country-card preview stripes.
- `regions`: clickable SVG shapes.

Every region has:

- `id`: unique region id inside the flag.
- `label`: child-friendly region name.
- `type`: `rect`, `circle`, `polygon`, or `path`.
- `attrs`: SVG attributes for that shape.
- `correctColor`: hex color checked by the game.
- `stroke`, `strokeWidth`: optional outline settings.
- `hint`: optional hint text shown when the player uses a hint.

## Region Examples

Rectangle:

```js
{
  id: 'top-stripe',
  label: 'Top stripe',
  type: 'rect',
  attrs: { x: 0, y: 0, width: 300, height: 66 },
  correctColor: '#d62828',
  hint: 'Red is the top stripe.'
}
```

Circle:

```js
{
  id: 'center-circle',
  label: 'Center circle',
  type: 'circle',
  attrs: { cx: 150, cy: 100, r: 44 },
  correctColor: '#d62828'
}
```

Polygon:

```js
{
  id: 'diamond',
  label: 'Diamond',
  type: 'polygon',
  attrs: { points: '150,25 270,100 150,175 30,100' },
  correctColor: '#f5c542'
}
```

Path:

```js
{
  id: 'curved-band',
  label: 'Curved band',
  type: 'path',
  attrs: { d: 'M105 92 C132 82 171 84 197 104 L190 115 C164 96 133 96 110 106 Z' },
  correctColor: '#ffffff'
}
```

## Simplifying Complex Flags

Keep regions large enough for kids to tap. For detailed emblems, use a simplified placeholder shape instead of trying to draw every detail. A circle, shield, badge, star group, or short path is usually enough for gameplay. Prefer major visual regions first: stripes, triangles, diamonds, circles, borders, and simple emblems.
