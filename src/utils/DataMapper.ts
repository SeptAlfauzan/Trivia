import { QuizQuestionsResult } from "../data/network/QuizQuestionsResponse";
import { QuizQuestion } from "../domain/entity/QuizQuestion";

export const QuizQuestionsResponseToQuizQuestion = (
  raw: QuizQuestionsResult
): QuizQuestion => {
  const answers = [...raw.incorrect_answers, raw.correct_answer];
  const randomAnswers = shuffleListElements(answers);
  const result: QuizQuestion = {
    question: raw.question,
    answers: randomAnswers,
    correctAnswer: raw.correct_answer,
  };
  return result;
};

const shuffleListElements = (list: string[]): string[] => {
  list.map((_, index) => {
    const randomIndex: number = Math.floor(Math.random() * (index + 1));
    [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
  });
  return list;
};
