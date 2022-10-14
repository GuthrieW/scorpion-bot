import {
  ANSWER_PARENTHESES_REGEX,
  ENGLISH_ARTICLES,
  PREPENDED_QUESTION_REGEX,
  REPLACE_PARENTHESES_REGEX,
  SIMILARITY_THRESHOLD,
  USER_ANSWER_REGEX,
} from "./_constants";
// @ts-ignore
import { compareTwoStrings } from "string-similarity";
import { JeopardyQuestion } from "./index.d";
import { Message } from "discord.js";

export const isQuestionFormat = (userAnswer: string): boolean => {
  const matches = userAnswer
    .replace(/[^\w\s]/i, "")
    .match(PREPENDED_QUESTION_REGEX);
  return Boolean(matches);
};

export const formatQuestion = (question: JeopardyQuestion): string => {
  const questionDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
  }).format(new Date(question.airdate));

  return `(${questionDate}) The category is **${question.category.toLocaleUpperCase()}** for $${
    question.value
  }:\n\`\`\`${question.clue}\`\`\``;
};

export const evaluateAnswer = (
  message: Message<boolean>,
  answer: string
): boolean => {
  if (!isQuestionFormat(message.content)) {
    return false;
  }

  const isCorrect = isCorrectAnswer(message.content, answer);

  message.reply(
    `That is ${isCorrect ? "correct" : "incorrect"}, ${
      message.author.username
    }!`
  );

  return isCorrect;
};

const isCorrectAnswer = (
  userAnswer: string,
  correctAnswer: string
): boolean => {
  userAnswer = userAnswer
    .toLowerCase()
    .replace(USER_ANSWER_REGEX, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(PREPENDED_QUESTION_REGEX, "")
    .trim();

  if (ANSWER_PARENTHESES_REGEX.test(correctAnswer)) {
    const matches = ANSWER_PARENTHESES_REGEX.exec(
      correctAnswer
    ) as RegExpExecArray;

    const cleanedMatches = matches.map((match: string) =>
      match.replace(REPLACE_PARENTHESES_REGEX, "")
    );

    if (
      isCorrectAnswer(cleanedMatches[0], correctAnswer) ||
      isCorrectAnswer(cleanedMatches[1], correctAnswer)
    ) {
      return true;
    }
  }

  ENGLISH_ARTICLES.forEach((article: string) => {
    if (userAnswer.indexOf(article + " ") === 0) {
      userAnswer = userAnswer.substring(article.length + 1);
    } else if (userAnswer.indexOf(" " + article + " ") === 0) {
      userAnswer = userAnswer.substring(article.length + 2);
    } else if (correctAnswer.indexOf(article + " ") === 0) {
      correctAnswer = correctAnswer.substring(article.length + 1);
    } else if (correctAnswer.indexOf(" " + article + " ") === 0) {
      correctAnswer = correctAnswer.substring(article.length + 2);
    } else {
      return;
    }

    if (isCorrectAnswer(userAnswer, correctAnswer)) {
      return true;
    }
  });

  return compareTwoStrings(userAnswer, correctAnswer) > SIMILARITY_THRESHOLD;
};
