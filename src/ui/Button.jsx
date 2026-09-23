import { forwardRef } from "react";

const sizeClasses = {
  small: "px-[0.8rem] py-[0.4rem] text-center text-[1.2rem] font-semibold uppercase",
  medium: "px-[1.6rem] py-[1.2rem] text-[1.4rem] font-medium",
  large: "px-[2.4rem] py-[1.2rem] text-[1.6rem] font-medium",
};

const variationClasses = {
  primary: "bg-brand-600 text-brand-50 hover:bg-brand-700",
  secondary: "border border-grey-200 bg-grey-0 text-grey-600 hover:bg-grey-50",
  danger: "bg-red-700 text-red-100 hover:bg-red-800",
};

const Button = forwardRef(function Button(
  { as: Component = "button", size = "medium", variation = "primary", className = "", ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={`rounded-[var(--border-radius-sm)] border-0 shadow-[var(--shadow-sm)] transition-colors disabled:cursor-not-allowed ${sizeClasses[size]} ${variationClasses[variation]} ${className}`}
      {...props}
    />
  );
});

export default Button;
