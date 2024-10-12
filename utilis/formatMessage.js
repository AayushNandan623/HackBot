import { EmbedBuilder } from "discord.js";
import getCards from "../upstopScraper.js";

function createHackEmbeds({
  title = "Hackathon",
  institution = "Unknown",
  prize = "No Prize Specified",
  daysLeft = "No Time Specified",
  imgSrc = "No image",
} = {}) {
  const customEmbed = new EmbedBuilder()
    .setTitle(title)
    .setThumbnail(imgSrc)
    .setColor("#00FF00")
    .addFields(
      {
        name: "Instutuion",
        value: institution,
      },
      { name: "⏰", value: daysLeft + " Days left" , inline: true },
      { name: "💸", value: "Rs."+ prize, inline: true }
    );

  return customEmbed;
}

export default async function SendingDataToChannel(client) {
  if (!client.hackAnnouncementsChannelId) {
    console.error("Channel ID is not set. Cannot send data.");
    return;
  }

  const channel = await client.channels.fetch(
    client.hackAnnouncementsChannelId
  );

  // if (!channel) {
  //   console.error("Channel does not exist");
  //   return;
  // }

  const listOfHacks = await getCards();
  await listOfHacks.map((Hackinfo) => {
    let embed = createHackEmbeds(Hackinfo);
    channel.send({ embeds: [embed] });
  });
}
