import { query } from "src/database";
import SQL from "sql-template-strings";
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
  const insertChannelQuery = SQL`
    INSERT INTO \`${JEOPARDY_TABLE.CHANNELS.NAME}\`
    (${JEOPARDY_TABLE.CHANNELS.COLUMNS.ID}, ${
    JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_ID
  }, ${JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_STATE})
    VALUES(${uuid()}, ${channelId}, 1)
  `;
  await query(insertChannelQuery);
  return;
};

export const getChannel = async (
  channelId: string
): Promise<DiscordChannel | null> => {
  const getChannelQuery = SQL`
    SELECT ${JEOPARDY_TABLE.CHANNELS.COLUMNS.ID}, ${JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_ID}, ${JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_STATE}
    FROM ${JEOPARDY_TABLE.CHANNELS.NAME}
    WHERE ${JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_ID}=${channelId}
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
  const updateChannelStateQuery = SQL`
    UPDATE \`${JEOPARDY_TABLE.CHANNELS.NAME}\`
    SET ${JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_STATE}=${newState}
    WHERE ${JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_ID}=${channelId};
  `;
  await query(updateChannelStateQuery);
  return;
};

export const resetChannelStates = async (): Promise<void> => {
  const resetChannelsQuery = SQL`
    UPDATE \`${JEOPARDY_TABLE.CHANNELS.NAME}\`
    SET ${JEOPARDY_TABLE.CHANNELS.COLUMNS.CHANNEL_STATE}=0;
  `;
  await query(resetChannelsQuery);
  return;
};
