import { getCommandManager } from "@/main";
import { defaultEmbed } from "@/utils/utils";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { Command } from "./Command";

export class Help extends Command{
    constructor(){
        super("help", "Send a list of commands")
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
        const embed: MessageEmbed = defaultEmbed('Help', message.author);
        for (const command of getCommandManager().getAll()){
            embed.addField(command[1].getName(), '> ' + command[1].getDescription(), true);
        }
        message.reply({embeds: [embed]});
        return true;
    }
}