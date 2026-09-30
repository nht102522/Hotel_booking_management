import Logout from "../features/authentication/Logout";

function HeaderMenu() {
  return (
    <ul className="flex gap-[0.4rem]">
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
