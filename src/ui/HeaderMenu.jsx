import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-[0.4rem]">
      <li>
        <ButtonIcon onClick={() => navigate("/account")} title="Account">
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
