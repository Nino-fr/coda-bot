const { prefix } = require("../../botconfig.json");


module.exports = { 
    config: {
        name: "avatar",
        description: "Voir son avatar (si aucune mention) ou l'avatar d'une personne au choix.",
        usage: prefix + "avatar <@membre | nom d'utilisateur du membre | pseudo du membre | id du membre>",
        category: "Pour tous",
        accessableby: "Tout le monde",
        aliases: ["pdp", "pp"]
    },
    run: (bot, message, args) => {
        console.log(`Commande avatar exécutée dans le serveur ${message.guild.name}`)
    
      let membre = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.find(m => m.nickname === args.join(" ")) || message.member;

      let avatarlink = membre.user.avatarURL();
      message.channel.send({files: [{attachment: avatarlink, name: "avatar.png"}]})
    }
}