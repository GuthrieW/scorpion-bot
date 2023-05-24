import {
  APIEmbed,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { DANK_SUB_COMMANDS } from "./_constants";

export const generateDankCommands =
  (): SlashCommandSubcommandsOnlyBuilder[] => {
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
    // return [
    //   new SlashCommandBuilder()
    //     .setName("dank")
    //     .setDescription("Dank memes")
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS.dvs.title)
    //         .setDescription(DANK_SUB_COMMANDS.dvs.description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS.help.title)
    //         .setDescription(DANK_SUB_COMMANDS.help.description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS.krash.title)
    //         .setDescription(DANK_SUB_COMMANDS.krash.description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS["m4xx-kuma"].title)
    //         .setDescription(DANK_SUB_COMMANDS["m4xx-kuma"].description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS.mis.title)
    //         .setDescription(DANK_SUB_COMMANDS.mis.description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS["dvs-w"].title)
    //         .setDescription(DANK_SUB_COMMANDS["dvs-w"].description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS.poe.title)
    //         .setDescription(DANK_SUB_COMMANDS.poe.description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS.dvd.title)
    //         .setDescription(DANK_SUB_COMMANDS.dvd.description)
    //     )
    //     .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    //       subcommand
    //         .setName(DANK_SUB_COMMANDS.scud.title)
    //         .setDescription(DANK_SUB_COMMANDS.scud.description)
    //     ),
    // ];
  };
