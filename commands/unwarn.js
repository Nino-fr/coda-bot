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
      if (!member)
        return this.repondre(
          message,
          'Veuillez spécifier un membre à warn dans la commande.'
        );
      let reason = args.join(' ');
      if (reason) reason = 'Aucune';

      if (
        !this.client.warns.get(member.id) ||
        this.client.warns.get(member.id, 'sanctions').length === 0
      ) {
        return this.repondre(message, "Ce membre n'a reçu aucune sanction !");
      }

      await this.client.warns
        .get(member.id, 'sanctions')
        .splice(this.client.warns.get(member.id, 'sanctions').length - 1);
      /* fs.writeFile('./databases/warns.json', JSON.stringify(warns), (err) => {
        if (err) throw err;
      }); */

      return this.repondre(message, {
        embed: {
          title: `:white_check_mark: \`${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }\` a enlevé le dernier warn de \`${
            member.nickname ? member.nickname : member.user.username
          }\``,
          description: `\`\`\`markdown\n# Raison #\n${
            reason ? reason : 'Aucune'
          }\n\`\`\``,
          color: red_dark,
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Désavertir;
