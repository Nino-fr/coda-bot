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
      ],
    });
  }
  /**
   *
   * @param {Message} message La commande
   */
  async run(message, args) {
    let member;
    try {
      member = message.mentions.members.first();
      if (!member) member = await message.guild.members.fetch(args[0]);
    } catch {
      try {
        member = await (
          await message.guild.members.fetch({
            query: args.join(' '),
            limit: 1,
          })
        ).first();
      } catch {
        member = message.member;
      }
    }

    if (!member.user) member = message.member;

    let x = member.user.presence.activities;
    let y;
    switch (member.user.presence.status) {
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
        title: `Informations sur ${member.user.tag}`,
        thumbnail: {
          url: member.user.avatarURL(),
        },
        fields: [
          {
            name: 'Statut',
            value: y,
          },
          {
            name: 'ID :',
            value: member.id,
          },
          {
            name: 'Activité :',
            value: `${
              `${x}`
                ? x
                    .map((xx) =>
                      xx.state !== '' &&
                      xx.state !== undefined &&
                      xx.state !== null
                        ? xx.state
                        : `${
                            xx.type === 'PLAYING'
                              ? 'Joue à '
                              : xx.type === 'LISTENING'
                              ? 'Écoute '
                              : xx.type === 'WATCHING'
                              ? 'Regarde '
                              : xx.type === 'STREAMING'
                              ? 'Stream '
                              : 'Compétitionne '
                          }${xx.name}`
                    )
                    .join(', ')
                : 'Aucune'
            }`,
          },
          {
            name: 'Pseudo :',
            value: member.nickname ? member.nickname : member.user.username,
          },
          {
            name: 'Compte créé le :',
            value: moment.utc(member.user.createdAt).format('LLL'),
          },
          {
            name: 'A rejoint le serveur le :',
            value: moment.utc(member.joinedAt).format('LLL'),
          },
          {
            name: 'Ce membre est-il un bot ?',
            value: member.user.bot ? 'Oui' : 'Non',
          },
        ],
        footer: {
          text: `Informations de l'utilisateur ${member.user.tag}`,
        },
      },
    });
  }
}

module.exports = UserInfo;
