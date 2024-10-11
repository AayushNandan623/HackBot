import createRequiredGuildChannel from "../utilis/createTextChannel";

export default {
  name: "guildCreate",
  once: true,
  async execute(guild) {
    await createRequiredGuildChannelildChannel(guild);
  },
};
