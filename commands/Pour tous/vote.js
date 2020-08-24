const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");

const agree = "<:positif:718086257431019602>";
const disagree = "<:negatif:718086588638298165>";

module.exports = {
  config: {
    name: "vote",
    description:
      "Démarre un vote d'une minute avec comme possibilités de réponse : oui et non",
    usage: prefix + "vote <Sujet du vote>",
    accessableby: "Tout le monde",
    category: "Pour tous",
    aliases: ["débat"],
  },

  run: async (bot, message, args) => {
    console.log(
      `Commande vote exécutée dans le serveur ${message.guild.name}.`
    );
    let sujet = args.join(" ");
    const embeed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(`**${sujet}**`)
      .setDescription(
        `Vote lancé par ${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }.`
      )
      .setTimestamp()
      .setFooter("Vous avez une minute pour voter avec les réactions !");

    let m = await message.channel.send(embeed);

    await m.react("718086257431019602");
    await m.react("718086588638298165");

    const reactions = await m.awaitReactions(
      (reaction) =>
        reaction.emoji.name === "positif" || reaction.emoji.name === "negatif",
      { time: 60000 }
    );

    var NO_Count = reactions.find((r) => r._emoji.name === "negatif").count;
    var YES_Count = reactions.find((r) => r._emoji.name === "positif");
    if (YES_Count === undefined) {YES_Count = 1} else YES_Count = reactions.find((r) => r._emoji.name === "positif").count;
    if (NO_Count === YES_Count) {
      var foo = "nul";
    }
    if (NO_Count > YES_Count) {
      var foo = "négatif";
    }
    if (NO_Count < YES_Count) {
      var foo = "positif";
    }
    var color;
    if (foo === "positif") {
      color = "GREEN";
    } else if (foo === "nul") {
      color = "BLUE";
    } else {
      color = "RED";
    }

    const eembed = new Discord.MessageEmbed()
      .setTitle(`**${sujet}**`)
      .setDescription("Fin du vote !")
      .setFooter(
        `Vote lancé par ${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }. | Résultat ${foo}.`
      )
      .setColor(`${color}`);

    await m.edit(eembed);
    await m.reactions.removeAll();

    var sumsum = new Discord.MessageEmbed()

      .setDescription(
        "Résultats des votes :\n\n" +
          "Oui : " +
          `${YES_Count-1}\n` +
          "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n" +
          "Non : " +
          `${NO_Count-1}\n`
      )

      .setColor(`${color}`);

    await message.channel.send({ embed: sumsum });
  },
};
