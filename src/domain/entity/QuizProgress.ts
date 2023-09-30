import { QuizQuestion } from "./QuizQuestion";

export interface QuizProgress {
  timer: number;
  answers: string[];
  questions: QuizQuestion[];
  currentQuizIndex: number;
}
