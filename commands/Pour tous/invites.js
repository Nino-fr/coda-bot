'use strict';

const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "invites",
    description: "Donne la liste de tous les liens d'invitation du serveur.",
    usage: prefix + "invites",
    category: "Pour tous",
    accessableby: "Membres",
    aliases: ["invitations"],
  },

  run: async (bot, message, args) => {
    console.log(
      `Commande invites utilisée dans le serveur ${message.guild.name}`
    );

    let iEmbed = new MessageEmbed()
      .setTitle("Liste des invitations du serveur")
      .setColor("RANDOM");

    await message.guild.invites.fetch().then((invites) => {
      invites.forEach((invite) => {
        iEmbed.addField(
          `- ${invite}`,
          `Utilisée ${invite.uses} fois et créée par ${invite.inviter}.`
        );
      });
    });
    await message.channel.send(iEmbed);
  },
};
