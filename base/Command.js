const { client } = require('../index.js');

class Command {
  constructor({
    name = null,
    description = 'Aucune',
    category = 'Utilitaires',
    usage = 'Aucun',
    enabled = true,
    guildOnly = false,
    aliases = new Array(),
    permLevel = 'Membre',
  }) {
    this.client = client;
    this.conf = { enabled, guildOnly, aliases, permLevel };
    this.help = { name, description, category, usage };
    this.repondre = this.client.repondre;
  }
}
module.exports = Command;
