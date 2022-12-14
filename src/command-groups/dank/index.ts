import { CacheType, ChatInputCommandInteraction } from "discord.js";

export const handleDankCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "dvs") {
    await interaction.reply(
      "https://twitter.com/PBE_Confessions/status/1265037681001627657"
    );
  } else if (subcommand === "krash") {
    await interaction.reply(
      "Absolute bank robbery, trading $1.5M in cap space for a future gg catcher"
    );
  } else if (subcommand === "mis") {
    await interaction.reply("fr?");
  } else if (subcommand === "help") {
    await interaction.reply(
      "https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/3x.gif"
    );
  }
};
