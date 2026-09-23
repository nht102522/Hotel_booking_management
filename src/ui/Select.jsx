import { forwardRef } from "react";

const Select = forwardRef(function Select(
  { options, type, className = "", children, ...props },
  ref,
) {
  const borderClass = type === "white" ? "border-grey-100" : "border-grey-300";

  return (
    <select
      ref={ref}
      className={`rounded-[var(--border-radius-sm)] border bg-grey-0 px-[1.2rem] py-[0.8rem] text-[1.4rem] font-medium shadow-[var(--shadow-sm)] ${borderClass} ${className}`}
      {...props}
    >
      {children ?? options?.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
});

export default Select;
