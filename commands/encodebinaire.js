const Command = require('../base/Command.js');
const axios = require('axios');

class EncodeBinaire extends Command {
  constructor() {
    super({
      name: 'encodeBinaire',
      description: 'Traduit un texte au choix en code binaire',
      usage: 'encodebinaire <texte>',
      aliases: ['eb', 'traduireBinaire', 'translateBinaire'],
    });
  }

  async run(message, args) {
    try {
      if (!args[0])
        return this.repondre(
          message,
          'Vous devez spécifier un code binaire à traduire !'
        );
      let toTrans = args.join(' ');

      let body = `https://some-random-api.ml/binary?text=${toTrans}`;

      axios.default.get(body).then((res) => {
        if (!res.data.binary)
          return this.repondre(
            message,
            'Une erreur est survenue. Veuillez entrer un texte valide.'
          );
        return message.channel.send(
          `Traduction en code binaire de \`${toTrans}\` :\n\`${res.data.binary}\``
        );
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = EncodeBinaire;
