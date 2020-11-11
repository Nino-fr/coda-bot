const Command = require('../base/Command.js');
// Les autres modules/databases à importer

class Example extends Command {
  constructor() {
    super({
      name: 'commandName',
      description: 'Une courte description',
      usage: 'commandName <argument obligatoire> [argument optionnel]',
      aliases: ['alias1', 'alias2'],
      guildOnly: false,
      enabled: true,
      permLevel: 'Membre',
      category: 'Utilitaires',
    });
  }

  async run(message, args, level) {
    try {
      // Code
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Example;
