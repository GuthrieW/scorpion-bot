import { CacheType, ChatInputCommandInteraction } from "discord.js";

export const handleHistoryCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "death_valley") {
    await interaction.reply("Not implemented");
  } else if (subcommand === "help") {
    await interaction.reply("Not implemented");
  }
};
