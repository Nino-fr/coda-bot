const Command = require('../base/Command.js');

class Unmute extends Command {
  constructor() {
    super({
      name: 'unmute',
      description: "Unmute quelqu'un",
      usage: 'unmute <membre> [raison]',
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
      aliases: ['demute', 'speak'],
    });
  }

  async run(message, args, level) {
    try {
      if (
        !message.member.permissions.has('ADMINISTRATOR') &&
        !message.guild.owner
      )
        return this.repondre(
          message,
          "Vous n'avez pas la permission d'utiliser cette commande."
        );

      if (!message.guild.me.permissions.has('ADMINISTRATOR'))
        return this.repondre(
          message,
          "Je n'ai pas la permission de faire ça !"
        );

      let mutee =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!mutee) return this.repondre(message, 'Qui dois-je mute ?');

      let reason = args.slice(1).join(' ');
      if (!reason) reason = 'Aucune raison';

      let muterole = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === 'muted'
      );
      if (!muterole)
        return this.repondre(message, "Cette personne n'est pas mute !");

      mutee.roles.remove(muterole.id).then(() => {
        this.repondre(message, `${mutee} a bien été unmute !`);
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Unmute;
