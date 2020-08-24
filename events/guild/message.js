const { prefix } = require("../../botconfig.json");
const { Collection } = require("discord.js");

module.exports = async (bot, message) => {
  if (message.channel.type === "dm") {
    bot.guilds.cache
      .find((g) => g.name === "Test bots")
      .channels.cache.find((c) => c.name === "dm-coda")
      .send(`**Message de ${message.author.tag} :**\n${message.content}`);
  } else {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;
    if (
      cmd === "react" ||
      cmd === "listemojis" ||
      cmd === "check" ||
      cmd === "status" ||
      cmd === "selfrole" ||
      cmd === "check !"
    )
      return;
    let commandfile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (!commandfile) return;
    if (!bot.cooldowns.has(commandfile.config.name)) {
      bot.cooldowns.set(commandfile.config.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = bot.cooldowns.get(commandfile.config.name);
    const cdAmount = (commandfile.config.cooldown || 0) * 1000;

    if (tStamps.has(message.author.id)) {
      const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

      if (timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;
        return message.reply(
          `espèce de spammeur ! Attends un peu entre les coups !`
        );
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    if (commandfile) commandfile.run(bot, message, args);
  }
};
