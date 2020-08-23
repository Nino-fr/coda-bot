const Command = require('../base/Command.js');
const fs = require('fs');
const warns = fs.readFileSync('./databases/warns.json');

class Avertir extends Command {
  constructor() {
    super({
      name: 'avertir',
      description: "Avertir quelqu'un",
      usage: 'avertir <membre> [raison]',
      guildOnly: true,
      permLevel: 'Moderateur',
      category: 'Modération',
      aliases: ['warn', 'attention', 'sanctions'],
      enabled: false,
    });
  }

  async run(message, args) {
    try {
      let member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args.shift());
      let reason = args.join(' ');
      if (!warns[member.id]) {
        warns[member.id] = {
          sanctions: [],
          immunité: false,
        };
      }

      if (warns[member.id].immunité === true) {
        warns[member.id].immunité = false;
        this.repondre(
          message,
          `<@${member.id}> a été averti pour la raison suivante : ${
            reason ? reason : 'Aucune'
          }\nHeureusement pour <@${member.id}>,`
        );
      }
      await this.client.warns.ensure(message.author.id, {
        sanctions: [],
        immunité: false,
        lastUpdate: new Date(),
      });

      if (this.client.warns.get(message.author.id, 'immunité') === true) {
        await this.client.warns.set(message.author.id, false, 'immunité');
        return;
      }
      await this.client.warns
        .get(message.author.id)
        .sanctions.push(reason ? reason : 'Aucune raison');
      await warns[member.id].sanctions.push(reason ? reason : 'Aucune raison');
      fs.writeFile('./databases/warns.json', JSON.stringify(warns), (err) => {
        if (err) throw err;
      });
      return this.repondre(
        message,
        `<@${member.id}> a été averti pour la raison suivante : ${
          reason ? reason : 'Aucune raison'
        }`
      );
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Avertir;
