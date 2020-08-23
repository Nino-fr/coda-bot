const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { red_light } = require('../colours.json');
const fetch = require('node-fetch');

class Hug extends Command {
  constructor() {
    super({
      name: 'calin',
      description: 'Fait un câlin à un membre au choix',
      usage: 'calin <membre>',
      aliases: ['câlin', 'hug'],
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
            (mem) =>
              (mem.nickname
                ? mem.nickname.toString().toLowerCase()
                : mem.user.username.toString().toLowerCase()) ===
              args.join(' ').toLowerCase()
          ); /*  ||
          message.guild.members.cache.find(
            (mem) =>
              mem.user.username.toString().toLowerCase() ===
              args.join(' ').toLowerCase()
          ); */
      }

      fetch(`https://some-random-api.ml/animu/hug`)
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
                `Tu es seul(e) ${
                  message.member.nickname
                    ? message.member.nickname
                    : message.author.username
                } ? Laisse moi te serrer dans mes bras !`
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
                } vous fait un câlin !`
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

module.exports = Hug;
