import { CacheType, Client, GatewayIntentBits, Interaction } from "discord.js";
import { handleJeopardyCommand } from "./jeopardy";

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "jeopardy") {
    await handleJeopardyCommand(interaction);
  }
});

client.login(process.env.BOT_TOKEN);
