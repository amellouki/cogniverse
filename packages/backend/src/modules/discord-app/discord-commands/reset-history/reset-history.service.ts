import { Injectable } from '@nestjs/common';
import { ICommand } from 'src/models/command';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

@Injectable()
export class ResetHistoryService implements ICommand {
  data = new SlashCommandBuilder()
    .setName('reset-history')
    .setDescription('Reset chat history for the following conversation');
  public async execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply('Not implemented yet');
  }
}
