interface QuestionNumberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
const QuestionNumberButton = (props: QuestionNumberButtonProps) => {
  const { text, ...restProps } = props;
  return (
    <button
      {...restProps}
      className="py-[8px] px-[8px] bg-slate-200 rounded-sm hover:bg-blue-200"
    >
      {text}
    </button>
  );
};

export default QuestionNumberButton;
