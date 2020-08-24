const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "sayembed",
    description: "Me fait dire ce que tu veux dans un embed.",
    usage: prefix + "sayembed <Message>",
    category: "👮‍♂️Modération",
    accessableby: "Administrateurs",
    aliases: ["saye"],
  },
  run: async (bot, message, args) => {
    let argsresult;
    let mChannel = message.mentions.channels.first();
    if (
      !message.author.permissions.has("ADMINISTRATOR") &&
      !message.member.roles.cache.has((r) =>
        r.name.toLowerCase().includes("admin")
      )
    )
      return message.channel.send(
        "Vous ne pouvez pas faire cela car vous n'êtes pas administrateur."
      );

    message.delete();
    if (mChannel) {
      argsresult = args.slice(1).join(" ");
      mChannel.send({
        embed: {
          color: 15844367,
          description: argsresult,
        },
      });
    } else {
      argsresult = args.join(" ");
      message.channel.send({
        embed: {
          color: 15844367,
          description: argsresult,
        },
      });
    }
    console.log(
      `Commande sayembed utilisée dans le serveur ${message.guild.name}`
    );
  },
};
