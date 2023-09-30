import { useEffect, useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import { QuizUseCase } from "../../../domain/usecase/quiz/QuizUseCase";
import { QuizResult } from "../../../domain/entity/QuizResult";
import ButtonSecondary from "../../components/ButtonSecondary";
import ScoreCard from "../../components/ScoreCard";
import { Link } from "react-router-dom";

const Score = () => {
  const [isScoreOpened, setIsScoreOpened] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<QuizResult>();
  useEffect(() => {
    try {
      const quizUseCase = new QuizUseCase();
      const result: QuizResult = quizUseCase.getResult();
      console.log(result.answered);
      setResult(result);
    } catch (error) {
      setError(`Error: ${error}`);
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center">
      {!isScoreOpened ? (
        <div className="self-center">
          <h1>You've finished your quiz🎉</h1>
          <ButtonPrimary onClick={() => setIsScoreOpened(true)}>
            See Your Score
          </ButtonPrimary>
        </div>
      ) : (
        <div className="self-center md:w-1/2 md:px-0 px-[32px]">
          {error && <p>{error}</p>}
          {result && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <ScoreCard className="col-span-1">
                  <h5 className="mb-4">Correct Answer:</h5>
                  <h5 className="text-2xl text-center font-bold text-slate-800">
                    {result.correct}
                  </h5>
                </ScoreCard>
                <ScoreCard className="col-span-1">
                  <h5 className="mb-4">Wrong Answer:</h5>
                  <h5 className="text-2xl text-center font-bold text-slate-800">
                    {result.wrong}
                  </h5>
                </ScoreCard>
                <ScoreCard className="col-span-1">
                  <h5 className="mb-4">Answered Questions:</h5>
                  <h5 className="text-2xl text-center font-bold text-slate-800">
                    {result.answered}
                  </h5>
                </ScoreCard>
                <ScoreCard className="col-span-3">
                  <h5 className="mb-4">Total Score:</h5>
                  <h5 className="text-8xl text-center font-bold text-slate-800">
                    {result.score}
                  </h5>
                </ScoreCard>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link to={"/"}>
                  <ButtonSecondary className="col-span-1 w-full">
                    Back to Home
                  </ButtonSecondary>
                </Link>
                <Link to={"/quiz"}>
                  <ButtonPrimary className="col-span-1 w-full">
                    Start new Quiz
                  </ButtonPrimary>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Score;
