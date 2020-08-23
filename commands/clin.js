const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { red_light } = require('../colours.json');
const fetch = require('node-fetch');

class ClinDOeil extends Command {
  constructor() {
    super({
      name: 'clindoeil',
      description: "Fait un clin d'oeil à un membre au choix",
      usage: 'clindoeil <membre>',
      aliases: ['clin', 'wink'],
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

      fetch(`https://some-random-api.ml/animu/wink`)
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
                `Salut ${
                  message.member.nickname
                    ? message.member.nickname
                    : message.author.username
                } !`
              )
              .setColor(red_light)
              .setImage(body.link);
            msg.edit('', selfEmbed);
          } else {
            let dEmbed = new MessageEmbed()
              .setDescription(
                `${member.nickname ? member.nickname : member.user.username}, ${
                  message.member.nickname
                    ? message.member.nickname
                    : message.author.username
                } vous fait un clin d'oeil !`
              )
              .setColor(red_light)
              .setImage(body.link);

            msg.edit('', dEmbed);
          }
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = ClinDOeil;
