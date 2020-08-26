const Command = require('../base/Command.js');
const { cyan } = require('../colours.json');
const { MessageEmbed, Message } = require('discord.js');

class Help extends Command {
  constructor() {
    super({
      name: 'help',
      description: 'Donne la liste des commandes que vous pouvez utiliser',
      category: 'Système',
      usage: 'help [command]',
      aliases: ['h', 'halp', 'aide', 'commands'],
    });
  }
  /**
   *
   * @param { Message } message La commande
   * @param { String[] } args Les args passés après la commande
   * @param { Number | String } level Le niveau de permission de l'utilisateur
   */
  async run(message, args, level) {
    if (args[0]) {
      if (
        !this.client.commands.get(args[0].toLowerCase()) &&
        !this.client.aliases.get(args[0].toLowerCase())
      ) {
        return message.channel.send('Aucune commande portant ce nom trouvée');
      }
    }
    let msg = await message.channel.send(
      "Souhaitez-vous la page d'aide sous forme de `bloc` (réaction :regional_indicator_b:) ou sous forme d'`embed` (réaction :regional_indicator_e:) ? \nVous avez une minute pour choisir."
    );
    await msg.react('🇧');
    await msg.react('🇪');
    const filter = (reaction, user) =>
      (reaction.emoji.name === '🇧' || reaction.emoji.name === '🇪') &&
      user.id === message.author.id;
    const collector = await msg.createReactionCollector(filter, {
      time: 15000,
    });
    collector.on('collect', async (r) => {
      switch (r.emoji.name) {
        case '🇧':
          await msg.delete();
          // If no specific command is called, show all filtered commands.
          if (!args[0]) {
            // Load guild settings (for prefixes and eventually per-guild tweaks)
            // const settings = message.settings;

            // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
            const myCommands = this.client.commands;

            // Here we have to get the command names only, and we use that array to get the longest name.
            // This make the help commands "aligned" in the output.
            const commandNames = myCommands.keyArray();
            const longest = commandNames.reduce(
              (long, str) => Math.max(long, str.length),
              0
            );
            let currentCategory = '';
            let output = `= Liste des commandes =\n\n[Utilisez ${this.client.config.defaultSettings.prefix}help <commande> pour plus de détails]\n`;
            const sorted = myCommands
              .array()
              .sort((p, c) =>
                p.help.category > c.help.category
                  ? 1
                  : p.help.name > c.help.name &&
                    p.help.category === c.help.category
                  ? 1
                  : -1
              );
            sorted.forEach((c) => {
              const cat = c.help.category;
              if (currentCategory !== cat) {
                output += `\u200b\n== ${cat} ==\n`;
                currentCategory = cat;
              }
              output += `${c.help.name}${' '.repeat(
                longest - c.help.name.length
              )} :: ${c.help.description}\n`;
            });
            return message.channel.send(output.toString(), {
              code: 'asciidoc',
              split: { char: '\u200b' },
            });
          } else {
            // Show individual command's help.
            let command = args[0];
            if (this.client.commands.has(command)) {
              command = this.client.commands.get(command);
              /* if (level < this.client.levelCache[command.conf.permLevel])
                return; */
              message.channel.send(
                `= ${command.help.name} = \n${
                  command.help.description
                }\nUtilisation :: ${
                  command.help.usage
                }\nAliases :: ${command.conf.aliases.join(
                  ', '
                )}\nPouvez-vous utiliser cette commande ? :: ${
                  !(
                    level < this.client.levelCache[command.conf.permLevel] &&
                    this.client.commands.get(command).conf.enabled
                  )
                    ? 'Oui'
                    : 'Non'
                }\nPuis-je l'exécuter ? :: Oui`,
                { code: 'asciidoc' }
              );
            } else if (this.client.aliases.has(command)) {
              command = this.client.aliases.get(command);
              command = this.client.commands.get(command);
              /* if (level < this.client.levelCache[command.conf.permLevel])
                return; */
              return message.channel.send(
                `= ${command.help.name} = \n${
                  command.help.description
                }\nUtilisation :: ${
                  command.help.usage
                }\nAliases :: ${command.conf.aliases.join(', ')}`,
                { code: 'asciidoc' }
              );
            }
          }
          break;
        case '🇪':
          const embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(
              `Page d'aide`,
              this.client.user.displayAvatarURL({ format: 'png' })
            )
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }));

          msg.delete();
          // If no specific command is called, show all filtered commands.
          if (!args[0]) {
            // Here we have to get the command names only, and we use that array to get the longest name.
            // This make the help commands "aligned" in the output.
            const categories = [
              'Fun',
              'Gardiens des cités perdues',
              'Modération',
              'Système',
              'Utilitaires',
            ];
            embed.setDescription(
              `**Utilisez ${this.client.config.defaultSettings.prefix}help <commande> pour plus de détails**\n`
            );
            /* const sorted = myCommands
              .array()
              .sort((p, c) =>
                p.help.category > c.help.category
                  ? 1
                  : p.help.name > c.help.name &&
                    p.help.category === c.help.category
                  ? 1
                  : -1
              ); */
            categories.forEach((cat) => {
              embed.addField(
                cat,
                this.client.commands
                  .filter((c) => c.help.category === cat)
                  .map((c) => `${c.help.name}`)
                  .join('\n')
              );
            });
            return this.repondre(message, embed);
          } else {
            embed.setFooter(
              "Les arguments entre <> sont obligatoires et ceux entre [] sont facultatifs. N'oubliez pas d'enlever les <> et les [] pour exécuter la commande, ils sont utilisés ici pour préciser l'importance des arguments."
            );
            // Show individual command's help.
            let command = args[0];
            if (this.client.commands.has(command)) {
              command = this.client.commands.get(command);
              /* if (level < this.client.levelCache[command.conf.permLevel])
                return; */

              embed
                .addField('Commande :', command.help.name)
                .addField(
                  'Utilisation :',
                  this.client.config.defaultSettings.prefix + command.help.usage
                )
                .addField('Aliases :', command.conf.aliases.join(', '))
                .addField(
                  'Pouvez-vous utiliser cette commande ?',
                  !(
                    level < this.client.levelCache[command.conf.permLevel] &&
                    this.client.commands.get(command).conf.enabled
                  )
                    ? 'Oui <:check:708245371792523317>'
                    : 'Non :x:',
                  true
                )
                .addField(
                  "Puis-je l'exécuter ?",
                  'Oui <:check:708245371792523317>',
                  true
                );
            } else if (this.client.aliases.has(command)) {
              command = this.client.aliases.get(command);
              command = this.client.commands.get(command);
              /* if (level < this.client.levelCache[command.conf.permLevel])
                return; */
              embed
                .addField('Commande :', command.help.name)
                .addField('Description :', command.help.description, true)
                .addField(
                  'Utilisation :',
                  this.client.config.defaultSettings.prefix +
                    command.help.usage,
                  true
                )
                .addField('Aliases :', command.conf.aliases.join(', '))
                .addField(
                  'Pouvez-vous utiliser cette commande ?',
                  !(level < this.client.levelCache[command.conf.permLevel])
                    ? 'Oui <:check:708245371792523317>'
                    : 'Non :x:',
                  true
                )
                .addField(
                  "Puis-je l'exécuter ?",
                  'Oui <:check:708245371792523317>',
                  true
                );
            }
          }
          return message.channel.send(embed);
      }
      collector.stop('User reacted');
    });
    collector.on('end', (collected) => {
      if (collected.first() === undefined) {
        msg.reactions.removeAll();
        return message.reply(
          "le temps est écoulé. Vous n'avez pas réagi dans le temps imparti."
        );
      }
    });
  }
}

module.exports = Help;
