import { resetChannelStates } from "src/database/tables/discordChannel";

resetChannelStates().then(() => {
  console.log("done resetting channel states");
});
