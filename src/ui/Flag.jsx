import { forwardRef } from "react";

export const Flag = forwardRef(function Flag({ className = "", ...props }, ref) {
  return (
    <img
      ref={ref}
      className={`block max-w-[2rem] rounded-[var(--border-radius-tiny)] border border-grey-100 ${className}`}
      {...props}
    />
  );
});
