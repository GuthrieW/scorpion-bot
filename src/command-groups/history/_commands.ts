import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

export const generateHistoryCommands = (): any[] => {
  return [
    new SlashCommandBuilder()
      .setName("history")
      .setDescription("Learn about some PBE history!")
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand.setName("death_valley").setDescription("Not implemented")
      )
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand.setName("help").setDescription("Not implemented")
      ),
  ];
};
