import {
  APIEmbed,
  APIEmbedField,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  ToAPIApplicationCommandOptions,
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
        )
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
          subcommand.setName("krash").setDescription("Commit bank robbery")
        )
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
          subcommand.setName("m4xx-kuma").setDescription("Unleash the beast")
        )
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
          subcommand.setName("mis").setDescription("fr?")
        )
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
          subcommand
            .setName("please-clap")
            .setDescription("Need some encouragement?")
        )
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
          subcommand
            .setName("poe")
            .setDescription(
              "How many K's will Poe Scott get in his next start?"
            )
        ),
    ];
  };

type SubcommandOptions = {
  name: string;
  name_localizations: undefined;
  description: string;
  description_localizations: undefined;
  options: [];
};

export const generateCommandList = (): APIEmbed => {
  const commands: SlashCommandSubcommandsOnlyBuilder[] = generateDankCommands();
  const fields = commands[0].options.map((option: unknown) => {
    const opt = option as SubcommandOptions;
    return {
      name: opt?.name,
      value: opt?.description,
    };
  });

  return {
    color: 0x9f1c33,
    title: "Dank Commands",
    fields,
  };
};
