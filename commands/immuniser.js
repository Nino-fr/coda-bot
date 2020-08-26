const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const { red_dark } = require('../colours.json');

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
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((mem) =>
          mem.nickname
            ? mem.nickname.toLowerCase() === args.join(' ').toLowerCase()
            : mem.user.username.toLowerCase() === args.join(' ').toLowerCase()
        );
      const warns = await JSON.parse(
        (
          await this.client.channels.cache
            .get('748126259850248342')
            .messages.fetch('748126670455570492')
        ).content
          .replace('```json\n', '')
          .replace('\n```', '')
      );
      if (!warns[member.id]) {
        warns[member.id] = {
          sanctions: [],
          immunisation: false,
        };
      }

      await this.client.warns.ensure(member.id, {
        sanctions: [],
        immunisation: false,
        lastUpdate: new Date(),
      });
      const save = async () => {
        (
          await this.client.channels.cache
            .get('748126259850248342')
            .messages.fetch('748126670455570492')
        ).edit('```json\n' + JSON.stringify(warns) + '\n```');
      };

      if (this.client.warns.get(member.id, 'immunisation') === true) {
        return this.repondre(message, "Ce membre possède déjà l'immunité !");
      }
      this.client.warns.set(member.id, true, 'immunisation');
      /* fs.writeFile('./databases/warns.json', JSON.stringify(warns), (err) => {
        if (err) throw err;
      }); */
      save();
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
