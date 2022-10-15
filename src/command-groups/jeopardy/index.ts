import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";
import { evaluateAnswer, formatQuestion } from "./answer-utils";
import { QUESTION_TIMEOUT } from "./_constants";
import { getRandomQuestion } from "./cluebase-api";
import { getOrInsertChannel } from "./_api/channels";
import { DiscordChannel, JeopardyQuestion } from "./index.d";

export const handleJeopardyCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "question") {
    const channelId: string = interaction.channel?.id as string;
    const discordChannel: DiscordChannel = await getOrInsertChannel(channelId);

    // the channel is already in use
    if (discordChannel?.channel_state === 1) {
      return;
    }

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
          interaction.followUp(`The correct answer was **${question.answer}**`);
        }
      })
      .catch((error) => {
        console.log(error);
        interaction.followUp(
          `There was a database error.\nThe correct answer was **${question.answer}**`
        );
      });
  } else if (subcommand === "help") {
    await interaction.reply("Not implemented");
  }
};
