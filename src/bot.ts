import { CacheType, Client, GatewayIntentBits, Interaction } from "discord.js";
import { handleDankCommand } from "./command-groups/dank";
import { handleHistoryCommand } from "./command-groups/history";
import { handleJeopardyCommand } from "./command-groups/jeopardy";
import { jeopardyStartup } from "./command-groups/jeopardy/_startup";

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.BOT_TOKEN);

client.once("ready", async () => {
  console.log("Ready!");
  await jeopardyStartup();
});

client.on("interactionCreate", async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "jeopardy") {
    await handleJeopardyCommand(interaction);
  } else if (commandName === "dank") {
    await handleDankCommand(interaction);
  } else if (commandName === "history") {
    await handleHistoryCommand(interaction);
  }
});
