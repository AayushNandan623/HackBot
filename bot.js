import {
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Guild,
  PermissionFlagsBits,
} from "discord.js";
import "dotenv/config";
import getQuotes from "./index.js";
import { schedule } from "node-cron";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

let hackAnnouncementsChannelId = null;

function createHackEmbeds({
  title = "Hackathon",
  institution = "Unknown",
  prize = "No Prize Specified",
  daysLeft = "No Time Specified",
} = {}) {
  const customEmbed = new EmbedBuilder()
    .setTitle(title)
    .setImage(null)
    .setColor("#00FF00")
    .addFields(
      {
        name: "Instutuion",
        value: institution,
      },
      { name: "⏰", value: daysLeft, inline: true },
      { name: "💸", value: prize, inline: true }
    );

  return customEmbed;
}

async function createRequiredGuildChannel(guild) {
  try {
    if (!guild.roles || !guild.roles.everyone) {
      console.error("The 'everyone' role is not available.");
      return;
    }

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

async function SendingDataToChannel() {
  if (!hackAnnouncementsChannelId) {
    console.error("Channel ID is not set. Cannot send data.");
    return;
  }

  const channel = await client.channels.fetch(hackAnnouncementsChannelId);

  if (!channel) {
    console.error("Channel does not exist");
    return;
  }

  const listOfHacks = await getQuotes();
  await listOfHacks.map((Hackinfo) => {
    let embed = createHackEmbeds(Hackinfo);
    channel.send({ embeds: [embed] });
  });
}

schedule("*/1 * * * *", () => {
  try{
  SendingDataToChannel();
  }catch(e){
    console.log(e);
  }
});

client.on("guildCreate", async (guild) => {
  await createRequiredGuildChannel(guild);
});

// client.on("ready", async (guild) => {
//   await createRequiredGuildChannel(guild);
// });

client.on("channelDelete", async (channel) => {
  if (
    channel.name === "Hack Announcements!" &&
    channel.type === ChannelType.GuildText
  ) {
    await createRequiredGuildChannel(guild);
  }
  console.log("Recreating required deleted channel");
});

client.login(process.env.Token);
