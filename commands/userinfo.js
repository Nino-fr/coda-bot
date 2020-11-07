const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const moment = require('moment');

class UserInfo extends Command {
  constructor() {
    super({
      name: 'userinfo',
      description: 'Donne plusieurs informations sur le membre',
      usage:
        "userinfo <@mention-optionnelle | id du membre | nom d'utilisateur ou pseudo du membre>",
      aliases: [
        'utilisateurinfo',
        'membreinfo',
        'ui',
        'membreinfos',
        'utilisateurinfos',
        'info',
      ],
    });
  }
  /**
   *
   * @param {Message} message La commande
   */
  async run(message, args) {
    const membre =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0])) ||
      (await message.guild.members.fetch({
        query: args.join(' '),
        limit: 1,
      })) ||
      message.member;
    let x = membre.user.presence.activities;
    let y;
    switch (membre.user.presence.status) {
      case 'offline':
        y = 'Hors-ligne';
        break;
      case 'online':
        y = 'En ligne';
        break;
      case 'dnd':
        y = 'Ne pas déranger';
        break;
      case 'idle':
        y = 'Inactif';
        break;
    }

    moment.locale('fr');

    message.channel.send({
      embed: {
        color: 15844367,
        title: `Informations sur ${membre.user.tag}`,
        thumbnail: {
          url: membre.user.avatarURL(),
        },
        fields: [
          {
            name: 'Statut',
            value: y,
          },
          {
            name: 'ID :',
            value: membre.id,
          },
          {
            name: 'Jeu :',
            value: `${
              `${x}`
                ? `${x
                    .join(', ')
                    .replace('Custom Status', 'Statut personnalisé')}`
                : 'Aucun jeu'
            }`,
          },
          {
            name: 'Pseudo :',
            value: membre.nickname ? membre.nickname : membre.user.username,
          },
          {
            name: 'Compte créé le :',
            value: moment.utc(membre.user.createdAt).format('LLL'),
          },
          {
            name: 'A rejoint le serveur le :',
            value: moment.utc(membre.joinedAt).format('LLL'),
          },
          {
            name: 'Ce membre est-il un bot ?',
            value: membre.user.bot ? 'Oui' : 'Non',
          },
        ],
        footer: {
          text: `Informations de l'utilisateur ${membre.user.tag}`,
        },
      },
    });
  }
}

module.exports = UserInfo;
