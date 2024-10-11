export default {
  name: "ready",
  once: true,
  async execute(client) {
    try {
      console.log("client ready");
      let guild = await client.guilds.cache.first();

      if (!guild) {
        console.log("Guild not found");
        return;
      }
      // this function is not detecting the channel
      guild.channels.cache.forEach((channel) => {
        if (channel.name === "Hack Announcements" && channel.type === 0) {
          console.log("found");
          hackAnnouncementsChannelId = channel.id;

          return;
        }
        console.log(channel.name);
      });

      console.log(hackAnnouncementsChannelId);
    } catch (e) {
      console.log(e);
    }
  },
};
