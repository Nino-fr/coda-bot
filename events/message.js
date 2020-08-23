// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const { Message } = require('discord.js');
const { client } = require('../index.js');

module.exports = class {
  constructor() {
    this.client = client;
  }
  /**
   *
   * @param {Message} message
   */
  async run(message) {
    const settings = this.client.getSettings(message.guild);
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    //  and not get into a spam loop (we call that "botception").
    if (message.author.bot && !message.content === settings.prefix + 'reboot')
      return;

    // Cancel any attempt to execute commands if the bot cannot respond to the user.
    if (
      message.guild &&
      !message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES')
    )
      return;

    // For ease of use in commands and functions, we'll attach the settings
    // to the message object, so `message.settings` is accessible.
    message.settings = settings;

    // Checks if the bot was mentioned, with no message after it, returns the prefix.
    const prefixMention = new RegExp(`^<@!?${this.client.user.id}> ?$`);
    if (message.content.match(prefixMention)) {
      return message.channel.send(
        `Mon prefix est \`${settings.prefix}\` Écris \`&help\` pour la liste des commandes.`
      );
    }

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(settings.prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);

    // Get the user or member's permission level from the elevation
    const level = this.client.permlevel(message);

    // Check whether the command, or alias, exist in the collections defined
    // in app.js.
    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    // using this const varName = thing OR otherthign; is a pretty efficient
    // and clean way to grab one of 2 values!
    if (!cmd) return;

    // Some commands may not be useable in DMs. This check prevents those commands from running
    // and return a friendly error message.
    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send("Cette commande n'est pas disponible en mp.");

    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === 'true') {
        return message.channel
          .send(`Vous n'avez pas la permission d'utiliser cette commande. Votre niveau de permission : ${level} (${
          this.client.config.permLevels.find((l) => l.level === level).name
        })
Cette commande nécessite le niveau de permission ${
          this.client.levelCache[cmd.conf.permLevel]
        } (${cmd.conf.permLevel})`);
      } else {
        return;
      }
    }

    // To simplify message arguments, the author's level is now put on level (not member, so it is supported in DMs)
    // The "level" command module argument will be deprecated in the future.
    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === '-') {
      message.flags.push(args.shift().slice(1));
    }

    if (!cmd.conf.enabled)
      return message.channel.send(
        'Cette commande est actuellement désactivée et ne peut donc plus être utilisée.'
      );

    // If the command exists, **AND** the user has permission, run it.
    this.client.logger.log(
      `${this.client.config.permLevels.find((l) => l.level === level).name} ${
        message.author.username
      } (${message.author.id}) a utilisé la commande ${cmd.help.name}`,
      'cmd'
    );

    cmd.run(message, args, level);
  }
};
