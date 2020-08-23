// Cet événement a lieu quand une invitation est créée dans un serveur.

const { Invite } = require('discord.js'),
  moment = require('moment');

module.exports = class {
  constructor() {}
  /**
   * A lieu quand une invitation a été créée
   * @param { Invite } lien L'invitation créée
   */
  async run(lien) {
    let lChannel = lien.guild.channels.cache.find((r) => r.name === 'logs');
    let créateur = lien.inviter;
    let maxUses = lien.maxUses;
    let dateDeCréation = moment.utc(lien.createdAt).format('LL');
    lChannel.send({
      embed: {
        title: "Création d'une invitation",
        color: 12124160,
        description: `${créateur} a créé une invitation : ${lien}.\nMaximum d'utilisations : ${maxUses}.\nDate d'expiration : ${moment
          .utc(lien.expiresAt)
          .format(
            'LL'
          )}.\nDate de création : ${dateDeCréation}.\nSalon de l'invitation : ${
          lien.channel.name
        }.`,
        timestamp: new Date(),
      },
    });
  }
};
