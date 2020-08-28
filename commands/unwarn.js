const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const { red_dark } = require('../colours.json');

class Désavertir extends Command {
  constructor() {
    super({
      name: 'Désavertir',
      description: "Enlever le dernier avertissement d'un membre",
      usage: 'Désavertir <membre> [raison]',
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
      aliases: ['unwarn', 'removewarn'],
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
        message.guild.members.cache.get(args.shift());
      let reason = args.slice(1).join(' ');
      if (!args[0]) reason = 'Aucun';
      const warns = await JSON.parse(
        (
          await this.client.channels.cache
            .get('748126259850248342')
            .messages.fetch('748126670455570492')
        ).content
          .replace('```json\n', '')
          .replace('\n```', '')
      );
      if (
        !this.client.warns.get(member.id) ||
        this.client.warns.get(member.id, 'sanctions').length === 0
      ) {
        return this.repondre(message, "Ce membre n'a reçu aucune sanction !");
      }

      await warns[member.id].sanctions.splice(
        warns[member.id].sanctions.length - 1
      );
      await this.client.warns
        .get(member.id, 'sanctions')
        .splice(this.client.warns.get(member.id, 'sanctions').length - 1);
      /* fs.writeFile('./databases/warns.json', JSON.stringify(warns), (err) => {
        if (err) throw err;
      }); */
      const save = async () => {
        (
          await this.client.channels.cache
            .get('748126259850248342')
            .messages.fetch('748126670455570492')
        ).edit('```json\n' + JSON.stringify(this.client.warns) + '\n```');
      };
      save();
      return this.repondre(message, {
        embed: {
          title: `:white_check_mark: \`${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }\` a enlevé le dernier warn de \`${
            member.nickname ? member.nickname : member.user.username
          }\``,
          description: `\`\`\`markdown\n# Raison #\n${reason}\n\`\`\``,
          color: red_dark,
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Désavertir;