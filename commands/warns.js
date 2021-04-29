const Command = require('../base/Command.js');
const { Message } = require('discord.js'),
  warns = JSON.parse(JSON.stringify(require('../databases/warns.json')));

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
      if (!member) member = message.member;
      if (!member.user) member = message.member;
      

      if (
        !this.client.warns.get(member.id) ||
        this.client.warns.get(member.id).length === 0
      ) {
        return this.repondre(message, "Ce membre n'a reçu aucune sanction");
      }

      let sanctions = this.client.warns.get(member.id);
      let immunite = this.client.immus.get(member.id)
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
