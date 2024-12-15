import { Client, Partials, Collection, Command, DiscordEvent, IntentsBitField } from "discord.js";
import fs from "fs";
import deploycmds from "./deploycmds";


async function setup() {
    try {
        // Create the client - intents can be added to the Client constructor to enable certain events & property access. Partials are similar to intents, but will emit when there's not enough data to construct a full object.
        const client = new Client({
            intents: [IntentsBitField.Flags.GuildMembers],
            partials: [Partials.GuildMember],
        });

        // Deploy commands to Discord
        await deploycmds();

        // Create a collection for commands
        client.commands = new Collection();

        /** 
            Read through the `commands` and `events` folders in order to load all commands and events into the client:
            1. Reads the directory and returns an array of files
            2. Filters the array to only include files ending in `.js` (for when we loop through them in the dist folder - where all code will be transpiled to JavaScript)
            3. Loops through the array of files
            4. Imports the file
            5. Adds the command to the collection, so we can process it in `events/interactionCreate.ts`
            6. Adds the event to the client so the exported function will be ran when the event is emitted
        */
        fs.readdir(__dirname + "/commands/", (err, files) => {
            if (err) console.log(err);
            const file = files.filter((f) => f.split(".").pop() === "js");
            if (file.length <= 0) {
                return;
            }
            file.forEach(async (f) => {
                const cmd: Command = await import(`./commands/${f}`);
                client.commands.set(cmd.help.data.toJSON().name, cmd);
            });
        });

        fs.readdir(__dirname + "/events/", (err, files) => {
            if (err) console.log(err);
            const file = files.filter((f) => f.split(".").pop() === "js");
            if (file.length <= 0) {
                return;
            }
            file.forEach(async (f) => {
                const event: DiscordEvent = await import(`./events/${f}`);
                client.on(event.name, event.run.bind(null, client));
            });
        });

        client.login(process.env.TOKEN);

    } catch (e) {
        console.error(e);
    }
}

setup();