const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "8ball",
    description: "Pose une question et je te répondrai. Attention, ne fonctionne que pour les questions fermées !",
    usage: prefix + "8ball <question>",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["randomreply"],
  },
  run: async(bot, message, args) => {
    
    if (!args) return message.channel.send("Pose une question")
  
    let replies = ["Oui <:check:708245371792523317>", ":x: Non", "Peut-être... <:thoonk:714760634356727868>", "T'as d'autres questions plus débiles ? <:angrydog:714168368692854884>", "Laisse-moi tranquille <:blobunamused:713153317097963581>"];
    let res = Math.floor((Math.random() * replies.length));
  
    message.channel.send(replies[res])
    console.log(`Commande 8ball utilisée dans le serveur ${message.guild.name}`);

  }
};