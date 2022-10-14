import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";
import { QUESTION_TIMEOUT } from "./constants";
import { isCorrectAnswer, isQuestionFormat } from "./answer-utils";
import { formatQuestion, getRandomQuestion } from "./jeopardy-api";

export const handleJeopardyCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "question") {
    const question = await getRandomQuestion();
    const formattedQuestion = formatQuestion(question);
    await interaction.reply(formattedQuestion);

    interaction.channel
      ?.awaitMessages({
        filter: (message: Message<boolean>) =>
          evaluateAnswer(message, question.answer),
        time: QUESTION_TIMEOUT,
      })
      .then((collected) => {
        if (collected.size === 0) {
          interaction.followUp(`The correct answer was **${question.answer}**`);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else if (subcommand === "help") {
    await interaction.reply(
      "How to use Jeopardy Bot:\nThis is not finished yet"
    );
  }
};

const evaluateAnswer = (message: Message<boolean>, answer: string): boolean => {
  if (!isQuestionFormat(message.content)) {
    return false;
  }

  const isCorrect = isCorrectAnswer(message.content, answer);

  message.reply(
    `That is ${isCorrect ? "correct" : "incorrect"}, ${
      message.author.username
    }!`
  );

  return isCorrect;
};
