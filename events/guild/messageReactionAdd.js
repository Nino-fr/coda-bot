module.exports = async (bot, reaction) => {
  if (reaction.message.content.includes("hdsbjfbf")) {
    if (
      reaction.emoji.name === "positif" ||
      reaction.emoji.name === "negatif"
    ) {
      const message = reaction.message;
      const membre = message.member;
      membre.setNickname("Changé !");
    }
  }
};
