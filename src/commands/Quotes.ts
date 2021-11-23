import { defaultEmbed } from "@/utils/utils";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { Command } from "./Command";

export class Quotes extends Command{
    constructor(){
        super("quotes", "im ninja6245 and this is deep")
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
        const quotes: string[] = [
            "Wow… Actual god damn amateurs…",
            "Given enough time. Anyone who understands the coding language can bring it down.",
            "It’s what I can do with said coding that’s scary…",
            "",
            "I could possibly bring down roblox given enough time…",
            "Now I will repeat myself one last time. Cut this stupidity out or you lot may face a possible warn from the moderation team…",
            "Restative. Auctioning other people. Joke or not is just god damn immature…",
            "Why don’t you actually investigate instead of being the idiots you lot are…",
            "I thought I’ve seen it all but now I’ve seen everything…",
            "But the joke lead to further problems.",
            "There’s a difference between a joke and actual bullying…",
            "Ok. Now you crossed a line you shouldn’t of…",
            "You want to talk about self control?",
            "Honestly. Life isn’t that simple.",
            "I have seen some of the worst people in this world but this takes the cake.",
            "Honestly. You lot should be glad of my extreme self restraint…",
            "Fear the man who shows his wrath in the calmest way possible…",
            "No. I know how to control my anger. ",
            "Might as well stop before I get really You want to see my limit. you FOUND IT!",
            "Ok. It seems you lot have the IQ below the temperature of Antartica and the maturity of god damn 2 year olds…",
            "Scary thing is I know how HTML5 works…",
            "I like to take lego commie stuff seriously.",
            "It’s be a programmer or be programmed…",
            "You are arguing with someone who works with coding. About the ethics of coding…",
            "I like to edge on my edgelordiness.",
        ];
        const embed:MessageEmbed = defaultEmbed('ninja6245 quotes', message.author);
        embed.setThumbnail("https://cdn.discordapp.com/avatars/742280762358890516/b5804bb324388e745ea126e0ba6855aa.png?size=1024");
        embed.setDescription(quotes[Math.floor(Math.random() * quotes.length)] + " - ninja6245");
        message.reply({embeds: [embed]});
        return true;
    }
}