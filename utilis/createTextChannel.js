import { ChannelType, PermissionFlagsBits } from "discord.js";

export default async function createRequiredGuildChannel(guild) {
  try {
    if (!guild.roles || !guild.roles.everyone) {
      console.error("The 'everyone' role is not available.");
      return;
    }

    let AlreadyExists = await guild.channels.cache.find(
      (channel) =>
        channel.name == "Hack Announcements" &&
        channel.type === ChannelType.GuildText
    );

    if (!AlreadyExists) {
      let AnnoucementChannel = await guild.channels.create({
        name: "Hack Announcements!",
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
      hackAnnouncementsChannelId = AnnoucementChannel.id;
      return AnnoucementChannel;
    } else {
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
      console.log(`Edited 'Hack Announcements!' channel in ${guild.name}`);
      hackAnnouncementsChannelId = AlreadyExists.id;
      return AlreadyExists;
    }
  } catch (e) {
    console.log(e);
  }
}
