const ScoreCard = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { children, className, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={`${className} p-4 rounded-md shadow-md text-lg text-slate-400`}
    >
      {children}
    </div>
  );
};

export default ScoreCard;
