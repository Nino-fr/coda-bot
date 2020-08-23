const Command = require('../base/Command.js');
const fetch = require('node-fetch');
class ChuckNorris extends Command {
  constructor() {
    super({
      name: 'chuckNorrisFact',
      description: 'Chuck Norris Fact',
      usage: 'chuckNorrisFact',
      aliases: ['cn', 'cnf', 'chuckNorris', 'chucknorris', 'chucknorrisfact'],
      category: 'Fun',
    });
  }

  async run(message, args, level) {
    try {
      fetch('https://chucknorrisfacts.fr/api/get?data=nb:1;tri:alea')
        .then((response) => response.json())
        .then(async (data) => {
          let toChange;
          try {
            await data[0].fact.match(/&#\d+;/g).forEach((ress) => {
              toChange = ress.match(/\d+/);
            });
          } catch {}
          this.repondre(
            message,
            String(data[0].fact)
              .replace(/&egrave;/gi, 'è')
              .replace(/&eacute;/gi, 'é')
              .replace(/&ecirc;/gi, 'ê')
              .replace(/&euml;/gi, 'ë')
              .replace(/&auml;/gi, 'ä')
              .replace(/&uuml;/gi, 'ü')
              .replace(/&iuml;/gi, 'ï')
              .replace(/&quot;/gi, '"')
              .replace(/&ccedil;/gi, 'ç')
              .replace(/&aacute;/gi, 'à')
              .replace(/&agrave;/gi, 'á')
              .replace(/&acirc;/gi, 'â')
              .replace(/&uacute;/gi, 'ú')
              .replace(/&ugrave;/gi, 'ù')
              .replace(/&ucirc;/gi, 'û')
              .replace(/&iacute;/gi, 'í')
              .replace(/&\#\d+;/gi, String.fromCharCode(parseInt(toChange)))
              .replace(/<[^>]+>/gi, '')
          );
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = ChuckNorris;
