const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const warns = require("../../warns.json");

module.exports = {
  config: {
    name: "warns",
    description: "Liste des warns",
    usage:
      prefix + "warns <@mention | id du membre | nom d'utilisateur | pseudo>",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["listedeswarns"],
  },

  run: async (bot, message, args) => {
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]) ||
      message.guild.members.cache.find(
        (m) => m.user.username === args.join(" ")
      ) ||
      message.guild.members.cache.find((m) => m.nickname === args.join(" ")) ||
      message.member;

    try {
      let iembed = new Discord.MessageEmbed()
        .setTitle(`Liste des warns de ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL())
        .setColor("RED")
        .addField("Nombre de warns :", warns[member.id].length)
        .addField(
          `Warns :`,
          warns[member.id].slice(0, 10).map((e) => `- ${e.raison}`)
        )
        .setTimestamp();
      message.channel.send({ embed: iembed });
    } catch {
      message.channel.send("Ce membre n'a aucun warn !");
    }

    console.log(
      `Commande warns utilisée dans le serveur ${message.guild.name}`
    );
  },
};
