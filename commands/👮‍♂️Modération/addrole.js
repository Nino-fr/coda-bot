const Discord = require("discord.js");
const colours = require("../../colours.json");
const { prefix, OwnerID } = require("../../botconfig.json");
const moment = require("moment");
moment.locale("fr");

module.exports = {
  config: {
    name: "addrole",
    description: "Ajoute un rôle à un membre au choix",
    usage: prefix + "addrole @membre Le nom du rôle",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["ar", "roleadd"],
  },

  run: async (bot, message, args) => {
    let modo = message.guild.roles.cache.find((r) => r.name === "Modérateur");
    console.log(modo);
    if (
      !message.member.permissions.has("MANAGE_ROLES") &&
      !message.member.roles.cache.has(modo.id)
    )
      return message.channel.send(
        "Vous ne pouvez pas utiliser cette commande."
      );
    /*
    let regRole = /r(?:o|ô)le\(((?:\w|(?:é|è|ù|ï|î|â|ô|\.|\d))+\s?)+\)/u;
    let regReason = /raison\((\w+(?:\d+)?(?:\w+)?)+\)/u;
    let regPseudo = /pseudo\((\w+\s?\d*\w*)+\)/u;
    let rolebool = regRole.test(args.join(" "));
    let pseudoBool = regPseudo.test(args.join(" "));
    if (pseudoBool) var pseudoarray = await args.join(" ").match(regPseudo);
    else return message.channel.send("Veuillez préciser le pseudo du membre.");
    let raisonbool = await regReason.test(args.join(" "));
    if (raisonbool) var raison = await args.join(" ").match(regReason)[1];
    else var raison = "Aucune";
    if (rolebool) var rolearray = await args.join(" ").match(regRole);
    else return message.channel.send("Veuillez préciser un rôle à ajouter.");
    let pseudo = pseudoarray[1];
    let rMember =
      message.guild.members.cache.find((m) => m.nickname === pseudo) ||
      message.guild.members.cache.find((mem) => mem.user.username === pseudo);
    if (!rMember) return message.channel.send("Pseudo incorrect");
    let role = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === rolearray[1].toLowerCase()
    );
    if (!role) return message.channel.send("Nom de rôle incorrect");
    */
    let rMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let role =
      message.guild.roles.cache.find(
        (r) => r.name === args.join(" ") || r.name === args.slice(1).join(" ")
      ) ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.get(args[1]);
    if (!rMember) return message.channel.send("Veuillez préciser un membre.");
    if (!role) return message.channel.send("Veuillez préciser un rôle.");
    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.channel.send("Je n'ai pas la permission de faire ça.");

    if (rMember.roles.cache.has(role.id)) {
      return message.channel.send(
        `${
          rMember.nickname ? rMember.nickname : rMember.user.username
        } a déjà ce rôle`
      );
    } else {
      try {
        await rMember.roles.add(role.id);
        message.channel.send(
          `J'ai bien ajouté le rôle ${role.name} à ${
            rMember.nickname ? rMember.nickname : rMember.user.username
          }.`
        );
      } catch {
        return message.channel.send(
          "Je ne peux pas ajouter ce rôle, il est trop haut en grade ! Redescendez-le pour le mettre sous mon plus haut rôle et réessayez."
        );
      }
    }

    let embed = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .addField("Type :", "Ajout de rôle")
      .addField(
        "Membre :",
        rMember.nickname ? rMember.nickname : rMember.user.username
      )
      .addField(
        "Modérateur :",
        message.member.nickname ? rMember.nickname : rMember.user.username
      )
      .addField("Date :", moment.utc(message.createdAt).format("LLL"))
      .addField("Rôle :", role.name);

    let sChannel = message.guild.channels.cache.find((c) => c.name === "logs");
    sChannel.send(embed);
    console.log(
      `Commande addrole utilisée dans le serveur ${message.guild.name}`
    );
  },
};
