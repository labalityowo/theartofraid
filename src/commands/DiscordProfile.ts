import { getDiscord } from "@/main";
import { defaultEmbed } from "@/utils/utils";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { Command } from "./Command";
export class DiscordProfile extends Command {
    constructor() {
        super("discordprofile", "View discord information of a user")
    }

    public permissionCheck(target: GuildMember | undefined): boolean {
        return true;
    }

    public async execute(author: User, message: Message, args: string[]): Promise<boolean> {
        if (message.guild === null) {
            return false;
        }
        if (!await super.execute(author, message, args)) {
            return false;
        }
        const embed: MessageEmbed = defaultEmbed("Discord Profile", author);
        let user = message.mentions.users.first();
        if(!(user instanceof User)){
            user = await getDiscord().users.fetch(args[0]);
        }
        embed.addField('Id', user.id);
        embed.addField('Username', user.username + '#' + user.discriminator);
        embed.addField('Bot', user.bot ? "True" : "False");
        embed.addField('Registered', user.createdAt.toUTCString());
        embed.setThumbnail(user.avatarURL() ?? user.defaultAvatarURL);
        embed.setColor(user.hexAccentColor ?? "DARKER_GREY");
        let memberGuild = message.guild.members.cache.get(user.id);
        if(memberGuild instanceof GuildMember){
            embed.addField('Joined', memberGuild.joinedAt?.toUTCString() ?? "");
            const roles: string[] = [];
            memberGuild.roles.cache.forEach(role => {
                if(role.id === "839862142806392853"){ //Everyone
                    roles.push(role.name);
                }else{
                    roles.push("<@&" + role.id +">")
                }
            });
            embed.addField('Roles', roles.join(','));
        }
        message.reply({embeds: [embed]});
        return true;
    }
}