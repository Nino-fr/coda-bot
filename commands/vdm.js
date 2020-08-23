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

const send = (message) => {
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * vdm.length);
    resolve(message.channel.send(vdm[random]));
  });
};

class VDM extends Command {
  constructor() {
    super({
      name: 'vieDeMerde',
      description:
        "Tu trouves que ta vie est nulle ? Cette commande te fera changer d'avis quand tu verras celle de certains... Version aléatoire, risque de texte pouvant choquer un public sensible.",
      usage: 'viedemerde',
      aliases: ['vdm', 'globalvdm', 'randomvdm'],
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

module.exports = VDM;
