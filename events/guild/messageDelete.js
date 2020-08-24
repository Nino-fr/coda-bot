const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message) => {
  const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_DELETE",
  });

  const latestMessageDeleted = fetchGuildAuditLogs.entries.first();
  const { executor } = latestMessageDeleted;

  const embed = new MessageEmbed()
    .setAuthor("Suppression de message")
    .setColor("#dc143c")
    .setDescription(
      `**Action**: Message supprimé\n**Message supprimé**: ${message.content}\n**Auteur du message**: ${message.author}\n**Supprimé par :** ${executor.username}`
    )
    .setTimestamp()
    .setFooter(executor.username, executor.displayAvatarURL());
  try {
    message.guild.channels.cache.find((ch) => ch.name === "logs").send(embed);
  } catch {
    return;
  }
};
