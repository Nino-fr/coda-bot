const { Message, TextChannel } = require('discord.js');
const Command = require('../base/Command');

class Lock extends Command {
  constructor() {
    super({
      name: 'lock',
      description:
        "Empêcher tous les membres (sauf les admins et les membres supérieurs au bot) d'écrire dans le salon de la commande ou le salon mentionné",
      category: 'Modération',
      aliases: ['readonly', 'fermer'],
      guildOnly: true,
      permLevel: 'Moderateur',
      usage: 'lock [salon optionnel]',
    });
  }
  /**
   *
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    /**
     * @type {TextChannel}
     */
    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.guild.channels.cache.find((ch) => ch.name === args[0]) ||
      message.channel;

    await channel.updateOverwrite(channel.guild.roles.everyone, {
      SEND_MESSAGES: false,
      SEND_TTS_MESSAGES: false,
    });
    let m = await message.channel.send(':unlock: Le salon a bien été fermé.');
    await channel.send('Ce salon est maintenant fermé pour tout le monde.');
    return m.edit(':lock: Le salon a bien été fermé.');
  }
}

module.exports = Lock;
