// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS

// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
const Command = require('../base/Command.js');

class Eval extends Command {
  constructor() {
    super({
      name: 'eval',
      description: 'Evalue un code JavaScript.',
      category: 'Système',
      usage: 'eval <expression>',
      aliases: ['ev', 'evaluer'],
      permLevel: 'Propriétaire',
    });
  }

  async run(message, args, level) {
    if (!args)
      return this.repondre(message, 'Veuillez préciser un code à evaluer');
    let code = args.join(' ').replace(' client', ' this.client');
    try {
      code = await code.replace(/```/g, '').replace(/js/, '');
      const evaled = eval(code);
      const clean = await this.client.clean(evaled);
      const MAX_CHARS = 3 + 2 + clean.length + 3;
      if (MAX_CHARS > 2000) {
        message.channel.send(
          "L'output comprend plus de 2000 charactères. Elle sera donc envoyée sous forme de fichier.",
          { files: [{ attachment: Buffer.from(clean), name: 'output.txt' }] }
        );
      }
      message.channel.send(
        `__**Input :**__\n \`\`\`js\n${code}\n\`\`\`\n\n__**Output :**__\n \`\`\`js\n${clean}\n\`\`\``
      );
    } catch (err) {
      err = err
        .toString()
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(this.client.token, 'secretToken');
      try {
        // const cleaned = await this.client.clean(this.client, err);
        message.channel.send(
          `__**Input :**__\n \`\`\`js\n${code}\n\`\`\`\n\n__**Output :**__\n \n\`ERROR\` \`\`\`xl\n${err}\n\`\`\``
        );
      } catch (erreur) {
        // const cleaned = await this.client.clean(this.client, erreur);
        message.channel.send(
          "L'output comprend plus de 2000 charactères. Elle sera donc envoyée sous forme de fichier.",
          { files: [{ attachment: Buffer.from(err), name: 'output.txt' }] }
        );
      }
    }
  }
}

module.exports = Eval;
