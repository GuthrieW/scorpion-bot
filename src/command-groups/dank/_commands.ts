import { SlashCommandBuilder } from "discord.js";

export const generateDankCommands = (): any[] => {
  return [
    new SlashCommandBuilder()
      .setName("dank")
      .setDescription("dank memes")
      .addSubcommand((subcommand: any) =>
        subcommand
          .setName("dvs")
          .setDescription("Describe Death Valley with two adjectives")
      ),
  ];
};
