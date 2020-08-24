const Discord = module.require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "setnickname",
    description: "Change le pseudo du membre mentionné.",
    category: "👮‍♂️Modération",
    usage: prefix + "setnickname <@membre | id du membre> <nouveau pseudo>",
    accessableby: "Modérateurs",
    aliases: ["changenickname", "setpseudo", "changepseudo"],
  },

  run: async (bot, message, args) => {
    if (message.member.permissions.has("MANAGE_NICKNAMES")) {
      if (!message.guild.me.permissions.has("MANAGE_NICKNAMES"))
        return message.channel.send(
          "Je n'ai pas la permissions de changer les pseudos."
        );
      let mem =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let newPseudo = args.slice(1).join(" ");
      if (!newPseudo) {
        return message.channel.send(
          ":x: | Veuillez préciser le nouveau pseudo du membre !"
        );
      }
      try {
        mem
          .setNickname(newPseudo)
          .then(() =>
            message.channel.send(
              `Le nouveau pseudo de ${mem.user.tag} est ${newPseudo} !`
            )
          );
      } catch {
        return message.channel.send(
          "Je ne peux pas changer le pseudo de ce membre car c'est mon supérieur !"
        );
      }
    } else {
      return message.channel.send(
        ":x: Vous n'avez pas la permission de changer les pseudos !"
      );
    }
  },
};
