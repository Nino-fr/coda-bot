const Command = require('../base/Command.js');
const { MessageEmbed, Message } = require('discord.js');

class Leaderboard extends Command {
  constructor() {
    super({
      name: 'Leaderboard',
      description: 'Le classement des meilleurs collectionneurs de papotins',
      category: 'Gardiens des cités perdues',
      usage: 'leaderboard',
      guildOnly: true,
      aliases: ['classement', 'bestpapotins'],
    });
  }
  /**
   *
   * @param {Message} message La commande
   */
  async run(message) {
    try {
      const leaderboard = new MessageEmbed()
        .setTitle('Classement des meilleurs collectionneurs de papotins')
        .setColor('BLUE')
        .setThumbnail(message.guild.iconURL({ format: 'png' }))
        .setTimestamp();
      const papotins = this.client.papotins;
      const collectionneur = message.member;

      let epingles = new Map();
      for (const [key, value] of papotins) {
        if (value.epingles.length === 0) continue;
        epingles.set(key, value.epingles.length);
      }
      const larray = Array.from(epingles.entries());

      let sortedArr = larray.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));

      let i = 0;
      for (const element of sortedArr) {
        let theMember = message.guild.members.cache.get(element[0]);
        if (!theMember) continue;
        i += 1;
        if (i === 11) break;
        let nickname = theMember.nickname
          ? theMember.nickname
          : theMember.user.username;
        if (theMember.id === collectionneur.id) nickname = `__${nickname}__`;

        leaderboard.addField(
          `${i}. ${nickname}`,
          `${element[1]} épingle${parseInt(element[1]) > 1 ? 's' : ''}`,
          true
        );
      }
      return message.channel.send(leaderboard);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Leaderboard;
