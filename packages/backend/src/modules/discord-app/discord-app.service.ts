import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  Client,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
  Events,
} from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { CvService } from 'src/modules/discord-app/discord-commands/cv/cv.service';
import { ICommand } from 'src/lib/command';
import { ResetHistoryService } from 'src/modules/discord-app/discord-commands/reset-history/reset-history.service';

@Injectable()
export class DiscordAppService implements OnModuleInit {
  private readonly logger = new Logger(DiscordAppService.name);

  private client: Client;
  private commandMap: Map<string, ICommand>;
  private commands: ICommand['data'][];

  constructor(
    private readonly configService: ConfigService,
    // commands
    private cvService: CvService,
    private resetHistoryService: ResetHistoryService,
  ) {
    const list = [this.cvService, this.resetHistoryService];
    this.commandMap = new Map<string, ICommand>(
      list.map((command) => [command.data.name, command]),
    );
    this.commands = list.map((command) => command.data);
  }

  onModuleInit() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Message, Partials.Channel],
    });
    this.client.once('ready', () => {
      this.logger.log('Bot is Ready!');
    });

    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const command = this.commandMap.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (error) {
        this.logger.error(error);
        await interaction.reply({
          content: 'Something went wrong! ' + error.message,
          ephemeral: true,
        });
      }
    });

    this.client
      .login(this.configService.get('DISCORD_BOT_TOKEN'))
      .then(this.logger.log)
      .catch((e) => this.logger.error(e.message));

    this.registerCommands();
  }

  private registerCommands() {
    const rest = new REST().setToken(
      this.configService.get('DISCORD_BOT_TOKEN'),
    );
    rest
      .put(
        Routes.applicationCommands(
          this.configService.get('DISCORD_APPLICATION_ID'),
        ),
        {
          auth: true,
          body: this.commands,
        },
      )
      .then(this.logger.log)
      .catch((e) => this.logger.error(e.message));
  }
}
