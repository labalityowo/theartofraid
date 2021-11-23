import { defaultEmbed } from "@/utils/utils";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { Command } from "./Command";

export class ServerInfo extends Command{
    constructor(){
        super("serverinfo", "Send serverinfo")
    }

    public permissionCheck(target: GuildMember | undefined): boolean {
        return true;
    }

    public async execute(author: User, message: Message, args: string[]): Promise<boolean>{
        if(message.guild === null){
            return false;
        }
        if(!await super.execute(author, message, args)){
            return false;
        }
        const embed:MessageEmbed = defaultEmbed('Server Info', message.author);

        embed.setThumbnail(message.guild.iconURL() ?? "https://www.null.com/"); //Fast fix
        embed.setImage(message.guild.bannerURL() ?? "https://www.null.com/");

        embed.addField("Name", message.guild.name, true);
        embed.addField("Id", message.guild.id, true);
        embed.addField("Owner", `<@${message.guild.ownerId}>`, true);

        embed.addField("Categories", message.guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").size.toString(), true);
        embed.addField("Voices", message.guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE").size.toString(), true);
        embed.addField("Text", message.guild.channels.cache.filter(channel => channel.type === "GUILD_TEXT").size.toString(), true);

        embed.addField("Member", message.guild.memberCount.toString());
        embed.addField("Roles", message.guild.roles.cache.size.toString());

        message.reply({embeds: [embed]});
        return true;
    }
}