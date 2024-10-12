import { Client, GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { fileURLToPath, pathToFileURL } from "node:url";
import fetchDataJob from "./jobs/weeklyHackFetch.js";
import getCards from "./upstopScraper.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//seting schedule job


client.hackAnnouncementsChannelId = null;



console.log(__dirname);
//loading events
const eventsPath = path.join(__dirname, "events");
const eventsFile = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventsFile) {
  const filePath = path.join(eventsPath, file);
  const fileUrl = pathToFileURL(filePath).href;
  const eventModule = await import(fileUrl);
  const event = eventModule.default;
  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, client)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, client)
    );
  }
}

client.login(process.env.Token);
