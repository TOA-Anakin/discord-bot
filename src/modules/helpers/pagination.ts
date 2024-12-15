import { EmbedBuilder, Message, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from "discord.js";

export default class Pagination
{
    private pages: EmbedBuilder[] = [];
    private currentPage = 0;
    private message?: Message = undefined;
    private channel: TextChannel | undefined;

    constructor(channel: TextChannel, pages: EmbedBuilder[]) {
        this.channel = channel;
        this.pages = pages;
    }
}