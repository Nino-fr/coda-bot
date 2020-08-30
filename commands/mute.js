const Command = require('../base/Command.js');
const ms = require('ms');

class Mute extends Command {
  constructor() {
    super({
      name: 'mute',
      description:
        'Rendre muet une membre pour un certain temps (exemple de temps : +time(5m))',
      usage: 'mute <membre> [raison] [temps]',
      aliases: ['taire', 'muet', 'unspeak'],
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
    });
  }

  async run(message, args, level) {
    try {
      message.delete();
      const newThis = this;
     
      let mutee =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!mutee) return this.repondre(message, 'Qui dois-je mute ?');

      if (mutee.permissions.has('ADMINISTRATOR'))
        return this.repondre(
          message,
          'Vous ne pouvez pas mute un administrateur !'
        );
      let reason = args
        .slice(1)
        .join(' ')
        .replace(/\+\s?time\s?\((\d+\s?[smhd])+\)/i, '');
      if (!reason) reason = 'Aucune raison';

      let muterole = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === 'muted'
      );
      if (!muterole) {
        muterole = await message.guild.roles.create({
          data: {
            name: 'muted',
            color: '#514f48',
          },
        });
      }
      await message.guild.channels.cache.forEach(async (channel) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false,
        });
      });
      if (mutee.roles.cache.has(muterole.id))
        return newThis.repondre(message, 'Cette personne est déjà mute !');
      let mutetime;
      try {
        mutetime = message.content.match(/\+\s?time\s?\((\d+\s?[smhd])+\)/i)[1];
      } catch {
        mutetime = false;
      }
      if (!mutetime) mutetime = 'Indéterminé';

      await mutee.roles.add(muterole.id);
      newThis.repondre(message, {
        embed: {
          title: `:mute: \`${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }\` a rendu muet \`${
            mutee.nickname ? mutee.nickname : mutee.user.username
          }\``,
          description: `\`\`\`markdown\n# Raison #\n${reason}\n# Temps du mute #\n${mutetime}\`\`\``,
          color: 0x00ffff,
        },
      });

      if (mutetime === 'Indéterminé') return;
      setTimeout(function () {
        await mutee.roles.remove(muterole.id);
        newThis.repondre(message, `<@${mutee.id}> a bien été unmute`);
      }, ms(mutetime));
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Mute;
