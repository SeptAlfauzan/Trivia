const ButtonPrimary = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className, ...restProps } = props;
  return (
    <button
      {...restProps}
      className={`w-fit bg-teal-400 font-bold  px-4 py-2 rounded-sm hover:bg-teal-300 border-none mt-8 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
