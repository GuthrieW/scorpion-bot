import { query } from "src/database";
import SQL, { SQLStatement } from "sql-template-strings";
import { v4 as uuid } from "uuid";
import { DiscordChannel } from "../index.d";

const JEOPARDY_TABLE = {
  CHANNELS: {
    NAME: "discord_channels",
    COLUMNS: {
      ID: "id", // string - generated uuid
      CHANNEL_ID: "channel_id", // string - comes from discord
      CHANNEL_STATE: "channel_state", // tinyint - defaults to 0, whether or not the channel is currently tied up with a task
    },
  },
};

export const getOrInsertChannel = async (
  channelId: string
): Promise<DiscordChannel> => {
  let channel = await getChannel(channelId);
  if (!channel) {
    await insertChannel(channelId);
    channel = await getChannel(channelId);
  }

  return channel as DiscordChannel;
};

export const insertChannel = async (channelId: string): Promise<void> => {
  const insertChannelQuery: SQLStatement = SQL`
    INSERT INTO \`discord_channels\`
      (id, channel_id, channel_state)
    VALUES
      (${uuid()}, ${channelId}, 1);
  `;
  await query(insertChannelQuery);
  return;
};

export const getChannel = async (
  channelId: string
): Promise<DiscordChannel | null> => {
  const getChannelQuery: SQLStatement = SQL`
    SELECT id, channel_id, channel_state
    FROM \`discord_channels\`
    WHERE channel_id=${channelId}
    LIMIT 1;
  `;

  const result: DiscordChannel[] = await query(getChannelQuery);
  if (result.length < 1) {
    return null;
  }

  return result[0];
};

export const updateChannelState = async (
  channelId: string,
  newState: 0 | 1
): Promise<void> => {
  const updateChannelStateQuery: SQLStatement = SQL`
    UPDATE \`discord_channels\`
    SET channel_state=${newState}
    WHERE channel_id=${channelId};
  `;
  await query(updateChannelStateQuery);
  return;
};

export const resetChannelStates = async (): Promise<void> => {
  const resetChannelsQuery: SQLStatement = SQL`
    UPDATE \`discord_channels\`
    SET channel_state=0;
  `;
  await query(resetChannelsQuery);
  return;
};
