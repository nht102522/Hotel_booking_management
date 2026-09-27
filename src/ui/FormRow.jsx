function FormRow({ label, error, children }) {
  const id = children?.props?.id;
  return (
    <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 not-last:border-b not-last:border-grey-100">
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>

      <div className="flex flex-col gap-[0.8rem]">
        {children}
        {error && (
          <span className="text-[1.2rem] text-red-600">{error.message}</span>
        )}
      </div>
    </div>
  );
}

export default FormRow;
