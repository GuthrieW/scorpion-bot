// export const addUserMoney = async (
//   userId: string,
//   moneyToAdd: number
// ): Promise<number> => {
//   const user: discord_user = await getOrInsertUser(userId);
//   const newMoneyAmount: number = user.money + moneyToAdd;
//   const addMoneyQuery: SQLStatement = SQL`
//     UPDATE \`discord_users\`
//     SET money=${newMoneyAmount}
//     WHERE user_id=${userId};
//   `;
//   await query(addMoneyQuery);
//   return newMoneyAmount;
// };

// export const subtractUserMoney = async (
//   userId: string,
//   moneyToSubtract: number
// ): Promise<number> => {
//   const user: discord_user = await getOrInsertUser(userId);
//   const newMoneyAmount: number = user.money - moneyToSubtract;
//   const subtractMoneyQuery: SQLStatement = SQL`
//   UPDATE \`discord_users\`
//   SET money=${newMoneyAmount}
//   WHERE user_id=${userId};
// `;
//   await query(subtractMoneyQuery);
//   return newMoneyAmount;
// };
