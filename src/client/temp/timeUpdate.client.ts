import { Workspace, Players } from "@rbxts/services";

let rstuff = Workspace.WaitForChild("raf's stuff") as Folder;
let timeTracker = rstuff.FindFirstChild("timeTracker") as Script;
let date = timeTracker.FindFirstChild("date") as StringValue;

let lplr = Players.LocalPlayer as Player;
let plrgui = lplr.FindFirstChild("PlayerGui") as PlayerGui;
let timegui = plrgui.WaitForChild("timegui") as ScreenGui;
let main = timegui.WaitForChild("main") as Frame;
let tl = main.WaitForChild("TextLabel") as TextLabel;


date.Changed.Connect(() => {
    tl.Text = date.Value;
})