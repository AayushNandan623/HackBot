import createRequiredGuildChannel from "../utilis/createTextChannel.js";

export default {
  name: "guildCreate",
  once: true,
  async execute(guild , client) {
    await createRequiredGuildChannel(guild , client);
  },
};
