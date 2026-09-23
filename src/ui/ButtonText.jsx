import { forwardRef } from "react";

const ButtonText = forwardRef(function ButtonText({ className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`rounded-[var(--border-radius-sm)] border-0 bg-transparent text-center font-medium text-brand-600 transition-colors hover:text-brand-700 active:text-brand-700 ${className}`}
      {...props}
    />
  );
});

export default ButtonText;
