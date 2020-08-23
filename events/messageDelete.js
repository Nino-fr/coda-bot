// Cet événement a lieu quand un message est supprimé.

const { Message, MessageEmbed } = require('discord.js'),
  { client } = require('../index.js');

module.exports = class {
  constructor() {
    this.client = client;
  }
  /**
   *
   * @param { Message } message
   */
  async run(message) {
    const embed = new MessageEmbed()
      .setAuthor('Suppression de message')
      .setColor('#dc143c')
      .setDescription(
        `**Action**: Message supprimé\n**Message supprimé**: ${message.content}\n**Auteur du message**: ${message.author}`
      )
      .setTimestamp();
    try {
      message.guild.channels.cache.find((ch) => ch.name === 'logs').send(embed);
    } catch {
      return;
    }
  }
};
