import {
  APIEmbed,
  APIEmbedField,
  CacheType,
  ChatInputCommandInteraction,
  Message,
} from "discord.js";
import { evaluateAnswer, formatQuestion } from "./answer-utils";
import { QUESTION_TIMEOUT } from "./_constants";
import { getRandomQuestion } from "./cluebase-api";
import { JeopardyQuestion } from "./index.d";
import { discord_channel, jeopardy_account } from "../../database/index.d";
import {
  DiscordChannel,
  updateChannelState,
} from "../../database/tables/discordChannel";
import { JeopardyAccount } from "../../database/tables/jeopardyAccount";
import { DiscordUser } from "../../database/tables/discordUser";

export const handleJeopardyCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "question") {
    handleJeoparyQuestion(interaction);
  } else if (subcommand === "leaderboard") {
    const leaderboard = await JeopardyAccount.getLeaderboard();
    const formattedLeaderboard = await formatLeaderboard(leaderboard);
    await interaction.reply({ embeds: [formattedLeaderboard] });
  } else if (subcommand === "reset-channel") {
    await updateChannelState(interaction.channel?.id as string, 0);
    await interaction.reply("Channel reset!");
  } else if (subcommand === "help") {
    await interaction.reply("Not implemented");
  }
};

const handleJeoparyQuestion = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const channelId: string = interaction.channel?.id as string;
  const discordChannel: discord_channel =
    await DiscordChannel.findByChannelIdOrCreate(channelId);

  // the channel is already in use
  if (discordChannel?.channel_state === 1) {
    await interaction.reply({
      content: "There's already a question in this channel",
      ephemeral: true,
    });
    return;
  }

  await DiscordChannel.updateChannelState(channelId, 1);
  const question: JeopardyQuestion = await getRandomQuestion();
  const formattedQuestion: string = formatQuestion(question);
  await interaction.reply(formattedQuestion);

  interaction.channel
    ?.awaitMessages({
      filter: (message: Message<boolean>) =>
        evaluateAnswer(message, question.answer, question.value),
      max: 1,
      time: QUESTION_TIMEOUT,
    })
    .then((collected) => {
      if (collected.size === 0) {
        interaction.channel?.send(
          `The correct answer was **${question.answer}**`
        );
      }
    })
    .catch((error) => {
      interaction.channel?.send(
        `There was a database error.\nThe correct answer was **${question.answer}**`
      );
    })
    .finally(async () => {
      await DiscordChannel.updateChannelState(channelId, 0);
    });
};

const formatLeaderboard = async (
  leaderboard: jeopardy_account[]
): Promise<APIEmbed> => {
  const fields: APIEmbedField[] = await Promise.all(
    leaderboard.map(
      async (jeopardyAccount: jeopardy_account, index: number) => {
        let field: APIEmbedField = {
          name: "",
          value: `${jeopardyAccount.money}`,
        };

        if (!jeopardyAccount?.discord_id) {
          field.name = `${index + 1}. N/A`;
        } else {
          const user = await DiscordUser.findByDiscordId(
            jeopardyAccount.discord_id
          );
          console.log("user", user);
          field.name = `${index}. ${user.discord_user?.username}`;
        }

        return field;
      }
    )
  );

  const leaderboardEmbed: APIEmbed = {
    color: 0x9f1c33,
    title: "Jeopardy Leaderboard",
    fields,
  };

  return leaderboardEmbed;
};
