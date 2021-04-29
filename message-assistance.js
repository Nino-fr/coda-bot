const { Message, MessageEmbed } = require('discord.js'),
  { client } = require('./index.js'),
  prefix = 'a!';

module.exports = class {
  constructor() {
    this.client = client;
  }

  /**
   *
   * @param { Message } message Le message
   */
  async run(message) {
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)
      .slice(1);

    /** Le premier message du règlement
     * @type {Message}
     */
    /* let firstMes = await message.guild.channels.cache
      .get('604342473363554315')
      .messages.fetch('779741285241585681'); */

    /** Le deuxième message du règlement
     * @type {Message}
     */
    /* let scndMes = await message.guild.channels.cache
      .get('604342473363554315')
      .messages.fetch('779486607379267615');
 */
    /* let intro = firstEmbed.fields[0],
      article1 = firstEmbed.fields.slice(1, 10),
      article2 = firstEmbed.fields.slice(10, 14),
      article3 = firstEmbed.fields.slice(14, 16),
      article4 = embed.fields.slice(0, 5),
      article5 = embed.fields.slice(5, 9); */

    if (message.content === 'a!reglement') {
      message.channel
        .send({
          embed: {
            title: ':page_with_curl: Règlement',
            description:
              '***Voici le règlement de ce serveur. Ce sont les règles primordiales à respecter pour passer un bon moment ici. Des sanctions peuvent être appliquées en cas de non-respect, il est donc très important de tout lire.***',
            fields: [
              {
                name: 'Introduction - Discord',
                value: `Respecter la [Charte d’Utilisation de la Communauté](https://discord.com/guidelines) et les [Conditions d'utilisation](https://discord.com/terms) de Discord est obligatoire. Des sanctions plus ou moins lourdes peuvent être appliquées en cas de non-respect de ces règles. Si l'infraction est très grave, nous procéderons à un signalement auprès de l’équipe Confiance et Sécurité de Discord.`,
              },
              {
                name: ':busts_in_silhouette: Article 1 - Membres',
                value: `1.1 • Soyez polis et courtois entre vous. Aucune insulte n'est tolérée. Vous avez le droit de ne pas être d'accord, mais vous n'avez pas à insulter la personne à qui vous écrivez. Faites également attention à votre orthographe. Nous ne demandons pas d'être parfait, c'est impossible, mais nous vous demandons d'utiliser un minimum le langage SMS. Nous ne sommes pas là pour vous déchiffrer, mais pour vous comprendre.`,
              },
              {
                name: '\u200b',
                value:
                  "1.2 • Il est fortement désapprouvé de quitter puis rejoindre le serveur de manière répétitive. Agir ainsi peut vous faire bannir des Cités perdues. Ce n'est pas un jeu.",
              },
              {
                name: '\u200b',
                value:
                  '1.3 • Pas de propos discriminatoire, xénophobe, sexiste, pornographique, climatosceptique, nazis, dénigrant etc.',
              },
              {
                name: '\u200b',
                value:
                  '1.4 • Pas de politique sauf dans <#620648563537346560>.',
              },
              {
                name: '\u200b',
                value:
                  '1.5 • Aucune discussion de tout ce qui est illégal, que ce soit de vente, échange ou autre.',
              },
              {
                name: '\u200b',
                value:
                  "1.6 • Le flood (quand plusieurs messages inutiles sont envoyés à la chaine) et le spam (de toute sorte) seront sanctionnés d'un mute sans sommation.",
              },
              {
                name: '\u200b',
                value:
                  "1.7 • Nous vous demandons un profil correct. Toute photo de profil/statut inapproprié(e) sera sanctionnée d'un avertissement, puis d'un kick si l'avertissement n'est pas pris en compte. Il en va de même pour votre pseudo. Nous changerons tous les pseudos que nous jugerons inappropriés. Essayez que votre pseudo ne contienne pas de chiffres ou de caractères spéciaux sauf autorisation du conseil. Votre pseudo doit également être lisible facilement et ne doit pas contenir le nom d'un personnage de Gardiens des cités perdues, d'une team ou autre chose. Vous ne pouvez être un personnage de la série.",
              },
              {
                name: '\u200b',
                value: '1.8 • Les doubles comptes sont interdits.',
              },
              {
                name: '\u200b',
                value:
                  '1.9 • Pour éviter de réveiller les gens qui dorment avec leur téléphone portable à côté et qui laissent la sonnerie, nous interdisons toutes les mentions envers les membres inactifs tous les jours de la semaine (week-end compris) entre 21h et 8h30.',
              },
              {
                name: ':newspaper: Article 2 - PUBLICITÉ',
                value:
                  '2.1 • La publicité se fait uniquement dans <#605399701042233345>. Toute pub en dehors de ce salon sera supprimée.',
              },
              {
                name: '\u200b',
                value:
                  '2.2 • Les pubs concernant Wattpad se font dans <#602912210234114048> ou <#704015946540646491> en fonction du type de pub.',
              },
              {
                name: '\u200b',
                value:
                  "2.3 • Les pubs en messages privés sont interdites sauf avec l'accord du destinataire. Une plainte peut être déposée **si** c'est une récidive **et** que la première fois, le destinataire avait bien dit qu'il ne voulait plus de pub en MP. Celui qui a alors envoyé la pub peut alors recevoir un warn (premièrement), puis une sanction plus importante si récidive.",
              },
              {
                name: '\u200b',
                value:
                  "2.4 • Merci d'accompagner les pubs d'un message explicatif dans <#605399701042233345>. Ne mettre que le lien ne sert à rien. Les pubs ne respectant pas cette règle seront supprimées.",
              },
              {
                name: ':question: Article 3 - Aide',
                value:
                  "3.1 • Pour recevoir de l'aide, suivez ce qui est expliqué dans le <#748519036433727588> dans la partie [Le système d'Assistance](https://discord.com/channels/574626014664327178/748519036433727588/748530703964045322). Il est défendu d'ouvrir un billet d'aide pour une question ne concernant pas le serveur et il est également défendu de se rendre dans <#604300282754760714> pour une question sur le serveur.",
              },
              {
                name: '\u200b',
                value:
                  "3.2 • Il est fortement désapprouvé d'envoyer des messages privés au bot <@738724269382434836> juste pour dire bonjour. Ne dérangez pas les assistants juste pour discuter, il y a des salons pour ça.",
              },
            ],
            color: 0xdaa520,
            thumbnail: {
              url: message.guild.iconURL({ format: 'png', dynamic: true }),
            },
          },
        })
        .then((msg) => {
          msg.channel.send({
            embed: {
              fields: [
                {
                  name: ':man_police_officer: Article 4 - Staff',
                  value: `__**Le staff est constitué des conseillers et émissaires.**__`,
                },
                {
                  name: '\u200b',
                  value:
                    "4.1 • Il est interdit de mentionner les membres du staff pour rien ou pour de l'aide. Les <@&605742116127375362>s sont là pour être mentionnés si besoin d'aide. Les membres du staff ne peuvent être mentionnés que si un membre enfreint le règlement ou si il y a un problème dans le serveur. Sauf si c'est pendant le couvre-feu (21h-8h) : ne mentionnez alors le staff qu'en cas d'urgence !",
                },
                {
                  name: '\u200b',
                  value:
                    "4.2 • Sachez qu'un modérateur a toujours raison, même quand il a tort. S'il décide que vous avez enfreint le règlement d'une quelconque manière, vous ne pouvez en aucun cas le contredire. Seul un conseiller pourrait le faire.",
                },
                {
                  name: '\u200b',
                  value:
                    '4.3 • Il est interdit de manquer de respect à un membre du staff, le non-respect de cette règle entrainera diverses sanctions au choix du modérateur.',
                },

                {
                  name:
                    '<:sophiefoster:596718552497782815> Article 5 - Série Gardiens des Cités perdues',
                  value: `5.1 • Il est interdit de parler des tomes récents de Gardiens des Cités perdues sans censurer toute forme de spoil (faites comme ça : \`||spoil||\`--> ||spoil||).`,
                },
                {
                  name: '\u200b',
                  value:
                    '5.2 • Merci de ne partager vos théories sur les prochains tomes que dans <#602819462458245120> et de respecter la règle précédente dans ce salon également.',
                },
                {
                  name: '\u200b',
                  value:
                    '5.3 • Il est naturellement obligatoire d’avoir lu au moins un tome de la série pour être ici. Le non respect de cette règle entraînera une expulsion immédiate.',
                },

                {
                  name: '\u200b',
                  value: `**Le non-respect de ces règles entrainera diverses sanctions.**

__**Voici une explication détaillée des sanctions :**__

**Le mute :** Sanction qui vous empêche d'envoyer des messages sur le serveur pour une durée qu'aura déterminée le modérateur qui vous a mute. (Prononcer mioute, à l'anglaise).

**Le warn :** Avertissement qui sera immédiatement inscrit dans votre "casier judiciaire". Faites \`&warns\` pour consulter tous vos avertissements.

**Le kick :** Expulsion du serveur. Possibilité de revenir si vous possédez toujours le lien d'invitation du serveur. Ne peut être effectué que par un conseiller.

**Le ban :** Expulsion définitive du serveur, sans possibilité de retour même par un lien d'invitation. Ne peut être décidé que par un vote à l'unanimité du conseil. Sanction très rare.`,
                },
              ],
              footer: {
                text: 'Règlement du serveur',
                icon_url: message.guild.iconURL(),
              },
              color: 0xdaa520,
            },
          });
        });
    }

    if (message.content.startsWith(prefix + 'modifirst')) {
      /**
       * @type {Message}
       */
      let msg = await message.guild.channels.cache
        .get('604342473363554315')
        .messages.fetch('779741285241585681');
      let embed = new MessageEmbed(msg.embeds[0]);
      embed.fields[parseInt(args[0])].value = args.slice(1).join(' ');

      await msg.edit({ embed: embed });
      return message.channel.send(
        ":white_check_mark: L'article du règlement a bien été modifié !"
      );
    }

    if (message.content.startsWith(prefix + 'modifsec')) {
      /**
       * @type {Message}
       */
      let msg = await message.guild.channels.cache
        .get('604342473363554315')
        .messages.fetch('779741286637895722');
      let embed = new MessageEmbed(msg.embeds[0]);
      embed.fields[parseInt(args[0])].value = args.slice(1).join(' ');

      await msg.edit({ embed: embed });
      return message.channel.send(
        ":white_check_mark: L'article du règlement a bien été modifié !"
      );
    }

    if (message.content.startsWith(prefix + 'delfirst')) {
      /**
       * @type {Message}
       */
      let msg = await message.guild.channels.cache
        .get('604342473363554315')
        .messages.fetch('779741285241585681');
      let embed = new MessageEmbed(msg.embeds[0]);
      embed.spliceFields(parseInt(args[0]), 1);

      await msg.edit({ embed: embed });
      return message.channel.send(
        ":white_check_mark: L'article du règlement a bien été supprimé !"
      );
    }

    if (message.content.startsWith(prefix + 'delsec')) {
      /**
       * @type {Message}
       */
      let msg = await message.guild.channels.cache
        .get('604342473363554315')
        .messages.fetch('779741286637895722');
      let embed = new MessageEmbed(msg.embeds[0]);
      embed.spliceFields(parseInt(args[0]), 1);

      await msg.edit({ embed: embed });
      return message.channel.send(
        ":white_check_mark: L'article du règlement a bien été supprimé !"
      );
    }

    /* if (message.content.startsWith(prefix + 'addarticle')) {
      let scndEmbed = new MessageEmbed(scndMes.embeds[0]),
        x = parseInt(await args[0]),
        firstEmbed = new MessageEmbed(firstMes.embeds[0]);

      switch (x) {
        case 'Intro':
          break;
        case 1:
          break;
        case 2:
          firstEmbed.fields[]
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        default:
          return message.channel.send(
            'Veuillez renseigner un article valide en premier paramètre de la commande'
          );
      }

      scndEmbed.fields[x].name = args
        .slice(1)
        .join(' ')
        .match(/\[([^\]]+)\]/i)[1];
      scndEmbed.fields[x].value = args
        .slice(1)
        .join(' ')
        .match(/\[([^\]]+)\]/gi)[2];

      await scndMes.edit({ embed: scndEmbed });
      await firstMes.edit({ embed: firstEmbed });
      return message.channel.send(
        ":white_check_mark: L'article du règlement a bien été ajouté !"
      );
    } */
  }
};
