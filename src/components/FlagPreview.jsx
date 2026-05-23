import SvgRegion from './SvgRegion.jsx';

function FlagPreview({ flag }) {
  return (
    <svg className="mini-flag-svg" viewBox={flag.viewBox} aria-hidden="true">
      {flag.regions.map((region) => (
        <SvgRegion
          key={region.id}
          className="preview-region"
          fill={region.correctColor}
          region={region}
        />
      ))}
    </svg>
  );
}

export default FlagPreview;
