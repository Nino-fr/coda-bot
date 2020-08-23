const Command = require('../base/Command.js');
const axios = require('axios');

class Documentation extends Command {
  constructor() {
    super({
      name: 'documentation',
      description: 'Rechercher sur la documentation de discord.js',
      usage: "documentation <ce qu'il faut rechercher>",
      aliases: ['discordjs', 'djs', 'doc'],
    });
  }

  async run(message, args, level) {
    try {
      let url = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${args.join(
        ' '
      )}`;
      axios.default.get(url).then(async (res) => {
        if (res == null) return this.repondre(message, 'Aucun résultat trouvé');
        await this.repondre(message, { embed: res.data });
      });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Documentation;
