import { Client, GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import path from "node:path";

import "dotenv/config";
import { fileURLToPath } from "node:url";


const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//loading events
const eventsPath = path.join(__dirname , "events");
const eventsFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file in eventsFile){
  const {default : event} = await import(path.join(eventsPath ,file))
}





client.login(process.env.Token);
