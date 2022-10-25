import SQL, { SQLStatement } from "sql-template-strings";
import { query } from "..";
import { discord_channel } from "../index.d";

const create = async (channelId: string): Promise<discord_channel> => {
  const createAccountQuery: SQLStatement = SQL`
      INSERT INTO \`discord_channel\`
        (channel_id, channel_state)
      VALUES
        (${channelId}, 1)
    `;

  return {
    channel_id: channelId,
    channel_state: 1,
  };
};

const findById = async (
  channelId: string
): Promise<{
  discord_channel: discord_channel | null;
  error: string | null;
}> => {
  const getDiscordChannelQuery: SQLStatement = SQL`
    SELECT *
    FROM \`discord_channel\`
    WHERE id=${channelId}
  `;

  const result: discord_channel[] = await query(getDiscordChannelQuery);

  if (result.length < 1) {
    return {
      discord_channel: null,
      error: `Could not get jeopardy account with id: ${channelId}`,
    };
  }

  return {
    discord_channel: result[0],
    error: null,
  };
};

const findByIdOrCreate = async (
  channelId: string
): Promise<discord_channel> => {
  const existingChannel = await findById(channelId);

  if (existingChannel.discord_channel) {
    return existingChannel.discord_channel;
  }

  await create(channelId);
  const { discord_channel: createdChannel } = await findById(channelId);

  return createdChannel as discord_channel;
};

export const resetChannelStates = async (): Promise<void> => {
  const resetChannelsQuery: SQLStatement = SQL`
    UPDATE \`discord_channels\`
    SET channel_state=0;
  `;
  await query(resetChannelsQuery);
  return;
};

export const updateChannelState = async (
  channelId: string,
  newState: 0 | 1
): Promise<void> => {
  const updateChannelStateQuery: SQLStatement = SQL`
    UPDATE \`discord_channels\`
    SET channel_state=${newState}
    WHERE id=${channelId};
  `;
  await query(updateChannelStateQuery);
  return;
};

export const DiscordChannel = {
  create,
  findById,
  findByIdOrCreate,
  resetChannelStates,
  updateChannelState,
};