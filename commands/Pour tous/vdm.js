const cheerio = require("cheerio");
const axios = require("axios");
const { prefix } = require("../../botconfig.json");

let vdm = [];

module.exports.update = () => {
  return new Promise((resolve, reject) => {
    axios.default
      .get("https://www.viedemerde.fr/aleatoire")
      .then((res) => {
        let $ = cheerio.load(res.data);
        $('a[class="article-link"]')
          .text()
          .split("\n")
          .map((item) => (item.trim() !== "" ? vdm.push(item) : null));
        resolve(vdm);
      })
      .catch(reject);
  });
};
module.exports.send = (message) => {
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * vdm.length);
    resolve(message.channel.send(vdm[random]));
  });
};
module.exports = {
  config: {
    name: "viedemerde",
    description:
      "Tu trouves que ta vie est nulle ? Cette commande te fera changer d'avis quand tu verras celle de certains...",
    usage: prefix + "viedemerde",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["vdm"],
  },
  run: (bot, message, args) => {
    this.update()
      .then(() => this.send(message))
      .catch(console.error);
  },
};
