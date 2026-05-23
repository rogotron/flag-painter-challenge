import FlagPreview from './FlagPreview.jsx';

const filters = ['all', 'easy', 'medium', 'hard'];

function CountrySelect({ flags, activeFilter, onFilterChange, onChoose }) {
  const visibleFlags =
    activeFilter === 'all'
      ? flags
      : flags.filter((flag) => flag.difficulty === activeFilter);

  return (
    <>
      <div className="difficulty-filter" aria-label="Filter countries by difficulty">
        {filters.map((filter) => (
          <button
            className={activeFilter === filter ? 'active' : ''}
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="country-grid" aria-label="Choose a country">
        {visibleFlags.map((flag) => (
          <button
            className="country-card"
            key={flag.id}
            type="button"
            onClick={() => onChoose(flag, visibleFlags)}
          >
            <FlagPreview flag={flag} />
            <span>{flag.name}</span>
            <small>{flag.difficulty}</small>
          </button>
        ))}
      </div>
    </>
  );
}

export default CountrySelect;
