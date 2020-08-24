module.exports = async (user) => {
  let wChannel = user.guild.channels.cache.find(
    (r) => r.name === "bienvenue" || r.name === "bois-des-errants🌳"
  );
  wChannel.send(`Oh non ! ${user} a quitté le serveur...`);
};
