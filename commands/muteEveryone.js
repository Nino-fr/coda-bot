const Command = require('../base/Command.js'),
  { Message } = require('discord.js');

class MuteEveryone extends Command {
  constructor() {
    super({
      name: 'muteEveryone',
      description: 'Rendre muet tous les membres du serveur',
      usage: 'muteEveryone [raison]',
      // aliases: ['serverMaintenance', 'mainMaintenance', 'serveurMaintenance'],
      aliases: ['muteToutlemonde', 'mainMute', 'muteGeneral', 'muteGénéral'],
      guildOnly: true,
      permLevel: 'Administrateur',
      category: 'Administration',
    });
  }

  /**
   * Rendre muet tous les membres du serveur
   * @param {Message} message Le message de la commande
   * @param {string[]} args Les arguments passés derrière le message
   */
  async run(message, args) {
    try {
      message.delete();
      const newThis = this;
      let modo =
        message.guild.roles.cache.find((r) => r.name.includes('Émissaire')) ||
        message.guild.roles.cache.find((r) =>
          r.name.toLowerCase().includes('modérateur')
        );

      let reason = args.slice(1).join(' ');
      if (!reason) reason = 'Aucune raison spécifiée';

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
      message.guild.channels.cache.forEach(async (channel) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false,
        });
      });

      for (let [, mutee] of message.guild.members.cache) {
        if (mutee.roles.cache.has(modo.id)) continue;
        try {
          await mutee.roles.add(muterole.id);
        } catch {
          continue;
        }
      }

      return this.repondre(message, {
        embed: {
          title: `:mute: \`${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }\` a rendu muet tout le serveur`,
          description: `\`\`\`markdown\n# Raison #\n${reason}\`\`\``,
          color: 0x00ffff,
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = MuteEveryone;
