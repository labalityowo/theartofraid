
import { getDiscord } from "@/main";
import { readFileSync, writeFile } from "fs";
import * as path from 'path';

export class GuildManager{

    private guilds: Map<number, Map<any, any>> = new Map();
    private path: string = path.join(__dirname, "../../guilds.json");

    public read(){
        const importedGuilds = JSON.parse(readFileSync(this.path, 'utf8'));
        for (const entry of getDiscord().guilds.cache.entries()) {
            const id = parseInt(entry[0]);
            let guildRaw = importedGuilds[id];
            if (typeof guildRaw === "undefined") {
                guildRaw = { trackerChannelId: 0 }
            }
            this.guilds.set(id, new Map(Object.entries(guildRaw)));
        }
    }
    
    public get(id: number): Map<any, any>|undefined{
        return this.guilds.get(id);
    }

    public getAll(): Map<any, Map<any, any>>{
        return this.guilds;
    }

    public save(){
        const savedGuilds: { [key: number]: any } = {};
    
        this.getAll().forEach((v, k, map) => {
          savedGuilds[k] = Object.fromEntries(v);
        });
        
        writeFile(this.path, JSON.stringify(savedGuilds), 'utf-8', () => {});
    }
}