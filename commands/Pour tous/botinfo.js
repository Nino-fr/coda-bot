const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const colours = require("../../colours.json");
const { convertMS } = require("../../fonctions");

module.exports = {
  config: {
    name: "botinfo",
    description: "Informations sur Coda",
    usage: prefix + "botinfo",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["bi"],
  },

  run: async (bot, message, args) => {
    const uptime = convertMS(bot.uptime);
    const embed = new Discord.MessageEmbed()
      .setTitle(`📄Informations sur moi`)
      .setColor(colours.aqua)
      .setThumbnail(bot.user.avatarURL())
      .addField("👥 Utilisateurs", `> ${bot.users.cache.size}`, true)
      .addField(
        "⏱️Temps depuis la dernière mise à jour du bot",
        `> \`${uptime.d}\` jours, \`${uptime.h}\` heures, \`${uptime.m}\` minutes et \`${uptime.s}\` secondes.`,
        true
      )
      .addField(
        "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n💻 Informations sur mon développement",
        ">>> Développeur : `Nino#3670`\nLangage : `Javascript`\nLogiciel de programmation : `Visual Studio Code`\nHébergeur : `World Heberg`\nLibrairie : `discord.js@12.2.0`\nVersion de NodeJS : `12.6.2`",
        false
      );
    await message.channel.send({ embed: embed });
    console.log(
      `Commande botinfo utilisée dans le serveur ${message.guild.name}`
    );
  },
};
