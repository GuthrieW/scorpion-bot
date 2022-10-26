import { jeopardy_account } from "../index.d";
import { JeopardyAccount } from "../tables/jeopardyAccount";

export const addUserMoney = async (
  discordId: string,
  moneyToAdd: number
): Promise<number> => {
  const jeopardyAccount: jeopardy_account =
    await JeopardyAccount.findByDiscordIdOrCreate(discordId);

  const { money } = await JeopardyAccount.updateCorrectAnswer(
    jeopardyAccount?.id as string,
    moneyToAdd
  );

  return money;
};

export const subtractUserMoney = async (
  discordId: string,
  moneyToSubtract: number
): Promise<number> => {
  const jeopardyAccount: jeopardy_account =
    await JeopardyAccount.findByDiscordIdOrCreate(discordId);

  const { money } = await JeopardyAccount.updateWrongAnswer(
    jeopardyAccount?.id as string,
    moneyToSubtract
  );

  return money;
};
