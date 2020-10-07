const Command = require('../base/Command.js');

class SayEmbed extends Command {
  constructor() {
    super({
      name: 'direEmbed',
      description: 'Me faire dire un message au choix dans un embed',
      usage: "direEmbed [salon optionnel] <ce qu'il faut dire>",
      aliases: ['sayembed', 'repeatembed', 'se'],
      guildOnly: true,
      permLevel: 'Bot Admin',
    });
  }

  async run(message, args) {
    try {
      let argsresult;
      let mChannel = message.mentions.channels.first();

      message.delete();
      if (mChannel) {
        argsresult = args.slice(1).join(' ');
        if (!argsresult)
          return this.repondre(
            message,
            'Veuillez préciser un message à répéter'
          );
        mChannel.send({ embed: { description: argsresult } });
      } else {
        argsresult = args.join(' ');
        if (!argsresult)
          return this.repondre(
            message,
            'Veuillez préciser un message à répéter'
          );
        message.channel.send({ embed: { description: argsresult } });
      }
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = SayEmbed;
