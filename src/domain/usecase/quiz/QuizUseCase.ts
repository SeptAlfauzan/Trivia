import axios from "axios";
import { PROGRESS, QUIZ_RESULT } from "../../../utils/Constanta";
import { QuizQuestionsResponseToQuizQuestion } from "../../../utils/DataMapper";
import { QuizProgress } from "../../entity/QuizProgress";
import { QuizQuestion } from "../../entity/QuizQuestion";
import { QuizResult } from "../../entity/QuizResult";
import { IQuizUseCase } from "./IQuizUseCase";
import { QuizQuestionsResponse } from "../../../data/network/QuizQuestionsResponse";
import { ThrowError } from "../../../utils/Error";

export class QuizUseCase implements IQuizUseCase {
  private storage: Storage;
  constructor() {
    this.storage = localStorage;
  }
  async getQuiz(apiEndpoint: string): Promise<QuizQuestion[]> {
    try {
      if (this.checkIsAnyQuizProgress()) {
        return this.getProgress().questions;
      } else {
        const response = await axios.get(apiEndpoint);
        const data: QuizQuestionsResponse = response.data;
        const parsedData: QuizQuestion[] = data.results.map((item) =>
          QuizQuestionsResponseToQuizQuestion(item)
        );
        return parsedData;
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  checkIsAnyQuizProgress(): boolean {
    try {
      const progress = this.storage.getItem(PROGRESS);
      if (progress == null) return false;

      const parsedProgress: QuizProgress = JSON.parse(progress);
      const { answers, questions, timer, currentQuizIndex } = parsedProgress;
      return (
        answers != null &&
        questions != null &&
        timer != null &&
        currentQuizIndex != null
      );
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) errorMessage = error.message;
      console.log(errorMessage);
      return false;
    }
  }
  clearProgress(): void {
    try {
      this.storage.removeItem(PROGRESS);
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) errorMessage = error.message;
      console.log(errorMessage);
    }
  }
  saveProgress(data: QuizProgress): void {
    try {
      this.storage.setItem(PROGRESS, JSON.stringify(data));
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) errorMessage = error.message;
      console.log(errorMessage);
    }
  }
  save(
    dataAnswers: string[],
    quizQuestions: QuizQuestion[],
    isFinished: boolean
  ): void {
    try {
      let corrects = 0;
      dataAnswers.forEach((element, index) => {
        if (element === quizQuestions[index].correctAnswer) corrects += 1;
      });
      const answered = dataAnswers.filter(
        (element) => element !== undefined
      ).length;
      const score = (corrects / quizQuestions.length) * 100;

      const result: QuizResult = {
        correct: corrects,
        wrong: answered - corrects,
        answered: answered,
        score: Number(score.toFixed(2)),
      };
      this.storage.setItem(QUIZ_RESULT, JSON.stringify(result));
      if (isFinished) this.storage.removeItem(PROGRESS);
    } catch (error) {
      throw ThrowError(error);
    }
  }
  getProgress(): QuizProgress {
    try {
      const result = this.storage.getItem(PROGRESS);
      if (result == null) throw ThrowError("No progress found!");

      const parsedProgress: QuizProgress = JSON.parse(result);
      return parsedProgress;
    } catch (error) {
      throw ThrowError(error);
    }
  }
  getResult(): QuizResult {
    try {
      const result = this.storage.getItem(QUIZ_RESULT);
      if (result == null) throw ThrowError("There is no quiz result!");
      return JSON.parse(result);
    } catch (error) {
      throw ThrowError(error);
    }
  }
}
