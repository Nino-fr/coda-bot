const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cyan } = require('../colours.json');
const fetch = require('node-fetch');

class PandaRoux extends Command {
  constructor() {
    super({
      name: 'pandaRoux',
      description: 'Donne une image aléatoire de panda roux',
      usage: 'pandaRoux',
      aliases: ['randompandaRoux', 'pandaRouxAleatoire', 'redpanda'],
      category: 'Fun',
    });
  }

  async run(message) {
    try {
      let msg = await message.channel.send(
        '<a:loading:718054521804292097> Chargement...'
      );

      fetch(`https://some-random-api.ml/img/red_panda`)
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
            .setFooter('Image aléatoire de panda roux');

          msg.edit('', dEmbed);
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = PandaRoux;
