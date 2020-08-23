const Command = require('../base/Command.js');
const { MessageEmbed, Message } = require('discord.js');
const Enmap = require('enmap');

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

      let epingles = new Enmap();
      for (const [key, value] of papotins) {
        if (value.epingles.length === 0) continue;
        epingles.set(key, value.epingles.length);
      }
      let epinglesarr = [];
      epingles.forEach((key, value) => {
        epinglesarr.push({ valeur: `${key} : ${value}` });
      });
      let sortedArr = epinglesarr.sort((a, b) => b - a);
      let newArr;
      if (sortedArr.length > 10) {
        newArr = sortedArr.slice(0, 9);
      } else newArr = sortedArr;
      let i = 0;
      for (let element of newArr) {
        console.log(element);
        let theMember = message.guild.members.cache.get(
          element.valeur
            .match(/\: .+/)
            .toString()
            .match(/(?<=: ).+/)
            .toString()
        );
        if (!theMember) continue;
        i += 1;
        let nickname = theMember.nickname
          ? theMember.nickname
          : theMember.user.username;
        if (theMember.id === collectionneur.id) nickname = `__${nickname}__`;

        leaderboard.addField(
          `${i}. ${nickname}`,
          `${element.valeur.match(/[^: ]+/).toString()} épingle${
            parseInt(element.valeur.match(/[^: ]+/).toString()) > 1 ? 's' : ''
          }`,
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
