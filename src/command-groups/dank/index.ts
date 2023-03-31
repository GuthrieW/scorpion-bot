import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { generateCommandList } from "./_commands";

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
    const commandList = generateCommandList();
    await interaction.reply({ embeds: [commandList] });
  } else if (subcommand === "m4xx-kuma") {
    await interaction.reply(
      "https://tenor.com/view/barghest-bear-cybernetic-bear-machine-roar-gif-26208002"
    );
  } else if (subcommand === "poe") {
    const strikeouts = Math.floor(Math.random() * 28);
    await interaction.reply(`Poe Scott will get... ${strikeouts} K's!`);
  } else if (subcommand === "please-clap") {
    await interaction.reply(
      "https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/3x.gif"
    );
  } else if (subcommand === "dvd") {
    await interaction.reply(
      "https://thumbs.gfycat.com/HandsomeDeafeningAmethystgemclam-max-1mb.gif"
    );
  }
};
