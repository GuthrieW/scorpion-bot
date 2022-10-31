import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

export const generateJeopardyCommands = (): any[] => {
  return [
    new SlashCommandBuilder()
      .setName("jeopardy")
      .setDescription("Jeopardy Bot")
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand
          .setName("question")
          .setDescription("Play a round of Jeopardy!")
      )
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand.setName("help").setDescription("Not implemented")
      )
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand
          .setName("reset_channel")
          .setDescription("Reset the channel if you can't get a new question")
      ),
  ];
};
