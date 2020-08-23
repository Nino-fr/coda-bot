// Cet événement a lieu quand le bot quitte un serveur.

const { client } = require('../index.js');

module.exports = class {
  constructor() {
    this.client = client;
  }

  async run(guild) {
    this.client.user.setActivity(
      `${this.client.settings.get('default').prefix}help | ${
        this.client.guilds.cache.size
      } serveurs`
    );
    // Supprimons le serveur des réglages du bot et mettons un message en console.
    this.client.settings.delete(guild.id);
    this.client.logger.log(
      `J'ai quitté le serveur ${guild.name} (${guild.id}) qui comportait ${guild.memberCount} membres`
    );
  }
};
