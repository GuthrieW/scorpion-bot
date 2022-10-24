import SQL from "sql-template-strings";
import { query } from "..";
import { discord_user } from "../index.d";
import { v4 as uuid } from "uuid";

const create = async (discordId: string): Promise<discord_user> => {
  const id = uuid();
  const createTeamQuery = SQL`
    INSERT INTO \`discord_user\`
      (id, discord_id)
    VALUES
      (${id}, ${discordId});
  `;

  const result = await query(createTeamQuery);
  return {
    id,
    discord_id: discordId,
  };
};

const findByDiscordIdOrCreate = async (
  discordId: string
): Promise<discord_user> => {
  const existingUser = await findByDiscordId(discordId);

  if (existingUser.discord_user) {
    return existingUser.discord_user;
  }

  await create(discordId);
  const createdUser = await findByDiscordId(discordId);
  return createdUser.discord_user as discord_user;
};

const findById = async (
  userId: string
): Promise<{ discord_user: discord_user | null; error: string | null }> => {
  const getDiscordUserQuery = SQL`
    SELECT *
    FROM \`discord_user\`
    WHERE id=${userId};
  `;

  const result: discord_user[] = await query(getDiscordUserQuery);

  if (result.length < 1) {
    return {
      discord_user: null,
      error: `Could not get user with id: ${userId}`,
    };
  }

  return {
    discord_user: result[0],
    error: null,
  };
};

const findByDiscordId = async (
  discordId: string
): Promise<{ discord_user: discord_user | null; error: string | null }> => {
  const getDiscordUserQuery = SQL`
    SELECT *
    FROM \`discord_user\`
    WHERE discord_id=${discordId};
  `;

  const result: discord_user[] = await query(getDiscordUserQuery);

  if (result.length < 1) {
    return {
      discord_user: null,
      error: `Could not get user with discordId: ${discordId}`,
    };
  }

  return {
    discord_user: result[0],
    error: null,
  };
};

export const DiscordUser = {
  create,
  findById,
  findByDiscordId,
  findByDiscordIdOrCreate,
};
