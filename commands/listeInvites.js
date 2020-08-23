const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');

class ListeInvites extends Command {
  constructor() {
    super({
      name: 'listeInvites',
      description: 'Donne toutes les invitations créées pour ce serveur',
      usage: 'invites',
      aliases: ['invites', 'listinvites'],
      guildOnly: true,
    });
  }

  async run(message) {
    try {
      let iEmbed = new MessageEmbed()
        .setTitle('Liste des invitations du serveur')
        .setColor('RANDOM');

      await message.guild.fetchInvites().then((invites) => {
        invites.forEach((invite) => {
          iEmbed.addField(
            `- ${invite}`,
            `Utilisée ${invite.uses} fois et créée par ${invite.inviter}.`
          );
        });
      });
      await message.channel.send(iEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = ListeInvites;
