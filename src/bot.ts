import { CacheType, Client, GatewayIntentBits, Interaction } from "discord.js";
import { formatQuestion, getRandomQuestion } from "./jeopardy/utils";

// For more help
// https://discordjs.guide/creating-your-bot/command-handling.html#dynamically-executing-commands

// Require the necessary discord.js classes
require("dotenv").config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "jeopardy") {
    if (options.getSubcommand() === "question") {
      const question = await getRandomQuestion();
      const formattedQuestion = formatQuestion(question);
      await interaction.reply(formattedQuestion);
    } else if (options.getSubcommand() === "help") {
      await interaction.reply(
        "How to use Jeopardy Bot:\nThis is not finished yet"
      );
    }
  } else if (commandName === "user") {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
