import { resetChannelStates } from "./_api/channels";

export const startup = async () => {
  await resetChannelStates();
};
