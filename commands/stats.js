const Command = require('../base/Command.js');
const { version, Message } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class Stats extends Command {
  constructor() {
    super({
      name: 'stats',
      description: 'Donne plusieurs statistiques sur le bot',
      usage: 'stats',
      aliases: ['botinfo', 'botinfos', 'clientinfo', 'clientinfos'],
    });
  }
  /**
   *
   * @param {Message} message Le message
   */
  async run(message) {
    const duration = moment
      .duration(this.client.uptime)
      .format(' D [jours], H [heures], m [minutes], s [secondes]');
    message.channel.send(
      `= STATISTIQUES =
  • Version du bot    :: v${this.client.config.version}
  • Langage           :: JavaScript
  • RAM               :: ${(
    process.memoryUsage().heapUsed /
    1024 /
    1024
  ).toFixed(2)} MB
  • Uptime            :: ${duration}
  • Utilisateurs      :: ${
    this.client.guilds.cache.get('574626014664327178').memberCount +
    this.client.guilds.cache.get('707875749343789066').memberCount
  }
  • Discord.js        :: v${version}
  • NodeJS            :: ${process.version}
  • Développeur       :: Nino#3670`, //  • Serveurs          :: ${this.client.guilds.cache.size.toLocaleString()}
      // • Salons            :: ${this.client.channels.cache.size.toLocaleString()}
      { code: 'asciidoc' }
    );
  }
}

module.exports = Stats;
