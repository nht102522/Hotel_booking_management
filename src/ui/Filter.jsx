const filterClass =
  "flex gap-[0.4rem] rounded-[var(--border-radius-sm)] border border-grey-100 bg-grey-0 p-[0.4rem] shadow-[var(--shadow-sm)]";

const buttonClass =
  "rounded-[var(--border-radius-sm)] border-0 px-[0.8rem] py-[0.44rem] text-[1.4rem] font-medium transition-colors hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50";

function FilterButton({ active, className = "", ...props }) {
  return (
    <button
      className={`${buttonClass} ${active ? "bg-brand-600 text-brand-50" : "bg-grey-0"} ${className}`}
      {...props}
    />
  );
}

function Filter({ filterField, options = [], currentFilter, onFilter }) {
  return (
    <div className={filterClass}>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          onClick={() => onFilter?.(filterField, option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
}

export default Filter;
