import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ className = "", ...props }) {
  return (
    <BiLoaderAlt
      className={`h-[2.4rem] w-[2.4rem] animate-spin ${className}`}
      {...props}
    />
  );
}

export default SpinnerMini;
