const Command = require('../base/Command.js');
const { Message } = require('discord.js');

class Pin extends Command {
  constructor() {
    super({
      name: 'épingler',
      description: "Epingle le message correspondant à l'id envoyé.",
      usage: 'épingler <id du message>',
      aliases: ['pin', 'epingler', 'epingle', 'épingle'],
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
    if (
      !message.member.permissions.has('MANAGE_MESSAGE') &&
      !message.member.roles.has((r) => r.name.toLowerCase().includes('mod'))
    )
      return message.channel.send(
        `Vous ne pouvez pas exécuter cette commande car vous ne disposez pas des permissions nécessaires.`
      );
    let id = args[0];
    let msg = message.channel.messages.fetch(id);
    (await msg).pin();
    message.channel.send(`:white_check_mark: Ce message a bien été épinglé !`);
  }
}

module.exports = Pin;
