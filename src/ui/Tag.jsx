const colorClasses = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  silver: "bg-silver-100 text-silver-700",
  indigo: "bg-indigo-100 text-indigo-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

function Tag({ type, className = "", ...props }) {
  return (
    <span
      className={`w-fit rounded-full px-[1.2rem] py-[0.4rem] text-[1.1rem] font-semibold uppercase ${colorClasses[type] ?? ""} ${className}`}
      {...props}
    />
  );
}

export default Tag;
