import fetchDataJob from "../jobs/weeklyHackFetch.js";
import createRequiredGuildChannel from "../utilis/createTextChannel.js";
import normalizeChannelName from "../utilis/normalizeChannelName.js";

export default {
  name: "ready",
  once: true,
  async execute(client) {
    try {
      let ChannelName = normalizeChannelName("Hack Announcements");
      console.log("client ready");

      let guild = await client.guilds.cache.first();

      if (!guild) {
        console.log("Guild not found");
        return;
      }
      // this function is detecting the channel
      let Reqchannel = await guild.channels.cache.find((channel) => {
        return channel.name === ChannelName && channel.type === 0;
      });

      client.hackAnnouncementsChannelId = Reqchannel.id;

      if (client.hackAnnouncementsChannelId) {
        console.log("Channel found and Task scheduled");
        fetchDataJob(client);
      } else {
        await createRequiredGuildChannel(guild, client);
        fetchDataJob(client);
      }

      console.log(client.hackAnnouncementsChannelId);
    } catch (e) {
      console.log(e);
    }
  },
};
