import { ChannelType } from "discord.js"; // Make sure ChannelType is properly imported
import createRequiredGuildChannel from "../utilis/createTextChannel.js";
import normalizeChannelName from "../utilis/normalizeChannelName.js";

export default {
  name: "channelDelete",
  async execute(channel, client) {
    try {
      let ChannelName = normalizeChannelName("Hack Announcements!");
      // Log channel info to ensure it's being processed
      console.log(`Channel deleted: ${channel.name}, Type: ${channel.type}`);

      // Check if the deleted channel is the "Hack Announcements" text channel
      if (
        channel.name === ChannelName &&
        channel.type === ChannelType.GuildText
      ) {
        console.log("Hack Announcements! channel deleted. Recreating...");

        // Await the recreation of the channel
        await createRequiredGuildChannel(channel.guild, client);
        console.log("Recreated required deleted channel.");
      } else {
        console.log(`Deleted channel is not "Hack Announcements!".`);
      }
    } catch (error) {
      console.error("Error handling channelDelete event:", error);
    }
  },
};
