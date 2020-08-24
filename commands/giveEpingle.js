const Command = require('../base/Command.js');
const fs = require('fs');

class GiveEpingle extends Command {
  constructor() {
    super({
      name: 'giveEpingle',
      description:
        "Donne une des épingles de papotin d'un utilisateur au membre mentionné",
      usage: 'giveEpingle <membre> <epingle>',
      aliases: ['giveepingle', 'donnerepingle', 'ge'],
      guildOnly: true,
      category: 'Gardiens des cités perdues',
      enabled: true,
    });
  }

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
      let destinataire =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let nom = args.slice(1).join(' ');
      if (!destinataire)
        return this.repondre(message, "À qui dois-je donner l'épingle ?");
      if (destinataire === message.member)
        return this.repondre(
          message,
          'Vous ne pouvez pas donner une épingle à vous-mêmes'
        );
      if (!nom)
        return this.repondre(message, 'Quelle épingle dois-je donner ?');
      let member = message.member;

      if (
        !this.client.papotins.get(member.id) ||
        this.client.papotins.get(member.id, 'epingles').length === 0
      )
        return this.repondre(message, "Vous n'avez aucune épingle à donner");

      let epingle = 'lol';
      let epingles = this.client.papotins.get(member.id, 'epingles');

      await this.client.papotins.ensure(destinataire.id, {
        epingles: [],
        boost: false,
        lastUpdate: new Date(),
      });

      let destinatepingles = this.client.papotins.get(
        destinataire.id,
        'epingles'
      );

      for (let i of epingles) {
        if (i.toLowerCase() === nom.toLowerCase()) {
          destinatepingles.push(i);

          epingle = i;
          epingles.splice(epingles.indexOf(i), 1);

          this.repondre(
            message,
            "J'ai bien donné l'épingle de papotin **" +
              i +
              '** à <@' +
              destinataire.id +
              '>'
          );
          break;
        } else continue;
      }
      for (let i of papotins[member.id].epingles) {
        if (i.toLowerCase() === nom.toLowerCase()) {
          if (!papotins[destinataire.id])
            papotins[destinataire.id] = {
              epingles: [],
              boost: false,
            };
          papotins[destinataire.id].epingles.push(i);

          epingle = i;
          papotins[member.id].epingles.splice(
            papotins[member.id].epingles.indexOf(i),
            1
          );

          (
            await this.client.channels.cache
              .get('746688731557265481')
              .messages.fetch('746706426931445771')
          ).edit('```json\n' + JSON.stringify(papotins) + '\n```');
          break;
        } else continue;
      }
      if (epingle === 'lol')
        return this.repondre(
          message,
          'Vous ne pouvez pas donner une épingle que vous ne possédez pas !'
        );
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = GiveEpingle;
