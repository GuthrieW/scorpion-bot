import axios from "axios";
import {
  ClueApiResponse,
  ClueData,
  GameApiResponse,
  GameData,
  JeopardyQuestion,
} from "src/jeopardy";
import { CLUEBASE_URL } from "./constants";

export const getRandomQuestion = async (): Promise<JeopardyQuestion> => {
  const randomClue = await fetchRandomClue();
  const game = await fetchGame(randomClue.game_id);
  const { answer, normalizedAnswer } = sanitizeAnswer(randomClue);

  const jeopardyQuestion: JeopardyQuestion = {
    answer,
    normalizedAnswer,
    clue: randomClue.clue,
    value: randomClue.value ?? 200,
    category: randomClue.category,
    airdate: game.air_date,
  };

  return jeopardyQuestion;
};

export const formatQuestion = (question: JeopardyQuestion): string => {
  return `The category is **${question.category.toLocaleUpperCase()}** for $${
    question.value
  }:\n\`\`\`${question.clue}\`\`\``;
};

const sanitizeAnswer = (
  clue: ClueData
): { answer: string; normalizedAnswer: string } => {
  // clean up html elements
  const answer = clue.response.replace(/<(?:.|\n)*?>/gm, "");
  // normalize answer for matching
  const normalizedAnswer = answer.replace(/[^a-zA-Z0-9() ]/g, "").toLowerCase();

  return { answer, normalizedAnswer };
};

const fetchRandomClue = async (): Promise<ClueData> => {
  const randomClueResponse: ClueApiResponse = (
    await axios({
      method: "GET",
      url: `${CLUEBASE_URL}/clues/random`,
    })
  ).data;
  const randomClueData: ClueData = randomClueResponse.data[0];
  const { clue, category, response } = randomClueData;

  if (
    !clue ||
    !category ||
    clue == "null" ||
    clue.trim() == "" ||
    clue == "=" ||
    clue.includes("video clue") ||
    clue.includes("audio clue") ||
    clue.includes("seen here") ||
    response.includes("----") ||
    response == "="
  ) {
    console.log("Bad clue", randomClueData);
    return await fetchRandomClue();
  }

  return randomClueData;
};

const fetchGame = async (gameId: number): Promise<GameData> => {
  const gameResponse: GameApiResponse = (
    await axios({
      method: "GET",
      url: `${CLUEBASE_URL}/games/${gameId}`,
    })
  ).data;
  const gameData: GameData = gameResponse.data[0];
  return gameData;
};

// const res = JSON.parse((await get(CLUEBASE_URL + "clues/random")).text)
//   .data[0];
// if (
//   !res.clue ||
//   !res.category ||
//   res.clue == "null" ||
//   res.clue.trim() == "" ||
//   res.clue == "=" ||
//   res.clue.includes("video clue") ||
//   res.clue.includes("audio clue") ||
//   res.clue.includes("seen here") ||
//   res.response.includes("----") ||
//   res.response == "="
// ) {
//   return getQuestion();
// }
