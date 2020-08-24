const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const axios = require("axios");
const { prefix } = require("../../botconfig.json");
const { loguer } = require("../../fonctions");

module.exports = {
  config: {
    name: "chat",
    description: "Envoie une image aléatoire de chat.",
    usage: prefix + "chat",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["cat"],
  },
  run: async (bot, message, args) => {
    let msg = await message.channel.send(
      "<a:loading:718054521804292097> Chargement..."
    );

    axios.default
      .get(`https://api.thecatapi.com/v1/images/search`)
      .then((res) => {
        if (!res)
          return message.reply(
            " Échec de l'exécution de la commande. Réessayez dans une minute..."
          );

        let cEmbed = new MessageEmbed()
          .setColor(cyan)
          .setImage(res.data[0].url)
          .setTimestamp()
          .setFooter("Image aléatoire de chat");

        setTimeout(function () {
          msg.delete().then(message.channel.send(cEmbed));
        }, 1000);
      });
    loguer(`Commande chat utilisée dans le serveur ${message.guild.name}`);
  },
};
