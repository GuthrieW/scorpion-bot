import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { generateCommandList } from "./_commands";
import { DANK_SUB_COMMANDS } from "./_constants";

export const handleDankCommand = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const subcommand = interaction.options.getSubcommand();
  const dankCommand = Object.values(DANK_SUB_COMMANDS).find(
    (command) => command.title === subcommand
  );
  if (dankCommand) {
    await interaction.reply(dankCommand.reply);
  }

  // if (subcommand === DANK_SUB_COMMANDS.dvs.title) {
  //   await interaction.reply(
  //     "https://twitter.com/PBE_Confessions/status/1265037681001627657"
  //   );
  // } else if (subcommand === DANK_SUB_COMMANDS.krash.title) {
  //   await interaction.reply(
  //     "Absolute bank robbery, trading $1.5M in cap space for a future gg catcher"
  //   );
  // } else if (subcommand === DANK_SUB_COMMANDS.mis.title) {
  //   await interaction.reply("fr?");
  // } else if (subcommand === DANK_SUB_COMMANDS.help.title) {
  //   const commandList = generateCommandList();
  //   await interaction.reply({ embeds: [commandList] });
  // } else if (subcommand === DANK_SUB_COMMANDS["m4xx-kuma"].title) {
  //   await interaction.reply(
  //     "https://tenor.com/view/barghest-bear-cybernetic-bear-machine-roar-gif-26208002"
  //   );
  // } else if (subcommand === DANK_SUB_COMMANDS.poe.title) {
  //   const strikeouts = Math.floor(Math.random() * 28);
  //   await interaction.reply(`Poe Scott will get... ${strikeouts} K's!`);
  // } else if (subcommand === DANK_SUB_COMMANDS["dvs-w"].title) {
  //   await interaction.reply(
  //     "https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/3x.gif"
  //   );
  // } else if (subcommand === DANK_SUB_COMMANDS.dvd.title) {
  //   await interaction.reply(
  //     "https://thumbs.gfycat.com/HandsomeDeafeningAmethystgemclam-max-1mb.gif"
  //   );
  // } else if (subcommand === DANK_SUB_COMMANDS.scud.title) {
  //   await interaction.reply("");
  // }
};
