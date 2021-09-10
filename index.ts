require('dotenv').config();
import { SlashCreator, VercelServer } from 'slash-create';
const path = require('path');
const CatLoggr = require('cat-loggr');
const logger = new CatLoggr().setLevel('debug');

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID as string,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
  //serverPort: 8020
});
const vercelServer = new VercelServer();
creator.on('debug', (message) => logger.log(message));
creator.on('warn', (message) => logger.warn(message));
creator.on('error', (error) => logger.error(error));
creator.on('synced', () => logger.info('Commands synced!'));
creator.on('commandRun', (command, _, ctx) =>
  logger.info(`${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`));
creator.on('commandRegister', (command) =>
  logger.info(`Registered command ${command.commandName}`));
creator.on('commandError', (command, error) => logger.error(`Command ${command.commandName}:`, error));

creator
  .withServer(vercelServer)
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .syncCommands()
  //.startServer();

// This should serve in localhost:8020/interactions
export const vercel = vercelServer;
export const slash = creator;
