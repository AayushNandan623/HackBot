import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import getUnstop from "../upstopScraper.js";

const { getCards } = getUnstop;

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
      { name: "⏰", value: daysLeft + " Days left", inline: true },
      { name: "💸", value: "Rs." + prize, inline: true }
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

  const listOfHacks = await getCards();

  await listOfHacks.map((Hackinfo) => {
    let embed = createHackEmbeds(Hackinfo);
    let visitPageButton = new ButtonBuilder()
      .setLabel("visit page")
      .setURL(`https://unstop.com/hackathons/${Hackinfo.id}`)
      .setStyle("Link");

    let AiSumUpButton = new ButtonBuilder()
      .setLabel("See more")
      .setStyle("Primary")
      .setCustomId(`See_More:${Hackinfo.id}`);

    let row = new ActionRowBuilder().addComponents(
      visitPageButton,
      AiSumUpButton
    );

    channel.send({ embeds: [embed], components: [row] });
  });
}
