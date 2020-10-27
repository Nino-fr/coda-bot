const { Message, TextChannel } = require('discord.js');
const Command = require('../base/Command');

class Unlock extends Command {
  constructor() {
    super({
      name: 'unlock',
      description:
        'Autoriser tout le monde à écrire dans le salon mentionné ou le salon du message si aucun salon mentionné',
      category: 'Modération',
      aliases: ['open', 'ouvrir', 'rouvrir', 'delock'],
      guildOnly: true,
      permLevel: 'Moderateur',
      usage: 'unlock [salon optionnel]',
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
      SEND_MESSAGES: true,
      SEND_TTS_MESSAGES: true,
    });
    let m = await message.channel.send(
      ':lock: Le salon a bien été déverrouillé.'
    );
    await channel.send('Ce salon est maintenant ouvert à tous.');
    return m.edit(':unlock: Le salon a bien été déverrouillé.');
  }
}

module.exports = Unlock;
