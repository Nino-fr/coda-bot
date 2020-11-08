const Command = require('../base/Command.js');
const { Message } = require('discord.js');

class Avatar extends Command {
  constructor() {
    super({
      name: 'avatar',
      description:
        "Voir son avatar (si aucune mention) ou l'avatar d'une personne au choix.",
      usage:
        "avatar [@membre | nom d'utilisateur du membre | pseudo du membre | id du membre]",
      aliases: ['pdp', 'pp', 'photoDeProfil'],
    });
  }
  /**
   *
   * @param { Message } message Le message
   * @param { String[] } args Les arguments passés après le message
   */
  async run(message, args) {
    let member;

    try {
      member =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0]));
    } catch {
      member = member = (
        await message.guild.members.fetch({
          query: args.join(' '),
          limit: 1,
        })
      ).first();
      if (!member) member = message.member;
    }
    try {
      if (!member)
        member = (
          await message.guild.members.fetch({
            query: args.join(' '),
            limit: 1,
          })
        ).first();
      if (!member) member = message.member;
    } catch {
      member = message.member;
    }
    let avatarlink;
    try {
      avatarlink = member.user.avatarURL({ format: 'png' });
    } catch {
      avatarlink = message.member.user.avatarURL({ format: 'png' });
    }
    this.repondre(message, {
      files: [{ attachment: avatarlink, name: 'avatar.png' }],
    });
  }
}

module.exports = Avatar;
