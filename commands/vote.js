const { Message, MessageEmbed, MessageReaction } = require('discord.js'),
  Command = require('../base/Command');

class Vote extends Command {
  constructor() {
    super({
      name: 'vote',
      description:
        "Démarre un vote d'une minute avec comme possibilités de réponse : oui et non",
      usage: 'vote <Sujet du vote>',
      aliases: ['débat'],
    });
  }

  /**
   *
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    if (!args[0])
      return message.channel.send('Veuillez préciser le sujet du vote !');

    const sujet = args.join(' '),
      embeed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`**${sujet}**`)
        .setDescription(
          `Vote lancé par ${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }.`
        )
        .setTimestamp()
        .setFooter('Vous avez une minute pour voter avec les réactions !');

    let m = await message.channel.send(embeed);

    await m.react('718086257431019602');
    await m.react('718086588638298165');

    const reactions = await m.awaitReactions(
      /**
       * @param {MessageReaction} reaction
       */
      (reaction) =>
        reaction.emoji.name === 'positif' || reaction.emoji.name === 'negatif',
      { time: 60000 }
    );

    let NO_Count = reactions.find((r) => r.emoji.name === 'negatif');
    let YES_Count = reactions.find((r) => r.emoji.name === 'positif');
    if (YES_Count === undefined) {
      YES_Count = 0;
    } else
      YES_Count = reactions.find((r) => r._emoji.name === 'positif').count - 1;
    if (NO_Count === undefined) {
      NO_Count = 0;
    } else {
      NO_Count = NO_Count.count - 1;
    }
    let foo;
    if (NO_Count === YES_Count) {
      foo = 'Égalité';
    }
    if (NO_Count > YES_Count) {
      foo = 'Négatif';
    }
    if (NO_Count < YES_Count) {
      foo = 'Positif';
    }
    let color;
    if (foo === 'Positif') {
      color = 'GREEN';
    } else if (foo === 'Égalité') {
      color = 'BLUE';
    } else {
      color = 'RED';
    }

    const eembed = new MessageEmbed()
      .setTitle(`**${sujet}**`)
      .setDescription('Fin du vote !')
      .setFooter(
        `Vote lancé par ${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }. | Résultat : ${foo}.`
      )
      .setColor(`${color}`);

    await m.edit(eembed);
    await m.reactions.removeAll();

    let sumsum = new MessageEmbed()

      .setDescription(
        'Résultats des votes :\n\n' +
          'Oui : ' +
          `${YES_Count}\n` +
          '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n' +
          'Non : ' +
          `${NO_Count}\n`
      )

      .setColor(`${color}`);

    await message.channel.send({ embed: sumsum });
  }
}

module.exports = Vote;
