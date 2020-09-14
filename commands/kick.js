const Command = require('../base/Command.js');

class Kick extends Command {
  constructor() {
    super({
      name: 'kick',
      description: 'Expulser un membre du serveur',
      usage: 'kick <membre> [raison]',
      aliases: ['expulser', 'expulse'],
      guildOnly: true,
      permLevel: 'Administrateur',
      category: 'Modération',
    });
  }

  async run(message, args, level) {
    try {
      if (!message.member.permissions.has('KICK_MEMBERS'))
        return this.repondre(
          message,
          'Vous ne pouvez pas utiliser cette commande.'
        );
      let kickMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!kickMember) return this.repondre(message, 'Qui dois-je kick ?');
      args.shift();
      message.delete();
      let reason = args.join(' ');
      if (!reason) reason = 'Aucune';

      if (!message.guild.me.permissions.has('KICK_MEMBERS'))
        return this.repondre(message, "Je n'ai pas la permission de faire ça.");
      kickMember.kick();
      this.repondre(message, {
        embed: {
          title: `:ballot_box_with_check: \`${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }\` a expulsé \`${
            kickMember.nickname ? kickMember.nickname : kickMember.user.username
          }\``,
          description: `\`\`\`markdown\n# Raison #\n${reason}\n\`\`\``,
          color: 0x00ffff,
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Kick;
