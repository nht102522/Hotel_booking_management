function Spinner({ className = "" }) {
  return (
    <div
      className={`mx-auto my-[4.8rem] aspect-square w-[6.4rem] animate-spin rounded-full bg-[radial-gradient(farthest-side,var(--color-brand-600)_94%,#0000)_top/10px_10px_no-repeat,conic-gradient(#0000_30%,var(--color-brand-600))] [mask:radial-gradient(farthest-side,#0000_calc(100%_-_10px),#000_0)] ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default Spinner;
