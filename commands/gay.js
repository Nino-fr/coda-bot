const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { red_light } = require('../colours.json');

class Gay extends Command {
  constructor() {
    super({
      name: 'gay',
      description: "Envoie l'avatar du membre devant le drapeau LGBT",
      usage: 'gay <membre>',
      aliases: ['drapeauGay', 'gayPride', 'lgbt'],
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

      let body = `https://some-random-api.ml/canvas/gay?avatar=${member.user.displayAvatarURL(
        { format: 'png' }
      )}`;

      let selfEmbed = new MessageEmbed().setColor(red_light).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Gay;
