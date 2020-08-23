const Command = require('../base/Command.js');

class Reboot extends Command {
  constructor() {
    super({
      name: 'reboot',
      description: 'Si le bot est lancé sous PM2, il va redémarrer.',
      category: 'Système',
      usage: 'reboot',
      permLevel: 'Bot Admin',
      aliases: ['redemarrer', 'actualiser'],
    });
  }

  async run(message, args, level) {
    // eslint-disable-line no-unused-vars
    try {
      await message.delete();
      let msg = await message.reply('Le bot est en train de se relancer...');
      await msg.delete();
      await Promise.all(
        this.client.commands.map((cmd) => this.client.unloadCommand(cmd))
      );
      process.exit(1);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Reboot;
