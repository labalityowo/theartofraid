import { getGuildManager, getMOTDManager } from "@/main";
import { Client } from "discord.js";

export const event = {
    name: "ready",
    once: true,
    execute: function(client: Client){
        console.log(`Discord > Logged in as ${client.user?.username} [${client.user?.id}]`)
        getMOTDManager().update();
        setInterval(() => {
            getGuildManager().save();
        }, 1000 * 1);
        setInterval(() => {
            getMOTDManager().update();
        }, 1000 * 60 * 10);
        getGuildManager().read();
    }
};