const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { red_light } = require("../../colours.json");
const moment = require("moment");
moment.locale("fr");

module.exports = {
  config: {
    name: "clear",
    description: "Supprime le nombre de messages souhaité.",
    category: "👮‍♂️Modération",
    usage: prefix + "clear <nombre>",
    accessableby: "Modérateurs",
    aliases: ["c", "supprimer", "delete", "del"],
  },
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous ne pouvez pas utiliser cette commande."
      );
    if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send("Je n'ai pas la permission de faire ça !");
    if (!args[0])
      return message.channel.send("Combien de messages dois-je supprimer ?");
    if (isNaN(args[0]) || args[0] < 1 || args[0] > 100)
      return message.channel.send(
        "Veuillez spécifier un nombre de messages à supprimer entre 1 et 100."
      );
    let messagesASupprimer = args[0];
    await message.delete();
    (
      await message.channel.messages.fetch({ limit: messagesASupprimer })
    ).forEach(async (m) => await m.delete());

    message.channel
      .send(
        `J'ai bien supprimé ${messagesASupprimer} messag${
          messagesASupprimer < 2 ? "e" : "es"
        } !`
      )
      .then((m) => m.delete({ timeout: 3000 }));

    let lChannel = message.guild.channels.cache.find((c) => c.name === "logs");
    let lEmbed = new Discord.MessageEmbed()
      .setColor(red_light)
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .addField("Type :", "Clear")
      .addField("Nombre de messages :", messagesASupprimer)
      .addField("Modérateur :", message.author.username)
      .addField("Date :", moment.utc(message.createdAt).format("LL"));

    if (lChannel) lChannel.send(lEmbed);
    console.log(
      `Commande clear utilisée dans le serveur ${message.guild.name}`
    );
  },
};
