const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const { red_dark } = require('../colours.json'),
  fs = require('fs'),
  warns = JSON.parse(JSON.stringify(require('../databases/papotins.json')));

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
        (await message.guild.members.fetch(args.shift()));
      if (!member)
        return this.repondre(
          message,
          'Veuillez spécifier un membre à warn dans la commande.'
        );
      let reason = args.join(' ');
      if (reason) reason = 'Aucune';

      if (
        !this.client.warns.get(member.id) ||
        this.client.warns.get(member.id).length === 0
      )
        return this.repondre(message, "Ce membre n'a reçu aucune sanction !");

      warns[member.id].sanctions.pop();

      fs.writeFile('./databases/warns.json', JSON.stringify(warns), (err) => {
        if (err) throw err;
      });
      this.client.warns.set(member.id, warns[member.id].sanctions);

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
