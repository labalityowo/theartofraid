import { Guild, GuildMember, Message, MessageEmbed, User } from "discord.js";
import { defaultEmbed } from "@/utils/utils";

export class Command{
    private name: string;
    private description: string;

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

    public getName(): string{
        return this.name;
    }

    public getDescription(): string{
        return this.description;
    }

    public permissionCheck(target: GuildMember|undefined): boolean{
        return true;
    }
    
    public async execute(author: User, message: Message, args: string[]): Promise<boolean>{
        const guildAuthor = await message.guild?.members.fetch(author.id);

        if(!this.permissionCheck(guildAuthor)){
            const embed: MessageEmbed = defaultEmbed('Command', author);
            embed.setDescription('You do not have permission to execute this command.')
            message.reply({embeds: [embed]});
            return false;
        }

        return true;
    }
}