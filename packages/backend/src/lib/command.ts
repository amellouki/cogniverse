import { SlashCommandBuilder } from 'discord.js';

export interface ICommand {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: (...args: any) => any;
}
