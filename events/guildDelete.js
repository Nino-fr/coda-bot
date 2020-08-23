// Cet événement a lieu quand le bot quitte un serveur.

const { client } = require('../index.js'), { Guild } = require('discord.js');

module.exports = class {
  constructor() {
    this.client = client;
  }

  /**
   * Supprimons le serveur quitté des réglages du bot et mettons un message en console.
   * @param {Guild} guild Le serveur quitté
   */
  async run(guild) {
    this.client.settings.delete(guild.id);
    this.client.logger.log(
      `J'ai quitté le serveur ${guild.name} (${guild.id}) qui comportait ${guild.memberCount} membres`
    );
  }
};
