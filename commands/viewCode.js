const { Message } = require('discord.js');
const Command = require('../base/Command.js');

class ViewCode extends Command {
  constructor() {
    super({
      name: 'viewCode',
      description: "Voir le code de l'embed contenu dans un message",
      usage: 'viewCode <ID du message>',
      aliases: [
        'voirCode',
        'source',
        'viewSource',
        'viewSourceCode',
        'voirSource',
        'voirCodeSource',
      ],
    });
  }

  /**
   *
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    const msg = await message.channel.messages.fetch(args[0]);
    if (!msg.embeds || !msg.embeds[0])
      return message.channel.send('Ce message ne contient aucun embed !');

    let embed = JSON.stringify(msg.embeds[0].toJSON(), null, '\t');
    return message.channel.send('```json\n' + embed + '\n```');
  }
}

module.exports = ViewCode;
