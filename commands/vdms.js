const cheerio = require('cheerio');
const axios = require('axios');
const Command = require('../base/Command.js');
const { Message } = require('discord.js');

let vdm = [];

const update = () => {
  return new Promise((resolve, reject) => {
    axios.default
      .get('https://www.viedemerde.fr/aleatoire')
      .then((res) => {
        let $ = cheerio.load(res.data);
        $('a[class="article-link"]')
          .text()
          .split('\n')
          .map((item) => (item.trim() !== '' ? vdm.push(item) : null));
        resolve(vdm);
      })
      .catch(reject);
  });
};

let scndvdm = [];
let blacklisted = [
  'copain',
  'copine',
  'chéri',
  'chérie',
  'femme',
  'mari',
  'sex',
  'pénis',
  'vagin',
  'pute',
  'prostituée',
  'préservatif',
  'nu',
  'bite',
  'Jacqui',
  'suçon',
  'suce',
  'pipe',
  'fellation',
  'cochon',
  'coquin',
  'slip',
  'culotte',
  'sein',
  'soutien-à-gorge',
  'soutien à gorge',
  'érotique',
  'pénétration',
  'encul',
  'salope',
  'inceste',
  'gode',
  'branle',
  'partouze',
  'capote',
];

const send = (message) => {
  vdm.forEach(async (vd) => {
    blacklisted.forEach(async (i) => {
      let vdt = vd.toLowerCase();
      if (vdt.includes(i)) {
        vdm.splice(vdm.indexOf(vd), 1);
      }
    });
  });
  vdm.forEach(async (vd) => {
    if (vd.includes('VDM')) {
      scndvdm.push(vd.substring(0, vd.indexOf('VDM')));
    } else scndvdm.push(vd);
  });

  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * scndvdm.length);
    resolve(message.channel.send(`[VDM Soft] ${scndvdm[random]}`));
  });
};

class VDMS extends Command {
  constructor() {
    super({
      name: 'vieDeMerdeSoft',
      description:
        "Tu trouves que ta vie est nulle ? Cette commande te fera changer d'avis quand tu verras celle de certains... Version soft. Tous publics.",
      usage: 'viedemerdehot',
      aliases: ['vdms', 'vdm_soft', 'vdm-soft', 'viedemerde_soft'],
      category: 'Fun',
    });
  }
  /**
   *
   * @param { Message } message La commande
   */
  run(message) {
    try {
      update()
        .then(() => send(message))
        .catch(console.error);
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = VDMS;
