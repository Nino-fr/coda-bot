const Command = require('../base/Command.js');

class Papotins extends Command {
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
  /**
   *
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    try {
      if (!message.guild.id === '574532041836593153') return;
      const lemembre =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((mem) =>
          mem.nickname
            ? mem.nickname.toLowerCase() === args.join(' ').toLowerCase()
            : mem.user.username.toLowerCase() === args.join(' ').toLowerCase()
        ) ||
        message.member;
      const member = lemembre.nickname
        ? lemembre.nickname
        : lemembre.user.username;

      if (
        !this.client.papotins.get(lemembre.id) ||
        this.client.papotins.get(lemembre.id).length === 0
      )
        return message.channel.send(
          'Aucune épingle de papotin trouvée pour ce membre.'
        );

      let pins = this.client.papotins.get(lemembre.id);

      let mBoost =
        this.client.boosts.get(lemembre.id) === true
          ? 'Épingle rare **garantie** dans le prochain papotin.'
          : 'Aucun boost.';

      return message.channel.send({
        embed: {
          title: 'Liste des épingles de papotin de ' + member,
          color: 0xe74c3c,
          description:
            "**Nombre d'épingles :** " +
            pins.length +
            '\n\n- ' +
            pins.join('\n- ') +
            ' \n\n' +
            mBoost,
          thumbnail: { url: lemembre.user.avatarURL() },
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Papotins;
