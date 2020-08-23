const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { red_light } = require('../colours.json');

class Rouge extends Command {
  constructor() {
    super({
      name: 'rouge',
      description: "Envoie l'avatar du membre en rouge",
      usage: 'rouge [membre]',
      aliases: ['red', 'rood'],
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

      let body = `https://some-random-api.ml/canvas/red?avatar=${member.user.displayAvatarURL(
        { format: 'png' }
      )}`;

      let selfEmbed = new MessageEmbed().setColor(red_light).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Rouge;
