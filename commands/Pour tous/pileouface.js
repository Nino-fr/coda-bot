const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "pileouface",
    description: "Pile ou face ?",
    usage: prefix + "pileouface",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["pof", "pileface", "faceoupile"],
  },
  run: async (bot, message, args) => {
    let i = 0;
    i += 1;
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let value = getRandomInt(2);

    let pile = 0;
    let face = 0;

    if (value === 0) pile++;
    if (value === 1) face++;

    message.channel.send({
      embed: {
        color: 0xd915e7,

        description: `${pile > 0 ? "Pile" : "Face"}`,

        timestamp: new Date(),
      },
    });
  },
};
