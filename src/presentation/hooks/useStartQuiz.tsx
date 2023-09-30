import { SetStateAction, useEffect, useState } from "react";
import { QuizUseCase } from "../../domain/usecase/quiz/QuizUseCase";

const useStartQuiz = (): [boolean, React.Dispatch<SetStateAction<boolean>>] => {
  const [started, setStarted] = useState<boolean>(false);
  useEffect(() => {
    const quizUseCase = new QuizUseCase();
    setStarted(quizUseCase.checkIsAnyQuizProgress());
  }, []);
  return [started, setStarted];
};

export default useStartQuiz;
