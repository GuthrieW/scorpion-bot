import { SlashCommandBuilder } from "discord.js";

export const generateHistoryCommands = (): any[] => {
  return [
    new SlashCommandBuilder()
      .setName("history")
      .setDescription("Learn about some PBE history!")
      .addSubcommand((subcommand: any) =>
        subcommand.setName("death_valley").setDescription("Not implemented")
      )
      .addSubcommand((subcommand: any) =>
        subcommand.setName("help").setDescription("Not implemented")
      ),
  ];
};
