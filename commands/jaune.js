const Command = require('../base/Command.js');
const { MessageEmbed, Message } = require('discord.js');
const { orange } = require('../colours.json');

class Jaune extends Command {
  constructor() {
    super({
      name: 'jaune',
      description: "Envoie l'avatar du membre en jaune",
      usage: 'jaune [membre]',
      aliases: ['yellow', 'yel', 'ja', 'brice', 'sun'],
      category: 'Images',
      enabled: true,
    });
  }

  /**
   *
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    try {
      let member;

      try {
        member =
          message.mentions.members.first() ||
          (await message.guild.members.fetch(args[0]));
      } catch {
        member = member = (
          await message.guild.members.fetch({
            query: args.join(' '),
            limit: 1,
          })
        ).first();
        if (!member) member = message.member;
      }
      try {
        if (!member)
          member = (
            await message.guild.members.fetch({
              query: args.join(' '),
              limit: 1,
            })
          ).first();
        if (!member) member = message.member;
      } catch {
        member = message.member;
      }

      let body;
      try {
        body = `https://some-random-api.ml/canvas/color?avatar=${member.user.avatarURL(
          { format: 'png' }
        )}&color=%23FFFF19`;
      } catch {
        body = `https://some-random-api.ml/canvas/color?avatar=${message.member.user.avatarURL(
          { format: 'png' }
        )}&color=%23FFFF19`;
      }

      let selfEmbed = new MessageEmbed().setColor(orange).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Jaune;
