const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "roulette",
    description: "Roue de la fortune avec des fruits.",
    usage: prefix + "roulette",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["r", "roue"],
    cooldown: 1,
  },
  run: async (bot, message, args) => {
    console.log(
      `Commande roulette utilisée dans le serveur ${message.guild.name}`
    );

    const slots = ["🍎", "🍊", "🍒", "🍓", "🍏", "🍉"];
    let casino = [];

    for (let i = 0; i < 9; i++) {
      casino[i] = slots[Math.floor(Math.random() * slots.length)];
    }

    return message.channel.send({
      embed: {
        author: {
          name:
            casino[3] === casino[4] && casino[4] === casino[5]
              ? "Vous avez gagné !"
              : "Vous avez perdu !",
          icon_url: message.author.avatarURL(),
        },
        description: casino
          .map((item, i) => `${item}${(i + 1) % 3 === 0 ? "\n" : " | "}`)
          .join(""),
        color: 0xff2626,
      },
    });
  },
};

/*
const { prefix } = require("../../botconfig.json");
const Discord = require("discord.js");

module.exports = {
  config: {
    name: "roulette",
    description: "Roue de la fortune avec des fruits.",
    usage: prefix + "roulette",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["r", "roue"],
  },
  run: async (bot, message, args) => {
    console.log(
      `Commande roulette utilisée dans le serveur ${message.guild.name}`
    );

    const slots = [":grapes:", ":cherries:", ":lemon:"];
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];
    if (slotOne === slotTwo && slotOne === slotThree) {
      const won = new Discord.MessageEmbed()
        .setColor("#7289DA")
        .addField("|-----|-----|----|", `|${slotOne}|${slotTwo}|${slotThree}|`)
        .setFooter(`"Wow ${message.author.username} ! Félicitations !`);
      await message.channel.send(won);
      message.channel.send("Bravo ! Vous avez gagné !");
    } else {
      const lost = new Discord.MessageEmbed()
        .setColor("#7289DA")
        .addField("|-----|-----|----|", `|${slotOne}|${slotTwo}|${slotThree}|`)
        .setFooter(`Vous aurez plus de chance la prochaine fois.`);
      await message.channel.send(lost);
      message.channel.send("Oh non ! Vous avez perdu !");
    }
  },
};
*/
