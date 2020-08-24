const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { aqua } = require("../../colours.json");

module.exports = {
  config: {
    name: "invite",
    description: "Pour m'inviter dans un serveur.",
    usage: prefix + "invite",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["inv", "inviter"],
  },
  run: async (bot, message, args) => {
    console.log(`Commande invite utilisée dans le serveur ${message.guild.name}`);
    
    await message.channel.send({
      embed: {
        color: 15844367,
        description:
          "Tu veux m'ajouter à ton serveur ? [Clique ici !](https://discordapp.com/oauth2/authorize?client_id=699294152193736704&scope=bot&permissions=469888095)",
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL(),
        },
        timestamp: new Date(),
        footer: {
          text: "Pour m'inviter dans l'un de tes serveurs",
        },
      },
    });
  },
};

