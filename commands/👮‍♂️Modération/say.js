const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "say",
    description:
      "Envoie le message écrit après la commande dans le salon mentionné ou dans le salon de la commande si aucune mention.",
    usage: prefix + "say <salon optionnel> <message>",
    category: "👮‍♂️Modération",
    accessableby: "Administrateurs",
    aliases: ["dire"],
  },

  run: async (bot, message, args) => {
    if (
      !message.author.permissions.has("ADMINISTRATOR") &&
      !message.member.roles.cache.has((r) =>
        r.name.toLowerCase().includes("admin")
      )
    ) {
      return message.channel.send(
        "Vous ne pouvez pas faire cela car vous n'êtes pas administrateur."
      );
    }

    let argsresult;
    let mChannel = message.mentions.channels.first();

    message.delete();
    if (mChannel) {
      argsresult = args.slice(1).join(" ");
      mChannel.send(argsresult);
    } else {
      argsresult = args.join(" ");
      message.channel.send(argsresult);
    }
    console.log(`Commande say utilisée dans le serveur ${message.guild.name}`);
  },
};
