import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header className="col-start-2 row-start-1 flex items-center justify-end gap-[2.4rem] border-b border-grey-100 bg-grey-0 px-[4.8rem] py-[1.2rem]">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
