import {
  APIEmbed,
  APIEmbedField,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export const generateDankCommands =
  (): SlashCommandSubcommandsOnlyBuilder[] => {
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
          subcommand.setName("help").setDescription("List commands")
        ),
      // .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      //   subcommand.setName("krash").setDescription("Commit bank robbery")
      // )
      // .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      //   subcommand.setName("mis").setDescription("fr?")
      // )

      // .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      //   subcommand.setName("m4xx-kuma").setDescription("Unleash the beast")
      // )
      // .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      //   subcommand
      //     .setName("poe")
      //     .setDescription(
      //       "How many K's will Poe Scott get in his next start?"
      //     )
      // )
      // .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      //   subcommand
      //     .setName("please-clap")
      //     .setDescription("Need some encouragement?")
      // ),
    ];
  };

export const generateCommandList = (): APIEmbed => {
  const commands: SlashCommandSubcommandsOnlyBuilder[] = generateDankCommands();
  const fields: APIEmbedField[] = commands.map((command) => {
    console.log("command", command);
    return {
      name: command.name,
      value: command.description,
    };
  });

  return {
    color: 0x9f1c33,
    title: "Dank Commands",
    fields,
  };
};
