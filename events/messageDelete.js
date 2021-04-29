const { Message, MessageEmbed } = require('discord.js');
const { client } = require('../index.js');

module.exports = class {
  /**
   *
   * @param { Message } message
   */
  async run(message) {
    if (message.partial) return;
    if (!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    });

    const deletionLog = fetchedLogs.entries.first();

    const { executor } = deletionLog;
    const user = executor.tag;
    const embed = new MessageEmbed()
      .setAuthor(
        `Log de modération`,
        client.user.displayAvatarURL({ format: 'png' })
      )
      .setColor('#dc143c')
      .setDescription(
        `**Type :** Suppresion d'un message\n**Message supprimé :** ${
          message.content
        }\n**Auteur du message :** ${
          message.author
        }\n**Message supprimé par :** ${user}\n**Salon du message :** ${message.channel.toString()}`
      )
      .setTimestamp();
    try {
      message.guild.channels.cache.find((ch) => ch.name === 'logs').send(embed);
      /* if (message.embeds && message.embeds[0])
        message.guild.channels.cache
          .find((ch) => ch.name === 'logs')
          .send(message.embeds[0]); */
    } catch (err) {
      console.log(err);
      return;
    }
  }
};
