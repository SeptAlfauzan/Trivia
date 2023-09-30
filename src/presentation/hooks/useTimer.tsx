import { SetStateAction, useEffect, useState } from "react";
import { QuizUseCase } from "../../domain/usecase/quiz/QuizUseCase";

const useTimer = (
  duration: number
): [number, React.Dispatch<SetStateAction<boolean>>] => {
  const [seconds, setSeconds] = useState<number>(duration);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const quizUseCase = new QuizUseCase();
    if (quizUseCase.checkIsAnyQuizProgress()) {
      setSeconds(quizUseCase.getProgress().timer);
    } else {
      setIsActive(true);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | number = 0;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);
  return [seconds, setIsActive];
};

export default useTimer;
