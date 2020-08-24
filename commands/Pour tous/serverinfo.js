const Discord = require("discord.js");
const {prefix} = require("../../botconfig.json");
const colours = require("../../colours.json");
const moment = require("moment");

module.exports = {
  config: {
    name: "serverinfo",
    description: "Informations sur le serveur",
    usage: prefix + "serverinfo",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["si"],
  },

  run: async (bot, message, args) => {
    console.log(
      `Commande serverinfo utilisée dans le serveur ${message.guild.name}`
    );

    let sEmbed = new Discord.MessageEmbed()
      .setColor(colours.cyan)
      .setTitle(`Informations sur le serveur ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL())
      .addField("**Nom :**", `${message.guild.name}`, true)
      .addField("**Propriétaire :**", `${message.guild.owner}`, true)
      .addField("**ID :**", message.guild.id, true)
      .addField(`Membres`, message.guild.memberCount, true)
      .addField(
        `Bots`,
        message.guild.members.cache.filter((mem) => mem.user.bot === true).size,
        true
      )
      .addField(
        "Membres (bots non compris)",
        message.guild.members.cache.filter((mem) => mem.user.bot === false).size,
        true
      )
      .addField(
        `En ligne`,
        message.guild.members.cache.filter((mem) => mem.presence.status != "offline")
          .size,
        true
      )
      .addField(`Rôles`, message.guild.roles.cache.size, true)
      .addField(
        `Date de création`,
        moment.utc(message.guild.createdAt).format("LL"),
        true
      );
    message.channel.send({ embed: sEmbed });
  },
};
