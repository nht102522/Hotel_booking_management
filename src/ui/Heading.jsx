const headingClasses = {
  h1: "text-[3rem] font-semibold leading-[1.4]",
  h2: "text-[2rem] font-semibold leading-[1.4]",
  h3: "text-[2rem] font-medium leading-[1.4]",
};

function Heading({ as: Component = "h1", className = "", ...props }) {
  return <Component className={`${headingClasses[Component] ?? headingClasses.h1} ${className}`} {...props} />;
}

export default Heading;
