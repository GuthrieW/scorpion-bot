import SQL, { SQLStatement } from "sql-template-strings";
import { query } from "..";
import { discord_channel } from "../index.d";

const create = async (channelId: string): Promise<discord_channel> => {
  const createChannelQuery: SQLStatement = SQL`
    INSERT INTO \`discord_channel\`
      (channel_id, channel_state)
    VALUES
      (${channelId}, 1)
  `;

  console.log("this is before the query", createChannelQuery);

  const result: discord_channel[] = await query(createChannelQuery);

  console.log("this is after the query", result);

  return {
    channel_id: channelId,
    channel_state: 1,
  };
};

const findByChannelId = async (
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
      error: `Could not get discord channel with id: ${channelId}`,
    };
  }

  return {
    discord_channel: result[0],
    error: null,
  };
};

const findByChannelIdOrCreate = async (
  channelId: string
): Promise<discord_channel> => {
  const existingChannel = await findByChannelId(channelId);

  console.log("existingChannel", existingChannel);
  if (existingChannel.discord_channel) {
    return existingChannel.discord_channel;
  }

  const newChannel = await create(channelId);
  console.log("newChannel", newChannel);
  const { discord_channel: createdChannel } = await findByChannelId(channelId);

  console.log("createdChannel", createdChannel);
  return createdChannel as discord_channel;
};

export const resetChannelStates = async (): Promise<void> => {
  return;
  const resetChannelsQuery: SQLStatement = SQL`
    UPDATE \`discord_channel\`
    SET channel_state=0;
  `;
  const result = await query(resetChannelsQuery);
  console.log("result", result);
  return;
};

export const updateChannelState = async (
  channelId: string,
  newState: 0 | 1
): Promise<void> => {
  return;
  const updateChannelStateQuery: SQLStatement = SQL`
    UPDATE \`discord_channel\`
    SET channel_state=${newState}
    WHERE id=${channelId};
  `;
  await query(updateChannelStateQuery);
  return;
};

export const DiscordChannel = {
  create,
  findByChannelId,
  findByChannelIdOrCreate,
  resetChannelStates,
  updateChannelState,
};
