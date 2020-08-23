const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cyan } = require('../colours.json');
const fetch = require('node-fetch');

class Caresse extends Command {
  constructor() {
    super({
      name: 'caresse',
      description: 'Fait un câlin à un membre au choix',
      usage: 'caresse <membre>',
      aliases: ['pat', 'reconfort', 'réconfort', 'tapoter'],
      category: 'Fun',
    });
  }

  async run(message, args) {
    try {
      let msg = await message.channel.send(
        '<a:loading:718054521804292097> Chargement...'
      );
      let member;
      if (args[0]) {
        member =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]) ||
          message.guild.members.cache.find(
            (mem) => mem.nickname === args.join(' ')
          ) ||
          message.guild.members.cache.find(
            (mem) => mem.user.username === args.join(' ')
          );
      }

      fetch(`https://some-random-api.ml/animu/pat`)
        .then((res) => res.json())
        .then((body) => {
          if (!body)
            return message.channel.send(
              "Échec de l'exécution de la commande. Réessayez dans une minute..."
            );
          let selfEmbed;
          if (!args[0] || member === message.member) {
            selfEmbed = new MessageEmbed()
              .setDescription(
                `Besoin de réconfort ? Je suis là ${
                  message.member.nickname
                    ? message.member.nickname
                    : message.author.username
                } !`
              )
              .setColor(cyan)
              .setImage(body.link);
            msg.edit('', selfEmbed);
          } else {
            let dEmbed = new MessageEmbed()
              .setDescription(
                `${member.nickname ? member.nickname : member.user.username}, ${
                  message.member.nickname
                    ? message.member.nickname
                    : message.author.username
                } est fier de vous !`
              )
              .setColor(cyan)
              .setImage(body.link);

            msg.edit('', dEmbed);
          }
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Caresse;
