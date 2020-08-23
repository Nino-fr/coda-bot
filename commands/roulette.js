const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');

class Roulette extends Command {
  constructor() {
    super({
      name: 'roulette',
      description: 'Joue à la roulette',
      usage: 'roulette',
      aliases: ['r', 'roue', 'casino'],
      category: 'Fun',
    });
  }

  async run(message, args, level) {
    try {
      const slots = [
        ':cherries:',
        ':apple:',
        ':tangerine:',
        ':watermelon:',
        ':green_apple:',
        ':strawberry:',
      ];
      const slotOne = slots[Math.floor(Math.random() * slots.length)];
      const slotTwo = slots[Math.floor(Math.random() * slots.length)];
      const slotThree = slots[Math.floor(Math.random() * slots.length)];
      const slotFour = slots[Math.floor(Math.random() * slots.length)];
      const slotFive = slots[Math.floor(Math.random() * slots.length)];
      const slotSix = slots[Math.floor(Math.random() * slots.length)];
      const slotSeven = slots[Math.floor(Math.random() * slots.length)];
      const slotEight = slots[Math.floor(Math.random() * slots.length)];
      const slotNine = slots[Math.floor(Math.random() * slots.length)];
      if (
        (slotOne === slotTwo && slotOne === slotThree) ||
        (slotFour === slotFive && slotFive === slotSix) ||
        (slotSeven === slotEight && slotEight === slotNine)
      ) {
        const won = new MessageEmbed()
          .setAuthor(
            'Vous avez gagné !',
            message.author.displayAvatarURL({ format: 'png' })
          )
          .setColor('#ff2626')
          .setDescription(
            `${slotOne} | ${slotTwo} | ${slotThree}\n${slotFour} | ${slotFive} | ${slotSix}\n${slotSeven} | ${slotEight} | ${slotNine}`
          )
          .setFooter(
            'Wow! ' + message.author.username + ' Toutes nos félicitations !'
          );
        await message.channel.send(won);
        // message.channel.send("Bravo ! Vous avez gagné !");
      } else {
        const lost = new MessageEmbed()
          .setAuthor(
            'Vous avez perdu !',
            message.author.displayAvatarURL({ format: 'png' })
          )
          .setColor('#ff2626')
          .setDescription(
            `${slotOne} | ${slotTwo} | ${slotThree}\n${slotFour} | ${slotFive} | ${slotSix}\n${slotSeven} | ${slotEight} | ${slotNine}`
          )
          .setFooter(
            'Oh ' +
              message.author.username +
              ' plus de chance la prochaine fois.'
          );
        await message.channel.send(lost);
        // message.channel.send("Oh non ! Vous avez perdu !");
      }
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Roulette;
