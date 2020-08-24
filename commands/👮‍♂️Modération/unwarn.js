const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const colours = require("../../colours.json");
const warns = require("../../warns.json");
const fs = require("fs");

module.exports = {
  config: {
    name: "unwarn",
    description: "Enlève le dernier warn du membre mentionné",
    usage: prefix + "unwarn <@mention | id du membre> <raison>",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["unw"],
  },

  run: async (bot, message, args) => {
    let rr = message.guild.roles.cache.find((r) =>
      r.name.toLowerCase().includes("mod")
    );
    if (
      !message.member.roles.cache.has(rr.id) &&
      !message.member.permissions.has("ADMINISTRATOR")
    )
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande car vous n'êtes pas administrateur"
      );
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]);
    if (!member) return message.channel.send("Veuillez préciser un membre");
    if (
      member.permissions.has("ADMINISTRATOR") ||
      member.roles.cache.has(rr.id)
    )
      return message.channel.send("Vous ne pouvez pas warn ce membre.");
    let reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send("Veuillez indiquer une raison");
    if (!warns[member.id] || !warns[member.id].length)
      return message.channel.send("Ce membre n'a actuellement aucun warn.");
    warns[member.id].shift();
    fs.writeFileSync("./warns.json", JSON.stringify(warns));
    message.channel.send(
      `:white_check_mark: Le dernier warn de ${member} a été retiré.`
    );

    let embed = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .addField("Type :", "Unwarn")
      .addField("Membre :", member.user.username)
      .addField("Modérateur :", message.author.username)
      .addField("Raison :", reason)
      .setTimestamp();

    let sChannel = message.guild.channels.cache.find((c) => c.name === "logs");
    sChannel.send(embed);
    console.log(
      `Commande unwarn utilisée dans le serveur ${message.guild.name}`
    );
  },
};
