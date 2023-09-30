import { QuizProgress } from "../../entity/QuizProgress";
import { QuizQuestion } from "../../entity/QuizQuestion";
import { QuizResult } from "../../entity/QuizResult";

export interface IQuizUseCase {
  clearProgress(): void;
  getQuiz(apiEndpoint: string): Promise<QuizQuestion[]>;
  saveProgress(data: QuizProgress): void;
  save(
    dataAnswers: string[],
    quizQuestions: QuizQuestion[],
    isFinished: boolean
  ): void;
  getProgress(): QuizProgress;
  getResult(): QuizResult;
  checkIsAnyQuizProgress(): boolean;
}
