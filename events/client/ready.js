const botconfig = require("../../botconfig.json");
const prefix = botconfig.prefix;

module.exports = (bot) => {
  console.log(`${bot.user.username} est en ligne`);
  // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Ninofr"});

  let statuses = [
    `${bot.users.cache.size} utilisateurs !`,
    prefix + "help",
    `les étoiles`,
  ];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, { type: "WATCHING" });
  }, 5000);
};
