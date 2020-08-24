const { MessageEmbed } = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix;
const moment = require("moment");
const ms = require("ms");

moment.locale("fr");

module.exports = {
  config: {
    name: "ban",
    description: "Banni le membre mentionné",
    usage:
      prefix +
      "ban @lapersonne Raison du ban +time(Le temps du ban (optionnel))",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["b", "bannir"],
  },

  run: async (bot, message, args) => {
    let regTime = /\+time\s?\((\d+(?:s|m|h|d))\)/;
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
    let regraison = /(?:\w|\s|\d|'|"|é|è|ê|:|\.|!|;|\?|&|à|ç|§|\/|\*|µ|ù|\(|\)|\[|\]|\^|\$|&|£|%|´|`|=|,|<|>|\\|°|¨|\||\+(?!time))+/;

    let reason = args.slice(1).join(" ").match(regraison);
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande !"
      );
    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banMember) return message.channel.send("Qui dois-je bannir ?");
    if (!banMember.bannable)
      return message.channel.send("Vous ne pouvez pas bannir cette personne !");

    if (!reason) reason = "Aucune";

    if (!message.guild.me.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "Je n'ai pas la permission de bannir les membres de ce serveur."
      );

    await banMember.ban().catch((err) => message.channel.send(err));

    message.channel.send({
      embed: {
        title: `<:ban:723924773033214002> \`${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }\` a banni \`${
          banMember.nickname ? banMember.nickname : banMember.user.username
        }\``,
        description: `\`\`\`markdown\n# Temps #\n${
          boolean ? time : "Indéterminé"
        }\n# Raison #\n${reason ? reason : "Aucune"}\n\`\`\``,
        color: 6071551,
        thumbnail: {
          url: banMember.user.avatarURL({ format: "jpg" }),
        },
      },
    });
    console.log(`Commande ban utilisée dans le serveur ${message.guild.name}`);

    if (boolean) {
      setTimeout(function () {
        message.guild.members.unban(banMember);
        message.channel.send(`<@${banMember.id}> n'est plus banni.`);
      }, ms(time));
      const lchannel = message.guild.channels.cache.find(
        (c) => c.name === "logs"
      );
      const lEmbed = new MessageEmbed()
        .setColor(colours.red_light)
        .setAuthor(`Log de modération`, bot.user.avatarURL())
        .addField("Type :", "Ban temporaire")
        .addField("Membre :", banMember.user.username)
        .addField("Modérateur :", message.author.username)
        .addField("Temps du ban :", time)
        .addField("Raison :", reason ? reason : "Aucune")
        .addField("Date :", moment.utc(message.createdAt).format("LLL"));
      lchannel.send(lEmbed);
    } else {
      const lchannel = message.guild.channels.cache.find(
        (c) => c.name === "logs"
      );
      const lEmbed = new MessageEmbed()
        .setColor(colours.red_light)
        .setAuthor(`Log de modération`, bot.user.avatarURL())
        .addField("Type :", "Ban")
        .addField("Membre :", banMember.user.username)
        .addField("Modérateur :", message.author.username)
        .addField("Raison :", reason ? reason : "Aucune")
        .addField("Date :", moment.utc(message.createdAt).format("LLL"));
      lchannel.send(lEmbed);
    }
  },
};
