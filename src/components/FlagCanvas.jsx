import SvgRegion from './SvgRegion.jsx';

const getViewBoxSize = (viewBox) => {
  const [, , width, height] = viewBox.split(' ').map(Number);
  return { width, height };
};

function FlagCanvas({ flag, paintedRegions, incorrectRegionIds, onPaintRegion }) {
  const { width, height } = getViewBoxSize(flag.viewBox);

  return (
    <div className="flag-stage">
      <svg className="flag-svg" viewBox={flag.viewBox} aria-label={`${flag.name} coloring flag`}>
        <rect x="0" y="0" width={width} height={height} fill="#ffffff" stroke="#111111" strokeWidth="6" />
        {flag.regions.map((region) => (
          <SvgRegion
            key={region.id}
            className="flag-region"
            region={region}
            fill={paintedRegions[region.id] || '#ffffff'}
            isIncorrect={incorrectRegionIds.includes(region.id)}
            onActivate={onPaintRegion}
          />
        ))}
      </svg>
    </div>
  );
}

export default FlagCanvas;
