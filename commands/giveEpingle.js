const Command = require('../base/Command.js');
const fs = require('fs'),
  papotins = JSON.parse(JSON.stringify(require('../databases/papotins.json')));

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
      let destinataire =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0]));
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

      if (!papotins[member.id] || papotins[member.id].epingles.length === 0)
        return message.channel.send("Vous n'avez aucune épingle à donner");

      let epingle = 'lol';
      let pins = papotins[member.id].epingles;

      if (!papotins[destinataire.id])
        papotins[destinataire.id] = {
          epingles: [],
          boost: false,
        };
      let destinataireEpingles = papotins[destinataire.id].epingles;

      for (let i of pins) {
        if (i.toLowerCase() === nom.toLowerCase()) {
          destinataireEpingles.push(i);

          epingle = i;
          pins.splice(pins.indexOf(i));

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
      fs.writeFile('./databases/papotins.json', papotins, (err) => {
        if (err) throw err;
      });
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
