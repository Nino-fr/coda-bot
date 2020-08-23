const Command = require('../base/Command.js');
const fs = require('fs'); /* 
const papotins = JSON.parse(
  fs.readFileSync('./databases/papotins.json', 'utf8')
); */
const { Message } = require('discord.js');

class boostPapotin extends Command {
  constructor() {
    super({
      name: 'boostPapotin',
      description: 'Obtenir une épingle rare garantie au prochain papotin',
      usage: 'boostPapotin',
      aliases: ['boostEpingle', 'boost'],
      guildOnly: true,
      category: 'Gardiens des cités perdues',
      enabled: true,
    });
  }
  /**
   *
   * @param {Message} message
   * @param {String[]} args
   */
  async run(message, args) {
    try {
      const papotins = await JSON.parse(
        (
          await this.client.channels.cache
            .get('746688731557265481')
            .messages.fetch('746706426931445771')
        ).content
          .replace('```json', '')
          .replace('```', '')
      );

      let member = message.member;
      await this.client.papotins.ensure(message.author.id, {
        epingles: [],
        boost: false,
        lastUpdate: new Date(),
      });

      if (this.client.papotins.get(member.id).boost === true)
        return this.repondre(message, 'Vous possédez déjà un boost !');
      if (this.client.papotins.get(member.id).boost === 'boosted')
        return this.repondre(
          message,
          "Vous n'avez droit à un boost que tous les deux papotins !"
        );
      if (!member.roles.cache.has('746710882200846336'))
        return this.repondre(
          message,
          "Vous n'avez pas acheté d'autorisation de boost. Rendez-vous dans la <#604743595777458176> et faites la commande `;buy 10` pour l'acheter pour 75 coins."
        );
      this.client.papotins.set(member.id, true, 'boost');

      if (!papotins[member.id])
        papotins[member.id] = {
          epingles: [],
          boost: false,
        };
      if (papotins[member.id].boost === true)
        return this.repondre(message, 'Vous possédez déjà un boost !');
      if (papotins[member.id].boost === 'boosted')
        return this.repondre(
          message,
          "Vous n'avez droit à un boost que tous les deux papotins !"
        );
      papotins[member.id].boost = true;

      /* fs.writeFile(
        './databases/papotins.json',
        JSON.stringify(papotins),
        (err) => {
          if (err) throw err;
        }
      );
      */
      (
        await this.client.channels.cache
          .get('746688731557265481')
          .messages.fetch('746706426931445771')
      ).edit('```json\n' + JSON.stringify(papotins) + '\n```');
      return this.repondre(
        message,
        'Félicitations <@' +
          member +
          '> ! Tu possèdes à présent un boost de chance pour ton prochain papotin !'
      );
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = boostPapotin;
