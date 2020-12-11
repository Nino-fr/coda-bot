const Command = require('../base/Command.js');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

class News extends Command {
  constructor() {
    super({
      name: 'news',
      description: "Donne les actualités d'un pays au choix",
      usage: 'news <initiales du pays (Exemple : France = fr)>',
      aliases: ['actu', 'nouvelles'],
    });
  }

  async run(message, args, level) {
    const newDate = new Date().toLocaleDateString().replace(/\//g, '-');
    let day = newDate.match(/\d+/);
    let year = newDate.match(/(?<=-)\d{4}/);
    let month = newDate.match(/(?<=-)\d{2}/);
    let date = [year, month, day].join('-');
    const newsLink = `http://newsapi.org/v2/top-headlines?from=${date}&sortBy=popularity&country=${args[0]}&apiKey=168d6360f85749908e5849d4e4f1aff4`;
    try {
      await axios.default.get(newsLink).then(async (res) => {
        let data = JSON.parse(JSON.stringify(res.data));
        let totalResults;
        try {
          if (data.totalResults === 0)
            return this.repondre(message, 'Erreur 404 : Not found');
          totalResults = data.totalResults;
          let actu = data.articles[Math.floor(Math.random() * totalResults)];
          /* message.channel.send(
              `__**Actualité en France :**__\n\n**Source :** ${actu.source.name}\n**Auteur de l'article :** ${actu.author}\n\n**[${actu.title}](${actu.url})**\n${actu.content}`,
              { files: [actu.urlToImage] }
            ); */
          let newsEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`__**Actualité pour le pays \`${args[0]}\` :**__`)
            .setDescription(
              `\n**[${actu.title ? actu.title : 'Titre indéfini'}](${
                actu.url
              })**\n${actu.content.replace(
                /\[\+\d+ chars\]/,
                ''
              )}\n\n**Source :** ${
                actu.source.name
              }\n**Auteur de l'article :** ${
                actu.author !== null ? actu.author : 'Aucun'
              }`
            )
            .setImage(actu.urlToImage)
            .setFooter(actu.publishedAt.replace('T', ' ').replace('Z', ''));
          message.channel.send(newsEmbed);
        } catch {
          try {
            if (data.totalResults === 0)
              return this.repondre(message, 'Erreur 404 : Not found');
            totalResults = data.totalResults;
            let actu = data.articles[Math.floor(Math.random() * totalResults)];
            let newsEmbed = new MessageEmbed()
              .setColor('RANDOM')
              .setTitle(`__**Actualité pour le pays \`${args[0]}\` :**__`)
              .setDescription(
                `\n**[${actu.title ? actu.title : 'Titre indéfini'}](${
                  actu.url
                })**\n${actu.content.replace(
                  /\[\+\d+ chars\]/,
                  ''
                )}\n\n**Source :** ${
                  actu.source.name
                }\n**Auteur de l'article :** ${
                  actu.author !== null ? actu.author : 'Aucun'
                }`
              )
              .setImage(actu.urlToImage)
              .setFooter(actu.publishedAt.replace('T', ' ').replace('Z', ''));
            message.channel.send(newsEmbed);
          } catch {
            try {
              if (data.totalResults === 0)
                return this.repondre(message, 'Erreur 404 : Not found');
              totalResults = data.totalResults;
              let actu =
                data.articles[Math.floor(Math.random() * totalResults)];
              /* message.channel.send(
                  `__**Actualité en France :**__\n\n**Source :** ${actu.source.name}\n**Auteur de l'article :** ${actu.author}\n\n**[${actu.title}](${actu.url})**\n${actu.content}`,
                  { files: [actu.urlToImage] }
                ); */
              let newsEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`__**Actualité pour le pays \`${args[0]}\` :**__`)
                .setDescription(
                  `\n**[${actu.title ? actu.title : 'Titre indéfini'}](${
                    actu.url
                  })**\n${actu.content.replace(
                    /\[\+\d+ chars\]/,
                    ''
                  )}\n\n**Source :** ${
                    actu.source.name
                  }\n**Auteur de l'article :** ${
                    actu.author !== null ? actu.author : 'Aucun'
                  }`
                )
                .setImage(actu.urlToImage)
                .setFooter(actu.publishedAt.replace('T', ' ').replace('Z', ''));
              message.channel.send(newsEmbed);
            } catch {
              try {
                if (data.totalResults === 0)
                  return this.repondre(message, 'Erreur 404 : Not found');
                totalResults = data.totalResults;
                let actu =
                  data.articles[Math.floor(Math.random() * totalResults)];
                let newsEmbed = new MessageEmbed()
                  .setColor('RANDOM')
                  .setTitle(`__**Actualité pour le pays \`${args[0]}\` :**__`)
                  .setDescription(
                    `\n**[${actu.title ? actu.title : 'Titre indéfini'}](${
                      actu.url
                    })**\n${actu.content.replace(
                      /\[\+\d+ chars\]/,
                      ''
                    )}\n\n**Source :** ${
                      actu.source.name
                    }\n**Auteur de l'article :** ${
                      actu.author !== null ? actu.author : 'Aucun'
                    }`
                  )
                  .setImage(actu.urlToImage)
                  .setFooter(
                    actu.publishedAt.replace('T', ' ').replace('Z', '')
                  );
                message.channel.send(newsEmbed);
              } catch {
                try {
                  if (data.totalResults === 0)
                    return this.repondre(message, 'Erreur 404 : Not found');
                  totalResults = data.totalResults;
                  let actu =
                    data.articles[Math.floor(Math.random() * totalResults)];
                  /* message.channel.send(
                      `__**Actualité en France :**__\n\n**Source :** ${actu.source.name}\n**Auteur de l'article :** ${actu.author}\n\n**[${actu.title}](${actu.url})**\n${actu.content}`,
                      { files: [actu.urlToImage] }
                    ); */
                  let newsEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`__**Actualité pour le pays \`${args[0]}\` :**__`)
                    .setDescription(
                      `\n**[${actu.title ? actu.title : 'Titre indéfini'}](${
                        actu.url
                      })**\n${actu.content.replace(
                        /\[\+\d+ chars\]/,
                        ''
                      )}\n\n**Source :** ${
                        actu.source.name
                      }\n**Auteur de l'article :** ${
                        actu.author !== null ? actu.author : 'Aucun'
                      }`
                    )
                    .setImage(actu.urlToImage)
                    .setFooter(
                      actu.publishedAt.replace('T', ' ').replace('Z', '')
                    );
                  message.channel.send(newsEmbed);
                } catch {
                  if (data.totalResults === 0)
                    return this.repondre(message, 'Erreur 404 : Not found');
                  totalResults = data.totalResults;
                  let actu =
                    data.articles[Math.floor(Math.random() * totalResults)];
                  let newsEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`__**Actualité pour le pays \`${args[0]}\` :**__`)
                    .setDescription(
                      `\n**[${actu.title ? actu.title : 'Titre indéfini'}](${
                        actu.url
                      })**\n${actu.content.replace(
                        /\[\+\d+ chars\]/,
                        ''
                      )}\n\n**Source :** ${
                        actu.source.name
                      }\n**Auteur de l'article :** ${
                        actu.author !== null ? actu.author : 'Aucun'
                      }`
                    )
                    .setImage(actu.urlToImage)
                    .setFooter(
                      actu.publishedAt.replace('T', ' ').replace('Z', '')
                    );
                  message.channel.send(newsEmbed);
                }
                return this.repondre(
                  message,
                  'Une erreur est survenue, veuillez réessayer.'
                );
              }
            }
          }
        }
      });
    } catch (err) {
      message.channel.send('Une erreur est survenue, veuillez réessayer.');
    }
  }
}

module.exports = News;
