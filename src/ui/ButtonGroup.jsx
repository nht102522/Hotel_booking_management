function ButtonGroup({ className = "", ...props }) {
  return <div className={`flex justify-end gap-[1.2rem] ${className}`} {...props} />;
}

export default ButtonGroup;
