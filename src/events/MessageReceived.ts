import { Command } from "@/commands/Command";
import { getCommandManager } from "@/main";
import { defaultEmbed } from "@/utils/utils";
import { Message, MessageEmbed } from "discord.js";

export const event = {
    name: 'messageCreate',
    once: false,
    execute: function(message: Message){
        if(message.guild === null){
            return;
        }
        if (message.content.charAt(0) === ";" && message.content.length > 1){
            const commandAndArguments: string[] = message.content.substr(1).split(" ");
            const command: Command|undefined = getCommandManager().get(commandAndArguments[0]);
            if(typeof command !== "undefined"){
                commandAndArguments.shift();
                command.execute(message.author, message, commandAndArguments);
            }else{
                const embed: MessageEmbed = defaultEmbed('Command', message.author);
                embed.setDescription(`Undefined command '${commandAndArguments[0]}'.`);
                message.reply({embeds: [embed]});
            }
        }
    }
};