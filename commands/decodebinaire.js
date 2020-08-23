const Command = require('../base/Command.js');
const axios = require('axios');

class DecodeBinaire extends Command {
  constructor() {
    super({
      name: 'decodeBinaire',
      description: 'Traduit code en binaire au choix en texte en français',
      usage: 'decodebinaire <texte>',
      aliases: ['db'],
    });
  }

  async run(message, args) {
    try {
      let toTrans = args.join(' ');
      if (!args[0])
        return this.repondre(
          message,
          'Vous devez spécifier un code binaire à traduire !'
        );

      let body = `https://some-random-api.ml/binary?decode=${toTrans}`;

      axios.default.get(body).then((res) => {
        if (!res.data.text)
          return this.repondre(
            message,
            'Une erreur est survenue. Veuillez entrer un code binaire valide.'
          );
        message.channel.send(
          `Traduction du code binaire \`${toTrans}\` :\n\`${res.data.text}\``
        );
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = DecodeBinaire;
