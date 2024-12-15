import { CommandHelp, CommandRun, SlashCommandBuilder, GuildMember } from "discord.js";
import { ModLog } from "../definitions/types";

export const run: CommandRun = async (client, interaction) => {

};

export const help: CommandHelp = {
    allowedPerms: ["DEVELOPER"],
    allowedRoles: [],
    allowedUsers: [],
    data: new SlashCommandBuilder()
        .setName("mute").setDescription("Mute a user.")
        .addUserOption(option => option.setName("target").setDescription("The user to mute.").setRequired(true))
        .addStringOption(option => option.setName("time").setDescription("The time to mute the user for.").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for muting the user.").setRequired(false)) as SlashCommandBuilder
};
