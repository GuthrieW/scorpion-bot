import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { DANK_SUB_COMMANDS } from "./_constants";

export function generateDankCommands(): SlashCommandSubcommandsOnlyBuilder[] {
  const slashCommandBuilder = new SlashCommandBuilder()
    .setName("dank")
    .setDescription("dank memes");

  Object.values(DANK_SUB_COMMANDS).forEach((dankCommand) => {
    slashCommandBuilder.addSubcommand(
      (subcommand: SlashCommandSubcommandBuilder) =>
        subcommand
          .setName(dankCommand.title)
          .setDescription(dankCommand.description)
    );
  });
  return [slashCommandBuilder];
}
