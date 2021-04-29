const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const { red_dark } = require('../colours.json'),
  fs = require('fs'),
  warns = JSON.parse(JSON.stringify(require('../databases/warns.json')));

class Avertir extends Command {
  constructor() {
    super({
      name: 'avertir',
      description: 'Avertir un membre',
      usage: 'avertir <membre> [raison]',
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
      aliases: ['warn', 'attention', 'sanction'],
    });
  }
  /**
   *
   * @param { Message } message
   * @param { String[] } args
   */
  async run(message, args) {
    try {
      if (!args[0]) return message.channel.send('Qui dois-je warn ?');
      let member;
      try {
        member =
          message.mentions.members.first() ||
          (await message.guild.members.fetch(args[0]));
      } catch {
        return message.channel.send(
          'Aucun membre trouvé, veuillez réessayer avec une valeur correcte'
        );
      }

      args.shift();
      let reason = args.join(' ');
      if (!args[0]) reason = 'Aucune';

      if (!this.client.warns.get(member.id))
        warns[member.id] = {
          sanctions: [],
          immunisation: false,
        };

      if (this.client.immus.get(member.id)) {
        warns[member.id].immunisation = false;
        return this.repondre(
          message,
          `Ce membre est immunisé contre tout type de warn. Ce warn n'est donc pas pris en compte mais son immunité lui est retirée.`
        );
      }
      warns[member.id].sanctions.push(reason ? reason : 'Aucune raison');
      fs.writeFile(
        './databases/warns.json',
        JSON.stringify(warns, null, '\t'),
        (err) => {
          if (err) throw err;
        }
      );
      this.client.warns.set(member.id, warns[member.id].sanctions);
      this.client.immus.set(member.id, warns[member.id].immunisation);
      message.delete();
      return this.repondre(message, {
        embed: {
          title: `:warning: \`${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }\` a averti \`${
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

module.exports = Avertir;
