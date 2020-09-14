const Command = require('../base/Command.js'),
  { Message, MessageEmbed } = require('discord.js'),
  axios = require('axios'),
  regex = /<li\s*class="[^"]+">\s*<a\s*href="\/fr\/wiki\/[^"]+">\s*<figure>\s*<img\s*src="[^"]+"\s*srcset="[^"]+"\s*sizes="[^"]+"\s*alt="[^"]+"\s*class="[^"]+"\s*>\s*<figcaption\s*class="category-page__trending-page-title">[^<]+/gi,
  scndreg = /<li\s*class="[^"]+">\s*<a\s*href="(\/fr\/wiki\/[^"]+)">\s*<figure>\s*<img\s*src="([^"]+)"\s*srcset="[^"]+"\s*sizes="[^"]+"\s*alt="[^"]+"\s*class="[^"]+"\s*>\s*<figcaption\s*class="category-page__trending-page-title">([^<]+)/i;

class Categorie extends Command {
  constructor() {
    super({
      name: 'tendances',
      description: 'Donne la liste des tendances dans une catégorie spécifique',
      usage: 'tendances <nom de la catégorie>',
      aliases: ['tendance'],
      category: 'Gardiens des Cités perdues',
    });
  }

  /**
   *
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    try {
      let cat = args.join('').toLowerCase();
      if (cat.trim().match(/p+e+r+s+o+n+a+g+e*s*/)) cat = 'personnages';
      if (cat.trim().match(/l+i+e+u+x*/)) cat = 'lieux';
      if (cat.trim().match(/t+h+[ée]+o+r+i+e*s*/)) cat = 'théories';
      if (cat.trim().match(/t+a+l+[ea]+n+t*/)) cat = 'talent';
      if (cat.trim().match(/t+o+m+e*s*/)) cat = 'tomes';
      if (cat.trim().match(/c+o+m+p+a+g*n+i*o+n+s*/)) cat = 'compagnon';
      if (cat.trim().match(/f+a+n+/)) cat = 'fanart';
      const embed = new MessageEmbed()
        .setDescription(
          `**Pages en tendances dans la catégorie [${cat.correctCase()}](https://gardiens-des-cites-perdue.fandom.com/fr/wiki/Cat%C3%A9gorie:${cat})**`
        )
        .setColor('RANDOM');
      switch (cat) {
        case 'personnages':
          embed.setThumbnail(
            'https://shannonmessenger.com/wp-content/uploads/2018/02/SM-Characters-FullSize.jpg'
          );
          break;

        case 'lieux':
          embed.setThumbnail(
            'https://em.wattpad.com/e6c5d6a332c86e125c420432bb10cf7fca809459/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f68666d50684850376451317159673d3d2d3633333731323635352e313535363663623634323661366165323833383332383831393431342e6a7067?s=fit&w=720&h=720.png'
          );
          break;

        case 'théories':
          embed.setThumbnail(this.client.user.avatarURL({ format: 'png' }));
          break;

        case 'talent':
          embed.setThumbnail(
            'https://static.wikia.nocookie.net/gardiens-des-cites-perdue/images/6/60/Talents.jpg/revision/latest/scale-to-width-down/300?cb=20190210114216&path-prefix=fr'
          );
          break;

        case 'tomes':
          embed.setThumbnail(
            'https://vignette.wikia.nocookie.net/lost-cities-keeper/images/d/d4/770CB1E3-2508-4B01-8705-8FF25EC916D7.jpeg/revision/latest/top-crop/width/220/height/220?cb=20191223210018'
          );
          break;

        case 'compagnon':
          embed.setThumbnail(
            'https://shannonmessenger.com/wp-content/uploads/2018/02/SM-Characters-FullSize.jpg'
          );
          break;

        case 'fanart':
          embed.setThumbnail(
            'https://em.wattpad.com/420762571530a6ec75c6d86095d0ab10fffdbfb8/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4471746f4b3372616434644f6d673d3d2d3738313733393435382e313563323464386539613263616232393937333733373234393839382e706e67?s=fit&w=720&h=720'
          );
          break;

        default:
          return message.channel.send(
            'Aucune catégorie de ce nom trouvée, veuillez réessayer avec un autre nom.\nLes noms sont : Personnages, Lieux, Théories, Talent, Tomes, Compagnon et Fanart'
          );
      }

      const res = await axios.default.get(
        `https://gardiens-des-cites-perdue.fandom.com/fr/wiki/Cat%C3%A9gorie:${cat.replace(
          /é/,
          '%C3%A9'
        )}`
      );
      const arr = await res.data.match(regex);
      if (!arr || arr.length === 0)
        return message.channel.send(
          'Une erreur est survenue, veuillez réessayer'
        );
      await arr.forEach(async (elem) => {
        let matched;
        typeof elem === 'string'
          ? (matched = elem.match(scndreg))
          : (matched = elem.toString().match(scndreg));
        matched.shift();
        let link = 'https://gardiens-des-cites-perdue.fandom.com' + matched[0];
        let title = matched[2];
        embed.fields.push({
          name: title,
          value: `[Article](${link})`,
          inline: false,
        });
      });

      message.channel.send(embed);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Categorie;
