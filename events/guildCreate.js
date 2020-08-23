// Cet événement a lieu quand le bot rejoint un nouveau serveur.

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
    this.client.logger.log(
      `Nouveau serveur : ${guild.name} (${guild.id}) avec ${
        guild.memberCount - 1
      } membres`
    );
  }
};
