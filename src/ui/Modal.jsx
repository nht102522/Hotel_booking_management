import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext(null);

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  function open(name) {
    setOpenName(name);
  }

  function close() {
    setOpenName("");
  }

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] h-screen bg-[var(--backdrop-color)] backdrop-blur-[4px]">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[var(--border-radius-lg)] bg-grey-0 px-[4rem] py-[3.2rem] shadow-[var(--shadow-lg)]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close modal"
          className="absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] rounded-[var(--border-radius-sm)] border-0 bg-transparent p-[0.4rem] transition-colors hover:bg-grey-100 [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:text-grey-500"
        >
          <HiXMark />
        </button>

        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
