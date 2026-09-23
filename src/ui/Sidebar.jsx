import Logo from "./Logo";
import MainNav from "./MainNav";
function Sidebar() {
  return (
    <aside className="col-start-1 row-span-2 row-start-1 flex flex-col gap-[3.2rem] border-r border-grey-100 bg-grey-0 px-[2.4rem] py-[3.2rem]">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
