import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

import useOutsideClick from "../hooks/useOutsideClick";

const MenusContext = createContext(null);

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function open(id) {
    setOpenId(id);
  }

  function close() {
    setOpenId("");
  }

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const isOpen = openId === id;

  function handleClick(event) {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 8,
    });

    if (isOpen) {
      close();
    } else {
      open(id);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Open actions menu"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      className="translate-x-[0.8rem] rounded-[var(--border-radius-sm)] border-0 bg-transparent p-[0.4rem] transition-colors hover:bg-grey-100 [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:text-grey-700"
    >
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      role="menu"
      className="fixed z-[1000] rounded-[var(--border-radius-md)] bg-grey-0 shadow-[var(--shadow-md)]"
      style={{
        right: position.x,
        top: position.y,
      }}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick, className = "", ...props }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        type="button"
        role="menuitem"
        {...props}
        onClick={handleClick}
        className={`flex w-full items-center gap-[1.6rem] border-0 bg-transparent px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] transition-colors hover:bg-grey-50 disabled:cursor-not-allowed [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:text-grey-400 ${className}`}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
