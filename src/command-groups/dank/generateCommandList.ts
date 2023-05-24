import { APIEmbed, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { generateDankCommands } from "./_commands";

type SubcommandOptions = {
  name: string;
  name_localizations: undefined;
  description: string;
  description_localizations: undefined;
  options: [];
};

export function generateCommandList(): APIEmbed {
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
}
