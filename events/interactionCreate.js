import { EmbedBuilder } from "discord.js";
import getUnstop from "../upstopScraper.js";
import getResponse from "../utilis/aISumUpMessage.js";

const { getMoreDetails } = getUnstop;

export default {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton) return;

    const [action, link] = interaction.customId.split(":");

    if (action == "See_More") {
      await interaction.deferReply();

      let pageInfo = await getMoreDetails({ link: link });
      const response = await getResponse(pageInfo);

      const hackathonEmbed = new EmbedBuilder()
        .setColor("#0099ff") // Set the embed color
        .setTitle(response.title) // Set the title
        .setDescription(`Organized by **${response.organizer}**`)
        .addFields(
          {
            name: "Event Dates",
            value: `From **${response.dates.start_date}** to **${response.dates.end_date}**\nSubmission Deadline: **${response.dates.submission_deadline}**`,
          },
          {
            name: "Eligibility",
            value: `Open to: ${response.eligibility.open_to}\nTeam Size: ${
              response.eligibility.team_size.min
            } to ${
              response.eligibility.team_size.max
            }\nCross-college Teams Allowed: ${
              response.eligibility.cross_college_allowed ? "Yes" : "No"
            }\nCross-specialization Teams Allowed: ${
              response.eligibility.cross_specialization_allowed ? "Yes" : "No"
            }`,
          },
          {
            name: "Phases",
            value: response.phases
              .map(
                (phase) =>
                  `- **${phase.phase_name}**: ${phase.description}. Submission format: ${phase.submission_format}, deadline: ${phase.date}`
              )
              .join("\n"),
          },
          {
            name: "Prizes",
            value: `Total Prize Pool: ${
              response.prizes.total_prize_pool
            }\n${response.prizes.individual_prizes
              .map((prize) => `- ${prize.position}: ${prize.reward}`)
              .join("\n")}`,
          },
          {
            name: "Submission Guidelines",
            value: `${response.submission_guidelines.instructions} (Format: ${response.submission_guidelines.submission_format})`,
          },
          {
            name: "Contact Information",
            value: response.contact_information
              .map(
                (contact) =>
                  `- **${contact.name}**: Phone: ${contact.phone}, Email: ${contact.email}`
              )
              .join("\n"),
          },
          { name: "Rules", value: response.rules.join("\n") }
        )
        .setTimestamp() // Optional: Add timestamp
        .setFooter({
          text: "Good luck, and we look forward to your participation!",
        });

      interaction.editReply({
        embeds: [hackathonEmbed],
      });
    }
  },
};
