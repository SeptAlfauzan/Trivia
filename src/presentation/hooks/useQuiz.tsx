import { SetStateAction, useEffect, useState } from "react";
import { QuizQuestion } from "../../domain/entity/QuizQuestion";
import { QuizUseCase } from "../../domain/usecase/quiz/QuizUseCase";
import { useNavigate } from "react-router-dom";

const useQuiz = (): [
  string[],
  QuizQuestion[],
  React.Dispatch<SetStateAction<string[]>>,
  React.Dispatch<SetStateAction<QuizQuestion[]>>
] => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const finishQuiz = () => {
      const quizUseCase = new QuizUseCase();
      quizUseCase.save(answers, questions, true);
      navigate("/score");
    };
    const quizUseCase = new QuizUseCase();
    quizUseCase.save(answers, questions, false);

    const isAnswersAndQuestionsEmpty =
      questions.length == 0 && answers.length == 0;
    const isAnsweredAndQuestionsLengthAreSame =
      answers.filter((el) => el != undefined).length == questions.length;

    if (!isAnswersAndQuestionsEmpty && isAnsweredAndQuestionsLengthAreSame) {
      finishQuiz();
    }
  }, [answers, navigate, questions]);

  return [answers, questions, setAnswers, setQuestions];
};

export default useQuiz;
