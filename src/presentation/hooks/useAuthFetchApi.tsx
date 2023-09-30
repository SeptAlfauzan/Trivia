import { useEffect, useState } from "react";
import { QuizQuestion } from "../../domain/entity/QuizQuestion";
import { QuizUseCase } from "../../domain/usecase/quiz/QuizUseCase";
import { ThrowError } from "../../utils/Error";

const useAuthFetchData = (
  endpoint: string,
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>,
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>
): [
  boolean,
  number,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  useEffect(() => {
    const quizUseCase = new QuizUseCase();
    const fetchQuestions = async () => {
      try {
        const questions = await quizUseCase.getQuiz(endpoint);
        setQuestions(questions);
        if (quizUseCase.checkIsAnyQuizProgress()) {
          setCurrentQuestionIdx(quizUseCase.getProgress().currentQuizIndex);
          setAnswers(quizUseCase.getProgress().answers);
          setPaused(true);
        } else {
          setAnswers([...Array(questions.length).map(() => "")]);
        }
      } catch (error) {
        ThrowError("Error fetching data..");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [endpoint, setAnswers, setQuestions]);

  return [
    isLoading,
    currentQuestionIdx,
    paused,
    setPaused,
    setCurrentQuestionIdx,
  ];
};

export default useAuthFetchData;
