function DashboardBox({ className = "", ...props }) {
  return (
    <div
      className={`flex flex-col gap-[2.4rem] rounded-[var(--border-radius-md)] border border-grey-100 bg-grey-0 p-[3.2rem] ${className}`}
      {...props}
    />
  );
}

export default DashboardBox;
