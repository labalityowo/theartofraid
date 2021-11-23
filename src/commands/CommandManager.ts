import { Command } from "./Command";
import { DiscordProfile } from "./DiscordProfile";
import { Help } from "./Help";
import { Quotes } from "./Quotes";
import { RobloxProfile } from "./RobloxProfile";
import { ServerInfo } from "./ServerInfo";
import { Settings } from "./Settings";

export class CommandManager {

    private commands: Map<string, Command> = new Map();

    constructor() {
        this.commands.set('help', new Help());
        this.commands.set('serverinfo', new ServerInfo());
        this.commands.set('settings', new Settings());
        this.commands.set('quotes', new Quotes());
        this.commands.set('discordprofile', new DiscordProfile());
        this.commands.set('robloxprofile', new RobloxProfile());
    }

    public get(command: string): Command | undefined {
        return this.commands.get(command);
    }
    public getAll(): Map<string, Command> {
        return this.commands;
    }
}