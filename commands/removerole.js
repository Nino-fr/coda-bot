const Command = require('../base/Command.js');
const { Message, MessageEmbed } = require('discord.js');
const colours = require('../colours.json');
const moment = require('moment');

class RemoveRole extends Command {
  constructor() {
    super({
      name: 'removerole',
      description: 'Ajouter un rôle à un membre',
      usage: 'removerole <membre> <role>',
      aliases: [
        'rr',
        'enleverrole',
        'roleremove',
        'delrole',
        'roledel',
        'roledelete',
        'deleterole',
      ],
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
        (await message.guild.members.fetch(args[0]));
      let role =
        message.guild.roles.cache.find(
          (r) => r.name.toLowerCase() === args.join(' ').toLowerCase()
        ) ||
        message.guild.roles.cache.find(
          (r) => r.name.toLowerCase() === args.slice(1).join(' ').toLowerCase()
        ) ||
        message.guild.roles.cache.get(args[0]) ||
        message.guild.roles.cache.get(args[1]);
      if (!rMember) return message.channel.send('Veuillez préciser un membre.');
      if (!role) return message.channel.send('Veuillez préciser un rôle.');

      if (!rMember.roles.cache.has(role.id)) {
        return message.channel.send(
          `${
            rMember.nickname ? rMember.nickname : rMember.user.username
          } n'a pas ce rôle.`
        );
      } else {
        await rMember.roles
          .remove(role.id)
          .catch((err) =>
            this.client.utils.get('error').run(err, message, this.client)
          );
        message.channel.send(
          `J'ai bien retiré le rôle ${role.name} à ${
            rMember.nickname ? rMember.nickname : rMember.user.username
          }.`
        );
      }
      moment.locale('fr');
      let embed = new MessageEmbed()
        .setColor(colours.red_light)
        .setAuthor(`Log de modération`, this.client.user.avatarURL())
        .addField('Type :', 'Retrait de rôle')
        .addField(
          'Membre :',
          rMember.nickname ? rMember.nickname : rMember.user.username
        )
        .addField(
          'Modérateur :',
          message.member.nickname
            ? message.member.nickname
            : message.member.user.username
        )
        .addField('Date :', moment.utc(message.createdAt).format('LLL'))
        .addField('Rôle :', role.toString())
        .addField('Raison :', raison);

      let sChannel = message.guild.channels.cache.find(
        (c) => c.name === 'logs'
      );
      sChannel.send(embed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = RemoveRole;
