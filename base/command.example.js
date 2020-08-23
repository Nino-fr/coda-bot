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
      permLevel: 'User',
      category: 'Utilitaires',
    });
  }

  async run(message, args, level) {
    try {
      // Code
    } catch (err) {
      // Catch n'importe quelle erreur liée au code contenu dans le try.
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Example;
