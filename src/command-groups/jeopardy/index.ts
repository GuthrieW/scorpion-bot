import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";
import { evaluateAnswer, formatQuestion } from "./answer-utils";
import { QUESTION_TIMEOUT } from "./_constants";
import { getRandomQuestion } from "./cluebase-api";
import { JeopardyQuestion } from "./index.d";
import { discord_channel } from "../../../src/database/index.d";
import { DiscordChannel } from "../../../src/database/tables/discordChannel";

export const handleJeopardyCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "question") {
    const channelId: string = interaction.channel?.id as string;
    const discordChannel: discord_channel =
      await DiscordChannel.findByChannelIdOrCreate(channelId);

    // the channel is already in use
    if (discordChannel?.channel_state === 1) {
      await interaction.reply("There's already a question in this channel");
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
        time: QUESTION_TIMEOUT,
      })
      .then((collected) => {
        if (collected.size === 0) {
          interaction.reply(`The correct answer was **${question.answer}**`);
        }
      })
      .catch((error) => {
        console.log(error);
        interaction.reply(
          `There was a database error.\nThe correct answer was **${question.answer}**`
        );
      })
      .finally(async () => {
        console.log("channel state set to 0");
        await DiscordChannel.updateChannelState(channelId, 0);
      });
  } else if (subcommand === "help") {
    await interaction.reply("Not implemented");
  }
};
