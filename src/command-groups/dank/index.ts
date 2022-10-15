import { CacheType, ChatInputCommandInteraction } from "discord.js";

export const handleDankCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "dvs") {
    await interaction.reply(
      "https://twitter.com/PBE_Confessions/status/1265037681001627657"
    );
  }
};
