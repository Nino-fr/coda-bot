const Command = require('../base/Command.js');
const { MessageEmbed, Message } = require('discord.js');
const { cyan } = require('../colours.json');
const fetch = require('node-fetch');

class Renard extends Command {
  constructor() {
    super({
      name: 'renard',
      description: 'Donne une image aléatoire de renard',
      usage: 'renard',
      aliases: ['randomRenard', 'renardAleatoire', 'fox'],
      category: 'Fun',
    });
  }
  /**
   *
   * @param { Message } message La commande
   */
  async run(message) {
    try {
      let msg = await message.channel.send(
        '<a:loading:718054521804292097> Chargement...'
      );

      fetch(`https://randomfox.ca/floof`)
        .then((res) => res.json())
        .then((body) => {
          if (!body)
            return message.channel.send(
              "Échec de l'exécution de la commande. Réessayez dans une minute..."
            );

          let dEmbed = new MessageEmbed()
            .setColor(cyan)
            .setImage(body.image)
            .setTimestamp()
            .setFooter("Image aléatoire d'oiseau");

          msg.edit('', dEmbed);
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Renard;
