const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { blue_light } = require('../colours.json');
// const axios = require('axios');
const fetch = require('node-fetch');

class Lyrics extends Command {
  constructor() {
    super({
      name: 'Paroles',
      description: "Envoie les paroles d'une chanson",
      usage: 'paroles <titre>',
      aliases: ['lyrics', 'parole'],
      category: 'Fun',
      enabled: true,
    });
  }

  async run(message, args) {
    try {
      if (!args[0])
        return message.channel.send('Veuillez préciser le titre de la chanson');

      let titre = args.join(' ');

      let body = `https://some-random-api.ml/lyrics?title=${titre}`;
      /* await axios.default.get(body).then((res) => {
        let selfEmbed = new MessageEmbed()
          .setColor(blue_light)
          .setTitle(
            `Paroles de la chanson \`${res.data.title}\` de ${res.data.author}`
          )
          .setDescription(
            res.data.lyrics.toString().length < 2000
              ? res.data.lyrics.toString()
              : res.data.lyrics.toString().substr(0, 1996) +
                  ` [\[...\]](${res.data.links.genius})`
          )
          .setThumbnail(res.data.thumbnail.genius);
        message.channel.send(selfEmbed);
      }); */
      fetch(body)
        // .then((res) => res.json())
        .then(async (ress) => {
          let bod = await JSON.parse(JSON.stringify(ress));
          // console.log(bod);
          let selfEmbed = new MessageEmbed()
            .setColor(blue_light)
            .setTitle(`Paroles de la chanson \`${bod.title}\` de ${bod.author}`)
            .setDescription(
              bod.lyrics.length < 2000
                ? bod.lyrics
                : bod.lyrics.substr(0, 1996) + ` [\[...\]](${bod.links.genius})`
            )
            .setThumbnail(bod.thumbnail.genius);
          message.channel.send(selfEmbed);
        });
    } catch (err) {
      return message.channel.send(
        "Une erreur est survenue. Message de mon créateur : \nCette commande est buguée donc vous étonnez pas si y a plein d'erreurs, désolé. Un conseil : n'utilisez pas cette commande et allez direct sur google ;)"
      );
      // this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Lyrics;
