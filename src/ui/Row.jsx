const rowClasses = {
  horizontal: "flex items-center justify-between",
  vertical: "flex flex-col gap-[1.6rem]",
};

function Row({ type = "vertical", className = "", ...props }) {
  return <div className={`${rowClasses[type] ?? rowClasses.vertical} ${className}`} {...props} />;
}

export default Row;
