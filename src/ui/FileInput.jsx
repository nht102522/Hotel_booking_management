import { forwardRef } from "react";

const FileInput = forwardRef(function FileInput({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      type="file"
      className={`rounded-[var(--border-radius-sm)] text-[1.4rem] file:mr-[1.2rem] file:cursor-pointer file:rounded-[var(--border-radius-sm)] file:border-0 file:bg-brand-600 file:px-[1.2rem] file:py-[0.8rem] file:font-medium file:text-brand-50 file:transition-colors hover:file:bg-brand-700 ${className}`}
      {...props}
    />
  );
});

export default FileInput;
