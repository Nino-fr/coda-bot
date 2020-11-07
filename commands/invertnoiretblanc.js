const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cream } = require('../colours.json');

class InvertNoirEtBlanc extends Command {
  constructor() {
    super({
      name: 'inverserNoirBlanc',
      description: "Envoie l'avatar du membre en noir et blanc inversés",
      usage: 'inversernoirblanc [membre]',
      aliases: [
        'InvertNoirEtBlanc',
        'invertnoirblanc',
        'InvertNoirEtBlanc',
        'invertgreyscale',
        'inversergreyscale',
      ],
      category: 'Images',
      enabled: true,
    });
  }

  async run(message, args) {
    try {
      let member;

      member =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0])) ||
        (await message.guild.members.fetch({
          query: args.join(' '),
          limit: 1,
        })) ||
        message.member;

      let body = `https://some-random-api.ml/canvas/invertgreyscale?avatar=${member.user.displayAvatarURL(
        { format: 'png' }
      )}`;

      let selfEmbed = new MessageEmbed().setColor(cream).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = InvertNoirEtBlanc;
