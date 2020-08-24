const { prefix, OwnerID } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "dm",
    description: "Envoie un message en mp à l'utilisateur mentionné.",
    usage: prefix + "dm @mention <Message>",
    category: "👮‍♂️Modération",
    accessableby: "Mon créateur",
    aliases: ["mp"],
  },
  run: async (client, message) => {
    if (message.author.id !== OwnerID)
      return message.channel.send(
        "Vous ne pouvez pas me donner cet ordre car vous n'êtes pas mon créateur !"
      );
    message.delete();
    if (message.author === client.user) return;
    var mentionned = message.mentions.users.first();
    if (message.mentions.users.size === 0) {
      return message.channel.send("Veuillez mentionner un utilisateur");
    } else {
      const args = message.content.split(" ").slice(1);
      if (
        args[0] === `<@!${mentionned.id}>` ||
        args[0] === `<@${mentionned.id}>`
      ) {
        if (args.slice(1).length != 0) {
          message.channel
            .send(`J'ai bien envoyé votre message à ${mentionned.tag} !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
          mentionned.send(`${args.slice(1).join(" ")}`);
        }
      }
    }
    console.log(`Commande dm utilisée dans le serveur ${message.guild.name}`);
  },
};
