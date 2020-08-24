const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const { cyan } = require("../../colours.json");

module.exports = {
  config: {
    name: "help",
    aliases: ["h", "commandes", "commands", "aide"],
    usage: prefix + "help <commande optionnelle> || " + prefix + "help dm/mp",
    category: "Pour tous",
    description:
      "Information sur les commandes à envoyer dans le serveur ou en mp",
    accessableby: "Membres",
  },

  run: async (bot, message, args) => {
    console.log(`Commande help utilisée dans le serveur ${message.guild.name}`);

    const embed = new MessageEmbed()
      .setColor(cyan)
      .setAuthor(`Page d'aide`, bot.user.avatarURL())
      .setThumbnail(bot.user.avatarURL());

    if (!args[0]) {
      let categories = readdirSync("./commands/");

      embed.setDescription(
        `Voici la liste des commandes.\nMon préfix est : **${prefix}**`
      );
      embed.setFooter(
        `© ${bot.user.username} | Commandes : ${bot.commands.size}`,
        bot.user.avatarURL()
      );

      categories.forEach((category) => {
        let dir = bot.commands.filter((c) => c.config.category === category);
        let capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
        try {
          embed.addField(
            `❯ ${capitalise} [${dir.size}]:`,
            dir.map((c) => `\`${c.config.name}\``).join(`\n`)
          );
        } catch (e) {
          console.log(e);
        }
      });
      await message.channel.send(embed);
    } else if (args.join("").toLowerCase() === "mp") {
      message.react("📭");
      let categories = readdirSync("./commands/");

      embed.setDescription(
        `Voici la liste des commandes.\nMon préfix est : **${prefix}**`
      );
      embed.setFooter(
        `© ${bot.user.username} | Commandes : ${bot.commands.size}`,
        bot.user.avatarURL()
      );

      categories.forEach((category) => {
        let dir = bot.commands.filter((c) => c.config.category === category);
        let capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
        try {
          embed.addField(
            `❯ ${capitalise} [${dir.size}]:`,
            dir.map((c) => `\`${c.config.name}\``).join(`\n`)
          );
        } catch (e) {
          console.log(e);
        }
      });
    } else {
      let command = bot.commands.get(
        bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
      );
      if (!command)
        return message.channel.send(
          embed
            .setTitle("Commande invalide.")
            .setDescription(
              `Faites \`${prefix}help\` pour la liste des commandes.`
            )
        );
      command = command.config;
      embed.setFooter(`Les arguments entre <> sont obligatoires tandis que ceux entre [] sont facultatifs. Il ne faut pas réécrire <> et [] en utilisant la commande !`)

      embed.setDescription(stripIndents`Mon préfix est \`${prefix}\`\n
            **Commande :** ${
              command.name.slice(0, 1).toUpperCase() + command.name.slice(1)
            }
            **Description :** ${command.description || "Aucune description."}
            **Utilisation :** ${
              command.usage ? `\`${command.usage}\`` : "Aucun"
            }
            **Utilisable par :** ${command.accessableby || "Tout le monde"}
            **Aliases :** ${
              command.aliases ? command.aliases.join(", ") : "Aucun."
            }`);
      await message.channel.send(embed);
    }
  },
};
