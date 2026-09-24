function Spinner({ className = "" }) {
  return (
    <div
      className={`mx-auto my-[4.8rem] h-[6.4rem] w-[6.4rem] animate-spin rounded-full border-[8px] border-brand-200 border-t-brand-600 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default Spinner;
