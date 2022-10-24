import { query } from "../index";
import SQL, { SQLStatement } from "sql-template-strings";
import { v4 as uuid } from "uuid";
import { discord_channel } from "..//index.d";

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
): Promise<discord_channel> => {
  let channel = await getChannel(channelId);
  if (!channel) {
    await insertChannel(channelId);
    channel = await getChannel(channelId);
  }

  return channel as discord_channel;
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
): Promise<discord_channel | null> => {
  const getChannelQuery: SQLStatement = SQL`
    SELECT id, channel_id, channel_state
    FROM \`discord_channels\`
    WHERE channel_id=${channelId}
    LIMIT 1;
  `;

  const result: discord_channel[] = await query(getChannelQuery);
  if (result.length < 1) {
    return null;
  }

  return result[0];
};
