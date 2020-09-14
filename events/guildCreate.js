// This event executes when a new guild (server) is joined.

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {

    this.client.user.setActivity(`${this.client.settings.get("default").prefix}help | ${this.client.guilds.cache.size} serveurs`);
    this.client.logger.log(`Nouveau serveur : ${guild.name} (${guild.id}) avec ${guild.memberCount - 1} membres`);
  }
};
