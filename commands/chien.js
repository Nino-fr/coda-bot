const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cyan } = require('../colours.json');
const fetch = require('node-fetch');

class Chat extends Command {
  constructor() {
    super({
      name: 'chien',
      description: 'Donne une image aléatoire de chien',
      usage: 'chien',
      aliases: ['dog', 'waf', 'woaf'],
      category: 'Fun',
    });
  }

  async run(message) {
    try {
      let msg = await message.channel.send(
        '<a:loading:718054521804292097> Chargement...'
      );

      fetch(`https://dog.ceo/api/breeds/image/random`)
        .then((res) => res.json())
        .then((body) => {
          if (!body)
            return message.reply(
              "Échec de l'exécution de la commande. Réessayez dans une minute..."
            );

          let dEmbed = new MessageEmbed()
            .setColor(cyan)
            .setImage(body.message)
            .setTimestamp()
            .setFooter('Image aléatoire de chien');

          msg.edit('', dEmbed);
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Chat;
