const Command = require('../base/Command.js'),
  fs = require('fs'),
  // papotins = JSON.parse(fs.readFileSync('./databases/papotins.json', 'utf8')),
  { Message } = require('discord.js');

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

      papotins[member.id].boost = true;

      (
        await this.client.channels.cache
          .get('746688731557265481')
          .messages.fetch('746706426931445771')
      ).edit('```json\n' + JSON.stringify(papotins) + '\n```');
      await message.member.roles
        .remove('746710882200846336')
        .catch((err) =>
          this.client.channels.cache.get('746688731557265481').send(err)
        );
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
