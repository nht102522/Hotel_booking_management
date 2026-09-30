import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogout from "./useLogout";

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon
      type="button"
      aria-label="Log out"
      title="Log out"
      disabled={isPending}
      onClick={logout}
    >
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
