// This event executes when a member leaves a server.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(user) {
    let wChannel =
      user.guild.channels.cache.find((ch) => ch.name.includes("errants")) ||
      user.guild.channels.cache.find((ch) => ch.name.includes("bienvenue"));
    wChannel.send(`Oh non ! ${user} a quitté le serveur...`);
  }
};
