const Command = require('../base/Command.js');
const { Message, MessageEmbed } = require('discord.js');
const colours = require('../colours.json');
const moment = require('moment');
moment.locale('fr');

class Ban extends Command {
  constructor() {
    super({
      name: 'bannir',
      description: 'Bannir un membre du serveur',
      usage: 'bannir <membre> [raison]',
      aliases: ['ban', 'banni'],
      guildOnly: true,
      permLevel: 'Administrateur',
      category: 'Modération',
    });
  }
  /**
   * Bannir un membre du serveur
   * @param { Message } message Le message
   * @param { String[] } args Les arguments passés après la commande
   */
  async run(message, args) {
    try {
      let reason = args.slice(1).join(' ');
      if (!message.member.permissions.has('BAN_MEMBERS'))
        return message.channel.send(
          "Vous n'avez pas la permission d'utiliser cette commande !"
        );
      let banMember =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0]));
      if (!banMember) return message.channel.send('Qui dois-je bannir ?');
      if (!banMember.bannable)
        return message.channel.send(
          'Vous ne pouvez pas bannir cette personne !'
        );

      if (!reason) reason = 'Aucune';

      if (!message.guild.me.permissions.has('BAN_MEMBERS'))
        return message.channel.send(
          "Je n'ai pas la permission de bannir les membres de ce serveur."
        );

      await banMember.ban().catch((err) => message.channel.send(err));

      message.channel.send({
        embed: {
          title: `<:ban:723924773033214002> \`${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }\` a banni \`${
            banMember.nickname ? banMember.nickname : banMember.user.username
          }\``,
          description: `\`\`\`markdown\n# Raison #\n${
            reason ? reason : 'Aucune'
          }\n\`\`\``,
          color: 6071551,
          thumbnail: {
            url: banMember.user.avatarURL({ format: 'png' }),
          },
        },
      });

      const lchannel = message.guild.channels.cache.find(
        (c) => c.name === 'logs'
      );
      const lEmbed = new MessageEmbed()
        .setColor(colours.red_light)
        .setAuthor(`Log de modération`, bot.user.avatarURL())
        .addField('Type :', 'Ban')
        .addField('Membre :', banMember.user.username)
        .addField('Modérateur :', message.author.username)
        .addField('Raison :', reason ? reason : 'Aucune')
        .addField('Date :', moment.utc(message.createdAt).format('LLLL'));
      lchannel.send(lEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Ban;
