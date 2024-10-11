import SendingDataToChannel from "../utilis/formatMessage";

// rn the function is scheduled to fetch every min for testing
schedule("*/1 * * * *", () => {
  try {
    SendingDataToChannel();
  } catch (e) {
    console.log(e);
  }
});
