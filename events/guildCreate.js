// Cet événement a lieu quand le bot rejoint un nouveau serveur.

// Importer le client et la classe Guild.
const { client } = require('../index.js'), { Guild } = require('discord.js');

module.exports = class {
  constructor() {
    this.client = client;
  }

  /**
   * Afficher en console que le bot a rejoint un serveur et afficher des informations sur ce serveur
   * @param {Guild} guild Le serveur rejoint
   */
  async run(guild) {
    this.client.logger.log(
      `Nouveau serveur : ${guild.name} (${guild.id}) avec ${
        guild.memberCount - 1
      } membres`
    );
  }
};
