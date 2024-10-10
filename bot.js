import {
  ChannelType,
  Client,
  GatewayIntentBits,
  Guild,
  PermissionFlagsBits,
} from "discord.js";
import "dotenv/config";

const client = new Client({ intents: [GatewayIntentBits.Guilds , GatewayIntentBits.GuildMessages] });

async function createRequiredGuildChannel(guild) {
  try {
    let AlreadyExists = await guild.channels.cache.find(
      (channel) =>
        channel.name == "Hack Announcements!" &&
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

      return AnnoucementChannel
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
      return AlreadyExists
    }

    
  } catch (e) {
    console.log(e);
  }
}

// async function onDataScrape(channel) {
//   channel.send(
    
//   )
  
// } 

client.on("guildCreate", async (guild) => {
  await createRequiredGuildChannel(guild);
});

client.on("channelDelete", async (channel) => {
  if (
    channel.name === "Hack Announcements!" &&
    channel.type === ChannelType.GuildText
  );
  console.log("Recreating required deleted channel");

  await createRequiredGuildChannel(channel.guild);
});


client.once()

client.login(process.env.Token);
