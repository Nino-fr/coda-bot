// Cet événement a lieu quand un membre quitte le serveur.

const { client } = require('../index.js');

module.exports = class {
  constructor() {
    this.client = client;
  }

  async run(user) {
    let wChannel =
      user.guild.channels.cache.find((ch) => ch.name.includes('errants')) ||
      user.guild.channels.cache.find((ch) => ch.name.includes('bienvenue'));
    wChannel.send(`Oh non ! ${user} a quitté le serveur...`);
  }
};
