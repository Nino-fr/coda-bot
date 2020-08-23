const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { cyan } = require('../colours.json');
const fetch = require('node-fetch');

class Chat extends Command {
  constructor() {
    super({
      name: 'chat',
      description: 'Donne une image aléatoire de chat',
      usage: 'chat',
      aliases: ['cat', 'meow'],
      category: 'Fun',
    });
  }

  async run(message, args, level) {
    try {
      let msg = await message.channel.send(
        '<a:loading:718054521804292097> Chargement...'
      );

      fetch(`https://api.thecatapi.com/v1/images/search`)
        .then((res) => res.json())
        .then((body) => {
          if (!body)
            return message.channel.send(
              " Échec de l'exécution de la commande. Réessayez dans une minute..."
            );

          let cEmbed = new MessageEmbed()
            .setColor(cyan)
            .setImage(body[0].url)
            .setTimestamp()
            .setFooter('Image aléatoire de chat');
          msg.edit('', cEmbed);
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Chat;
