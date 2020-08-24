const Command = require('../base/Command.js');
const { Message, MessageEmbed } = require('discord.js');
const colours = require('../colours.json');
const moment = require('moment');

class Addrole extends Command {
  constructor() {
    super({
      name: 'addrole',
      description: 'Ajouter un rôle à un membre',
      usage: 'addrole <membre> <role>',
      aliases: ['ar', 'ajouterrole', 'roleadd'],
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
    });
  }
  /**
   *
   * @param { Message } message
   * @param { String[] } args
   */
  async run(message, args) {
    try {
      let rMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let role =
        message.guild.roles.cache.find(
          (r) => r.name === args.join(' ') || r.name === args.slice(1).join(' ')
        ) ||
        message.guild.roles.cache.get(args[0]) ||
        message.guild.roles.cache.get(args[1]);
      if (!rMember)
        return this.repondre(message, 'Veuillez préciser un membre.');
      if (!role) return this.repondre(message, 'Veuillez préciser un rôle.');
      if (!message.guild.me.permissions.has('MANAGE_ROLES'))
        return this.repondre(message, "Je n'ai pas la permission de faire ça.");

      if (rMember.roles.cache.has(role.id)) {
        return this.repondre(
          message,
          `${
            rMember.nickname ? rMember.nickname : rMember.user.username
          } a déjà ce rôle`
        );
      } else {
        try {
          await rMember.roles.add(role.id);
          this.repondre(
            message,
            `J'ai bien ajouté le rôle ${role.name} à ${
              rMember.nickname ? rMember.nickname : rMember.user.username
            }.`
          );
        } catch {
          return this.repondre(
            message,
            'Je ne peux pas ajouter ce rôle, il est trop haut en grade ! Redescendez-le pour le mettre sous mon plus haut rôle et réessayez.'
          );
        }
      }

      let embed = new MessageEmbed()
        .setColor(colours.red_light)
        .setAuthor(`Log de modération`, this.client.user.avatarURL())
        .addField('Type :', 'Ajout de rôle')
        .addField(
          'Membre :',
          rMember.nickname ? rMember.nickname : rMember.user.username
        )
        .addField(
          'Modérateur :',
          message.member.nickname ? rMember.nickname : rMember.user.username
        )
        .addField('Date :', moment.utc(message.createdAt).format('LLL'))
        .addField('Rôle :', role.name);

      let sChannel = message.guild.channels.cache.find(
        (c) => c.name === 'logs'
      );
      sChannel.send(embed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Addrole;
