import { defaultEmbed } from "@/utils/utils";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { Command } from "./Command";
export class RobloxProfile extends Command {
    constructor() {
        super("robloxprofile", "View Roblox information of a user")
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
        const embed: MessageEmbed = defaultEmbed("Roblox Profile", author);
        message.reply({embeds: [embed]});
        return true;
    }
}