import axios from "axios";
import { CLUEBASE_URL } from "./_constants";

export type JeopardyQuestion = {
  answer: string;
  normalizedAnswer: string;
  clue: string;
  value: number;
  category: string;
  airdate: string;
};

export type ClueApiResponse = {
  status: "success" | "failure";
  data: ClueData[];
};

export type ClueData = {
  id: number;
  game_id: number;
  value: number;
  daily_double: boolean;
  round: "J!" | "DJ!";
  category: string;
  clue: string;
  response: string;
};

export type GameApiResponse = {
  status: "success" | "failure";
  data: GameData[];
};

export type GameData = {
  id: number;
  episode_num: number;
  season_id: number;
  air_date: string;
  notes: string;
  contestant1: number;
  contestant2: number;
  contestant3: number;
  winner: number;
  score1: number;
  score2: number;
  score3: number;
};

export const getRandomQuestion = async (): Promise<JeopardyQuestion> => {
  const randomClue = await fetchRandomClue();
  const game = await fetchGame(randomClue.game_id);
  const { answer, normalizedAnswer } = sanitizeApiAnswer(randomClue);

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

const sanitizeApiAnswer = (
  clue: ClueData
): { answer: string; normalizedAnswer: string } => {
  // clean up html elements
  const answer = clue.response.replace(/<(?:.|\n)*?>/gm, "");
  // normalize answer for matching
  const normalizedAnswer = answer.replace(/[^a-zA-Z0-9() ]/g, "").toLowerCase();

  return { answer, normalizedAnswer };
};
