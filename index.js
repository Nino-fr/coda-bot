const { Client, Collection } = require('discord.js');
const { token } = require('./botconfig.json');
const bot = new Client();
const { loguer } = require('./fonctions');

['aliases', 'commands', 'cooldowns'].forEach(
  (x) => (bot[x] = new Collection())
);
['command', 'event'].forEach((x) => require(`./handlers/${x}`)(bot));

bot.login(token);

bot.on('ready', () => {
  // Liste des serveurs du bot
  loguer('Servers:');
  bot.guilds.cache.forEach((guild) => {
    loguer(
      ' - ' +
        guild.name +
        ' (' +
        guild.id +
        ') (Membres : ' +
        guild.memberCount +
        `) (Propriétaire : ${guild.owner.user.tag})`
    );

    // Liste des salons
    guild.channels.cache.forEach((channel) => {
      loguer(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });
    if (guild.id === '574626014664327178') {
      guild.members.cache.forEach((mem) => {
        if (Date.now() - mem.joinedTimestamp >= 2629800000) {
          let roleee = guild.roles.cache.find(
            (r) => r.name === 'Candidat potentiel'
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

const path = require('path');
const packages = require(path.dirname(require.main.filename) + '/package.json');

let dependencies = Object.keys(packages.dependencies);
let result = '';
for (let i = 0; i < dependencies.length; i++) {
  let dependency = dependencies[i];
  result += dependency + ' - ' + packages['dependencies'][dependency] + '\n';
}
loguer(result);
