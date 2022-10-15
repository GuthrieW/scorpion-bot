import { query } from "../../../../src/database";
import SQL, { SQLStatement } from "sql-template-strings";
import { v4 as uuid } from "uuid";
import { DiscordUser } from "../index.d";

const USERS_TABLE = {
  CHANNELS: {
    NAME: "discord_users",
    COLUMNS: {
      ID: "id", // string - generated uuid
      USER_ID: "user_id", // string - comes from discord
      MONEY: "money", // integer - the amount of money someone has, defaults to 0
    },
  },
};

export const getOrInsertUser = async (userId: string): Promise<DiscordUser> => {
  let user = await getUser(userId);
  if (!user) {
    await insertUser(userId);
    user = await getUser(userId);
  }

  return user as DiscordUser;
};

export const insertUser = async (userId: string): Promise<void> => {
  const insertUserQuery: SQLStatement = SQL`
    INSERT INTO \`discord_users\`
      (id, user_id, money)
    VALUES
      (${uuid()}, ${userId}, 0);
  `;
  await query(insertUserQuery);
  return;
};

export const getUser = async (userId: string): Promise<DiscordUser | null> => {
  const getUserQuery: SQLStatement = SQL`
    SELECT id, user_id, money
    FROM \`discord_users\`
    WHERE user_id=${userId}
    LIMIT 1;
  `;

  const result: DiscordUser[] = await query(getUserQuery);
  if (result.length < 1) {
    return null;
  }

  return result[0];
};

export const addUserMoney = async (
  userId: string,
  moneyToAdd: number
): Promise<number> => {
  const user: DiscordUser = await getOrInsertUser(userId);
  const newMoneyAmount: number = user.money + moneyToAdd;
  const addMoneyQuery: SQLStatement = SQL`
    UPDATE \`discord_users\`
    SET money=${newMoneyAmount}
    WHERE user_id=${userId};
  `;
  await query(addMoneyQuery);
  return newMoneyAmount;
};

export const subtractUserMoney = async (
  userId: string,
  moneyToSubtract: number
): Promise<number> => {
  const user: DiscordUser = await getOrInsertUser(userId);
  const newMoneyAmount: number = user.money - moneyToSubtract;
  const subtractMoneyQuery: SQLStatement = SQL`
  UPDATE \`discord_users\`
  SET money=${newMoneyAmount}
  WHERE user_id=${userId};
`;
  await query(subtractMoneyQuery);
  return newMoneyAmount;
};
