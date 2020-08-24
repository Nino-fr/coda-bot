const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "renard",
    description: "Envoie une image aléatoire de renard.",
    usage: prefix + "renard",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["fox"],
  },
  run: async (bot, message, args) => {
    let msg = await message.channel.send(
      "<a:loading:718054521804292097> Chargement..."
    );

    fetch(`https://randomfox.ca/floof`)
      .then((res) => res.json())
      .then((body) => {
        if (!body)
          return message.reply(
            " Échec de l'exécution de la commande. Réessayez dans une minute..."
          );

        let cEmbed = new MessageEmbed()
          .setColor(cyan)
          .setImage(body.image)
          .setTimestamp()
          .setFooter("Image aléatoire de renard");

        setTimeout(function () {
          msg.delete().then(message.channel.send(cEmbed));
        }, 1000);
      });
    console.log(`Commande renard utilisée dans le serveur ${message.guild.name}`);
  },
};
