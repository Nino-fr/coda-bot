const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { red_light } = require('../colours.json');
const moment = require('moment');
// moment.locale("fr");

class Clear extends Command {
  constructor() {
    super({
      name: 'clear',
      description:
        'Supprimer un certain nombre de messages. Attention : les messages doivent avoir été envoyés il y a moins de 15 jours',
      usage: 'clear <nombre de messages à supprimer>',
      aliases: ['supprimer', 'suppr', 'delete', 'bulkdelete', 'c'],
      guildOnly: true,
      permLevel: 'Modérator',
      category: 'Modération',
    });
  }

  async run(message, args) {
    try {
      if (isNaN(args[0]) || args[0] < 1 || args[0] > 100)
        return message.channel.send(
          'Veuillez spécifier un nombre de messages à supprimer entre 1 et 100.'
        );
      let messagesASupprimer = args[0];
      await message.delete();
      message.channel.bulkDelete(messagesASupprimer).then(() => {
        message.channel
          .send(
            `J'ai bien supprimé \`${messagesASupprimer}\` messag${
              messagesASupprimer < 2 ? 'e' : 'es'
            } !`
          )
          .then((m) => m.delete({ timeout: 3000 }));
      });

      let lChannel = message.guild.channels.cache.find(
        (c) => c.name === 'logs'
      );
      let lEmbed = new MessageEmbed()
        .setColor(red_light)
        .setAuthor(
          `Log de modération`,
          this.client.user.displayAvatarURL({ format: 'png' })
        )
        .addField('Type :', 'Clear')
        .addField('Nombre de messages :', messagesASupprimer)
        .addField('Modérateur :', message.author.username)
        .addField('Date :', moment().locale('fr').format('LLL'));

      if (lChannel) lChannel.send(lEmbed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Clear;
