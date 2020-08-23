const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
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

  async run(message, args) {
    try {
      let member;

      member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          (mem) => mem.nickname === args.join(' ')
        ) ||
        message.guild.members.cache.find(
          (mem) => mem.user.username === args.join(' ')
        ) ||
        message.member;

      let body = `https://some-random-api.ml/canvas/blue?avatar=${member.user.displayAvatarURL(
        { format: 'png' }
      )}`;

      let selfEmbed = new MessageEmbed().setColor(blue_light).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Bleu;
