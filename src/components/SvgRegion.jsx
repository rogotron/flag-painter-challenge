const supportedShapes = {
  rect: 'rect',
  circle: 'circle',
  polygon: 'polygon',
  path: 'path'
};

function SvgRegion({
  className,
  fill,
  isIncorrect = false,
  onActivate,
  region
}) {
  const Shape = supportedShapes[region.type] || 'path';
  const isInteractive = Boolean(onActivate);
  const sharedProps = {
    ...region.attrs,
    className: `${className || ''} ${isIncorrect ? 'incorrect' : ''}`.trim(),
    fill,
    stroke: region.stroke || '#111111',
    strokeWidth: region.strokeWidth ?? 4,
    strokeLinejoin: 'round',
    strokeLinecap: 'round'
  };

  if (!isInteractive) {
    return <Shape {...sharedProps} />;
  }

  return (
    <Shape
      {...sharedProps}
      onClick={() => onActivate(region.id)}
      role="button"
      tabIndex={0}
      aria-label={`Paint ${region.label}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate(region.id);
        }
      }}
    />
  );
}

export default SvgRegion;
