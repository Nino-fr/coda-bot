const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cream } = require('../colours.json');

class NoirEtBlanc extends Command {
  constructor() {
    super({
      name: 'NoirEtBlanc',
      description: "Envoie l'avatar du membre en noir et blanc",
      usage: 'NoirEtBlanc [membre]',
      aliases: ['greyscale', 'grijs', 'gris'],
      category: 'Images',
      enabled: true,
    });
  }

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
        body = `https://some-random-api.ml/canvas/greyscale?avatar=${member.user.displayAvatarURL(
          { format: 'png' }
        )}`;
      } catch {
        body = `https://some-random-api.ml/canvas/greyscale?avatar=${message.member.user.displayAvatarURL(
          { format: 'png' }
        )}`;
      }

      let selfEmbed = new MessageEmbed().setColor(cream).setImage(body);
      message.channel.send(selfEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = NoirEtBlanc;
