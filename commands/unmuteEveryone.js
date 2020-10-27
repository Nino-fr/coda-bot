const Command = require('../base/Command.js'),
  { Message } = require('discord.js');

class UnmuteEveryone extends Command {
  constructor() {
    super({
      name: 'unmuteEveryone',
      description: 'Unmute tous les membres du serveur',
      usage: 'unmuteEveryone',
      aliases: [
        'unmuteToutlemonde',
        'mainUnmute',
        'unmuteGeneral',
        'unmuteGénéral',
      ],
      guildOnly: true,
      permLevel: 'Administrateur',
      category: 'Administration',
    });
  }

  /**
   * Unmute tous les membres du serveur
   * @param {Message} message Le message de la commande
   */
  async run(message) {
    try {
      message.delete();
      let modo =
        message.guild.roles.cache.find((r) => r.name.includes('Émissaire')) ||
        message.guild.roles.cache.find((r) =>
          r.name.toLowerCase().includes('modérateur')
        );

      let muterole = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === 'muted'
      );

      for (let [, mutee] of message.guild.members.cache) {
        if (mutee.roles.cache.has(modo.id)) continue;
        try {
          await mutee.roles.remove(muterole.id);
        } catch {
          continue;
        }
      }

      this.repondre(message, `@here Le mute général est terminé !`);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = UnmuteEveryone;
