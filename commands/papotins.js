const Command = require('../base/Command.js');
// const fs = require('fs');
/* const papotins = JSON.parse(
  fs.readFileSync('./databases/papotins.json', 'utf8')
); */

class Example extends Command {
  constructor() {
    super({
      name: 'papotins',
      description: 'Inventaire de vos papotins ou du membre mentionné',
      usage: 'papotins [membre optionnel]',
      aliases: ['inventaire', 'inv'],
      category: 'Gardiens des cités perdues',
      enabled: true,
    });
  }

  async run(message, args, level) {
    try {
      if (!message.guild.id === '574532041836593153') return;
      const lemembre =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.member;
      const member = lemembre.nickname
        ? lemembre.nickname
        : lemembre.user.username;
      if (
        !this.client.papotins.get(lemembre.id) ||
        this.client.papotins.get(lemembre.id).epingles.length === 0
      )
        return message.channel.send(
          'Aucune épingle de papotin trouvée pour ce membre.'
        );
      // let epingles = papotins[lemembre.id].epingles;
      let epingles = this.client.papotins.get(lemembre.id, 'epingles');
      /* let msgboost =
        papotins[lemembre.id].boost === true
          ? 'Épingle rare **garantie** dans le prochain papotin.'
          : 'Aucun boost.'; */
      let msgboost =
        this.client.papotins.get(lemembre.id, 'boost') === true
          ? 'Épingle rare **garantie** dans le prochain papotin.'
          : 'Aucun boost.';

      return message.channel.send({
        embed: {
          title: 'Liste des épingles de papotin de ' + member,
          color: 0xe74c3c,
          description:
            "**Nombre d'épingles :** " +
            epingles.length +
            '\n\n- ' +
            epingles.join('\n- ') +
            ' \n\n' +
            msgboost,
          thumbnail: { url: lemembre.user.avatarURL() },
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Example;
