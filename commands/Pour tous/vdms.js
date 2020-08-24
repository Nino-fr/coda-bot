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

let scndvdm = [];
let blacklisted = [
  "copain",
  "copine",
  "chéri",
  "chérie",
  "femme",
  "mari",
  "sex",
  "pénis",
  "vagin",
  "pute",
  "prostituée",
  "préservatif",
  "nu",
  "bite",
  "Jacqui",
  "suçon",
  "suce",
  "pipe",
  "fellation",
  "cochon",
  "coquin",
  "slip",
  "culotte",
  "sein",
  "soutien-à-gorge",
  "soutien à gorge",
  "érotique",
  "pénétration",
  "encul",
  "salope",
  "inceste",
  "gode",
  "branle",
  "partouze",
  "capote",
];

module.exports.send = (message) => {
  vdm.forEach(async (vd) => {
    blacklisted.forEach(async (i) => {
      let vdt = vd.toLowerCase();
      if (vdt.includes(i)) {
        await vdm.splice(vdm.indexOf(vd), 1);
      }
    });
  });
  vdm.forEach(async (vd) => {
    if (vd.includes("VDM")) {
      await scndvdm.push(vd.substring(0, vd.indexOf("VDM")));
    } else await scndvdm.push(vd);
  });

  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * scndvdm.length);
    resolve(message.channel.send(`[VDM Soft] ${scndvdm[random]}`));
  });
};
module.exports = {
  config: {
    name: "viedemerde_soft",
    description:
      "Tu trouves que ta vie est nulle ? Cette commande te fera changer d'avis quand tu verras celle de certains... Version soft. Aucun risque d'être choqué.",
    usage: prefix + "viedemerde_soft",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["vdm_soft", "vdms", "vdm-soft"],
  },
  run: (bot, message) => {
    console.log(
      `VDM Soft envoyée dans le salon ${message.channel.name} dans le serveur ${message.guild.name}`
    );
    this.update()
      .then(() => this.send(message))
      .catch(console.error);
  },
};
