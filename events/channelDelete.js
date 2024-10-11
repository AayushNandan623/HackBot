import createRequiredGuildChannel from "../utilis/createTextChannel";

export default {
  name: "channelDelete",
  async execute(channel) {
    if (
      channel.name === "Hack Announcements!" &&
      channel.type === ChannelType.GuildText
    ) {
      await createRequiredGuildChannel(guild);
    }
    console.log("Recreating required deleted channel");
  },
};
