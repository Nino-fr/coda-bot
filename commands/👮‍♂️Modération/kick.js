const { MessageEmbed } = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix;
const moment = require("moment");
moment.locale("fr");

module.exports = {
  config: {
    name: "kick",
    description: "Kick le membre mentionné",
    usage: prefix + "kick @lapersonne Raison du kick",
    category: "👮‍♂️Modération",
    accessableby: "Modérateurs",
    aliases: ["k"],
  },

  run: async (bot, message, args) => {
    let regraison = /(?:\w|\s|\d|'|"|é|è|ê|:|\.|!|;|\?|&|à|ç|§|\/|\*|µ|ù|\(|\)|\[|\]|\^|\$|&|£|%|´|`|=|,|<|>|\\|°|¨|\||\+(?!time))+/;
    let reason = args.slice(1).join(" ").match(regraison);
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande !"
      );
    let kickMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!kickMember) return message.channel.send("Qui dois-je expulser ?");
    if (!kickMember.kickable)
      return message.channel.send(
        "Vous ne pouvez pas expulser cette personne !"
      );

    if (!reason) reason = "Aucune";

    if (!message.guild.me.permissions.has("KICK_MEMBERS"))
      return message.channel.send(
        "Je n'ai pas la permission d'expulser les membres de ce serveur."
      );

    await kickMember.kick().catch((err) => message.channel.send(err));

    message.channel.send({
      embed: {
        title: `:ballot_box_with_check: \`${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }\` a expulsé \`${
          kickMember.nickname ? kickMember.nickname : kickMember.user.username
        }\``,
        description: `\`\`\`markdown\n# Raison #\n${
          reason ? reason : "Aucune"
        }\n\`\`\``,
        color: 6071551,
        thumbnail: {
          url: kickMember.user.avatarURL({ format: "jpg" }),
        },
      },
    });
    console.log(`Commande kick utilisée dans le serveur ${message.guild.name}`);

    const lEmbed = new MessageEmbed()
      .setColor(colours.red_light)
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .addField("Type :", "Kick")
      .addField("Membre :", kickMember.user.username)
      .addField("Modérateur :", message.author.username)
      .addField("Raison :", reason ? reason : "Aucune")
      .addField("Date :", moment.utc(message.createdAt).format("LLL"));
    lchannel.send(lEmbed);
  },
};
