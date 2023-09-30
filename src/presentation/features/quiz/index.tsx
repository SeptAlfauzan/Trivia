import { lazy, useEffect, useState } from "react";
import NotAuthorize from "../../components/NotAuthorize";
import ButtonPrimary from "../../components/ButtonPrimary";
import useStartQuiz from "../../hooks/useStartQuiz";
import { AuthUseCase } from "../../../domain/usecase/auth/AuthUseCase";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/ButtonSecondary";

const PlayQuizPage = lazy(() => import("./PlayQuizPage"));
const Quiz = () => {
  const authUseCase = new AuthUseCase();
  const [started, setStarted] = useStartQuiz();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authUseCase = new AuthUseCase();
    setIsLogged(authUseCase.checkAuth());
  }, []);

  const handleStartQuiz = () => {
    setStarted(true);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      {isLogged ? (
        <div className="w-screen h-screen">
          {!started ? (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <h1 className="text-4xl font-light">
                Welcome {authUseCase.getUsername()}
              </h1>
              <h1 className="text-4xl">Are you ready?</h1>
              <div className="grid grid-cols-2 gap-2">
                <ButtonSecondary
                  className="mt-4 col-span-1"
                  onClick={handleGoBack}
                >
                  No Go Back
                </ButtonSecondary>
                <ButtonPrimary
                  className="mt-4 col-span-1"
                  onClick={handleStartQuiz}
                >
                  Start Quiz
                </ButtonPrimary>
              </div>
            </div>
          ) : (
            <PlayQuizPage started={started} />
          )}
        </div>
      ) : (
        <NotAuthorize />
      )}
    </>
  );
};
export default Quiz;
