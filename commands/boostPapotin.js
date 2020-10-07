const Command = require('../base/Command.js'),
  { Message } = require('discord.js'),
  fs = require('fs'),
  papotins = JSON.parse(JSON.stringify(require('../databases/papotins.json')));

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
   */
  async run(message) {
    try {
      let member = message.member;
      if (!papotins[member.id])
        papotins[member.id] = { epingles: [], boost: false };

      if (papotins[member.id].boost === undefined)
        papotins[member.id].boost = false;
      if (papotins[member.id].boost === true)
        return this.repondre(message, 'Vous possédez déjà un boost');

      if (!member.roles.cache.has('746710882200846336'))
        return this.repondre(
          message,
          "Vous n'avez pas acheté d'autorisation de boost. Rendez-vous dans la <#604743595777458176> et faites la commande `;buy 10` pour l'acheter pour 75 coins."
        );

      papotins[member.id].boost = true;

      await message.member.roles
        .remove('746710882200846336')
        .catch((err) =>
          this.client.channels.cache.get('746688731557265481').send(err)
        );
      fs.writeFile(
        './databases/papotins.json',
        JSON.stringify(papotins),
        (err) => {
          if (err) throw err;
        }
      );

      if (
        !this.client.boosts.get(member.id) ||
        this.client.boosts.get(member.id) === undefined
      )
        this.client.boosts.set(member.id, false);

      if (this.client.boosts.get(member.id) === false)
        this.client.boosts.set(member.id, true);

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
