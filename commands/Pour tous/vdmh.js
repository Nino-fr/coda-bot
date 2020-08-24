const cheerio = require("cheerio");
const axios = require("axios");
const { prefix } = require("../../botconfig.json");

let vdm = [];

module.exports.update = () => {
  return new Promise((resolve, reject) => {
    axios.default
      .get("https://www.viedemerde.fr/aleatoire/epicees")
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

let scndvdm = [];

module.exports.send = (message) => {
  vdm.forEach(async (vd) => {
    if (vd.includes("VDM")) {
      await scndvdm.push(vd.substring(0, vd.indexOf("VDM")));
    } else await scndvdm.push(vd);
  });
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * scndvdm.length);
    resolve(message.channel.send(`[VDM Hot] ||${scndvdm[random]}||`));
  });
};
module.exports = {
  config: {
    name: "viedemerde_hot",
    description:
      "Tu trouves que ta vie est nulle ? Cette commande te fera changer d'avis quand tu verras celle de certains... Version hot. Réservé à un public mature.",
    usage: prefix + "viedemerde_hot",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["vdmh", "vdm_hot", "vdm-hot"],
  },
  run: (bot, message, args) => {
    this.update()
      .then(() => this.send(message))
      .catch(console.error);
  },
};
