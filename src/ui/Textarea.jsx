import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea({ className = "", ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`h-[8rem] w-full rounded-[5px] border border-grey-300 bg-grey-0 px-[1.2rem] py-[0.8rem] shadow-[var(--shadow-sm)] ${className}`}
      {...props}
    />
  );
});

export default Textarea;
