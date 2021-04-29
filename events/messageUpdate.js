const { Message, MessageEmbed } = require('discord.js');
const { client } = require('../index.js');

module.exports = class {
  /**
   *
   * @param { Message } oldMessage
   * @param { Message } newMessage
   */
  async run(oldMess, newMessage) {
    let oldMessage = oldMess;
    if (oldMessage.partial) return;
    // ignore direct messages
    if (!newMessage.guild) return;

    const embed = new MessageEmbed()
      .setAuthor(
        `Log de modération`,
        client.user.displayAvatarURL({ format: 'png' })
      )
      .setColor('#dc143c')
      .setDescription(
        `**Type :** Modification d'un message\n**Ancien message :** ${oldMessage.content}\n**Nouveau message :** ${newMessage.content}\n**Auteur du message :** ${newMessage.author}\n\n[Voir le message](${newMessage.url})`
      )
      .setTimestamp();
    try {
      if (oldMessage.content !== newMessage.content)
        newMessage.guild.channels.cache
          .find((ch) => ch.name === 'logs')
          .send(embed);
      /* if (newMessage.author.bot) {
        if (oldMessage.embeds && oldMessage.embeds[0])
          newMessage.guild.channels.cache
            .find((ch) => ch.name === 'logs')
            .send(oldMessage.embeds[0]);
        if (newMessage.embeds && newMessage.embeds[0])
          newMessage.guild.channels.cache
            .find((ch) => ch.name === 'logs')
            .send(newMessage.embeds[0]);
      } */
    } catch (err) {
      return client.utils.get('error').run(err, newMessage, client);
    }
  }
};
