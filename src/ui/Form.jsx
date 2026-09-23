import { forwardRef } from "react";

const Form = forwardRef(function Form({ type, className = "", ...props }, ref) {
  const layoutClasses = type === "modal"
    ? "w-[80rem]"
    : "rounded-[var(--border-radius-md)] border border-grey-100 bg-grey-0 px-[4rem] py-[2.4rem]";

  return (
    <form
      ref={ref}
      className={`overflow-hidden text-[1.4rem] ${layoutClasses} ${className}`}
      {...props}
    />
  );
});

export default Form;
