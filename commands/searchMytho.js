const Command = require('../base/Command.js');
const regres = /<li\s+class="result">\s+<article>\s+<h1>\s+<a\s+href="[^"]+"\s+class="result-link"\s+data-pos="\d+"\s+data-page-id="\d+"\s+data-wiki-id="\d+"\s+data-name="[^"]+"\s+data-thumbnail="">[^"<]+<\/a>\s+<\/h1>\s+(?:(?:<span\s+class="searchmatch">[^<]+<\/span>)?[^<]*(?:<span\s+class="searchmatch">[^<]+<\/span>)?[^<]*)+<ul>\s+<li>\s+<a\s+href="[^"]+"\s+class="result-link"\s+data-pos="\d+"\s+data-page-id="\d+"\s+data-wiki-id="\d+"\s+data-name="[^"]*"\s+data-thumbnail="[^"]*"\s+>\s+[^<]+<\/a>\s+<\/li>\s+<\/ul>\s+<\/article>\s+<\/li>/g;
const axios = require('axios');

class SearchMytho extends Command {
  constructor() {
    super({
      name: 'searchMytho',
      description: 'Rechercher sur le wiki mythologie grecque',
      usage: "searchMytho <ce qu'il faut rechercher>",
      aliases: [
        'searchmytho',
        'searchMythologie',
        'searchwikiMytho',
        'searchWikimytho',
        'searchWikiMytho',
      ],
    });
  }

  async run(message, args, level) {
    try {
      let results = [];
      let toSearch = args.join(' ');
      let nbrresults;
      axios.default
        .get(
          `https://mythologiegrecque.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch}`
        )
        .then(async (res) => {
          if (!args)
            return this.repondre(
              message,
              "Veuillez préciser ce qu'il faut rechercher"
            );
          if (toSearch === '')
            return this.repondre(
              message,
              "Veuillez préciser ce qu'il faut rechercher"
            );
          if (
            !/Environ (\d+) résultat/i.test(res.data) &&
            !/Résultats? pour /i.test(res.data)
          )
            return this.repondre(message, 'Aucun résultat trouvé');
          let tableau = await res.data.match(regres);
          tableau.forEach(async (elem) => {
            // let rege = /<li\s+class="result">\s+<article>\s+<h1>\s+<a\s+href="([^"]+)"\s+class="result-link"\s+data-pos="(\d+)"\s+data-page-id="\d+"\s+data-wiki-id="\d+"\s+data-name="[^"]+"\s+data-thumbnail="">([^"<]+)<\/a>\s+<\/h1>\s+(?:(?:<span\s+class="searchmatch">[^<]+<\/span>)?[^<]*(?:<span\s+class="searchmatch">[^<]+<\/span>)?[^<]*)+<ul>\s+<li>\s+<a\s+href="[^"]+"\s+class="result-link"\s+data-pos="\d+"\s+data-page-id="\d+"\s+data-wiki-id="\d+"\s+data-name="[^"]*"\s+data-thumbnail="[^"]*"\s+>\s+[^<]+<\/a>\s+<\/li>\s+<\/ul>\s+<\/article>\s+<\/li>/;
            let rege = /<li\s+class="result">\s+<article>\s+<h1>\s+<a\s+href="([^"]+)"\s+class="result-link"\s+data-pos="(\d+)"\s+data-page-id="\d+"\s+data-wiki-id="\d+"\s+data-name="[^"]+"\s+data-thumbnail="">([^"<]+)<\/a>\s+<\/h1>\s+(?:(?:<span\s+class="searchmatch">[^<]+<\/span>)?[^<]*(?:<span\s+class="searchmatch">[^<]+<\/span>)?[^<]*)+<ul>\s+<li>\s+<a\s+href="[^"]+"\s+class="result-link"\s+data-pos="\d+"\s+data-page-id="\d+"\s+data-wiki-id="\d+"\s+data-name="[^"]*"\s+data-thumbnail="[^"]*"\s+>\s+[^<]+<\/a>\s+<\/li>\s+<\/ul>\s+<\/article>\s+<\/li>/;
            let matched = await elem.match(rege);
            matched.forEach(async (matche) => {
              if (matche.length > 500) return;
              await results.push(matche);
            });
            try {
              nbrresults = res.data.match(/Environ (\d+) résultat/i)[1];
            } catch {
              nbrresults = results.length / 3;
            }
            if (nbrresults === 0) nbrresults = 1;
          });
        })
        .then(async () => {
          let titles = [];
          let positions = [];
          let links = [];
          results.forEach(async (ress) => {
            if (
              [
                2,
                5,
                8,
                11,
                14,
                17,
                20,
                23,
                26,
                29,
                32,
                35,
                38,
                41,
                44,
                47,
                50,
                53,
                56,
                59,
                62,
                65,
                68,
                71,
                74,
              ].includes(results.indexOf(ress))
            ) {
              titles.push(ress);
            } else if (
              [
                1,
                4,
                7,
                10,
                13,
                16,
                19,
                22,
                25,
                28,
                31,
                34,
                37,
                40,
                43,
                46,
                49,
                52,
                55,
                58,
                61,
                64,
                67,
                70,
                73,
              ].includes(results.indexOf(ress))
            ) {
              positions.push(ress);
            } else if (
              [
                0,
                3,
                6,
                9,
                12,
                15,
                18,
                21,
                24,
                27,
                30,
                33,
                36,
                39,
                42,
                45,
                48,
                51,
                54,
                57,
                60,
                63,
                66,
                69,
                72,
              ].includes(results.indexOf(ress))
            ) {
              links.push(ress);
            }
          });
          if (positions.length <= 4 && positions.length !== 0) {
            await this.repondre(message, {
              embed: {
                title: `Résultats de la recherche pour \`${toSearch}\``,
                description: `\`${nbrresults}\` résultat${(positions.length = 1
                  ? ' '
                  : 's')} trouvé${(positions.length = 1 ? ' ' : 's')}`,
                fields: [
                  {
                    name: titles[0],
                    value: `[Voir la page](${
                      links[0]
                    })\n\n**[Voir tous les résultats](https://mythologiegrecque.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch
                      .split(/ +/g)
                      .join('+')})**`,
                  },
                ],
                footer: {
                  text: `Résultat de la recherche sur le wiki Mythologie Grecque`,
                  icon_url: message.author.avatarURL({ format: 'png' }),
                },
                thumbnail: {
                  url:
                    'http://blog.univ-angers.fr/namurdamyths/files/2018/04/MYTHOLOGIE-les-dieux.jpg',
                },
                timestamp: new Date(),
                color: 0x1f75fe,
              },
            });
          } else if (
            8 > positions.length &&
            positions.length >= 5 &&
            positions.length !== 0
          ) {
            await this.repondre(message, {
              embed: {
                title: `Résultats de la recherche pour \`${toSearch}\``,
                description: `Environ \`${nbrresults}\` résultats trouvés`,
                fields: [
                  {
                    name: titles[0],
                    value: `[Voir la page](${links[0]})`,
                  },
                  {
                    name: titles[1],
                    value: `[Voir la page](${links[1]})`,
                  },
                  {
                    name: titles[2],
                    value: `[Voir la page](${links[2]})`,
                  },
                  {
                    name: titles[3],
                    value: `[Voir la page](${links[3]})`,
                  },
                  {
                    name: titles[4],
                    value: `[Voir la page](${
                      links[4]
                    })\n\n**[Voir tous les résultats](https://mythologiegrecque.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch
                      .split(/ +/g)
                      .join('+')})**`,
                  },
                ],
                footer: {
                  text: `Résultats de la recherche sur le wiki Mythologie Grecque`,
                  icon_url: message.author.avatarURL({ format: 'png' }),
                },
                thumbnail: {
                  url:
                    'http://blog.univ-angers.fr/namurdamyths/files/2018/04/MYTHOLOGIE-les-dieux.jpg',
                },
                timestamp: new Date(),
                color: 0x1f75fe,
              },
            });
          } else if (8 <= positions.length && positions.length !== 0) {
            await this.repondre(message, {
              embed: {
                title: `Résultats de la recherche pour \`${toSearch}\``,
                description: `Environ \`${nbrresults}\` résultats trouvés`,
                fields: [
                  {
                    name: titles[0],
                    value: `[Voir la page](${links[0]})`,
                  },
                  {
                    name: titles[1],
                    value: `[Voir la page](${links[1]})`,
                  },
                  {
                    name: titles[2],
                    value: `[Voir la page](${links[2]})`,
                  },
                  {
                    name: titles[3],
                    value: `[Voir la page](${links[3]})`,
                  },
                  {
                    name: titles[4],
                    value: `[Voir la page](${links[4]})`,
                  },
                  {
                    name: titles[5],
                    value: `[Voir la page](${links[5]})`,
                  },
                  {
                    name: titles[6],
                    value: `[Voir la page](${links[6]})`,
                  },
                  {
                    name: titles[7],
                    value: `[Voir la page](${
                      links[7]
                    })\n\n**[Voir tous les résultats](https://mythologiegrecque.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch
                      .split(/ +/g)
                      .join('+')})**`,
                  },
                ],
                footer: {
                  text: `Résultats de la recherche sur le wiki Mythologie Grecque`,
                  icon_url: message.author.avatarURL({ format: 'png' }),
                },
                thumbnail: {
                  url:
                    'http://blog.univ-angers.fr/namurdamyths/files/2018/04/MYTHOLOGIE-les-dieux.jpg',
                },
                timestamp: new Date(),
                color: 0x1f75fe,
              },
            });
          }
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = SearchMytho;
