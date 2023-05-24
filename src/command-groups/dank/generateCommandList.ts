import { APIEmbed } from "discord.js";
import { DANK_SUB_COMMANDS, SubCommand } from "./_constants";

export function generateCommandList(): APIEmbed {
  const fields = Object.values(DANK_SUB_COMMANDS).map((option: SubCommand) => {
    return {
      name: option.title,
      value: option.description,
    };
  });

  return {
    color: 0x9f1c33,
    title: "Dank Commands",
    fields,
  };
}
