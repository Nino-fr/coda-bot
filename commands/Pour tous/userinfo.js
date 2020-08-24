const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const moment = require("moment");
const prefix = botconfig.prefix;

module.exports = {
  config: {
    name: "userinfo",
    description:
      "Informations sur l'utilisateur mentionné ou sur l'auteur du message si aucune mention",
    usage:
      prefix +
      "userinfo <@mention-optionnelle | id du membre | nom d'utilisateur ou pseudo du membre>",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["ui"],
  },

  run: async (bot, message, args) => {
    console.log(
      `Commande userinfo utilisée dans le serveur ${message.guild.name}`
    );
    const membre =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find(
        (me) => me.nickname === args.join(" ")
      ) ||
      message.member;
      let x = membre.user.presence.activities;
    let y;
    switch (membre.user.presence.status) {
      case "offline":
        y = "Hors-ligne";
        break;
      case "online":
        y = "En ligne";
        break;
      case "dnd":
        y = "Ne pas déranger";
        break;
      case "idle":
        y = "Inactif";
        break;
    }

    moment.locale("fr");

    message.channel.send({
      embed: {
        color: 15844367,
        title: `Informations sur ${membre.user.tag}`,
        thumbnail: {
          url: membre.user.avatarURL(),
        },
        fields: [
          {
            name: "Statut",
            value: y,
          },
          {
            name: "ID :",
            value: membre.id,
          },
          {
            name: "Jeu :", 
            value:`${
            `${x}`
              ? `${x
                  .join(", ")
                  .replace("Custom Status", "Statut personnalisé")}`
              : "Aucun jeu D:"
          }`,
          },
          {
            name: "Pseudo :",
            value: membre.nickname ? membre.nickname : membre.user.username,
          },
          {
            name: "Compte créé le :",
            value: moment
              .utc(membre.user.createdAt)
              .format("LLL"),
          },
          {
            name: "A rejoint le serveur le :",
            value: moment
              .utc(membre.joinedAt)
              .format("LLL"),
          },
          {
            name: "Bot ?",
            value: membre.user.bot ? "Oui" : "Non",
          },
        ],
        footer: {
          text: `Informations de l'utilisateur ${membre.user.username}`,
        },
      },
    });
  },
};