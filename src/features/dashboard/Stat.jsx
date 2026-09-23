const colorClasses = {
  blue: "bg-blue-100 [&_svg]:text-blue-700",
  green: "bg-green-100 [&_svg]:text-green-700",
  yellow: "bg-yellow-100 [&_svg]:text-yellow-700",
  indigo: "bg-indigo-100 [&_svg]:text-indigo-700",
  red: "bg-red-100 [&_svg]:text-red-700",
};

function Stat({ icon, title, value, color }) {
  return (
    <div className="grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-[1.6rem] gap-y-[0.4rem] rounded-[var(--border-radius-md)] border border-grey-100 bg-grey-0 p-[1.6rem]">
      <div className={`row-[1/-1] flex aspect-square items-center justify-center rounded-full [&_svg]:h-[3.2rem] [&_svg]:w-[3.2rem] ${colorClasses[color] ?? ""}`}>
        {icon}
      </div>
      <h5 className="self-end text-[1.2rem] font-semibold uppercase tracking-[0.4px] text-grey-500">{title}</h5>
      <p className="text-[2.4rem] font-medium leading-none">{value}</p>
    </div>
  );
}

export default Stat;
