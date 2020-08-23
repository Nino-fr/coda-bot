const Command = require('../base/Command.js');

class MyLevel extends Command {
  constructor() {
    super({
      name: 'mylevel',
      description: 'Donne votre niveau de permission pour mes commandes.',
      usage: 'mylevel',
      guildOnly: true,
      aliases: ['monniveau', 'myperm', 'mesperms'],
    });
  }

  async run(message, args, level) {
    const friendly = this.client.config.permLevels.find(
      (l) => l.level === level
    ).name;
    message.reply(`Votre niveau de permission est : ${level} - ${friendly}`);
  }
}

module.exports = MyLevel;
