// Made by RaforawesomeAlt
// Made with roblox-ts (transpiled), so don't touch just ping me on discord for the real source
import { ReplicatedStorage, Workspace, Players } from "@rbxts/services";

//let zoneEvent = ReplicatedStorage.FindFirstChild("Zone") as RemoteEvent;

//let zones: Array<Instance> = [];
let currentGUI: ScreenGui;
let currentSound: Sound;
let lplr = Players.LocalPlayer;
let inZones = new Map();

let opacity = async function (gui: TextLabel, increment: number, goal: number) {
    let tp: number = gui.TextTransparency;

    for (tp; tp >= goal; tp += increment) {
        gui.TextTransparency = tp;
        wait()
    }
}

let depacity = async function (gui: TextLabel, increment: number, goal: number) {
    wait(3)
    let tp: number = gui.TextTransparency;

    for (tp; tp <= goal; tp += increment) {
        gui.TextTransparency = tp;
        wait()
    }
}

let popup = async function (oldgui: ScreenGui) {
    if (!oldgui || (currentGUI?.FindFirstChild("Main") as TextLabel)?.Text === (oldgui?.FindFirstChild("Main") as TextLabel)?.Text) {
        return
    }
    currentGUI?.Destroy();

    let gui = oldgui.Clone();
    let main = gui.FindFirstChild("Main") as TextLabel;
    main.Transparency = 1;
    gui.Parent = lplr.FindFirstChild("PlayerGui");
    currentGUI = gui;
    await opacity(main, -0.1, 0);
    //wait(3);
    await depacity(main, 0.1, 1);
    wait(1);
    main.Destroy();
}

Workspace.GetChildren().forEach(child => {
    if (child.Name === "Zone" && child.IsA("Part")) {
        inZones.set(child.Name, false);
        //zones.push(child);
        child.Touched.Connect((hit: BasePart) => {
            if (Players.GetPlayerFromCharacter(hit.Parent) === lplr && inZones.get(child.Name) === false) {
                inZones.set(child.Name, true)
                pcall(popup, child.FindFirstChild("ZoneName") as ScreenGui);
                (child.FindFirstChild("ZoneMusic") as Sound)?.Play();
                currentSound = child.FindFirstChild("ZoneMusic") as Sound;
                print('in zone')
            }
        })

        child.TouchEnded.Connect((hit: BasePart) => {
            let found: boolean = false;
            lplr.Character?.GetChildren().forEach(child2 => {
                if (child2.IsA("Part")) {
                    child = child as Part;
                    child.GetChildren().forEach(touching => {
                        if (touching === child2) {
                            found = true;
                            return
                        }
                    })
                }
            });

            if (found) {
                return
            }

            if (Players.GetPlayerFromCharacter(hit.Parent) === lplr && inZones.get(child.Name) === true) {
                inZones.set(child.Name, false)
                currentGUI?.Destroy();
                currentSound?.Stop();
                print('out zone')
            }
        })
    }
})