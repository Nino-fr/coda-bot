const Command = require('../base/Command.js');
const { MessageEmbed, Message } = require('discord.js');
const { blue_light } = require('../colours.json');

class Bleu extends Command {
  constructor() {
    super({
      name: 'Bleu',
      description: "Envoie l'avatar du membre en bleu",
      usage: 'bleu [membre]',
      aliases: ['blue', 'blauw'],
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
        body = `https://some-random-api.ml/canvas/blue?avatar=${member.user.avatarURL(
          { format: 'png' }
        )}`;
      } catch {
        body = `https://some-random-api.ml/canvas/blue?avatar=${message.member.user.avatarURL(
          { format: 'png' }
        )}`;
      }

      let selfEmbed = new MessageEmbed().setColor(blue_light).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Bleu;
