import {
  ANSWER_PARENTHESES_REGEX,
  ENGLISH_ARTICLES,
  PREPENDED_QUESTION_REGEX,
  REPLACE_PARENTHESES_REGEX,
  SIMILARITY_THRESHOLD,
  USER_ANSWER_REGEX,
} from "./constants";
// @ts-ignore
import { compareTwoStrings } from "string-similarity";

export const isCorrectAnswer = (
  userAnswer: string,
  correctAnswer: string
): boolean => {
  userAnswer = sanitizeUserAnswer(userAnswer);

  // const stringSimilarity = require("string-similarity");
  const similarity = compareTwoStrings(userAnswer, correctAnswer);

  if (ANSWER_PARENTHESES_REGEX.test(correctAnswer)) {
    const matches = ANSWER_PARENTHESES_REGEX.exec(
      correctAnswer
    ) as RegExpExecArray;

    if (
      isCorrectAnswer(
        matches[0].replace(REPLACE_PARENTHESES_REGEX, ""),
        correctAnswer
      )
    ) {
      return true;
    }

    if (isCorrectAnswer(matches[1], correctAnswer)) {
      return true;
    }
  }

  ENGLISH_ARTICLES.forEach((article) => {
    if (userAnswer.indexOf(article + " ") === 0) {
      if (
        isCorrectAnswer(userAnswer.substring(article.length + 1), correctAnswer)
      ) {
        return true;
      }
    } else if (userAnswer.indexOf(" " + article + " ") === 0) {
      if (
        isCorrectAnswer(userAnswer.substring(article.length + 2), correctAnswer)
      ) {
        return true;
      }
    } else if (correctAnswer.indexOf(article + " ") === 0) {
      if (
        isCorrectAnswer(userAnswer, correctAnswer.substring(article.length + 1))
      ) {
        return true;
      }
    } else if (correctAnswer.indexOf(" " + article + " ") === 0) {
      if (
        isCorrectAnswer(userAnswer, correctAnswer.substring(article.length + 2))
      ) {
        return true;
      }
    }
  });

  return similarity > SIMILARITY_THRESHOLD;
};

const sanitizeUserAnswer = (userAnswer: string): string =>
  userAnswer
    .toLowerCase()
    .replace(USER_ANSWER_REGEX, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(PREPENDED_QUESTION_REGEX, "")
    .trim();

export const isQuestionFormat = (userAnswer: string): boolean => {
  const matches = userAnswer
    .replace(/[^\w\s]/i, "")
    .match(PREPENDED_QUESTION_REGEX);
  return Boolean(matches);
};
