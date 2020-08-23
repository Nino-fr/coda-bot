const Command = require('../base/Command.js');
const { Message } = require('discord.js');

class SetNickname extends Command {
  constructor() {
    super({
      name: 'setpseudo',
      description: "Changer le pseudod'un membre",
      usage: 'setpseudo <membre> <role>',
      aliases: ['setnickname', 'changepseudo', 'changenickname'],
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
    });
  }
  /**
   *
   * @param { Message } message
   * @param { String[] } args
   */
  async run(message, args) {
    try {
      if (message.member.permissions.has('MANAGE_NICKNAMES')) {
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES'))
          return message.channel.send(
            "Je n'ai pas la permissions de changer les pseudos."
          );
        let mem =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]);
        let newPseudo = args.slice(1).join(' ');
        if (!newPseudo) {
          return message.channel.send(
            ':x: | Veuillez préciser le nouveau pseudo du membre !'
          );
        }
        try {
          mem.setNickname(newPseudo).then(() =>
            message.channel.send({
              embed: {
                title: `\`${
                  message.member.nickname
                    ? message.member.nickname
                    : message.author.username
                }\` a changé le pseudo de \`${mem.user.tag}\``,
                description: `\`\`\`markdown\n# Nouveau pseudo #\n${newPseudo}\`\`\``,
                color: 0x00ffff,
              },
            })
          );
        } catch {
          return message.channel.send(
            "Je ne peux pas changer le pseudo de ce membre car il est l'un de mes supérieurs !"
          );
        }
      } else {
        return message.channel.send(
          ":x: Vous n'avez pas la permission de changer les pseudos !"
        );
      }
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = SetNickname;
