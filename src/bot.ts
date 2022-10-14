import { CacheType, Client, GatewayIntentBits, Interaction } from "discord.js";
import { handleJeopardyCommand } from "./command-groups/jeopardy";
import { startup } from "./command-groups/jeopardy/_startup";

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
  await startup();
});

client.on("interactionCreate", async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "jeopardy") {
    await handleJeopardyCommand(interaction);
  }
});
