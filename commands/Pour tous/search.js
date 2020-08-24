const { prefix } = require("../../botconfig.json");
const axios = require("axios");

module.exports = {
  config: {
    name: "searchwattpad",
    description: "Rechercher une histoire sur wattpad",
    usage: prefix + "searchwattpad Le nom de l'histoire",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["recherche", "rechercher", "searchw"],
  },
  run: async (bot, message, args) => {
    console.log(
      `Commande searchWattpad exécutée dans le serveur ${message.guild.name}`
    );
    /* let wattyurl = `https://www.wattpad.com/search/${storyName.replace(
      / +/g,
      "%20"
    )}`;
     */

    let storyName = args.join(" ");
    let wattyurl = `https://www.wattpad.com/search/${storyName
      .replace(/[éèêë]/g, "e")
      .replace(/[îïíì]/g, "i")
      .replace(/[ôöóò]/g, "o")
      .replace(/[ûúùü]/g, "u")
      .replace(/ÿý/g, "y")
      .replace(/ç/g, "c")
      .replace(/ /g, "%20")}`;
    axios.default
      .get(wattyurl)
      .then(async (res) => {
        let resultsCount = await res.data.match(
          /(?<="data":{"total":)(\d+)(?=,"stories")/
        )[0];
        /* let infos = await res.data.match(
          /\{"id":"\d+","title":".(?!,"description")+","description":".(?!,"user")+","user":\{"name":".(?!\},"completed")+"\},"completed":(?:(?:true)|(?:false)),"numParts":\d{1,3},"lastPublishedPart":{"createDate":"(?:\d|\-|\s)+"},"voteCount":\d{1,3}K?,"readCount":\d{1,3}K?,"commentCount":\d{1,4}K?,"cover":".(?!,"mature")+","mature":(?:(?:true)|(?:false)),"url":".(?!,"tags")+","tags":\[?(?:".(?!,")*",)*\]?,"isPaywalled":(?:(?:true)|(?:false)),"tagMeta":{"tags":\[?(?:".(?!,")*",)*\]?,"storyId":"\d+","numShown":\d+},"reactName":".(?!\})+"\},/g
        );
         */
        let infos = await res.data.match(/"id":(?:.(?!,\{"id":"\d+"))+/g);
        if (resultsCount < 8) {
          let firstName = await infos[0].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let firstId = await infos[0].match(
            /(?<="id":")\d+(?!,"description")/
          );
          if (resultsCount === 0 || firstId === null) {
            return message.channel.send("Aucun résultat trouvé.");
          }
          let desc1 = await infos[0].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let link1 = await infos[0].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          message.channel.send({
            embed: {
              title: `Résultat de la recherche Wattpad pour \`${storyName}\``,
              fields: [
                {
                  name: `${firstName}`,
                  value: `**ID :** ${firstId}\n**Description :** ${
                    desc1
                      ? desc1.toString().replace(/\\n/g, " ").length >= 400
                        ? desc1.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc1.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link1})\n\n[Voir plus de résultats](${wattyurl})`,
                },
              ],
              color: 16748341,
              thumbnail: {
                url:
                  "https://www.underconsideration.com/brandnew/archives/wattpad_logo_stacked.png",
              },

              footer: {
                text: `Nombre de résultats trouvés : ${resultsCount}`,
              },
            },
          });
        } else {
          let firstName = await infos[0].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let scndName = await infos[1].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let thirdName = await infos[2].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let fourthName = await infos[3].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let fifthName = await infos[4].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let sixthName = await infos[5].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let seventhName = await infos[6].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );
          let eighthName = await infos[7].match(
            /(?<="title":")(?:.(?!,"description"))+/
          );

          let firstId = await infos[0].match(
            /(?<="id":")\d+(?!,"description")/
          );
          let scndId = await infos[1].match(/(?<="id":")\d+(?!,"description")/);
          let thirdId = await infos[2].match(
            /(?<="id":")\d+(?!,"description")/
          );
          let fourthId = await infos[3].match(
            /(?<="id":")\d+(?!,"description")/
          );
          let fifthId = await infos[4].match(
            /(?<="id":")\d+(?!,"description")/
          );
          let sixthId = await infos[5].match(
            /(?<="id":")\d+(?!,"description")/
          );
          let seventhId = await infos[6].match(
            /(?<="id":")\d+(?!,"description")/
          );
          let eighthId = await infos[7].match(
            /(?<="id":")\d+(?!,"description")/
          );

          // let listeId = await res.data.match(/(?<="id":")(\d+)(?=")/g).slice(1);
          /* let listeNames = await res.data
            .match(
              /(?<="title":")((?:\w|\s|\d|'|"(?!,")|é|è|ê|:|\.|!|;|\?|&|à|ç|§|\/|\*|µ|ù|\(|\)|\[|\]|\^|\$|&|£|%|´|`|=|,|<|>|\\|°|¨|\||\+)+)(?=")/g
            )
            .slice(1);
   */
          /* let listeURL = await res.data.match(
            /(?<="url":")(\w+|\d+|\-+|\/+|\.+|\\+|:+)+/g
          ); */
          let link1 = await infos[0].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          let link2 = await infos[1].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          let link3 = await infos[2].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          let link4 = await infos[3].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          let link5 = await infos[4].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          let link6 = await infos[5].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          let link7 = await infos[6].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );
          let link8 = await infos[7].match(
            /(?<="url":")(?:\w+|\d+|\-+|\/+|\.+|\\+|:+)+/
          );

          /* let listeDesc = await res.data
            .match(/(?<="title":")(.(?!,"user"))/g)
            .slice(1); */
          let desc1 = await infos[0].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let desc2 = await infos[1].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let desc3 = await infos[2].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let desc4 = await infos[3].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let desc5 = await infos[4].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let desc6 = await infos[5].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let desc7 = await infos[6].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );
          let desc8 = await infos[7].match(
            /(?<="description":")(?:.(?!,"user"))+/
          );

          message.channel.send({
            embed: {
              title: `Résultat de la recherche Wattpad pour \`${storyName}\``,
              fields: [
                {
                  name: `${firstName}`,
                  value: `**ID :** ${firstId}\n**Description :** ${
                    desc1
                      ? desc1.toString().replace(/\\n/g, " ").length >= 400
                        ? desc1.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc1.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link1})`,
                },
                {
                  name: `${scndName}`,
                  value: `**ID :** ${scndId}\n**Description :** ${
                    desc2
                      ? desc2.toString().replace(/\\n/g, " ").length >= 400
                        ? desc2.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc2.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link2})`,
                },
                {
                  name: `${thirdName}`,
                  value: `**ID :** ${thirdId}\n**Description :** ${
                    desc3
                      ? desc3.toString().replace(/\\n/g, " ").length >= 400
                        ? desc3.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc3.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link3})`,
                },
                {
                  name: `${fourthName}`,
                  value: `**ID :** ${fourthId}\n**Description :** ${
                    desc4
                      ? desc4.toString().replace(/\\n/g, " ").length >= 400
                        ? desc4.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc4.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link4})`,
                },
                {
                  name: `${fifthName}`,
                  value: `**ID :** ${fifthId}\n**Description :** ${
                    desc5
                      ? desc5.toString().replace(/\\n/g, " ").length >= 400
                        ? desc5.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc5.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link5})`,
                },
                {
                  name: `${sixthName}`,
                  value: `**ID :** ${sixthId}\n**Description :** ${
                    desc6
                      ? desc6.toString().replace(/\\n/g, " ").length >= 400
                        ? desc6.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc6.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link6})`,
                },
                {
                  name: `${seventhName}`,
                  value: `**ID :** ${seventhId}\n**Description :** ${
                    desc7
                      ? desc7.toString().replace(/\\n/g, " ").length >= 400
                        ? desc7.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc7.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link7})`,
                },
                {
                  name: `${eighthName}`,
                  value: `**ID :** ${eighthId}\n **Description :** ${
                    desc8
                      ? desc8.toString().replace(/\\n/g, " ").length >= 400
                        ? desc8.toString().replace(/\\n/g, " ").substr(0, 400) +
                          " [...]"
                        : desc8.toString().replace(/\\n/g, " ")
                      : "Indisponible"
                  }\n[Lire l'histoire](${link8})\n\n[Voir tous les résultats de recherche](${wattyurl})`,
                },
              ],
              color: 16748341,
              thumbnail: {
                url:
                  "https://www.underconsideration.com/brandnew/archives/wattpad_logo_stacked.png",
              },

              footer: {
                text: `Nombre de résultats trouvés : ${resultsCount}`,
              },
            },
          });
        }
      });
  },
};
