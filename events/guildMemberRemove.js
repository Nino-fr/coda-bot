// This event executes when a member leaves a server.

const { GuildMember } = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  /**
   *
   * @param {GuildMember} member
   */
  async run(member) {
    if (member.guild.id === '574626014664327178') return;
    let wChannel = member.guild.channels.cache.find((ch) =>
      ch.name.includes('bienvenue')
    );
    wChannel.send(`Oh non ! ${member} a quitté le serveur...`);
  }
};
