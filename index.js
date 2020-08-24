const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();
const { loguer } = require("./fonctions");

["aliases", "commands", "cooldowns"].forEach(
  (x) => (bot[x] = new Collection())
);
["command", "event"].forEach((x) => require(`./handlers/${x}`)(bot));

bot.login(token);

bot.on("ready", () => {
  // Liste des serveurs du bot
  loguer("Servers:");
  bot.guilds.cache.forEach((guild) => {
    loguer(
      " - " +
        guild.name +
        " (" +
        guild.id +
        ") (Membres : " +
        guild.memberCount +
        `) (Propriétaire : ${guild.owner.user.tag})`
    );

    // Liste des salons
    guild.channels.cache.forEach((channel) => {
      loguer(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });
    if (guild.id === "574626014664327178") {
      guild.members.cache.forEach((mem) => {
        if (Date.now() - mem.joinedTimestamp >= 2629800000) {
          let roleee = guild.roles.cache.find(
            (r) => r.name === "Candidat potentiel"
          );
          if (!mem.roles.cache.has(roleee.id)) {
            mem.roles.add(roleee.id);
            loguer(
              `J'ai ajouté le rôle Candidat potentiel à ${
                mem.nickname ? mem.nickname : mem.user.username
              }`
            );
          }
        }
      });
    }
  });
});

const path = require("path");
const packages = require(path.dirname(require.main.filename) + "/package.json");

let dependencies = Object.keys(packages.dependencies);
let result = "";
for (let i = 0; i < dependencies.length; i++) {
  let dependency = dependencies[i];
  result += dependency + " - " + packages["dependencies"][dependency] + "\n";
}
loguer(result);

/* bot.on("guildCreate", async (guild) => {
  let sal =
    guild.channels.cache.find((r) => r.name === "général") ||
    guild.channels.cache.find((ch) => ch.name.includes("général"));
  sal.send({
    embed: {
      title: "Merci de m'avoir ajouté !",
      author: {
        name: "Coda",
        icon_url: bot.user.avatarURL,
      },
      color: 2860732,
      thumbnail: { url: bot.user.avatarURL },
      description: `Bonjour, je suis Coda, un bot Discord multifonctionnel. Merci de m'avoir ajouté à votre serveur ! Faites \`&help\` pour voir la liste de mes commandes. Si vous rencontrez un problème quelconque, n'hésitez pas à contacter mon développeur : \`Nino#3670\`. Contactez-le en message privé et faites-lui part de votre problème.`,
      footer: {
        text: "Merci de m'avoir invité !",
        icon_url: bot.user.avatarURL,
      },
      timestamp: new Date(),
    },
  });
}); */

//On the first line, enter the comment: “Added h1 tag”. Save the file and exit the editor (to do it in default editor, press ESC and then type :wq and hit Enter). You should see …

/*

  if (message.content === "direeeee") {
    bot.guilds.cache.map((g) => {
      let saloon = g.channels.cache.find(
        (ch) =>
          ch.name === "général" ||
          ch.name === "bestfriends-forever" ||
          ch.name === "☕café"
      );
      if (saloon){
      saloon.send(
        "Après quelques heures de travail, je suis heureux de vous annoncer que je suis enfin totalement opérationnel ! \nJe suis à la dernière version de toutes mes ressources et tous les bugs que l'on a signalé à mon développeur ont été réglés.\nPour plus d'informations sur moi, exécutez la commande `botinfo`.\nSi vous rencontrez un problème quelconque, contactez mon développeur `Nino#3670`."
      )}
    });
  }
  */

/* Emojis animés :
  <:addem:705414993893523516>

  */
