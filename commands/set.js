// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
const Command = require('../base/Command.js');

class SetCMD extends Command {
  constructor() {
    super({
      name: 'set',
      description: 'Voir et changer les réglages du bot pour ce serveur.',
      category: 'Système',
      usage: 'set <view/get/edit> <clé> <valeur>',
      guildOnly: true,
      aliases: ['setting', 'settings'],
      permLevel: 'Administrateur',
    });
  }

  async run(message, [action, key, ...value] /* , level */) {
    // eslint-disable-line no-unused-vars

    // First we need to retrieve current guild settings
    const settings = message.settings;
    const defaults = this.client.settings.get('default');
    const overrides = this.client.settings.get(message.guild.id);
    if (!this.client.settings.has(message.guild.id))
      this.client.settings.set(message.guild.id, {});

    // Secondly, if a user does `-set edit <key> <new value>`, let's change it
    if (action === 'edit') {
      // User must specify a key.
      if (!key) return message.reply('Veuillez spécifier une clé à éditer');
      // User must specify a key that actually exists!
      if (!settings[key])
        return message.reply("Cette clé n'existe pas dans les réglages");
      // User must specify a value to change.
      const joinedValue = value.join(' ');
      if (joinedValue.length < 1)
        return message.reply('Veuillez spécifier une nouvelle valeur');
      // User must specify a different value than the current one.
      if (joinedValue === settings[key])
        return message.reply('Ce réglage a déjà cette valeur');

      // If the guild does not have any overrides, initialize it.
      if (!this.client.settings.has(message.guild.id))
        this.client.settings.set(message.guild.id, {});

      // Modify the guild overrides directly.
      this.client.settings.set(message.guild.id, joinedValue, key);
      message.reply(`${key} successfully edited to ${joinedValue}`);
    }

    // If a user does `-set del <key>`, let's ask the user if they're sure...
    else if (action === 'del' || action === 'reset') {
      if (!key) return message.reply('Veuillez spécifier une clé à supprimer');
      if (!settings[key])
        return message.reply("Cette clé n'existe pas dans les réglages");
      if (!overrides[key])
        return message.reply('Cette clé ne peut être changée');

      // Throw the 'are you sure?' text at them.
      const response = await this.client.awaitReply(
        message,
        `Êtes-vous sûrs de vouloir changer la clé \`${key}\` à la valeur \`${defaults[key]}\`?`
      );

      // If they respond with y or yes, continue.
      if (['y', 'yes'].includes(response)) {
        // We reset the `key` here.
        this.client.settings.delete(message.guild.id, key);
        message.channel.send(`${key} a bien été remise à la valeur par défaut`);
      }

      // If they respond with n or no, we inform them that the action has been cancelled.
      else if (['n', 'no', 'cancel'].includes(response)) {
        message.channel.send(`Annulation effectuée !`);
      }
    }

    // Using `-set get <key>` we simply return the current value for the guild.
    else if (action === 'get') {
      if (!key)
        return message.channel.send('Veuillez spécifier une clé à voir');
      if (!settings[key])
        return message.channel.send("Cette clé n'existe pas dans les réglages");
      message.channel.send(
        `La valeur de ${key} est actuellement ${settings[key]}`
      );
    } else {
      // Otherwise, the default action is to return the whole configuration;
      const array = Object.entries(settings).map(
        ([key, value]) => `${key}${' '.repeat(20 - key.length)}::  ${value}`
      );
      await message.channel.send(
        `= Réglages actuels du serveur =\n${array.join('\n')}`,
        { code: 'asciidoc' }
      );
    }
  }
}

module.exports = SetCMD;
