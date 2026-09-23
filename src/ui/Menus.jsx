function Menu({ className = "", ...props }) {
  return <div className={`flex items-center justify-end ${className}`} {...props} />;
}

function Toggle({ className = "", ...props }) {
  return (
    <button
      className={`translate-x-[0.8rem] rounded-[var(--border-radius-sm)] border-0 bg-transparent p-[0.4rem] transition-colors hover:bg-grey-100 [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:text-grey-700 ${className}`}
      {...props}
    />
  );
}

function List({ position = { x: 0, y: 0 }, className = "", ...props }) {
  return (
    <ul
      className={`fixed rounded-[var(--border-radius-md)] bg-grey-0 shadow-[var(--shadow-md)] ${className}`}
      style={{ right: position.x, top: position.y }}
      {...props}
    />
  );
}

function MenuButton({ className = "", ...props }) {
  return (
    <button
      className={`flex w-full items-center gap-[1.6rem] border-0 bg-transparent px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] transition-colors hover:bg-grey-50 [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:text-grey-400 ${className}`}
      {...props}
    />
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = MenuButton;

export default Menu;
