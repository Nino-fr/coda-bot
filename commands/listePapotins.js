const Command = require('../base/Command.js');
// Les autres modules/databases à importer

class ListePapotins extends Command {
  constructor() {
    super({
      name: 'listePapotins',
      description: 'Donne la liste des épingles de papotin disponibles',
      usage: 'listePapotins',
      aliases: ['liste', 'epingles'],
      category: 'Gardiens des cités perdues',
    });
  }

  async run(message, args, level) {
    try {
      let liste = [
        'Argentavis',
        'Licorne',
        'Méganeura',
        'Selkie',
        'Colibri lunaire',
        'Kelpie',
        'Gorgonops',
        'Apyrodon',
        'Mastodonte',
        'Sasquatch',
        'Banshee',
        'Gremlin',
        'Verminion',
        'Jaculus',
        'Lutin',
        'Boobrie',
        'Alcyon',
        'Kraken',
        'Gorgodon',
        'Alicorne',
      ];
      this.repondre(message, {
        embed: {
          title: 'Liste de toutes les épingles de papotins existantes',
          description: '- ' + liste.join('\n- '),
          color: 0xdaa520,
        },
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = ListePapotins;
