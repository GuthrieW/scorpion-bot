import { CacheType, Client, GatewayIntentBits, Interaction } from "discord.js";
import { handleDankCommand } from "./command-groups/dank";
import { dankStartup } from "./command-groups/dank/_startup";
import { handleHistoryCommand } from "./command-groups/history";
import { historyStartup } from "./command-groups/history/_startup";
import { handleJeopardyCommand } from "./command-groups/jeopardy";
import { jeopardyStartup } from "./command-groups/jeopardy/_startup";

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.BOT_TOKEN);

client.once("ready", async () => {
  await dankStartup();
  await historyStartup();
  await jeopardyStartup();
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const { commandName } = interaction;
    if (commandName === "jeopardy") {
      await handleJeopardyCommand(interaction, client);
    } else if (commandName === "dank") {
      await handleDankCommand(interaction);
    } else if (commandName === "history") {
      await handleHistoryCommand(interaction);
    }
  } catch (error) {
    console.log("severe error", error);
  }
});
