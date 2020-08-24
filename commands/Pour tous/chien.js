const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { prefix } = require("../../botconfig.json");
const fetch = require("node-fetch");

module.exports = {
  config: {
    name: "chien",
    description: "Envoie une image aléatoire de chien.",
    usage: prefix + "chien",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["dog"],
  },
  run: async (bot, message, args) => {
    let msg = await message.channel.send("<a:loading:718054521804292097> Chargement...");

    fetch(`https://dog.ceo/api/breeds/image/random`)
      .then((res) => res.json())
      .then((body) => {
        if (!body)
          return message.reply(
            "Échec de l'exécution de la commande. Réessayez dans une minute..."
          );

        let dEmbed = new MessageEmbed()
          .setColor(cyan)
          .setImage(body.message)
          .setTimestamp()
          .setFooter("Image aléatoire de chien");

        setTimeout(function () {
          msg.delete().then(message.channel.send(dEmbed));
        }, 1000);
      });
    console.log(`Commande chien utilisée dans le serveur ${message.guild.name}`);
  },
};
