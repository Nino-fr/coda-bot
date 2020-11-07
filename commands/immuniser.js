const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const fs = require('fs'),
  warns = JSON.parse(JSON.stringify(require('../databases/warns.json')));

class Immuniser extends Command {
  constructor() {
    super({
      name: 'Immuniser',
      description: 'Immuniser un membre contre la prochaine sanction le visant',
      usage: 'immuniser <membre>',
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
      aliases: [
        'immunité',
        'immunise',
        'immunite',
        'intouchable',
        'immunisation',
      ],
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
        (await message.guild.members.fetch(args[0])) ||
        (await message.guild.members.fetch({
          query: args.join(' '),
          limit: 1,
        }));

      if (!member)
        return this.repondre(message, 'Veuillez préciser un membre correct');

      if (!this.client.warns.get(member.id))
        warns[member.id] = {
          sanctions: [],
          immunisation: false,
        };

      if (this.client.immus.get(member.id)) {
        return this.repondre(message, "Ce membre possède déjà l'immunité !");
      }
      warns[member.id].immunisation = true;

      fs.writeFile('./databases/warns.json', JSON.stringify(warns), (err) => {
        if (err) throw err;
      });
      this.client.warns.set(member.id, warns[member.id].sanctions);
      this.client.immus.set(member.id, warns[member.id].immunisation);

      return this.repondre(
        message,
        `<:check:708245371792523317> \`${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }\` a accordé l'immunité pour la prochaine sanction à \`${
          member.nickname ? member.nickname : member.user.username
        }\``
      );
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Immuniser;
