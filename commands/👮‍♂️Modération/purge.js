const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { red_light } = require("../../colours.json");

module.exports = {
  config: {
    name: "purge",
    description: "Supprime tous les messages d'un salon",
    category: "👮‍♂️Modération",
    usage: prefix + "purge",
    accessableby: "Administrateurs",
    aliases: ["clearall", "deleteall"],
  },
  run: async (bot, message, args) => {
    if (
      !message.member.permissions.has("MANAGE_MESSAGES") ||
      !message.member.permissions.has("ADMINISTRATOR")
    )
      return message.channel.send(
        `Non mais pour qui tu te prends ? Tu n'as absolument pas le droit de faire ça ! Cette commande est réservée aux administrateurs disposant de la permission de supprimer les messages !`
      );
    let taille = (await message.channel.messages.fetch()).size;
    let lChannel = message.guild.channels.cache.find((c) => c.name === "logs");
    let lEmbed = new Discord.MessageEmbed()
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .setColor(red_light)
      .addField("Type :", "Purge")
      .addField("Nombre de messages :", taille)
      .addField("Modérateur :", message.author.username)
      .setTimestamp();
    if (lChannel) await lChannel.send(lEmbed);

    await message.delete();
    (await message.channel.messages.fetch()).forEach(
      async (m) => await m.delete()
    );

    message.channel.send("Suppression en cours...").then((m) => m.delete());

    console.log(
      `Commande purge utilisée dans le serveur ${message.guild.name}`
    );
  },
};
