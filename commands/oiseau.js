const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cyan } = require('../colours.json');
const fetch = require('node-fetch');

class Oiseau extends Command {
  constructor() {
    super({
      name: 'oiseau',
      description: 'Donne une image aléatoire de oiseau',
      usage: 'oiseau',
      aliases: ['randomOiseau', 'oiseauAleatoire', 'bird'],
      category: 'Fun',
    });
  }

  async run(message) {
    try {
      let msg = await message.channel.send(
        '<a:loading:718054521804292097> Chargement...'
      );

      fetch(`https://some-random-api.ml/img/birb`)
        .then((res) => res.json())
        .then((body) => {
          if (!body)
            return message.channel.send(
              "Échec de l'exécution de la commande. Réessayez dans une minute..."
            );

          let dEmbed = new MessageEmbed()
            .setColor(cyan)
            .setImage(body.link)
            .setTimestamp()
            .setFooter("Image aléatoire d'oiseau");

          msg.edit('', dEmbed);
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Oiseau;
