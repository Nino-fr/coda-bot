const ms = require("ms");
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "timer",
    description: "Envoie un rappel à la fin du temps voulu.",
    accessableby: "Tout le monde",
    usage: prefix + "timer <temps>",
    category: "Pour tous",
    aliases: ["rappel"],
  },
  run: async (bot, message, args) => {
    let Timer = args[0];

    if (!args[0]) {
      return message.channel.send(
        ":x: " +
          "| Veuillez préciser un temps en secondes, minutes ou heures de ce format : `5s` ou `5m` ou `5h`"
      );
    }

    if (args[0] <= 0) {
      return message.channel.send(
        ":x: " +
          "| Veuillez préciser un temps en secondes, minutes ou heures de ce format : `5s` ou `5m` ou `5h`"
      );
    }

    message.channel.send(
      ":white_check_mark: " +
        "| J'enverrai un rappel après " +
        `${ms(ms(Timer), { long: true })}`
    );

    setTimeout(function () {
      message.channel.send(
        `:warning: Attention, ${message.member} : **le temps est écoulé !**`
      );
    }, ms(Timer));
  },
};
