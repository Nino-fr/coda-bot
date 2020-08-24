const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const colours = require("../../colours.json");
const warns = require("../../warns.json");
const moment = require("moment");
const fs = require("fs");

module.exports = {
  config: {
    name: "warn",
    description: "Warn le membre mentionné",
    usage: prefix + "warn <@mention | id/nom d'utilisateur> <raison>",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["w"],
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
        "Vous n'avez pas la permission d'utiliser cette commande car vous n'êtes pas administrateur ou un modérateur"
      );
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]) ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find(
        (m) => m.nickname.toLowerCase() === args[0].toLowerCase()
      );
    if (!member) return message.channel.send("Veuillez préciser un membre.");
    if (
      member.permissions.has("ADMINISTRATOR") ||
      member.roles.cache.has(rr.id)
    )
      return message.channel.send("Vous ne pouvez pas warn ce membre.");
    let reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send("Veuillez indiquer une raison");
    if (!warns[member.id]) {
      warns[member.id] = [];
    }
    warns[member.id].unshift({
      username: member.user.username,
      raison: reason,
      date: moment.utc(message.createdAt).format("L"),
      modérateur: message.author.username,
      serveur: message.guild.name,
    });
    fs.writeFileSync("./warns.json", JSON.stringify(warns));
    message.channel.send({
      embed: {
        title: `:warning: \`${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }\` a warn \`${
          member.nickname ? member.nickname : member.user.username
        }\``,
        description: `\`\`\`markdown\n# Raison #\n${
          reason ? reason : "Aucune"
        }\n\`\`\``,
        color: 14423100,
        thumbnail: {
          url: member.user.displayAvatarURL(),
        },
      },
    });

    let embed = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .addField("Type :", "Warn")
      .addField("Membre :", member.user.username)
      .addField("Modérateur :", message.author.username)
      .addField("Raison :", reason)
      .setTimestamp();

    let sChannel = message.guild.channels.cache.find((c) => c.name === "logs");
    sChannel.send(embed);
    console.log(`Commande warn utilisée dans le serveur ${message.guild.name}`);
  },
};
