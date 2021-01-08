import { ReplicatedStorage } from "@rbxts/services";

let remote = ReplicatedStorage.FindFirstChild("tpa") as RemoteEvent;
let requests = new Map();

remote.OnServerEvent.Connect((from, type, to) => {
    if (typeIs(type, "string") && typeIs(to, "Instance")) {
        if (type === "request") {
            if (requests.get(to) !== undefined) {
                remote.FireClient(from, "busy")
            }
            remote.FireClient(to as Player, from);
            requests.set(to, from);
        } else if (type === "accept") {
            let plr1 = requests.get(from) as Player;
            //@ts-ignore
            plr1.Character.SetPrimaryPartCFrame(from.Character?.PrimaryPart.CFrame);
            requests.delete(from);
        } else if (type === "deny") {
            requests.delete(from);
        }
    }
})