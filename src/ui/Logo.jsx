import { useDarkMode } from "../context/DarkModeContext";
function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode
    ? "/pineledger-logo-dark.png"
    : "/pineledger-logo-light.png";
  return (
    <div className="text-center">
      <img className="h-[9.6rem] w-auto" src={src} alt="PineLedger" />
    </div>
  );
}

export default Logo;
