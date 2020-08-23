const Command = require('../base/Command.js');

class Reload extends Command {
  constructor() {
    super({
      name: 'reload',
      description: 'Redémarre une commande qui a été modifiée',
      category: 'Système',
      usage: 'reload [command]',
      permLevel: 'Bot Admin',
    });
  }

  async run(message, args, level) {
    // eslint-disable-line no-unused-vars
    if (!args || args.size < 1)
      return message.channel.send(
        'Vous devez spécifier une commande à redémarrer'
      );

    const commands =
      this.client.commands.get(args[0]) ||
      this.client.commands.get(this.client.aliases.get(args[0]));
    if (!commands)
      return message.channel.send(`La commande \`${args[0]}\` n'existe pas.`);

    let response = await this.client.unloadCommand(
      commands.conf.location,
      commands.help.name
    );
    if (response) return message.channel.send(`Erreur : ${response}`);

    response = this.client.loadCommand(
      commands.conf.location,
      commands.help.name
    );
    if (response) return message.channel.send(`Erreur : ${response}`);

    message.channel.send(
      `La commande \`${commands.help.name}\` a bien été redémarrée`
    );
  }
}
module.exports = Reload;
