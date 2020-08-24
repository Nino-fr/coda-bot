const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "eval",
    description: "Evalue le code javascript",
    usage: prefix + "eval <code>",
    accessableby: "Créateur du bot",
    aliases: ["e", "évaluer", "evaluer"],
  },

  run: async (bot, message, args) => {
    if (message.author.id !== "428582719044452352")
      return message.channel.send(
        "Cette commande ne peut être utiliser que par mon créateur !"
      );

    const clean = (text) => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
