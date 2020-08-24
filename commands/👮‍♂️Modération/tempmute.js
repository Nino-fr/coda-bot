/*
const { prefix } = require("../../botconfig.json");
const colours = require("../../colours.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ms = require("ms");
moment.locale("fr");

module.exports = {
  config: {
    name: "tempmute",
    description: "Mute temporairement le membre mentionné.",
    usage: prefix + "tempmute <@mention | id du membre> <temps du mute>",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["tempm", "tempunspeak", "tempchut"],
  },
  run: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    let tomute = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!tomute) {
      return message.channel.send("Cette personne n'existe pas !");
    }
    if (
      !message.member.roles.cache.has((r) =>
        r.name.toLowerCase().includes("mod")
      ) && !message.member.permissions.has("ADMINISTRATOR")
    )
      return message.channel.send("Tu ne peux pas mute cette personne");
    var muterole = message.guild.roles.cache.find((c) => c.name === "muted");
    if (!muterole) {
      try {
        muterole = await message.guild.roles.create({
          data: {
            name: "muted",
            color: "#8b8080",
            permissions: [],
          },
        });
        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.updateOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let mutetime = args[1];
    if (!mutetime)
      return message.channel.send(
        "Combien de temps dois-je mute cette personne ?"
      );

    await tomute.roles.add(muterole.id);
    message.channel.send(
      `J'ai rendu <@${tomute.id}> muet pour ${ms(
        ms(mutetime)
      )} suite à la demande de <@${message.author.id}> !`
    );

    setTimeout(function () {
      tomute.roles.remove(muterole.id);
      message.channel.send(`<@${tomute.id}> a bien été unmute`);
    }, ms(mutetime));
    const lchannel = message.guild.channels.cache.find(
      (c) => c.name === "logs"
    );
    const lEmbed = new MessageEmbed()
      .setColor(colours.red_light)
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .addField("Type :", "Tempmute")
      .addField("Membre :", tomute.user.username)
      .addField("Modérateur :", message.author.username)
      .addField("Temps du mute :", mutetime)
      .addField("Date :", moment.utc(message.createdAt).format("LL"));
    lchannel.send(lEmbed);
    console.log(
      `Commande tempmute utilisée dans le serveur ${message.guild.name}`
    );
  },
};
*/
const { prefix } = require("../../botconfig.json");
const colours = require("../../colours.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ms = require("ms");
moment.locale("fr");

module.exports = {
  config: {
    name: "mute",
    description:
      "Mute le membre mentionné. Vous pouvez rajouter un temps si vous le souhaitez. Sinon, ne mettez pas le +time et ce qui suit.",
    usage:
      prefix +
      "mute @lapersonne La raison du mute +time(Temps du mute (facultatif))",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["chut", "unspeak", "shut"],
  },
  run: async (bot, message, args) => {
    let regTime = /\+time\((\d+(?:s|m|h|d))\)/;
    let boolean = regTime.test(message.content);
    if (boolean === false) {
      var time = "Indéfini";
    } else {
      var timearray = await args.join(" ").match(regTime);
      var time = timearray[1];
      let reg = /\d\d?\d?(?:s|m|h|d)/;
      let nombre = reg.test(time);
      if (!nombre)
        return message.channel.send(
          "Veuillez préciser un temps valide. Un exemple : `15s` ou `15m` ou `15h` ou `15d`"
        );
    }
    //let regReason = /\raison\((\w+(?:\d+)?(?:\w+)?)+\)/iu;
    //let regReason = /(\w+(?:\d+)?(?:\w+)?)+/iu;
    //let regPseudo = /pseudo\((\w+\s?\d*\w*)+\)/iu;
    //let pseudoarray = await args.join(" ").match(regPseudo);
    //let regraison = /(?:\s*\d*\w+\s*'*"*'*\d*)+/;
    let regraison = /(?:\w+|\s+|\d+|'|"|é+|è+|ê+)+/;
    let raison = args.slice(1).join(" ").match(regraison);
    //.substr(0, message.content.length - 7);
    //let raisonarray = await args.join(" ").match(regReason);
    //let pseudo = pseudoarray[1];
    //let raison = raisonarray[1];
    //console.log(raison);
    let tomute = message.mentions.members.first();
    if (!tomute) {
      return message.channel.send("Cette personne n'existe pas !");
    }
    let modo = message.guild.roles.cache.find((r) =>
      r.name.toLowerCase().includes("mod")
    );
    if (
      tomute.roles.cache.has(modo.id) ||
      tomute.permissions.has("ADMINISTRATOR")
    )
      if (
        !message.member.roles.cache.has(modo.id) &&
        !message.member.permissions.has("ADMINISTRATOR") &&
        !message.member.permissions.has("MANAGE_MESSAGES") &&
        !message.member.permissions.has("MANAGE_ROLES")
      )
        return message.channel.send(
          "Tu n'as pas le droit de me demander de mute une personne !"
        );
    var muterole = message.guild.roles.cache.find((c) => c.name === "muted");
    if (!muterole) {
      try {
        muterole = await message.guild.roles.create({
          data: {
            name: "muted",
            color: "#8b8080",
          },
        });
        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.updateOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    await tomute.roles.add(muterole.id);
    message.channel.send({
      embed: {
        title: `:mute: \`${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }\` a rendu muet \`${
          tomute.nickname ? tomute.nickname : tomute.user.username
        }\``,
        description: `\`\`\`markdown\n# Temps #\n${
          boolean ? time : "Indéterminé"
        }\n# Raison #\n${raison ? raison : "Aucune"}\n\`\`\``,
        color: 6071551,
      },
    });

    if (boolean) {
      setTimeout(function () {
        tomute.roles.remove(muterole.id);
        message.channel.send(`<@${tomute.id}> a bien été unmute`);
      }, ms(time));
      const lchannel = message.guild.channels.cache.find(
        (c) => c.name === "logs"
      );
      const lEmbed = new MessageEmbed()
        .setColor(colours.red_light)
        .setAuthor(`Log de modération`, bot.user.avatarURL())
        .addField("Type :", "Mute temporaire")
        .addField("Membre :", tomute.user.username)
        .addField("Modérateur :", message.author.username)
        .addField("Temps du mute :", time ? time : "Indéfini")
        .addField("Raison :", raison ? raison : "Aucune")
        .addField("Date :", moment.utc(message.createdAt).format("LLL"));
      lchannel.send(lEmbed);
    } else {
      const lchannel = message.guild.channels.cache.find(
        (c) => c.name === "logs"
      );
      const lEmbed = new MessageEmbed()
        .setColor(colours.red_light)
        .setAuthor(`Log de modération`, bot.user.avatarURL())
        .addField("Type :", "Mute")
        .addField("Membre :", tomute.user.username)
        .addField("Modérateur :", message.author.username)
        .addField("Raison :", raison ? raison : "Aucune")
        .addField("Date :", moment.utc(message.createdAt).format("LLL"));
      lchannel.send(lEmbed);
    }
    console.log(`Commande mute utilisée dans le serveur ${message.guild.name}`);
  },
};

// COMMANDE INUTILE POUR L'INSTANT !!