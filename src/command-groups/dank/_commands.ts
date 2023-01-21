import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

export const generateDankCommands = (): any[] => {
  return [
    new SlashCommandBuilder()
      .setName("dank")
      .setDescription("Dank memes")
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand
          .setName("dvs")
          .setDescription("Describe Death Valley with two adjectives")
      )
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand.setName("krash").setDescription("Commit bank robbery")
      )
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand.setName("mis").setDescription("fr?")
      )
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand.setName("help").setDescription("If you need help meming")
      )
      .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
        subcommand.setName("m4xx-kuma").setDescription("Unleash the beast")
      ),
  ];
};
