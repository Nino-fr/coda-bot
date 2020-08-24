const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const prefix = botconfig.prefix;

module.exports = {
  config: {
    name: "unpin",
    description: "Désépingle le message correspondant à l'id envoyé.",
    usage: prefix + "unpin <id du message>",
    category: "👮‍♂️Modération",
    accessableby: "Ceux qui ont la permission d'épingler les messages.",
    aliases: ["désépingler", "désepingler", "desépingler", "desepingler"],
  },

  run: async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGE"))
      return message.channel.send(
        `Vous ne pouvez pas exécuter cette commande car vous ne disposez pas des permissions nécessaires.`
      );
    let id = args[0];
    let msg = message.channel.messages.fetch(id);
    (await msg).unpin();
    message.channel.send(
      `:white_check_mark: Ce message a bien été désépinglé !`
    );
    console.log(
      `Commande unpin utilisée dans le serveur ${message.guild.name}`
    );
  },
};
