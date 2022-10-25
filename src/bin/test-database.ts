// import { resetChannelStates } from "/database/tables/discordChannel";
import { resetChannelStates } from "../database/tables/discordChannel";

resetChannelStates().then(() => {
  console.log("done resetting channel states");
});
