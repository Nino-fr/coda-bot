// Cet événement a lieu quand le bot est lancé.

const { client } = require('../index.js');

module.exports = class {
  constructor() {
    this.client = client;
  }

  async run() {
    // Attendons un peu avant d'exécuter le code pour laisser au bot le temps de se lancer complètement
    await this.client.wait(1000);

    // This loop ensures that client.appInfo always contains up to date data
    // about the app's status. This includes whether the bot is public or not,
    // its description, owner, etc. Used for the dashboard amongs other things.
    this.client.appInfo = await this.client.fetchApplication();
    setInterval(async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    if (!this.client.settings.has('default')) {
      if (!this.client.config.defaultSettings)
        throw new Error(
          "defaultSettings n'est pas preset dans config.js ou dans les settings. Le bot ne peut pas load ça."
        );
      this.client.settings.set('default', this.client.config.defaultSettings);
    }

    // Initialisons le statut du bot
    await this.client.user.setActivity(
      `${this.client.settings.get('default').prefix}help | ${
        this.client.users.cache.size
      } utilisateurs`
    );
    this.client.logger.log(`${this.client.commands.size} commandes`, 'log');

    // Mettre un message en console qui indique que le bot est prêt.
    this.client.logger.log(
      `${this.client.user.tag}, prêt à servir ${this.client.users.cache.size} utilisateurs dans ${this.client.guilds.cache.size} serveurs.`,
      'ready'
    );
    // Vérifier que les pseudos des membres du serveur "Les cités perdues" sont convenables.
    this.client.guilds.cache
      .get('574626014664327178')
      .members.cache.forEach(async (member) => {
        let regGDCP = /(?:(?:f+i+t+z+)|(?:k+e+f+e+)|(?:s+[yi]+l+v+e+n+[iy]+)|(?:g+r+a+d+y+)|(?:e+d+a+l+i+n+e+)|(?:d+e+l+l+a+)|(?:a+l+d+e+n+))/gi;
        if (
          regGDCP.test(member.nickname ? member.nickname : member.user.username)
        ) {
          if (member.user.bot) return;
          await member.setNickname('Pseudo à changer');
          member.guild.channels.cache
            .find((ch) => ch.name === 'logs')
            .send(
              `Le pseudo de <@${member.id}> a été changé de ${member.user.username} en ${member.nickname} car il contenait plusieurs caractères non autorisés.`
            );
        }
      });
    const initDatabases = async () => {
      const fs = require('fs');
      const papotins = await JSON.parse(
        fs.readFileSync('./databases/papotins.json')
      );
      console.log(papotins);
      for (const [key, value] of Object.entries(papotins)) {
        client.papotins.set(key, {
          epingles: value.epingles,
          boost: value.boost,
          lastUpdate: new Date(),
        });
      }

      console.log(client.papotins);
    };
    initDatabases();
    this.client.logger.log(`Bases de données initialisées !`);
  }
};
