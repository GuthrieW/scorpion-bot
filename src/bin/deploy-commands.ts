import { generateJeopardyCommands } from "../jeopardy/commands";

const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands: any[] = [];
commands.push(...generateJeopardyCommands());
const commandJson = commands.map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

// Delete guild commands
rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: [] }
  )
  .then(() => console.log("Successfully deleted all guild commands."))
  .catch(console.error);

// Deploy guild commands
rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commandJson }
  )
  .then(() => console.log(`Successfully registered application commands.`))
  .catch(console.error);
