import { schedule } from "node-cron";
import SendingDataToChannel from "../utilis/formatMessage.js";

export default function fetchDataJob(client) {
  // rn the function is scheduled to fetch every min for testing
  schedule("*/1 * * * *", () => {
    try {
      console.log("Scheduled task running...");
      SendingDataToChannel(client);
    } catch (e) {
      console.log(e);
    }
  });
}
