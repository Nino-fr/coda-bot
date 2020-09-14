// This event executes when a new guild (server) is left.

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {

    this.client.user.setActivity(`${this.client.settings.get("default").prefix}help | ${this.client.guilds.cache.size} serveurs`);
    // Well they're gone. Let's remove them from the settings and log it!
    this.client.settings.delete(guild.id);
    this.client.logger.log(`J'ai quitté le serveur ${guild.name} (${guild.id}) qui comportait ${guild.memberCount} membres`);
  }
};
