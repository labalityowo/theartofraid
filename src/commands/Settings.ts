import { getGuildManager } from "@/main";
import { defaultEmbed } from "@/utils/utils";
import { Channel, Guild, GuildMember, Message, MessageEmbed, User } from "discord.js";
import { Command } from "./Command";

export class Settings extends Command {
    constructor() {
        super("settings", "Update server's settings")
    }

    public permissionCheck(target: GuildMember | undefined): boolean {
        if (typeof target === "undefined") {
            return false;
        }
        return target.permissions.has("MANAGE_CHANNELS");
    }

    public async execute(author: User, message: Message<boolean>, args: string[]): Promise<boolean> {
        if (message.guild === null) {
            return false;
        }
        if (!await super.execute(author, message, args)) {
            return false;
        }
        const embed = defaultEmbed("Settings", author);
        const action = args[0];

        if (typeof action !== 'string') {
            embed.setDescription("Actions: `trackerChannel`");
            message.reply({ embeds: [embed] });
            return false;
        }

        switch (args[0]) {
            case "trackerChannel":
                const channel = message.mentions.channels.first();
                const guild = message.guild;
                if(!(guild instanceof Guild)){
                    return false;
                }
                if(!(channel instanceof Channel)){
                    embed.setDescription("Undefined channel. Remember to mention the channel :D!");
                    message.reply({ embeds: [embed] });
                    return false;
                }
                const guildSetting = getGuildManager().get(parseInt(guild.id));
                if(!(guildSetting instanceof Map)){
                    return false;
                }
                guildSetting.set("trackerChannelId", channel.id);
                embed.setDescription("Successfully updated tracker channel to <#" + channel.id +">.");
                message.reply({ embeds: [embed] });
                break;
            default:
                embed.setDescription("Undefined action. Actions: `trackerChannel`");
                message.reply({ embeds: [embed] });
                break;
        }

        console.log(message);
        return true;
    }
}