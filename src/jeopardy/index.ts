import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { formatQuestion, getRandomQuestion } from "./utils";

export const handleJeopardyCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "question") {
    const question = await getRandomQuestion();
    const formattedQuestion = formatQuestion(question);
    await interaction.reply(formattedQuestion);
  } else if (subcommand === "help") {
    await interaction.reply(
      "How to use Jeopardy Bot:\nThis is not finished yet"
    );
  }
};
