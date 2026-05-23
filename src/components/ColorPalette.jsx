function ColorPalette({ colors, selectedColor, onSelectColor }) {
  return (
    <div>
      <h2>Paint Colors</h2>
      <div className="palette">
        {colors.map((color) => (
          <button
            className={`swatch ${selectedColor === color.hex ? 'selected' : ''}`}
            key={color.hex}
            type="button"
            onClick={() => onSelectColor(color.hex)}
            aria-label={`Choose ${color.name}`}
            title={color.name}
          >
            <span style={{ background: color.hex }} />
            <small>{color.name}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorPalette;
