import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[26rem_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)]">
      <Header />
      <Sidebar />
      <main className="col-start-2 row-start-2 overflow-y-auto bg-grey-50 px-20 pb-24 pt-16">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
