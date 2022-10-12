export const generateJeopardyCommands = (): any[] => {
  const { SlashCommandBuilder } = require("discord.js");
  return [
    new SlashCommandBuilder()
      .setName("jeopardy")
      .setDescription("Jeopardy Bot")
      .addSubcommand((subcommand: any) =>
        subcommand
          .setName("question")
          .setDescription("Play a round of Jeopardy!")
      )
      .addSubcommand((subcommand: any) =>
        subcommand
          .setName("help")
          .setDescription("Learn how to use the Jeopardy Bot")
      ),
  ];
};
