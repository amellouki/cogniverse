import { Injectable } from '@nestjs/common';
import { ICommand } from 'src/lib/command';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { DiscordConversationService } from 'src/repositories/discord/discord-conversation/discord-conversation.service';

@Injectable()
export class ResetHistoryService implements ICommand {
  constructor(private discordConversationService: DiscordConversationService) {}

  data = new SlashCommandBuilder()
    .setName('reset-history')
    .setDescription('Reset chat history for the following conversation');

  public async execute(interaction: ChatInputCommandInteraction) {
    await Promise.all([
      this.discordConversationService.resetHistory(interaction.channel.id),
      interaction.deferReply(),
    ]);
    await interaction.editReply(
      `Chat history for channel <#${interaction.channel.id}> has been reset! - <@${interaction.user.id}>`,
    );
  }
}
