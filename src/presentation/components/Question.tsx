interface QuestionProps {
  index: number;
  question: string;
}
const Question = (props: QuestionProps) => {
  const { index, question } = props;
  return (
    <>
      <h5 className="text-lg font-bold mb-3">Question {index}</h5>
      <p className="text-slate-600">{question}</p>
    </>
  );
};

export default Question;
