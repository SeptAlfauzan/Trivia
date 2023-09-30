const ButtonSecondary = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className, ...restProps } = props;
  return (
    <button
      {...restProps}
      className={`${className} w-fit bg-slate-500 text-white font-bold  px-4 py-2 rounded-sm hover:bg-slate-600 border-none mt-8`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
