import { ChannelType, PermissionFlagsBits } from "discord.js";
import normalizeChannelName from "./normalizeChannelName.js";

export default async function createRequiredGuildChannel(guild, client) {
  try {
    let ChannelName = normalizeChannelName("Hack Announcements!");

    if (!guild.roles || !guild.roles.everyone) {
      console.error("The 'everyone' role is not available.");
      return;
    }

    let AlreadyExists = await guild.channels.cache.find(
      (channel) =>
        channel.name == ChannelName && channel.type === ChannelType.GuildText
    );

    if (!AlreadyExists) {
      let AnnoucementChannel = await guild.channels.create({
        name: ChannelName,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: guild.roles.everyone.id,
            deny: [PermissionFlagsBits.SendMessages],
          },
          {
            id: client.user.id,
            allow: [PermissionFlagsBits.SendMessages],
          },
        ],
      });
      client.hackAnnouncementsChannelId = AnnoucementChannel.id;
      return AnnoucementChannel;
    } else {
      if (AlreadyExists)
        AlreadyExists.edit({
          permissionOverwrites: [
            {
              id: guild.roles.everyone.id,
              deny: [PermissionFlagsBits.SendMessages],
            },
            {
              id: client.user.id,
              allow: [PermissionFlagsBits.SendMessages],
            },
          ],
        });
      console.log(`Edited ${ChannelName} channel in ${guild.name}`);
      client.hackAnnouncementsChannelId = AlreadyExists.id;
      return AlreadyExists;
    }
  } catch (e) {
    console.log(e);
  }
}
