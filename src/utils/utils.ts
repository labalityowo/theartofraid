import { getDiscord } from "@/main";
import { MessageEmbed, User } from "discord.js";

export function defaultEmbed(title: string, user: User): MessageEmbed{
    const embed = new MessageEmbed();
    embed.setAuthor(`the art of raid | ${title}`, getDiscord().user?.displayAvatarURL());
    embed.setFooter(user.username, user.displayAvatarURL());
    embed.setTimestamp(new Date());
    return embed;
}

export function random(min: number, max: number ): number{
    return Math.floor(Math.random() * (max - min + 1) + min);
}