const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cream } = require('../colours.json');

class Invert extends Command {
  constructor() {
    super({
      name: 'inverser',
      description: "Envoie l'avatar du membre avec les couleurs inversées",
      usage: 'inverser [membre]',
      aliases: ['invert', 'invertcolor', 'invertcolours'],
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

      let body = `https://some-random-api.ml/canvas/invert?avatar=${member.user.displayAvatarURL(
        { format: 'png' }
      )}`;

      let selfEmbed = new MessageEmbed().setColor(cream).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Invert;
