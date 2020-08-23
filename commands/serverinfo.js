const Command = require('../base/Command.js');
const { Message, MessageEmbed } = require('discord.js');
const colours = require('../colours.json');
const moment = require('moment');

class ServerInfo extends Command {
  constructor() {
    super({
      name: 'serverinfo',
      description: 'Donne plusieurs statistiques sur le serveur',
      usage: 'serverinfo',
      aliases: [
        'serveurinfo',
        'si',
        'guildinfo',
        'guildinfos',
        'serverinfos',
        'serveurinfos',
      ],
    });
  }
  /**
   *
   * @param {Message} message La commande
   */
  async run(message) {
    moment.locale('fr');
    let sEmbed = new MessageEmbed()
      .setColor(colours.cyan)
      .setTitle(`Informations sur le serveur ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL())
      .addField('**Nom :**', `${message.guild.name}`, true)
      .addField('**Propriétaire :**', `${message.guild.owner}`, true)
      .addField('**ID :**', message.guild.id, true)
      .addField(`Membres`, message.guild.memberCount, true)
      .addField(
        `Bots`,
        message.guild.members.cache.filter((mem) => mem.user.bot === true).size,
        true
      )
      .addField(
        'Membres (bots non compris)',
        message.guild.members.cache.filter((mem) => mem.user.bot === false)
          .size,
        true
      )
      .addField(
        `En ligne`,
        message.guild.members.cache.filter(
          (mem) => mem.presence.status != 'offline'
        ).size,
        true
      )
      .addField(`Rôles`, message.guild.roles.cache.size, true)
      .addField(
        `Date de création`,
        moment.utc(message.guild.createdAt).format('LL'),
        true
      );
    message.channel.send({ embed: sEmbed });
  }
}

module.exports = ServerInfo;
