const cheerio = require('cheerio');
const axios = require('axios');
const Command = require('../base/Command.js');
const { Message } = require('discord.js');

let vdm = [];

const update = () => {
  return new Promise((resolve, reject) => {
    axios.default
      .get('https://www.viedemerde.fr/aleatoire/epicees')
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

const send = (message) => {
  vdm.forEach(async (vd) => {
    if (vd.includes('VDM')) {
      await scndvdm.push(vd.substring(0, vd.indexOf('VDM')));
    } else await scndvdm.push(vd);
  });
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * scndvdm.length);
    resolve(message.channel.send(`[VDM Hot] ||${scndvdm[random]}||`));
  });
};

class VDMH extends Command {
  constructor() {
    super({
      name: 'vieDeMerdeHot',
      description:
        "Tu trouves que ta vie est nulle ? Cette commande te fera changer d'avis quand tu verras celle de certains... Version hot. Réservé à un public mature.",
      usage: 'viedemerdehot',
      aliases: ['vdmh', 'vdm_hot', 'vdm-hot', 'viedemerde_hot'],
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

module.exports = VDMH;
