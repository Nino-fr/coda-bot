const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix;
const moment = require("moment");
moment.locale("fr");

module.exports = {
  config: {
    name: "unmute",
    description: "Unmute la personne mentionnée",
    usage: prefix + "unmute <membre> <raison>",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["unm", "speak"],
  },

  run: async (bot, message, args) => {
    // check if the command caller has permission to use the command
    if (
      !message.member.permissions.has("MANAGE_ROLES") &&
      !message.member.roles.cache.has((r) =>
        r.name.toLowerCase().includes("mod")
      )
    )
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande."
      );

    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.channel.send("Je n'ai pas la permission de faire ça !");

    //define the reason and unmutee
    let mutee =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!mutee) return message.channel.send("Qui dois-je mute ?");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Aucune raison";

    //define mute role and if the mute role doesnt exist then send a message
    let muterole = message.guild.roles.cache.find((r) => r.name.toLowerCase().includes("mute"));
    if (!muterole)
      return message.channel.send("Cette personne n'est pas mute !");

    //remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
    mutee.roles.cache.remove(muterole.id).then(() => {
      message.channel.send(`${mutee.user} a bien été unmute !`);
    });

    //send an embed to the modlogs channel
    let embed = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setAuthor(
        `${message.guild.name} Log de modération`,
        bot.user.avatarURL()
      )
      .addField("Type :", "Unmute")
      .addField("Membre :", mutee.user)
      .addField("Modérateur :", message.author)
      .addField("Raison :", reason)
      .addField("Date :", moment.utc(message.createdAt).format("LL"));

    let sChannel = message.guild.channels.cache.find((c) => c.name === "logs");
    sChannel.send(embed);
    console.log(
      `Commande unmute utilisée dans le serveur ${message.guild.name}`
    );
  },
};
