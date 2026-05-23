const continentPaths = [
  {
    id: 'north-america',
    d: 'M62 118 L86 98 L118 88 L150 76 L191 69 L228 74 L259 88 L287 109 L310 134 L324 161 L318 188 L298 210 L268 225 L238 237 L219 253 L192 261 L161 258 L132 242 L110 219 L91 203 L73 185 L58 160 L48 139 Z M53 122 L28 116 L15 99 L39 87 L70 92 Z M246 235 L268 244 L284 262 L273 280 L243 268 L223 248 Z M281 215 L314 224 L344 240 L367 262 L354 275 L318 253 L289 236 Z'
  },
  {
    id: 'central-america',
    d: 'M246 264 L278 271 L303 286 L327 292 L343 307 L338 323 L309 316 L284 302 L261 294 L239 277 Z'
  },
  {
    id: 'south-america',
    d: 'M317 300 L350 315 L373 341 L386 374 L382 411 L370 444 L349 476 L324 503 L303 493 L286 459 L274 424 L252 389 L232 353 L231 324 L251 304 L284 296 Z'
  },
  {
    id: 'europe',
    d: 'M431 155 L455 133 L488 123 L519 122 L546 133 L572 143 L600 164 L604 188 L587 205 L555 207 L536 224 L503 221 L482 235 L451 232 L426 215 L414 188 Z M506 91 L532 72 L559 81 L563 112 L541 129 L516 119 Z M464 221 L483 243 L510 255 L503 270 L467 255 L441 232 Z'
  },
  {
    id: 'africa',
    d: 'M498 243 L542 232 L582 243 L611 270 L630 307 L642 351 L635 389 L616 430 L589 469 L552 505 L526 487 L508 451 L488 421 L463 384 L438 348 L425 314 L433 281 L461 256 Z M620 347 L650 369 L641 404 L617 389 Z'
  },
  {
    id: 'asia',
    d: 'M586 159 L629 130 L681 115 L740 112 L799 124 L847 147 L891 183 L923 228 L938 274 L928 316 L900 353 L859 372 L817 373 L778 357 L748 331 L712 310 L677 301 L638 289 L607 266 L586 233 L574 197 Z M665 288 L690 317 L713 352 L738 370 L724 333 L697 305 Z M704 303 L736 319 L754 351 L748 380 L724 363 L708 332 Z M614 242 L642 251 L661 275 L647 291 L618 272 Z'
  },
  {
    id: 'australia',
    d: 'M787 395 L829 376 L875 380 L918 400 L948 429 L925 455 L877 466 L829 455 L789 433 L771 411 Z'
  },
  {
    id: 'greenland',
    d: 'M287 61 L318 34 L361 27 L397 42 L416 69 L405 97 L370 115 L326 108 L292 88 Z'
  }
];

const islandPaths = [
  'M91 82 L115 69 L145 66 L157 81 L139 98 L108 101 Z',
  'M393 251 L413 249 L430 259 L421 271 L397 267 Z',
  'M594 229 L613 228 L629 239 L621 252 L599 248 Z',
  'M661 229 L680 236 L675 253 L654 247 Z',
  'M878 202 L892 216 L886 235 L870 222 Z',
  'M886 239 L904 251 L902 270 L882 260 Z',
  'M875 276 L897 288 L897 309 L872 298 Z',
  'M755 327 L774 338 L779 360 L758 351 Z',
  'M767 386 L786 394 L790 412 L768 406 Z',
  'M739 408 L760 414 L766 433 L743 429 Z',
  'M682 361 L702 375 L711 399 L689 388 Z',
  'M635 401 L656 416 L652 450 L631 438 Z',
  'M214 279 L234 285 L238 301 L216 298 Z',
  'M283 292 L307 302 L313 320 L289 314 Z'
];

const seaInletPaths = [
  'M177 107 L207 95 L238 105 L251 132 L235 159 L204 159 L181 139 Z',
  'M218 236 L250 229 L279 237 L304 256 L288 276 L256 265 L230 254 Z',
  'M433 216 L469 208 L507 214 L542 216 L578 206 L610 221 L590 239 L549 233 L515 242 L476 236 L442 230 Z',
  'M538 197 L563 190 L588 198 L581 214 L551 214 Z',
  'M577 258 L600 273 L609 318 L592 307 L575 276 Z',
  'M657 295 L681 310 L692 349 L672 334 Z',
  'M724 309 L749 331 L760 370 L738 349 Z',
  'M770 323 L798 339 L809 367 L782 351 Z'
];

function WorldMapSelector({ flags, onChoose }) {
  const flagsWithPositions = flags.filter((flag) => flag.mapPosition);

  return (
    <section className="world-map-panel" aria-label="Choose a country from the world map">
      <svg className="world-map-art" viewBox="0 0 1000 520" aria-hidden="true">
        <defs>
          <linearGradient id="ocean-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#d9f4ff" />
            <stop offset="100%" stopColor="#aee0f4" />
          </linearGradient>
          <linearGradient id="land-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c9efa9" />
            <stop offset="100%" stopColor="#93d874" />
          </linearGradient>
        </defs>
        <rect className="map-ocean" x="0" y="0" width="1000" height="520" rx="28" />
        <g className="map-grid">
          <path d="M125 0 V520 M250 0 V520 M375 0 V520 M500 0 V520 M625 0 V520 M750 0 V520 M875 0 V520" />
          <path d="M0 104 H1000 M0 208 H1000 M0 312 H1000 M0 416 H1000" />
        </g>
        <g className="map-landmasses">
          {continentPaths.map((continent) => (
            <path className="map-land" d={continent.d} key={continent.id} />
          ))}
          {seaInletPaths.map((d) => (
            <path className="map-sea-inlet" d={d} key={d} />
          ))}
          {islandPaths.map((d) => (
            <path className="map-island" d={d} key={d} />
          ))}
        </g>
      </svg>

      <div className="map-marker-layer">
        {flagsWithPositions.map((flag) => (
          <button
            className="map-marker"
            key={flag.id}
            type="button"
            style={{
              left: `${flag.mapPosition.x}%`,
              top: `${flag.mapPosition.y}%`
            }}
            title={flag.name}
            aria-label={`Select ${flag.name}`}
            onClick={() => onChoose(flag)}
          >
            <span className="marker-dot" />
            <span className="marker-label">{flag.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default WorldMapSelector;
