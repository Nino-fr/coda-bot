const Command = require('../base/Command.js');

class Ping extends Command {
  constructor() {
    super({
      name: 'ping',
      description: "Latence du bot et temps de réponse de l'api Discord.",
      usage: 'ping',
      aliases: ['pong'],
    });
  }

  async run(message, args, level) {
    // eslint-disable-line no-unused-vars
    try {
      const msg = await message.channel.send('🏓 Ping!');
      msg.edit(
        `🏓 Pong ! (Latence : \`${
          msg.createdTimestamp - message.createdTimestamp
        }\`ms. 💙 Api : \`${Math.round(this.client.ws.ping)}\`ms.)`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ping;
