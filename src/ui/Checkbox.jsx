function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex gap-[1.6rem]">
      <input
        className="h-[2.4rem] w-[2.4rem] origin-left accent-brand-600 outline-offset-2 disabled:accent-brand-600"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className="flex flex-1 items-center gap-[0.8rem]" htmlFor={!disabled ? id : ""}>
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
