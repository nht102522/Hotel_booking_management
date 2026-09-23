function ModalWindow({ children, onClose, className = "" }) {
  return (
    <div className="fixed inset-0 z-[1000] h-screen bg-[var(--backdrop-color)] backdrop-blur-[4px] transition-all">
      <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[var(--border-radius-lg)] bg-grey-0 px-[4rem] py-[3.2rem] shadow-[var(--shadow-lg)] transition-all ${className}`}>
        <button
          className="absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] rounded-[var(--border-radius-sm)] border-0 bg-transparent p-[0.4rem] transition-colors hover:bg-grey-100 [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:text-grey-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
