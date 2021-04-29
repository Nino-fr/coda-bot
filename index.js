// Vérifier que Node est bien en v12 ou +
if (Number(process.version.slice(1).split('.')[0]) < 12)
  throw new Error(
    'La version 12.0.0 de Node ou une version plus récente est requise. Veuillez mettre à jour Node avant de continuer'
  );

const {
    Client,
    Collection,
    MessageEmbed,
    Message,
    Guild,
  } = require('discord.js'),
  { promisify } = require('util'),
  readdir = promisify(require('fs').readdir),
  klaw = require('klaw'),
  path = require('path');

class Coda extends Client {
  /**
   *
   * @param {import('discord.js').ClientOptions} options
   */
  constructor(options) {
    super(options);

    this.config = require('./config.js');

    this.commands = new Collection();
    this.aliases = new Collection();

    this.settings = new Collection();
    this.utils = new Collection();

    this.warns = new Map();
    this.immus = new Map();

    this.logger = require('./modules/Logger');

    this.wait = require('util').promisify(setTimeout);
  }

  /**
   * Afficher quelque chose en console.
   * @param {*} [message=""] Ce qu'il faut afficher en `console`
   * @param {*[]} optionalParams Les autres messages à afficher en `console`
   * @returns {void}
   */
  loguer(message = '', ...optionalParams) {
    console.log(message, ...optionalParams);
  }
  /**
   * Répondre à un message, raccourci de `message.channel.send()`
   * @param {Message} message Le message auquel répondre
   * @param {*} msg Ce qu'il faut répondre
   */
  repondre(message, msg) {
    message.channel.send(msg);
  }

  /**
   * Remplacer chaque entité html dans une chaîne de caractères par le symbole correspondant et supprimer chaque balise html
   * @param {string} str La chaîne de caractère à corriger
   * @returns {string}
   * @example
    // Exemple d'utilisation de la fonction
    correctString("Toutes les peluches de Chuck Norris n&#039;ont plus de t&ecirc;tes.");
    // => "Toutes les peluches de Chuck Norris n'ont plus de têtes"
   */
  correctString(str) {
    let toChange;
    try {
      str.match(/&#\d+;/g).forEach((ress) => {
        toChange = ress.match(/\d+/);
        str = String(str).replace(
          /&#\d+;/,
          String.fromCharCode(parseInt(toChange))
        );
      });
    } catch {}
    return String(str)
      .replace(/&egrave;/gi, 'è')
      .replace(/&eacute;/gi, 'é')
      .replace(/&ecirc;/gi, 'ê')
      .replace(/&euml;/gi, 'ë')
      .replace(/&auml;/gi, 'ä')
      .replace(/&uuml;/gi, 'ü')
      .replace(/&iuml;/gi, 'ï')
      .replace(/&quot;/gi, '"')
      .replace(/&ccedil;/gi, 'ç')
      .replace(/&aacute;/gi, 'à')
      .replace(/&agrave;/gi, 'á')
      .replace(/&acirc;/gi, 'â')
      .replace(/&uacute;/gi, 'ú')
      .replace(/&ugrave;/gi, 'ù')
      .replace(/&ucirc;/gi, 'û')
      .replace(/&iacute;/gi, 'í')
      .replace(/<[^>]+>/gi, '');
  }

  /**
   * Créons un système de niveaux de permissions pour empêcher les simples membres d'exécuter certaines commandes.
   * @param {Message} message
   */
  permlevel(message) {
    let permlvl = 0;

    const permOrder = this.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }

  /**
   * Charger une commande
   * @param {String} commandPath Le chemin vers le fichier de la commande.
   * @param {String} commandName Le nom de la commande.
   */
  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(
        this
      );
      this.logger.log(`Commande ${props.help.name} chargée. ✅`, 'log');
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name.toLowerCase(), props);
      props.conf.aliases.forEach((alias) => {
        this.aliases.set(alias.toLowerCase(), props.help.name.toLowerCase());
      });
      return false;
    } catch (e) {
      return `Impossible de load la commande ${commandName}: ${e}`;
    }
  }
  /**
   * Désactiver/décharger une commande
   * @param {String} commandPath Le chemin vers le fichier de la commande.
   * @param {String} commandName Le nom de la commande.
   */
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command)
      return `La commande \`${commandName}\` n'existe apparemment pas ! Veuillez réessayer.`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[
      require.resolve(`${commandPath}${path.sep}${commandName}.js`)
    ];
    return false;
  }

  /**
   * Retirer les mentions everyone et le token du bot d'un texte/code
   * @param {*} text Le texte/code à clean
   * @returns
   */
  async clean(text) {
    if (text && text.constructor.name == 'Promise') text = await text;
    if (typeof text !== 'string')
      text = require('util').inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replace(this.token, 'secretToken');

    return text;
  }

  /**
   * Obtenir les réglages d'un serveur spécifique
   * @param {Guild} guild Le serveur dont on veut obtenir les réglages
   * @returns {object}
   */
  getSettings(guild) {
    const setss = this.settings.get('main') || {};
    const guildData = guild ? this.settings.get(guild.id) || {} : {};
    const returnObject = {};
    Object.keys(setss).forEach((key) => {
      returnObject[key] = guildData[key] ? guildData[key] : setss[key];
    });
    return returnObject;
  }

  /**
   * Attendre une réponse de à une `question`. Seul **un** utilisateur peut répondre.
   * Raccourci de la méthode `awaitMessages()`
   * @param {Message} msg Le message
   * @param {string} question La question posée
   * @param {number} [limit=60000] Le temps maximum d'attente
   */
  async awaitReply(msg, question, limit = 60000) {
    const filter = (m) => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ['time'],
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  }
}

const client = new Coda({
  partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
});
const assistance = new Client();

// Initialisons les commandes et événements.

const init = async () => {
  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  klaw('./commands').on('data', (item) => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== '.js') return;
    const response = client.loadCommand(
      cmdFile.dir,
      `${cmdFile.name}${cmdFile.ext}`
    );

    if (response) client.logger.error(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir('./events/');
  client.logger.log(
    `Un total de ${evtFiles.length + 1} events ont été chargés.`,
    'log'
  );
  evtFiles.forEach((file) => {
    const eventName = file.split('.')[0];
    client.logger.log(`Event ${eventName} chargé`);
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.logger.log(`Event message chargé`);
  const event = new (require(`./message.js`))();
  // Un second event message ne se trouvant pas dans le dossier `events` car un fichier
  // de ce nom y existe déjà.
  client.on('message', (...args) => event.run(...args));

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);
  assistance.login(client.config.assistanceToken);
};

init();

client
  .on('disconnect', () =>
    client.logger.warn('Le bot est en train de se déconnecter...')
  )
  .on('reconnecting', () =>
    client.logger.log('Le bot est en train de se reconnecter...', 'log')
  )
  .on('error', (e) => client.logger.error(e))
  .on('warn', (info) => client.logger.warn(info));

// ÉTENDRE LES TYPES NATIFS EST UNE MAUVAISE PRATIQUE. Pourquoi ? Parce que si
// cette extension est ajoutée plus tard officiellement en JavaScript, cela
// créera des conflits avec le code natif. C'est pareil si une autre lib que
// tu utilises fais ça, il y pourra aussi y avoir des conflits. IL FAUT
// BIEN LE RETENIR.

/**
 * <String>.toPropercase() retourne une version plus "propre" du string :
 * @example
 * "Mary had a little lamb".toProperCase()
 * // retourne "Mary Had A Little Lamb"
 */
String.prototype.toProperCase = function () {
  return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// <Array>.random() retourne un élément au hasard dans le tableau
// [1, 2, 3, 4, 5].random() peut retourner n 1, 2, 3, 4 or 5.
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Message.prototype.repondre = (content, ...options) => {
  this.channel.send(content, ...options);
};

/**
 * Mettre la première lettre de chaque phrase en majuscule si les phrases sont séparées par des points
 */
String.prototype.correctCase = function () {
  if (!this.includes('.'))
    return this.trim().charAt(0).toUpperCase() + this.slice(1);
  return this.replace(/ *\. */g, function (txt) {
    return '. ' + txt.replace('.', '').trim().charAt(0).toUpperCase() + ' ';
  });
};

// Ces trois méthodes vont catch la plupart des erreurs et donner plus de détails à leur propos.
// Premièrement, gérons les erreur `uncaughtException`
process.on('uncaughtException', (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
  console.error('Uncaught Exception : ', errorMsg);
  // Always best practice to let the code crash on uncaught exceptions.
  // Because you should be catching them anyway.
  process.exit(1);
});

// Ensuite, gérons les erreurs `unhandledRejection`
process.on('unhandledRejection', (error) => {
  console.log(error);
  console.error("✅ Erreur d'API détéctée : " + error.stack);
  let precisions = '```\nNom : ' + error.name + '\nMessage : ' + error.message;
  if (error.path) precisions = precisions + '\nPath : ' + error.path;
  if (error.code) precisions = precisions + "\nCode d'erreur : " + error.code;
  if (error.method) precisions = precisions + '\nMéthode : ' + error.method;
  const api_error_embed = new MessageEmbed()
    .setColor('#2f3136')
    .setDescription(
      "🔺 **Il y a eu une erreur d'API sur le bot :**\n```js\n" + error + '```'
    )
    .addField('🔺 Précisions :', precisions + '```');

  try {
    client.channels.cache.get('738363648447217695').send(api_error_embed);
  } catch {
    console.log(error, 'Précisions : ' + precisions.replace('```', ''));
  }
});

// Puis enfin gérons les erreurs liées à l'API Discord
let props = require(`./error.js`);
let commandName = props.help.name;

client.utils.set(commandName, props);

// Les commandes et fonctionnalités du bot Assistance.
assistance.on('message', async (message) => {
  if (message.content.startsWith('a!eval')) {
    const args = message.content.split(' ').slice(1);
    if (message.author.id !== '428582719044452352') return;
    /**
     *
     * @param {*} text The text to clean
     * @returns {string}
     */
    const clean = (text) => {
      if (typeof text === 'string')
        return text
          .replace(/`/g, '`' + String.fromCharCode(8203))
          .replace(/@/g, '@' + String.fromCharCode(8203));
      else return text;
    };
    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

      message.channel.send(clean(evaled), { code: 'xl' });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

  function repondre(msg) {
    message.channel.send(msg);
  }

  if (message.channel.type === 'text') {
    let assistant = message.guild.roles.cache.find(
      (r) => r.name === 'Assistant'
    );
    if (message.content.startsWith('a!repondre')) {
      try {
        if (!message.member.roles.cache.has(assistant.id))
          return repondre(
            "Vous ne pouvez pas utiliser cette commande car vous n'êtes pas assistant. Si vous voulez le devenir, rendez-vous dans <#708708443309211728> pour soumettre votre candidature à ce poste (formulaire dans les messages épinglés)."
          );
        if (!message.channel.id === '743778898088558614') {
          return repondre(
            'Utilisez plutôt cette commande dans <#743778898088558614>'
          );
        }
        let args = message.content.slice(2).trim().split(/ +/g);
        args.shift();
        let ID = args.shift();
        let destinataire = (await message.guild.members.fetch(ID)).user;
        if (!destinataire) {
          return repondre(
            "L'ID est incorrect, veuillez réessayer avec le bon ID."
          );
        }
        let toSend = args.join(' ');
        destinataire.send(
          `**(👥 | Assistance des Cités perdues) ${
            message.member.nickname
              ? message.member.nickname
              : message.author.username
          }** : ${toSend}`
        );
        repondre('Votre réponse a bien été envoyée au membre ');
      } catch (err) {
        client.utils.get('error').run(err, message, assistance);
      }
    }

    if (message.content.startsWith('a!fermer')) {
      try {
        if (!message.member.roles.cache.has(assistant.id))
          return repondre(
            "Vous ne pouvez pas utiliser cette commande car vous n'êtes pas assistant. Si vous voulez le devenir, rendez-vous dans <#708708443309211728> pour soumettre votre candidature à ce poste (formulaire dans les messages épinglés)."
          );
        if (!message.channel.id === '743778898088558614') {
          return repondre(
            'Utilisez plutôt cette commande dans <#743778898088558614>'
          );
        }
        let args = message.content.slice(2).trim().split(/ +/g);
        args.shift();
        let destinataire = (await message.guild.members.fetch(args[0])).user;
        destinataire.send(
          "Votre échange avec l'Assistance vient de se terminer. Si vous avez à nouveau besoin d'aide, renvoyez-moi un mp :)"
        );
        repondre(
          `Le billet d'aide de <@${destinataire.id}> a bien été fermé <:check:708245371792523317>`
        );
      } catch (err) {
        client.utils.get('error').run(err, message, assistance);
      }
    }

    if (
      message.content.includes('<@738724269382434836>') ||
      message.content.includes('<@!738724269382434836>')
    ) {
      try {
        if (message.author.bot) return;
        repondre(
          "Besoin d'aide ? **Envoyez-moi un MP** pour contacter les **Assistants** qui se feront un plaisir de vous répondre dans les plus brefs délais !"
        );
        assistance.channels.cache
          .get('574630464745373716')
          .send(
            `J'ai été mentionné par **${message.author.tag}** (ID : ${
              message.author.id
            }, pseudo : ${
              message.member.nickname
                ? message.member.nickname
                : message.author.username
            })`
          );
      } catch (err) {
        client.utils.get('error').run(err, message, assistance);
      }
    }
  }
  if (message.channel.type === 'dm') {
    if (message.author.bot) return;
    if (message.content === 'alldelete') {
      (await message.channel.messages.fetch()).map(async (msg) => {
        if (msg.author.bot) await msg.delete();
      });
    }

    if (
      (await message.channel.messages.fetch({ limit: 2 })).some((msg) =>
        msg.content.includes(
          "Votre échange avec l'Assistance vient de se terminer. Si vous avez à nouveau besoin d'aide, renvoyez-moi un mp :)"
        )
      ) ||
      (await message.channel.messages.fetch()).size === 1
    ) {
      try {
        let assistants = [
            '649345095614726166',
            '758286621510074379',
            '463621512348303360',
            '517282394336919559',
            '703894942216486922',
            '735468423353598004',
            '744899600711942214',
            '726405859365879868',
          ],
          onlines = [],
          mentions = [];

        const promesse = () => {
          assistants.forEach(async (elem) => {
            await client.guilds.cache
              .get('574626014664327178')
              .members.fetch(elem)
              .then((membre) => {
                membre.user.presence.status === 'online'
                  ? onlines.push(membre.id)
                  : undefined;
              });
          });
        };
        await promesse();

        onlines.forEach((el) => mentions.push(`<@${el}>`));

        assistance.channels.cache
          .get('743778898088558614')
          .send(
            `${mentions.join(' ')}\n**Nouvelle demande d'aide de <@${
              message.author.id
            }> (ID : ${message.author.id}):**\n${message.content}`
          );
        return repondre(
          `**Votre demande d'aide a été envoyée à l'Assistance des Cités perdues avec succès !** :white_check_mark:\nVous recevrez une réponse d'un assistant dans les plus brefs délais.`
        );
      } catch (err) {
        client.utils.get('error').run(err, message, assistance);
      }
    } else {
      return assistance.channels.cache
        .get('743778898088558614')
        .send(
          `**(Membre) <@${message.author.id}> (${message.author.id}) :**\n${message.content}`
        );
    }
  }
});

// Événement ready du bot Assistance.
assistance.on('ready', () => {
  const chalk = require('chalk');
  const moment = require('moment');
  const timestamp = `[${moment().format('DD-MM-YYYY HH:mm:ss')}]:`;
  client.loguer(
    `${timestamp} ${chalk.black.bgGreen(
      'ready'.toUpperCase()
    )} Assistance prête !`
  );
  assistance.user.setActivity({
    name: 'Envoyez-moi un mp pour contacter les assistants',
    type: 'PLAYING',
  });
});

assistance.on('message', async (message) => {
  const Classe = new (require('./message-assistance'))();
  await Classe.run(message);
});

client.on('message', async (message) => {
  try {
    if (
      message.channel.id === '790907743812190248' &&
      message.author.username.trim() !== 'Coda'
    ) {
      let authorRoles = message.member.roles.cache.array(),
        content = message.content;
      if (content.startsWith('>')) content = '\n' + content;

      if (content.length > 1600) {
        let content1 = content.slice(0, 1500),
          content2 = content.slice(1500);

        let isAdmin = false,
          isMod = false;
        await authorRoles.forEach((r) => {
          if (r.name.toLowerCase().includes('administrateur')) {
            isAdmin = true;
          }
        });
        await authorRoles.forEach((r) => {
          if (r.name.toLowerCase().includes('modérateur')) {
            isMod = true;
          }
        });
        let msg = `**(${
          isAdmin ? 'Administrateur' : isMod ? 'Modérateur' : 'Membre'
        }) ${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        } :** ${content1}`;

        client.channels.cache
          .get('790898364757049345')
          .send(msg)
          .then((m) => m.channel.send(content2));
      } else {
        let isAdmin = false,
          isMod = false;
        await authorRoles.forEach((r) => {
          if (r.name.toLowerCase().includes('administrateur')) {
            isAdmin = true;
          }
        });
        await authorRoles.forEach((r) => {
          if (r.name.toLowerCase().includes('modérateur')) {
            isMod = true;
          }
        });

        let msg = `**(${
          isAdmin ? 'Administrateur' : isMod ? 'Modérateur' : 'Membre'
        }) ${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        } :** ${content}`;

        if (message.attachments.first()) {
          let fichiers = [];
          message.attachments.forEach((att) => {
            fichiers.push(att);
          });
          client.channels.cache
            .get('790898364757049345')
            .send(msg, { files: fichiers });
        } else {
          client.channels.cache.get('790898364757049345').send(msg);
        }
      }
    } else if (
      message.channel.id === '790898364757049345' &&
      message.content !== '' &&
      message.author.id !== client.user.id
    ) {
      let msg = message.content;
      if (message.attachments.first()) {
        let fichiers = [];
        message.attachments.forEach((att) => {
          fichiers.push(att);
        });
        client.channels.cache
          .get('790907743812190248')
          .send(msg, { files: fichiers });
      } else {
        client.channels.cache.get('790907743812190248').send(msg);
      }
    }
  } catch {}
});

// Affichons en console les différentes données d'utilisation du script.
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(
  `Le script utilise plus ou moins ${Math.round(used * 100) / 100} MB`
);

const use = process.memoryUsage();
for (let key in use) {
  console.log(`${key} ${Math.round((use[key] / 1024 / 1024) * 100) / 100} MB`);
}

// Affichons en console la liste des packages installés.
const packages = require(path.dirname(require.main.filename) + '/package.json');

let dependencies = Object.keys(packages.dependencies);
let result = '';
for (let i = 0; i < dependencies.length; i++) {
  let dependency = dependencies[i];
  result += dependency + ' - ' + packages['dependencies'][dependency] + '\n';
}
console.log(result);

setTimeout(() => {
  function initDatabases() {
    for (const [key, value] of Object.entries(
      require('./databases/warns.json')
    )) {
      client.warns.set(key, value.sanctions);
      client.immus.set(key, value.immunisation);
    }
    client.logger.log('Bases de données initialisées');
  }
  initDatabases();
}, 20000);

// Exportons le client.
module.exports = { client };
