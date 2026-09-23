import { forwardRef } from "react";

const ButtonIcon = forwardRef(function ButtonIcon({ className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`rounded-[var(--border-radius-sm)] border-0 bg-transparent p-[0.6rem] transition-colors hover:bg-grey-100 [&_svg]:h-[2.2rem] [&_svg]:w-[2.2rem] [&_svg]:text-brand-600 ${className}`}
      {...props}
    />
  );
});

export default ButtonIcon;
