import { ChannelType, Client , GatewayIntentBits, Guild, PermissionFlagsBits } from "discord.js";
import "dotenv/config";


const client = new Client({intents: [GatewayIntentBits.Guilds]});


client.on('guildCreate' , async (guild) => {
    try{
        let AlreadyExists = await guild.channels.cache.find(channel => channel.name == "Hack Announcements!" && channel.type === ChannelType.GuildText);

        if(!AlreadyExists){
            let AnnoucnementChannel = await guild.channels.create({
                name: "Hack Announcements!",
                type: ChannelType.GuildText,
                permissionOverwrites:[
                    {
                        id: guild.roles.everyone.id,
                        deny:[PermissionFlagsBits.SendMessages],
                    },
                    {
                        id: client.user.id,
                        allow:[PermissionFlagsBits.SendMessages]
                    },
                ]
            })

        }
    }catch(e){
        console.log(e);
    }

  
});

client.login(process.env.Token);


