import Answer from "../../components/Answer";
import Question from "../../components/Question";
import useQuiz from "../../hooks/useQuiz";
import useAuthFetchApi from "../../hooks/useAuthFetchApi";
import { useEffect } from "react";
import { QuizProgress } from "../../../domain/entity/QuizProgress";
import { QuizUseCase } from "../../../domain/usecase/quiz/QuizUseCase";
import { formatTime } from "../../../utils/Timer";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import useTimer from "../../hooks/useTimer";
import { ThreeDots } from "react-loader-spinner";
import { ThrowError } from "../../../utils/Error";

interface PlayQuizPageProps {
  started: boolean;
}
const PlayQuizPage = (props: PlayQuizPageProps) => {
  const { started } = props;

  const [timer, setTimerActive] = useTimer(900);
  const [answers, questions, setAnswers, setQuestions] = useQuiz();
  const navigate = useNavigate();
  const [
    isLoading,
    currentQuestionIdx,
    paused,
    setPaused,
    setCurrentQuestionIdx,
  ] = useAuthFetchApi(
    "https://opentdb.com/api.php?amount=30&category=27&type=multiple",
    setQuestions,
    setAnswers
  );

  useEffect(() => {
    const handleTabClosed = () => {
      try {
        if (!started) return;
        const quizUseCase = new QuizUseCase();
        const data: QuizProgress = {
          timer: timer,
          answers: answers,
          questions: questions,
          currentQuizIndex: currentQuestionIdx,
        };
        quizUseCase.saveProgress(data);
      } catch (error) {
        alert(error);
      }
    };
    window.addEventListener("unload", handleTabClosed);
    return () => {
      window.removeEventListener("unload", handleTabClosed);
    };
  }, [answers, currentQuestionIdx, questions, timer, started]);

  const handleOnChooseAnswer = (index: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handleOpenScore = () => {
    try {
      const quizUseCase = new QuizUseCase();
      quizUseCase.clearProgress();
      navigate("/score");
    } catch (error) {
      ThrowError(error);
    }
  };

  const handleResetProgressRestartQuiz = () => {
    try {
      const quizUseCase = new QuizUseCase();
      quizUseCase.clearProgress();
      navigate("/");
    } catch (error) {
      ThrowError(error);
    }
  };

  const handleResumeQuiz = () => {
    try {
      setPaused(false);
      setTimerActive(true);
    } catch (error) {
      ThrowError;
    }
  };

  return (
    <>
      <Modal
        text="You're run out of time"
        title="Time's Out!"
        confirmText="Score"
        cancelText={undefined}
        isOpen={timer <= 0}
        onCancel={undefined}
        onConfirm={handleOpenScore}
      />

      <Modal
        text="Resume Your Quiz Progress?"
        title="Quiz Progress Discovered!"
        confirmText="Resume"
        cancelText="No, go back to home"
        isOpen={paused}
        onCancel={handleResetProgressRestartQuiz}
        onConfirm={handleResumeQuiz}
      />

      <div className="grid grid-cols-4 md:h-screen h-full w-full  overflow-x-hidden">
        <div className="md:col-span-1 col-span-4 px-8 py-12">
          <div>
            <div className="col-span-5 grid md:grid-cols-3 grid-cols-2 gap-4">
              <h5
                className={`font-bold text-xl md:col-span-3 col-span-1 ${
                  answers.filter((el) => el != undefined).length <
                  questions.length / 2
                    ? "bg-slate-100"
                    : "bg-teal-300"
                } py-8 px-4 rounded-md`}
              >
                Answered: {answers.filter((el) => el != undefined).length}/
                {questions.length}
              </h5>
              <h5
                className={`font-bold text-xl md:col-span-3 col-span-1 ${
                  timer <= 10 ? "bg-pink-500 text-white" : "bg-teal-300"
                }  py-8 px-4 rounded-md`}
              >
                Timer: {formatTime(timer)}
              </h5>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 col-span-4 bg-slate-50 h-full overflow-y-auto">
          {!isLoading && questions.length != 0 ? (
            <div className="py-12 px-8">
              <Question
                index={currentQuestionIdx + 1}
                question={questions[currentQuestionIdx].question}
              />
              {/* button answer */}
              <div className="mt-8 grid grid-cols-2 gap-2">
                {questions[currentQuestionIdx].answers.map((data, index) => (
                  <Answer
                    selected={data == answers[currentQuestionIdx]}
                    key={index}
                    onClick={() =>
                      handleOnChooseAnswer(currentQuestionIdx, data)
                    }
                  >
                    <p className="absolute left-4 top-4 text-slate-500">
                      {String.fromCharCode(65 + index)}
                    </p>
                    <h5 className="text-center text-xl">{data}</h5>
                  </Answer>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#03fcdb"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayQuizPage;
