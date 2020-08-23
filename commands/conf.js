/*
FOR GUILD SETTINGS SEE set.js !
This command is used to modify the bot's default configuration values, which affects all guilds. 
If a default setting is not specifically overwritten by a guild, changing a default here will
change it for that guild. The `add` action adds a key to the configuration of every guild in
your bot. The `del` action removes the key also from every guild, and loses its value forever.
*/
const Command = require('../base/Command.js');

class Conf extends Command {
  constructor() {
    super({
      name: 'conf',
      description:
        'Modifie/montre la configuration par défaut pour le serveur.',
      category: 'Système',
      usage: 'conf <view/get/edit> <clé> <valeur>',
      guildOnly: true,
      aliases: ['defaults', 'config'],
      permLevel: 'Bot Admin',
    });
  }

  async run(message, [action, key, ...value], level) {
    // eslint-disable-line no-unused-vars

    // Retrieve Default Values from the default settings in the bot.
    const defaults = this.client.settings.get('default');

    // Adding a new key adds it to every guild (it will be visible to all of them)
    if (action === 'add') {
      if (!key) return message.reply('Veuillez spécifier un clé à ajouter');
      if (defaults[key]) return message.reply('Cette clé existe déjà');
      if (value.length < 1)
        return message.reply('Veuillez spécifier une valeur');

      // `value` being an array, we need to join it first.
      defaults[key] = value.join(' ');

      // One the settings is modified, we write it back to the collection
      this.client.settings.set('default', defaults);
      message.reply(
        `${key} a bien été ajoutée avec la valeur ${value.join(' ')}`
      );
    }

    // Changing the default value of a key only modified it for guilds that did not change it to another value.
    else if (action === 'edit') {
      if (!key) return message.reply('Veuillez spécifier une clé à ajouter');
      if (!defaults[key])
        return message.reply(
          "Cette clé n'existe pas dans les réglages par défaut"
        );
      if (value.length < 1)
        return message.reply('Veuillez spécifier une nouvelle valeur');

      defaults[key] = value.join(' ');

      this.client.settings.set('default', defaults);
      message.reply(`${key} a bien été éditée à ${value.join(' ')}`);
    }

    // WARNING: DELETING A KEY FROM THE DEFAULTS ALSO REMOVES IT FROM EVERY GUILD
    // MAKE SURE THAT KEY IS REALLY NO LONGER NEEDED!
    else if (action === 'del') {
      if (!key) return message.reply('Veuillez spécifier une clé à supprimer');
      if (!defaults[key])
        return message.reply(
          "Cette clé n'existe pas dans les réglages par défaut"
        );

      // Throw the 'are you sure?' text at them.
      const response = await this.client.awaitReply(
        message,
        `Êtes vous sûr de vouloir supprimer la clé ${key} de tous les serveurs ? Cela ne peut pas être annulé.`
      );

      // If they respond with y or yes, continue.
      if (['y', 'yes'].includes(response)) {
        // We delete the default `key` here.
        delete defaults[key];
        this.client.settings.set('default', defaults);

        // then we loop on all the guilds and remove this key if it exists.
        // "if it exists" is done with the filter (if the key is present and it's not the default config!)
        for (const [guildid, conf] of this.client.settings.filter(
          (setting, id) => setting[key] && id !== 'default'
        )) {
          delete conf[key];
          this.client.settings.set(guildid, conf);
        }

        message.reply(`${key} a bien été supprimée.`);
      }
      // If they respond with n or no, we inform them that the action has been cancelled.
      else if (['n', 'no', 'cancel'].includes(response)) {
        message.reply('Action annulée.');
      }
    }

    // Display a key's default value
    else if (action === 'get') {
      if (!key) return message.reply('Veuillez spécifier une clé à voir');
      if (!defaults[key])
        return message.reply(
          "Cette clé n'existe pas dans les réglages par défaut"
        );
      message.reply(`la valeur de ${key} est ${defaults[key]}`);

      // Display all default settings.
    } else {
      const array = [];
      Object.entries(this.client.settings.get('default')).forEach(
        ([key, value]) => {
          array.push(`${key}${' '.repeat(20 - key.length)}::  ${value}`);
        }
      );
      await message.channel.send(
        `= Réglages par défaut du bot =
${array.join('\n')}`,
        { code: 'asciidoc' }
      );
    }
  }
}

module.exports = Conf;
