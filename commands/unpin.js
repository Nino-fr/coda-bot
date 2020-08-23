const Command = require('../base/Command.js');
const { Message } = require('discord.js');

class Unpin extends Command {
  constructor() {
    super({
      name: 'désépingler',
      description: "Désépingle le message correspondant à l'id envoyé.",
      usage: 'désépingler <id du message>',
      aliases: ['unpin', 'desepingler', 'desepingle', 'désépingle'],
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
    });
  }
  /**
   * Épingle le message correspondant à l'id envoyé.
   * @param {Message} message
   * @param {String[]} args
   */
  async run(message, args) {
    let id = args[0];
    let msg = message.channel.messages.fetch(id);
    (await msg).unpin();
    message.channel.send(
      `:white_check_mark: Ce message a bien été désépinglé !`
    );
  }
}

module.exports = Unpin;
