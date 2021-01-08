import { Lighting } from "@rbxts/services";

let days: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let day: string = "Monday";
let time: string = "12:00 AM";
let lastHour: number = 0;
let val: StringValue = new Instance("StringValue");
val.Name = "date";
val.Parent = script;
//let suffix: string = "AM";

let processTime = (str: string) => {
    let split = str.split(":");
    return {
        hour: split[0],
        minute: split[1],
        second: split[2]
    }
}

let update = () => {
    val.Value = `${day}, ${time}`
}

Lighting.GetPropertyChangedSignal("TimeOfDay").Connect(() => {
    let currentTime = processTime(Lighting.TimeOfDay);
    let nHour = tonumber(currentTime.hour) as number;

    if (currentTime.hour !== undefined) {
        if (nHour < lastHour) {
            day = days[days.indexOf(day) + 1 || 1];
        }
        time = `${nHour <= 12 ? currentTime.hour : tostring(nHour - 12)}:${currentTime.minute} ${nHour <= 12 ? "AM" : "PM"}`;
    }

    update();
    lastHour = nHour;
})