import { getDiscord } from "@/main";
import { random } from "@/utils/utils";

export class MOTDManager{
    private motd: string[] = [
        "Made with <3 by labalityowo#2522",
        "ez clapped",
        "raider chad, virgin divisional members"
    ];

    public getAll(): string[]{
        return this.motd;
    }

    public update(){
        getDiscord().user?.setActivity(this.motd[random(0, 2)], {type: "PLAYING"});
    }
}