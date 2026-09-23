import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const navItems = [
  { to: "/dashboard", label: "Home", icon: HiOutlineHome },
  { to: "/bookings", label: "Bookings", icon: HiOutlineCalendarDays },
  { to: "/cabins", label: "Cabins", icon: HiOutlineHomeModern },
  { to: "/users", label: "Users", icon: HiOutlineUsers },
  { to: "/settings", label: "Settings", icon: HiOutlineCog6Tooth },
];

export const navListClass = "flex flex-col gap-[0.8rem]";
export const navLinkClass =
  "flex items-center gap-[1.2rem] rounded-[var(--border-radius-sm)] px-[2.4rem] py-[1.2rem] text-[1.6rem] font-medium text-grey-600 transition-colors hover:bg-grey-50 hover:text-grey-800 [&.active]:bg-grey-50 [&.active]:text-grey-800 [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:shrink-0 [&_svg]:text-grey-400 hover:[&_svg]:text-brand-600 [&.active_svg]:text-brand-600";

function MainNav() {
  return (
    <nav>
      <ul className={navListClass}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} className={navLinkClass}>
              <Icon />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
