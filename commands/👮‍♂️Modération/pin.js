const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const prefix = botconfig.prefix;

module.exports = {
  config: {
    name: "pin",
    description: "Épingle le message correspondant à l'id envoyé.",
    usage: prefix + "pin <id du message>",
    category: "👮‍♂️Modération",
    accessableby: "Ceux qui ont la permission d'épingler les messages.",
    aliases: ["épingler", "epingler"],
  },

  run: async (bot, message, args) => {
    if (
      !message.member.permissions.has("MANAGE_MESSAGE") &&
      !message.member.roles.has((r) => r.name.toLowerCase().includes("mod"))
    )
      return message.channel.send(
        `Vous ne pouvez pas exécuter cette commande car vous ne disposez pas des permissions nécessaires.`
      );
    let id = args[0];
    let msg = message.channel.messages.fetch(id);
    (await msg).pin();
    message.channel.send(`:white_check_mark: Ce message a bien été épinglé !`);
    console.log(`Commande pin utilisée dans le serveur ${message.guild.name}`);
  },
};
