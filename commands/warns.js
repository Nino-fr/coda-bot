const Command = require('../base/Command.js');
const { Message } = require('discord.js');

class Sanctions extends Command {
  constructor() {
    super({
      name: 'sanctions',
      description: "Voir la liste des sanctions d'un membre",
      usage: 'sanctions [membre]',
      guildOnly: true,
      aliases: ['warns', 'sanctions', 'avertissements'],
    });
  }
  /**
   *
   * @param { Message } message
   * @param { String[] } args
   */
  async run(message, args) {
    try {
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((mem) =>
          mem.nickname
            ? mem.nickname.toLowerCase() === args.join(' ').toLowerCase()
            : mem.user.username.toLowerCase() === args.join(' ').toLowerCase()
        ) ||
        message.member;

      if (
        !this.client.warns.get(member.id) ||
        this.client.warns.get(member.id, 'sanctions').length === 0
      )
        return this.repondre(message, "Ce membre n'a reçu aucune sanction");
      let sanctions = this.client.warns.get(member.id).sanctions;
      let immunite = this.client.warns.get(member.id).immunisation
        ? "**Ce membre dispose d'un joker lui permettant d'esquiver la prochaine sanction.**"
        : '';
      return message.channel.send({
        embed: {
          title: `Liste des avertissements de \`${
            member.nickname ? member.nickname : member.user.username
          }\``,
          color: 0xe74c3c,
          description:
            "**Nombre d'avertissements :** " +
            sanctions.length +
            '\n\n- ' +
            sanctions.join('\n- ') +
            ' \n\n' +
            immunite,
          thumbnail: { url: member.user.avatarURL() },
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Sanctions;
