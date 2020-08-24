const Discord = require("discord.js");
const config = require("../../botconfig.json");
const prefix = config.prefix;

module.exports = {
  config: {
    name: "ping",
    description: "PONG ! Donne la latence du bot.",
    usage: prefix + "ping",
    category: "Pour tous",
    accessableby: "Membres",
    aliases: ["latence"],
  },

  run: async (bot, message, args) => {
    console.log(`Commande ping utilisée dans le serveur ${message.guild.name}`);

    /*
        message.channel.send("Pinging...").then(m => {
            let ping = bot.ws.ping

            m.edit(`Latence du bot : \`${ping}\``)
        })
*/
    let startTime = Date.now();
    message.channel.send("Calcul en cours...").then((msg) => {
      let embed = new Discord.MessageEmbed()
        .setColor(0x5d6d7e)
        .setDescription(
          "⏲  Ping du bot \n`" +
            ((new Date() - message.createdTimestamp) / 200) +
            "` ms\n💓 Ping de l'API\n`" +
            Math.round(bot.ws.ping) +
            "`  ms"
        );
      msg.edit("Ping en général", embed);
    });
  },
};
