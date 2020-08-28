const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const { red_dark } = require('../colours.json');

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
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args.shift());
      let reason = args.slice(1).join(' ');
      if (!args[0]) reason = 'Aucune';

      await this.client.warns.ensure(member.id, {
        sanctions: [],
        immunisation: false,
        lastUpdate: new Date(),
      });

      if (this.client.warns.get(member.id, 'immunisation') === true) {
        this.client.warns.set(member.id, false, 'immunisation');
        return this.repondre(
          message,
          `Ce membre est immunisé contre tout type de warn. Ce warn n'est donc pas pris en compte mais son immunité lui est retirée.`
        );
      }
      await this.client.warns
        .get(member.id, 'sanctions')
        .push(reason ? reason : 'Aucune raison');

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
