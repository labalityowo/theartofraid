require('module-alias/register')

import { config } from "dotenv";
config();

import { Client, Intents } from "discord.js";
import { LoggedInUserData, setCookie } from "noblox.js";

import {readdirSync} from "fs";

import * as path from 'path';

import { GuildManager } from "./guilds/GuildManager";
import { CommandManager } from "./commands/CommandManager";
import { MOTDManager } from "./tasks/MOTD";

//Roblox

var roblox: LoggedInUserData;

async function initRoblox(){
    if(typeof process.env.ROBLOX === "string"){
        roblox = await setCookie(process.env.ROBLOX);
        console.log(`Roblox > Logged in as ${roblox.UserName} [${roblox.UserID}]`)
    }
}

initRoblox();

//Discord

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});


const eventPath = path.join(__dirname, "events");
for (const file of readdirSync(eventPath)){
	const event = require(path.join(eventPath, `${file.toString()}`)).event;
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

export function getDiscord(): Client{
  return client;
}

//Guild

const guildManager = new GuildManager();

export function getGuildManager(): GuildManager{
  return guildManager;
}

//Command Mapper

const commandManager = new CommandManager();

export function getCommandManager(): CommandManager{
  return commandManager;
}

//MOTD Manager

const motdManager = new MOTDManager();

export function getMOTDManager(): MOTDManager{
  return motdManager;
}

client.login(process.env.DISCORD);
