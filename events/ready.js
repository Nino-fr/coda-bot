// Cet événement a lieu quand le bot est lancé.

const { client } = require('../index.js');

module.exports = class {
  constructor() {
    this.client = client;
  }

  async run() {
    // Attendons un peu avant d'exécuter le code pour laisser au bot le temps de se lancer complètement
    await this.client.wait(1000);

    if (!this.client.settings.has('main')) {
      this.client.settings.set('main', this.client.config.settings);
    }

    // Initialisons le statut du bot
    await this.client.user.setActivity(
      `${this.client.settings.get('main').prefix}help | ${
        this.client.guilds.cache.get('574626014664327178').memberCount +
        this.client.guilds.cache.get('707875749343789066').memberCount
      } utilisateurs`
    );
    this.client.user.setStatus('idle');
    this.client.logger.log(`${this.client.commands.size} commandes`, 'log');

    // Mettre un message en console qui indique que le bot est prêt.
    this.client.logger.log(
      `${this.client.user.tag}, prêt à servir ${
        this.client.guilds.cache.get('574626014664327178').memberCount +
        this.client.guilds.cache.get('707875749343789066').memberCount
      } utilisateurs dans ${this.client.guilds.cache.size} serveurs.`,
      'ready'
    );
    // Vérifier que les pseudos des membres du serveur "Les cités perdues" sont convenables.
    this.client.guilds.cache
      .get('574626014664327178')
      .members.fetch()
      .then((mems) =>
        mems.forEach(async (member) => {
          let regGDCP = /(?:(?:f+i+t+z+)|(?:k+e+f+e+)|(?:s+[yi]+l+v+e+n+[iy]+)|(?:g+r+a+d+y+)|(?:e+d+a+l+i+n+e+)|(?:d+e+l+l+a+)|(?:a+l+d+e+n+))/gi;
          if (
            regGDCP.test(
              member.nickname ? member.nickname : member.user.username
            )
          ) {
            let oldnick = member.nickname
              ? member.nickname
              : member.user.username;
            if (member.user.bot) return;
            await member.setNickname('Pseudo à changer');
            member.guild.channels.cache
              .find((ch) => ch.name === 'logs')
              .send(
                `Le pseudo de <@${member.id}> a été changé de ${oldnick} en ${member.nickname} car il contenait un nom d'un personnage de GDCP.`
              );
          }
        })
      );
  }
};
