const Command = require('../base/Command.js');
const base = /<div\sclass="unified-search__layout__main">\s+<p\sclass="unified-search__results__count">\s+(?:Environ)?\s\d+\srésultats?\spour\s<strong>[^<]+<\/strong>\s+<\/p>\s+\s+<ul\sclass="unified-search__results">\s+<li\sclass="[^"]+">\s+<article>\s+<h1>\s+<a\shref="[^"]+"\s+class="[^"]+"\s+data-wiki-id="\d+"\sdata-page-id="\d+"\sdata-title="[^"]+"\sdata-thumbnail="[^"]+"\sdata-position="\d+">[^<]+<\/a>\s*<\/h1>\s+<div\sclass="[^"]+">\s+((?:<span\sclass="searchmatch">[^<]+<\/span>)?[^<]+)+<\/div>\s+<div>\s+<a\shref="[^"]+"\s+\sclass="[^"]+"\s+data-wiki-id="\d+"\sdata-page-id="\d+"\sdata-title="[^"]+"\sdata-thumbnail="[^"]+"\sdata-position="\d+">\s*[^<]+<\/a>\s+<\/div>\s+<\/article>\s+<\/li>\s+/;
const regres = /<li\sclass="[^"]+">\s+<article>\s+<h1>\s+<a\shref="[^"]+"\s+class="[^"]+"\s+data-wiki-id="\d+"\sdata-page-id="\d+"\sdata-title="[^"]+"\sdata-thumbnail="[^"]+"\sdata-position="\d+">[^<]+<\/a>\s*<\/h1>\s+<div\sclass="[^"]+">\s+((?:<span\sclass="searchmatch">[^<]+<\/span>)?[^<]+)+<\/div>\s+<div>\s+<a\shref="[^"]+"\s+\sclass="[^"]+"\s+data-wiki-id="\d+"\sdata-page-id="\d+"\sdata-title="[^"]+"\sdata-thumbnail="[^"]+"\sdata-position="\d+">\s*[^<]+<\/a>\s+<\/div>\s+<\/article>\s+<\/li>/g;
const axios = require('axios');

class SearchGDCP extends Command {
  constructor() {
    super({
      name: 'searchGDCP',
      description: 'Rechercher sur le wiki GDCP',
      usage: "searchGDCP <ce qu'il faut rechercher>",
      aliases: [
        'searchwiki',
        'searchgdcp',
        'searchwikiGDCP',
        'searchWikiGDCP',
        'searchWikigdcp',
      ],
      category: 'Gardiens des cités perdues',
    });
  }

  async run(message, args, level) {
    try {
      if (!args)
        return this.repondre(
          message,
          "Veuillez préciser ce qu'il faut rechercher"
        );
      let results = [];
      let toSearch = args.join(' ');
      if (toSearch === '')
        return this.repondre(
          message,
          "Veuillez préciser ce qu'il faut rechercher"
        );
      let nbrresults;
      axios.default
        .get(
          `https://gardiens-des-cites-perdue.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch}&scope=internal&ns%5B0%5D=0`
        )
        .then(async (res) => {
          if (
            !/Environ (\d+) résultat/i.test(res.data) &&
            !/Résultats? pour /i.test(res.data)
          )
            return this.repondre(message, 'Aucun résultat trouvé');
          let tableau = await res.data.match(regres);
          tableau.forEach(async (elem) => {
            let rege = /<li\sclass="[^"]+">\s+<article>\s+<h1>\s+<a\shref="([^"]+)"\s+class="[^"]+"\s+data-wiki-id="\d+"\sdata-page-id="\d+"\sdata-title="([^"]+)"\sdata-thumbnail="([^"]+)"\sdata-position="\d+">[^<]+<\/a>\s*<\/h1>\s+<div\sclass="[^"]+">\s+(?:(?:<span\sclass="searchmatch">[^<]+<\/span>)?[^<]+)+/;
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
          let links = [];
          results.forEach(async (ress) => {
            /* if (
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
            } else */

            if (
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
              titles.push(ress);
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
          if (titles.length <= 4 && titles.length !== 0) {
            await this.repondre(message, {
              embed: {
                title: `Résultats de la recherche pour \`${toSearch}\``,
                description: `\`${nbrresults}\` résultat${(titles.length = 1
                  ? ' '
                  : 's')} trouvé${(titles.length = 1 ? ' ' : 's')}`,
                fields: [
                  {
                    name: this.client.correctString(titles[0]),
                    value: `[Voir la page](${
                      links[0]
                    })\n\n**[Voir tous les résultats](https://gardiens-des-cites-perdue.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch
                      .split(/ +/g)
                      .join('+')})**`,
                  },
                ],
                footer: {
                  text: `Résultat de la recherche sur le wiki GDCP`,
                  icon_url: message.author.avatarURL({ format: 'png' }),
                },
                thumbnail: {
                  url:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/f/f7/Sophie_Foster_.jpg/revision/latest?cb=20170806113107&path-prefix=fr',
                },
                timestamp: new Date(),
                color: 0x1f75fe,
              },
            });
          } else if (
            8 > titles.length &&
            titles.length >= 5 &&
            titles.length !== 0
          ) {
            await this.repondre(message, {
              embed: {
                title: `Résultats de la recherche pour \`${toSearch}\``,
                description: `Environ \`${nbrresults}\` résultats trouvés`,
                fields: [
                  {
                    name: this.client.correctString(titles[0]),
                    value: `[Voir la page](${links[0]})`,
                  },
                  {
                    name: this.client.correctString(titles[1]),
                    value: `[Voir la page](${links[1]})`,
                  },
                  {
                    name: this.client.correctString(titles[2]),
                    value: `[Voir la page](${links[2]})`,
                  },
                  {
                    name: this.client.correctString(titles[3]),
                    value: `[Voir la page](${links[3]})`,
                  },
                  {
                    name: this.client.correctString(titles[4]),
                    value: `[Voir la page](${
                      links[4]
                    })\n\n**[Voir tous les résultats](https://gardiens-des-cites-perdue.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch
                      .split(/ +/g)
                      .join('+')})**`,
                  },
                ],
                footer: {
                  text: `Résultats de la recherche sur le wiki GDCP`,
                  icon_url: message.author.avatarURL({ format: 'png' }),
                },
                thumbnail: {
                  url:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/f/f7/Sophie_Foster_.jpg/revision/latest?cb=20170806113107&path-prefix=fr',
                },
                timestamp: new Date(),
                color: 0x1f75fe,
              },
            });
          } else if (8 <= titles.length && titles.length !== 0) {
            await this.repondre(message, {
              embed: {
                title: `Résultats de la recherche pour \`${toSearch}\``,
                description: `Environ \`${nbrresults}\` résultats trouvés`,
                fields: [
                  {
                    name: this.client.correctString(titles[0]),
                    value: `[Voir la page](${links[0]})`,
                  },
                  {
                    name: this.client.correctString(titles[1]),
                    value: `[Voir la page](${links[1]})`,
                  },
                  {
                    name: this.client.correctString(titles[2]),
                    value: `[Voir la page](${links[2]})`,
                  },
                  {
                    name: this.client.correctString(titles[3]),
                    value: `[Voir la page](${links[3]})`,
                  },
                  {
                    name: this.client.correctString(titles[4]),
                    value: `[Voir la page](${links[4]})`,
                  },
                  {
                    name: this.client.correctString(titles[5]),
                    value: `[Voir la page](${links[5]})`,
                  },
                  {
                    name: this.client.correctString(titles[6]),
                    value: `[Voir la page](${links[6]})`,
                  },
                  {
                    name: this.client.correctString(titles[7]),
                    value: `[Voir la page](${
                      links[7]
                    })\n\n**[Voir tous les résultats](https://gardiens-des-cites-perdue.fandom.com/fr/wiki/Sp%C3%A9cial:Recherche?query=${toSearch
                      .split(/ +/g)
                      .join('+')})**`,
                  },
                ],
                footer: {
                  text: `Résultats de la recherche sur le wiki GDCP`,
                  icon_url: message.author.avatarURL({ format: 'png' }),
                },
                thumbnail: {
                  url:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/f/f7/Sophie_Foster_.jpg/revision/latest?cb=20170806113107&path-prefix=fr',
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

module.exports = SearchGDCP;
