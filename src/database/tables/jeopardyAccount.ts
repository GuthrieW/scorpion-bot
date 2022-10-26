import SQL from "sql-template-strings";
import { query } from "..";
import { jeopardy_account } from "../index.d";
import { DiscordUser } from "./discordUser";

const create = async (
  newJeopardyAccount: jeopardy_account
): Promise<jeopardy_account> => {
  const { discord_id } = newJeopardyAccount;

  const createAccountQuery = SQL`
    INSERT INTO \`jeopardy_account\`
      ( discord_id, correct_answers, wrong_answers, money)
    VALUES
      ( ${discord_id}, 0, 0, 0)
    RETURNING discord_id, correct_answers, wrong_answers, money;
  `;

  const result = await query(createAccountQuery);

  return {
    ...newJeopardyAccount,
    correct_answers: 0,
    wrong_answers: 0,
    money: 0,
  };
};

const findByDiscordIdOrCreate = async (
  discordId: string
): Promise<jeopardy_account> => {
  const existingAccount = await findByDiscordId(discordId);
  console.log("existingAccount", existingAccount);
  if (existingAccount.jeopardy_account) {
    return existingAccount.jeopardy_account;
  }

  await create({
    discord_id: discordId,
  });

  const { jeopardy_account: createdUser } = await findByDiscordId(discordId);
  console.log("createdUser", createdUser);

  return createdUser as jeopardy_account;
};

const findById = async (
  jeopardyAccountId: string
): Promise<{
  jeopardy_account: jeopardy_account | null;
  error: string | null;
}> => {
  const getJeopardyAccountQuery = SQL`
    SELECT *
    FROM \`jeopardy_account\`
    WHERE id=${jeopardyAccountId}
  `;

  const result: jeopardy_account[] = await query(getJeopardyAccountQuery);

  if (result.length < 1) {
    return {
      jeopardy_account: null,
      error: `Could not get jeopardy account with id: ${jeopardyAccountId}`,
    };
  }

  return {
    jeopardy_account: result[0],
    error: null,
  };
};

const findByDiscordId = async (
  discordId: string
): Promise<{
  jeopardy_account: jeopardy_account | null;
  error: string | null;
}> => {
  const getJeopardyAccountQuery = SQL`
    SELECT *
    FROM \`jeopardy_account\`
    WHERE discord_id=${discordId}
  `;

  const result: jeopardy_account[] = await query(getJeopardyAccountQuery);

  if (result.length < 1) {
    return {
      jeopardy_account: null,
      error: `Could not get jeopardy account with discord id: ${discordId}`,
    };
  }

  return {
    jeopardy_account: result[0],
    error: null,
  };
};

const updateCorrectAnswer = async (
  id: string,
  moneyToAdd: number
): Promise<{ discord_id: string; money: number }> => {
  const updateCorrectAnswerQuery = SQL`
    UPDATE \`jeopardy_account\`
    SET money = money + ${moneyToAdd},
    correct_answers = correct_answers + 1
    WHERE id=${id}
    RETURNING id, discord_id, money;
  `;

  const result: jeopardy_account[] = await query(updateCorrectAnswerQuery);
  // console.log("result correct", result);
  return {
    discord_id: result[0].discord_id as string,
    money: result[0].money as number,
  };
};

const updateWrongAnswer = async (
  id: string,
  moneyToSubtract: number
): Promise<{ discord_id: string; money: number }> => {
  const updateWrongAnswerQuery = SQL`
    UPDATE \`jeopardy_account\`
    SET money = money - ${moneyToSubtract},
      wrong_answers = wrong_answers + 1
    WHERE id=${id}
    RETURNING id, discord_id, money;
  `;

  const result: jeopardy_account[] = await query(updateWrongAnswerQuery);
  // console.log("result wrong", result);
  return {
    discord_id: result[0].discord_id as string,
    money: result[0].money as number,
  };
};

export const JeopardyAccount = {
  create,
  findByDiscordIdOrCreate,
  findById,
  findByDiscordId,
  updateCorrectAnswer,
  updateWrongAnswer,
};
