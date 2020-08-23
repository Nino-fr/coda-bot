const Command = require('../base/Command.js');
const { Message } = require('discord.js');
const ms = require('ms');

class Timer extends Command {
  constructor() {
    super({
      name: 'timer',
      description: 'Envoie un rappel à la fin du temps voulu.',
      usage: 'timer <temps><unité du temps (une seule lettre)> (Exemple : 5h)',
      aliases: ['rappel', 'alerte', 'alarme'],
    });
  }
  /**
   *
   * @param { Message } message Le message
   * @param { String[] } args Les arguments passés après le message
   */
  async run(message, args) {
    let Timer = args[0];

    if (!args[0]) {
      return message.channel.send(
        ':x: | Veuillez préciser un temps en secondes, minutes ou heures de ce format : `5s` ou `5m` ou `5h`'
      );
    }

    if (args[0] <= 0) {
      return message.channel.send(
        ':x: | Veuillez préciser un temps en secondes, minutes ou heures de ce format : `5s` ou `5m` ou `5h`'
      );
    }

    message.channel.send(
      ':white_check_mark: ' +
        "| J'enverrai un rappel après " +
        `${ms(ms(Timer), { long: true })}`
    );

    setTimeout(function () {
      message.channel.send(
        `:warning: Attention, ${message.member} : **le temps est écoulé !**`
      );
    }, ms(Timer));
  }
}

module.exports = Timer;
