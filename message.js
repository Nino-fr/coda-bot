const { Message, TextChannel, Webhook } = require('discord.js'),
  { client } = require('./index.js'),
  prefix = client.config.settings.prefix,
  OwnerID = client.config.ownerID,
  { normalize } = require('./fonctions');

moment.locale('fr');

module.exports = class {
  constructor() {
    this.client = client;
  }
  /**
   *
   * @param { Message } message Le message
   */
  async run(message) {
    const repondre = (msg) => {
      message.channel.send(msg);
    };
    // Le bot check à chaque message si son statut est toujours là, car le statut disparaît de temps en temps
    if (this.client.user.presence.activities[0] === '') {
      this.client.user.setStatus('online');
    }
    // Si le contenu du message est "postcode", le bot envoie un embed expliquant comment partager du code sur Discord.
    if (message.content === 'postcode') {
      return client.repondre(message, {
        embed: {
          color: 2860732,
          title: `:handshake: Aide à l'envoi de code`,
          description:
            '__**Pour formater votre code sur Discord :**__\n\n> \\`\\`\\`langage\n> Code à formater\n> \\`\\`\\`\n\n__Exemple :__\n\n> \\`\\`\\`js\n> console.log("Je suis un exemple de code");\n> \\`\\`\\`\n```js\nconsole.log("Je suis un exemple de code");\n```\n\nSi le code est trop grand (+ de 2000 caractères), vous avez une liste de sites ci-dessous pour déposer votre code.\n\n__**Liste de sites pour déposer votre code :**__\n\n>> [sourcebin](http://sourceb.in)\n>> [hastebin](https://hasteb.in)\n>> [gist](https://gist.github.com)',
        },
      });
    }
    // Deux conditions créant une prévisualisation des liens Discord vers des messages.
    if (message.content.includes('https://discord.com/channels/')) {
      try {
        if (message.author.bot) return;

        let n = message.content.indexOf('h', 'https');
        let mmm = message.content.substr(n, 85);
        let serveurid = mmm.substring(29, 47);
        let serveur = client.guilds.cache.get(serveurid);
        let salonid = mmm.substring(48, 66);
        let messageid = mmm.substring(67, 86);
        /**
         * @type {TextChannel}
         */
        let salon = client.channels.cache.get(salonid);
        let lien = mmm;
        await salon.messages.fetch(messageid).then((m) => {
          let mEmbed = {
            color: 12124160,
            title: `Message de ${m.author.tag}`,
            description: `${m.content}\n\n[Sauter vers le message](${lien})`,
            footer: {
              text: `Message du serveur ${serveur.name} dans le salon ${salon.name}`,
            },
            timestamp: new Date(),
          };
          if (m.attachments.first())
            mEmbed.image = { url: m.attachments.first().url };

          if (m.content && m.content !== '')
            message.channel.send({
              embed: mEmbed,
            });
          if (m.embeds.length !== 0) {
            client.repondre(
              message,
              'Ce message contenait un embed. En voici une représentation ci-dessous.'
            );
            return message.channel.send({
              embed: m.embeds[0],
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    // La deuxième condition qui fait pareil mais avec les liens `discordapp.com`
    if (message.content.includes('https://discordapp.com/channels/')) {
      try {
        if (message.author.bot) return;

        let n = message.content.indexOf('h', 'https');
        let mmm = message.content.substr(n, 88);
        let serveurid = mmm.substring(32, 50);
        let serveur = client.guilds.cache.get(serveurid);
        let salonid = mmm.substring(51, 69);
        let messageid = mmm.substring(70, 89);
        /**
         * @type {TextChannel}
         */
        let salon = client.channels.cache.get(salonid);
        let lien = mmm;
        await salon.messages.fetch(messageid).then((m) => {
          let mEmbed = {
            color: 12124160,
            title: `Message de ${m.author.tag}`,
            description: `${m.content}\n\n[Sauter vers le message](${lien})`,
            footer: {
              text: `Message du serveur ${serveur.name} dans le salon ${salon.name}`,
            },
            timestamp: new Date(),
          };
          if (m.attachments.first())
            mEmbed.image = { url: m.attachments.first().url };

          if (m.content && m.content !== '')
            message.channel.send({
              embed: mEmbed,
            });

          if (m.embeds.length !== 0) {
            client.repondre(
              message,
              'Ce message contenait un embed. En voici une représentation ci-dessous.'
            );
            return message.channel.send({
              embed: m.embeds[0],
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Corriger l'orthographe du mot `length`, n'est pas spécialement utile
    if (
      message.content.includes('lenght' || 'lenhgt' || 'lenhgt' || 'lenhtg')
    ) {
      try {
        if (message.author.bot) return;
        return client.repondre(
          message,
          ":warning: Ce n'est pas `lenght` ni une autre écriture, mais c'est `length`."
        );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    // Une commande envoyant un message vide
    if (message.content.startsWith(prefix + 'rien')) {
      try {
        client.repondre(message, '__\n__');
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    // Deux conditions permettant d'envoyer un embed de prévisualisation des liens YouTube
    if (/https\:\/\/youtu\.be\/[\w\d\-]+/.test(message.content)) {
      // const { convertMS } = require('./fonctions');

      let regYt = /https\:\/\/youtu\.be\/[\w\d\-]+/;
      let url = message.content.match(regYt);
      let videoId = message.content
        .match(regYt)
        .toString()
        .match(/(?<=https\:\/\/youtu\.be\/)[\w\d\-]+/)
        .toString();
      const axios = require('axios');
      let ytdvideo = await axios.default.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyBIvSnYmTSRxjnyeDf106P1FsBqkngTKXs`
      );
      let likeCount = ytdvideo.data.items[0].statistics.likeCount;
      let dislikeCount = ytdvideo.data.items[0].statistics.dislikeCount;
      let views = ytdvideo.data.items[0].statistics.viewCount;
      let commentCount = ytdvideo.data.items[0].statistics.commentCount;

      let title, description, owner, urlowner, duration, totalduration;
      const fetchVideoInfo = require('updated-youtube-info');
      await axios.default
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${videoId}&key=AIzaSyBIvSnYmTSRxjnyeDf106P1FsBqkngTKXs`
        )
        .then((res) => {
          let info = res.data;
          let item = info.items[0].snippet,
            channelId = item.channelId;
          description = item.description;
          title = item.title;
          owner = item.channelTitle;
          totalduration = info.items[0].contentDetails.duration
            .replace(/(\d+)M/i, ` $1 minutes`)
            .replace(/(\d+)S/i, ` $1 secondes`)
            .replace(/(\d+)H/i, `$1 heures,`)
            .replace('PT', '');

          urlowner = `https://www.youtube.com/channel/${channelId}`;
        });

      let video = await fetchVideoInfo(videoId);
      message.channel.send({
        embed: {
          description: `**[${title}](${url})**\n  par **[${owner}](${urlowner})**`,
          fields: [
            {
              name: 'Description',
              value:
                description.length > 900
                  ? description.slice(0, 900).split(/ +/g).splice(1).join(' ') +
                    ` [\[...\]](${url})`
                  : description,
            },
            {
              name: '⏲️ Durée de la vidéo',
              value: totalduration,
              inline: true,
            },
            {
              name: ':thumbsup: Likes',
              value: likeCount,
              inline: true,
            },
            {
              name: '__\n__',
              value: '__\n__',
              inline: false,
            },
            {
              name: ':eyes: Vues',
              value: views,
              inline: true,
            },
            {
              name: ':thumbsdown: Dislikes',
              value: dislikeCount,
              inline: true,
            },
            {
              name: ':pencil: Commentaires',
              value: commentCount,
            },
          ],
          thumbnail: { url: video.thumbnailUrl },
          footer: {
            text: `Date de publication : ${video.datePublished}`,
          },
          color: 0x1f75fe,
        },
      });
    }
    if (
      /https\:\/\/www\.youtube\.com\/watch\?v\=[\w\d\-]+/.test(message.content)
    ) {
      let regYt = /https\:\/\/www\.youtube\.com\/watch\?v\=[\w\d\-]+/;
      let url = message.content.match(regYt);
      let videoId = message.content
        .match(regYt)
        .toString()
        .match(/(?<=https:\/\/www.youtube.com\/watch\?v=)[\w\d\-]+/)
        .toString();
      const axios = require('axios');
      let ytdvideo = await axios.default.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyBIvSnYmTSRxjnyeDf106P1FsBqkngTKXs`
      );
      ytdvideo = ytdvideo.data;
      console.log(ytdvideo);
      let likeCount = ytdvideo.items[0].statistics.likeCount;
      let dislikeCount = ytdvideo.items[0].statistics.dislikeCount;
      let views = ytdvideo.items[0].statistics.viewCount;
      let commentCount = ytdvideo.items[0].statistics.commentCount;

      let title, description, owner, urlowner, duration, totalduration;
      const fetchVideoInfo = require('updated-youtube-info');
      await axios.default
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${videoId}&key=AIzaSyBIvSnYmTSRxjnyeDf106P1FsBqkngTKXs`
        )
        .then((res) => {
          let info = res.data;
          let item = info.items[0].snippet,
            channelId = item.channelId;
          description = item.description;
          title = item.title;
          owner = item.channelTitle;
          totalduration = info.items[0].contentDetails.duration
            .replace(/(\d+)M/i, ` $1 minutes`)
            .replace(/(\d+)S/i, ` $1 secondes`)
            .replace(/(\d+)H/i, `$1 heures,`)
            .replace('PT', '');

          urlowner = `https://www.youtube.com/channel/${channelId}`;
        });

      let video = await fetchVideoInfo(videoId);
      message.channel.send({
        embed: {
          description: `**[${title}](${url})**\n  par **[${owner}](${urlowner})**`,
          fields: [
            {
              name: 'Description',
              value:
                description.length > 900
                  ? description.slice(0, 900).split(/ +/g).splice(1).join(' ') +
                    ` [\[...\]](${url})`
                  : description,
            },
            {
              name: '⏲️ Durée de la vidéo',
              value: totalduration,
              inline: true,
            },
            {
              name: ':thumbsup: Likes',
              value: likeCount,
              inline: true,
            },
            {
              name: '__\n__',
              value: '__\n__',
              inline: false,
            },
            {
              name: ':eyes: Vues',
              value: views,
              inline: true,
            },
            {
              name: ':thumbsdown: Dislikes',
              value: dislikeCount,
              inline: true,
            },
            {
              name: ':pencil: Commentaires',
              value: commentCount,
            },
          ],
          thumbnail: { url: video.thumbnailUrl },
          footer: {
            text: `Date de publication : ${video.datePublished}`,
          },
          color: 0x1f75fe,
        },
      });
    }
    /**
     *
     * @param { TextChannel } channel Le salon où créer le webhook
     * @param { string } title Le nom du Webhook
     * @param { string } msg Le message à envoyer
     * @param { string } avatar Le lien de l'avatar
     * @returns { Webhook }
     */
    function hook(
      channel = message.channel,
      title = 'Captain hook',
      msg = 'Hello World',
      avatar = 'https://cdn.discordapp.com/attachments/659433619881984021/734393942463741993/unnamed.jpg'
    ) {
      avatar = avatar.replace(/\s/g, '');

      channel.fetchWebhooks().then((webhooks) => {
        let foundHook = webhooks.find((web) => web.name === title);

        if (!foundHook) {
          channel
            .createWebhook(
              title,
              'https://cdn.discordapp.com/attachments/659433619881984021/734393942463741993/unnamed.jpg'
            )
            .then((webhook) => {
              webhook
                .send(msg, {
                  username: title,
                  avatarURL: avatar,
                })
                .then(() =>
                  webhook.delete('Libérer de la place, inutile de le laisser')
                );
            });
        } else {
          foundHook
            .send(msg, {
              username: title,
              avatarURL: avatar,
            })
            .then(() =>
              foundHook.delete('Libérer de la place, inutile de le laisser')
            );
        }
      });
    }
    // Permettre aux membres d'envoyer des emojis animés/d'un autre serveur du bot. Le bot supprime les messages contenant {{emoji: lenomdelemoji}}
    // (remplacer lenomdelemoji par le nom de l'emoji souhaité) et qui renvoie un webhook ayant l'apparence du membre avec le même message où a été remplacé le {{emoji: lenomdelemoji}}
    let regEmoji = /\{ ?\{ ?emoji ?: ?[^\{\}]+ ?\} ?\}/g;
    if (regEmoji.test(message.content)) {
      try {
        if (message.author.bot) return;
        let newContent = message.content;
        message.content.match(regEmoji).forEach(async (matched) => {
          let emojiName = matched
            .toString()
            .match(/[^\{\}]+/)
            .toString()
            .substr(6)
            .trim();
          let emoji = client.emojis.cache.find((em) => em.name === emojiName);
          if (emoji === undefined || emoji === null) return;
          newContent = emoji.animated
            ? newContent.replace(regEmoji, `<a:${emoji.name}:${emoji.id}>`)
            : newContent.replace(regEmoji, `<:${emoji.name}:${emoji.id}>`);
        });
        await message.delete();
        hook(
          message.channel,
          message.member.nickname
            ? message.member.nickname
            : message.author.username,
          newContent,
          message.author.avatarURL({ format: 'png' })
        );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    // Faire réagir le bot à un message. Peut réagir avec des émojis animés.
    if (message.content.startsWith(prefix + 'react')) {
      try {
        if (message.author.bot) return;
        let args = message.content.slice(1).trim().split(/ +/g);
        args.shift();
        await message.delete();
        let emoji =
          client.emojis.cache.find((em) => em.name === args[0]) ||
          client.emojis.cache.get(args[0]);
        let msg = await message.channel.messages.fetch(args[1]);
        await msg.react(emoji.id);
      } catch {}
    }
    if (message.content.toLowerCase() === prefix + 'selfrole percy jackson') {
      try {
        let mem = message.member;
        let role = message.guild.roles.cache.find(
          (r) => r.name === 'Percy Jackson'
        );
        if (!role)
          return () => message.channel.send('Aucun rôle ne porte ce nom.');
        if (mem.roles.cache.has(role.id))
          return message.channel.send('Vous possédez déjà ce rôle !');
        mem.roles
          .add(role.id)
          .then(() =>
            message.channel.send(
              'Je vous ai bien ajouté le rôle Percy Jackson !'
            )
          );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    if (
      message.content.toLowerCase() ===
      prefix + "selfrole les travaux d'apollon"
    ) {
      try {
        let mem = message.member;
        let role = message.guild.roles.cache.find(
          (r) => r.name === "Les travaux d'Apollon"
        );
        if (!role)
          return () => message.channel.send('Aucun rôle ne porte ce nom.');
        if (mem.roles.cache.has(role.id))
          return message.channel.send('Vous possédez déjà ce rôle !');
        mem.roles
          .add(role.id)
          .then(() =>
            message.channel.send(
              "Je vous ai bien ajouté le rôle Les Travaux d'Apollon !"
            )
          );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    if (message.content.toLowerCase() === prefix + 'selfrole magnus chase') {
      try {
        let mem = message.member;
        let role = message.guild.roles.cache.find(
          (r) => r.name === 'Magnus Chase'
        );
        if (!role)
          return () => message.channel.send('Aucun rôle ne porte ce nom.');
        if (mem.roles.cache.has(role.id))
          return message.channel.send('Vous possédez déjà ce rôle !');
        mem.roles
          .add(role.id)
          .then(() =>
            message.channel.send(
              'Je vous ai bien ajouté le rôle Magnus Chase !'
            )
          );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    if (
      message.content.toLowerCase() ===
      prefix + 'selfrole les chroniques de kane'
    ) {
      try {
        let mem = message.member;
        let role = message.guild.roles.cache.find(
          (r) => r.name === 'Les chroniques de Kane'
        );
        if (!role)
          return () => message.channel.send('Aucun rôle ne porte ce nom.');
        if (mem.roles.cache.has(role.id))
          return message.channel.send('Vous possédez déjà ce rôle !');
        mem.roles
          .add(role.id)
          .then(() =>
            message.channel.send(
              'Je vous ai bien ajouté le rôle Les chroniques de Kane !'
            )
          );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    if (
      message.content.toLowerCase() ===
      prefix + "selfrole héros de l'olympe"
    ) {
      try {
        let mem = message.member;
        let role = message.guild.roles.cache.find(
          (r) => r.name === "Héros de l'Olympe"
        );
        if (!role)
          return () => message.channel.send('Aucun rôle ne porte ce nom.');
        if (mem.roles.cache.has(role.id))
          return message.channel.send('Vous possédez déjà ce rôle !');
        mem.roles
          .add(role.id)
          .then(() =>
            message.channel.send(
              "Je vous ai bien ajouté le rôle Héros de l'Olympe !"
            )
          );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    // Condition censurant les liens d'invitation Discord n'étant pas envoyés dans les bons salons.
    let invitationlink = /(?:https?:\/\/)?discord.gg\/[\w\d]+/gim;
    if (invitationlink.test(message.content)) {
      if (
        !message.channel.name.includes('pub') &&
        !message.channel.parentID === '596663882425040906'
      ) {
        await message.delete();
        let nom = message.member.nickname
          ? message.member.nickname
          : message.author.username;
        hook(
          undefined,
          nom,
          message.content.replace(invitationlink, '[Invitation]'),
          message.author.displayAvatarURL({ format: 'png' })
        );
      }
    }

    // Censure des liens Wattpad n'étant pas envoyés dans les salons pub.
    let wattylink = /https:\/\/www.wattpad.com\/user\/[\w\d-,\.]+/gi;
    let storylink = /https:\/\/www.wattpad.com\/story\/\d+\-[^\s]+/gi;
    let mywtt = /https:\/\/my.w.tt\/[^ ]+/gi;
    if (
      wattylink.test(message.content) ||
      storylink.test(message.content) ||
      mywtt.test(message.content)
    ) {
      if (
        !message.channel.name.includes('pub') &&
        !message.channel.name.includes('partage')
      ) {
        await message.delete();
        let nom = message.member.nickname
          ? message.member.nickname
          : message.author.username;
        return hook(
          message.channel,
          nom,
          message.content
            .replace(wattylink, '[Pub profil Wattpad]')
            .replace(storylink, '[Pub histoire Wattpad]')
            .replace(mywtt, '[Pub Wattpad]'),
          message.author.displayAvatarURL({ format: 'png' })
        );
      }
    }

    // Le rôle modérateur
    const modo = message.guild.roles.cache.find((r) =>
      r.name.toLowerCase().includes('modérateur')
    );
    // Mettre à jour les permissions du rôle modérateur
    if (message.content === 'updatemodo') {
      message.guild.channels.cache.forEach(async (ch) => {
        if (
          ch.name !== 'conseil' &&
          !ch.name.includes('château') &&
          !ch.name.includes('annonce') &&
          !ch.name.includes('événements') &&
          !ch.name.includes('sommaire')
        ) {
          await ch.updateOverwrite(modo, {
            VIEW_CHANNEL: true,
            EMBED_LINKS: true,
            SEND_MESSAGES: true,
            SEND_TTS_MESSAGES: true,
            MENTION_EVERYONE: true,
            MANAGE_MESSAGES: true,
            MUTE_MEMBERS: true,
            MOVE_MEMBERS: true,
            MANAGE_WEBHOOKS: true,
            ADD_REACTIONS: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
            USE_EXTERNAL_EMOJIS: true,
            PRIORITY_SPEAKER: true,
            DEAFEN_MEMBERS: true,
            SPEAK: true,
            CONNECT: true,
            CREATE_INSTANT_INVITE: true,
            ADMINISTRATOR: false,
            USE_VAD: true,
          });
        }
      });
      await modo.setPermissions([
        'ADD_REACTIONS',
        'ATTACH_FILES',
        'CHANGE_NICKNAME',
        'CONNECT',
        'CREATE_INSTANT_INVITE',
        'DEAFEN_MEMBERS',
        'EMBED_LINKS',
        'MANAGE_MESSAGES',
        'MANAGE_NICKNAMES',
        'MANAGE_WEBHOOKS',
        'MENTION_EVERYONE',
        'MOVE_MEMBERS',
        'MUTE_MEMBERS',
        'PRIORITY_SPEAKER',
        'READ_MESSAGE_HISTORY',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'SPEAK',
        'STREAM',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_AUDIT_LOG',
        'VIEW_CHANNEL',
        'VIEW_GUILD_INSIGHTS',
      ]);
    }
    // Quitter le serveur dans lequel a été envoyé le message
    if (message.content === prefix + 'leave') {
      client.guilds.cache.forEach(async (g) => {
        if (g.id !== '574626014664327178' && g.id !== '707875749343789066')
          await g.leave();
      });
    }
    // Obtenir la liste des émojis d'un serveur (remplacer "Brol" par le nom du serveur).
    if (message.content === prefix + 'listemojis') {
      let guilde = client.guilds.cache.find((g) => g.name === 'Brol');
      repondre(guilde.emojis.cache.map((e) => `${e.name} : ${e.id}`));
    }
    // Liste des membres étant depuis plus de six mois dans le serveur.
    if (message.content === prefix + 'anciens') {
      let guild = message.guild;
      let anciensarray = [];
      guild.members.fetch().then((mems) =>
        mems.forEach((mem) => {
          if (Date.now() - mem.joinedTimestamp >= 15778800000) {
            anciensarray.push(mem.user.tag);
          }
        })
      );
      repondre(anciensarray.join('\n'));
    }
    // Déclarer les args
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    // Enlever le nom de la commande des args
    args.shift();

    // Changer le statut du bot. Envoyer `${prefix}status idle|dnd|online|invisible`
    if (message.content.startsWith(`${prefix}status`)) {
      if (!message.author.id === OwnerID) return;
      message.delete();
      await client.user.setStatus(args[0].toLowerCase());
    }

    // Sanctionner les messages contenant plus de huit mentions et n'étant pas envoyé par un admin ou un modérateur.
    if (message.mentions.members.size > 8) {
      if (
        message.member.roles.cache.has(modo.id) ||
        message.member.permissions.has('ADMINISTRATOR')
      )
        return;
      repondre(
        'Non mais oh ! Du calme sur les mentions ! ' // Ajouter peut-être "Je te mets un warn, ça t'apprendra."
      );
      //   warnMember(message.member, 'Plus de cinq mentions dans un seul message.');
    }

    // Censurer les insultes/mots grossiers.
    let bdw = /(?:(?:conna(?:r|s)(?:s|d|e))|(?:(?:s+a+l+o+p+e+)(?!t+e*))|(?:e+ncu+l[ée]*)|(?:(?<!\w)pu+t+e+s*)|(?:fd+p+))/gi;
    if (bdw.test(message.content)) {
      // if (message.member.roles.cache.has(modo.id)) return;
      /* repondre("Surveille ton langage ! Pour la peine, je te mets un warn !");
      warnMember(message.member, "Grossier personnage"); */
      let nom = message.member.nickname
        ? message.member.nickname
        : message.author.username;
      await message.delete();
      hook(
        undefined,
        nom,
        message.content.replace(bdw, ' [mot grossier]'),
        message.author.displayAvatarURL({ format: 'png' })
      );
    }

    // Commande retenue, permet au personnel de Foxfire de mute les prodiges insolents
    if (message.content.startsWith(prefix + 'retenue')) {
      if (message.guild.id === '574626014664327178') {
        const mentor = message.guild.roles.cache.find(
          (r) => r.name === 'Mentor'
        );
        const dirlo = message.guild.roles.cache.find(
          (r) => r.name === 'Directrice de Foxfire'
        );
        const heraut = message.guild.roles.cache.find(
          (r) => r.name === "Héraut de la Tour d'Argent"
        );

        if (
          message.member.roles.cache.has(mentor.id) ||
          message.member.roles.cache.has(dirlo.id) ||
          message.member.roles.cache.has(heraut.id) ||
          message.member.roles.cache.has(modo.id) ||
          message.member.permissions.has('ADMINISTRATOR')
        ) {
          const puni =
            message.mentions.members.first() ||
            (await message.guild.members.fetch(args[0]));
          const muted = message.guild.roles.cache.find(
            (r) => r.name === 'muted'
          );
          if (!puni) return repondre('Qui dois-je mettre en retenue ?');
          let raison = args.slice(1).join(' ');
          const prodig = message.guild.roles.cache.find(
            (r) => r.name === 'Prodige'
          );
          if (puni.roles.cache.has(prodig.id)) {
            await puni.roles.add(muted.id);
            repondre({
              embed: {
                title: `\`${
                  message.member.nickname
                    ? message.member.nickname
                    : message.author.username
                }\` a mis en retenue \`${
                  puni.nickname ? puni.nickname : puni.user.username
                }\``,
                description: `\`\`\`markdown\n# Temps #\n2h\n# Raison #\n${
                  raison ? raison : 'Aucune'
                }\n\`\`\``,
                color: 6071551,
              },
            });
            setTimeout(function () {
              puni.roles.remove(muted.id);
              repondre(`La retenue de ${puni} est terminée !`);
            }, 120000000);
          } else {
            return repondre(
              'Vous ne pouvez mettre en retenue que les prodiges !'
            );
          }
        } else
          return repondre(
            "Vous n'avez pas le droit de mettre des gens en retenue !"
          );
      } else return repondre('Vous ne pouvez pas mettre des gens en retenue !');
    }

    // Mettre fin à une retenue.
    if (message.content.startsWith(prefix + 'finretenue')) {
      const mentor = message.guild.roles.cache.find((r) => r.name === 'Mentor');
      const dirlo = message.guild.roles.cache.find(
        (r) => r.name === 'Directrice de Foxfire'
      );
      const heraut = message.guild.roles.cache.find(
        (r) => r.name === "Héraut de la Tour d'Argent"
      );

      if (
        message.member.roles.cache.has(mentor.id) ||
        message.member.roles.cache.has(dirlo.id) ||
        message.member.roles.cache.has(heraut.id) ||
        message.member.roles.cache.has(modo.id) ||
        message.member.permissions.has('ADMINISTRATOR')
      ) {
        const puni =
          message.mentions.members.first() ||
          (await message.guild.members.fetch(args[0]));
        const muted = message.guild.roles.cache.find((r) => r.name === 'muted');
        const prodig = message.guild.roles.cache.find(
          (r) => r.name === 'Prodige'
        );
        if (!puni) return repondre('Qui doit arrêter sa retenue ?');
        if (!puni.roles.cache.has(prodig.id))
          return repondre(
            "Cette personne n'est pas un prodige ! Comment pourrait-elle être en retenue ?"
          );
        let raison = args.slice(1).join(' ');
        if (puni.roles.cache.has(muted.id)) {
          await puni.roles.remove(muted.id);
          repondre(
            `Tu as de la chance ${puni} ! ${message.member} a décidé d'arrêter ta retenue pour la raison suivante : ${raison}`
          );
        } else return repondre("Cette personne n'est pas en retenue, voyons !");
      } else return repondre("Tu n'as pas le droit de faire ça !");
    }

    // Faire entrer un prodige dans la noblesse.
    if (message.content.startsWith(prefix + 'noblesse')) {
      const elite = message.guild.roles.cache.find(
        (r) => r.name === 'Élite de Foxfire'
      );
      const noble =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0]));
      if (!noble) return repondre('Veuillez préciser un membre');
      if (!noble.roles.cache.has(elite.id))
        return repondre("Cette personne n'est pas dans l'Élite de Foxfire.");
      const dirlo = message.guild.roles.cache.find(
        (r) => r.name === 'Directrice de Foxfire'
      );
      const heraut = message.guild.roles.cache.find(
        (r) => r.name === "Héraut de la Tour d'Argent"
      );
      if (
        !message.member.roles.cache.has(modo.id) &&
        !message.member.roles.cache.has(dirlo.id) &&
        !message.member.roles.cache.has(heraut.id) &&
        !message.member.permissions.has('ADMINISTRATOR')
      ) {
        return repondre('Vous ne pouvez pas faire ça !');
      }
      const noblesse = message.guild.roles.cache.find(
        (r) => r.name === 'Membre de la noblesse'
      );
      const reg = /<([^>]+)>/;
      const metier = message.guild.roles.cache.find(
        (r) =>
          r.name.toLowerCase() ===
          args
            .slice(1)
            .join(' ')
            .match(reg)
            .toString()
            .match(/[^<>]+/)
            .toString()
            .toLowerCase()
      );
      const talent = message.guild.roles.cache.find(
        (r) =>
          r.name.toLowerCase() ===
          args
            .slice(1)
            .join(' ')
            .match(/<[^>]+> <([^>]+)>/)[1]
            .toLowerCase()
      );
      const prodig = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === 'prodige'
      );
      let newPseudo = args
        .slice(1)
        .join(' ')
        .match(/<[^>]+> <[^>]+> <([^>]+)>/)[1];
      console.log(noblesse, reg, metier, talent, prodig, elite);
      await noble.roles.add(noblesse).catch((e) => console.error(e));
      await noble.roles.add(metier).catch((e) => console.error(e));
      await noble.roles.add(talent).catch((e) => console.error(e));
      await noble.setNickname(newPseudo).catch((e) => console.error(e));
      await noble.roles.remove(elite).catch((e) => console.error(e));
      await noble.roles.remove(prodig).catch((e) => console.error(e));
      repondre(
        `Félicitations ${noble} ! Tu as rejoins la noblesse et obtenu le métier ${metier.name} et le talent ${talent.name}`
      );
    }

    // Permettre au Directeur de Foxfire et au Héraut de pouvoir faire entrer un prodige dans l'élite via une commande
    if (
      message.content.startsWith(prefix + 'elite') ||
      message.content.startsWith(prefix + 'élite')
    ) {
      let member;

      try {
        member =
          message.mentions.members.first() ||
          (await message.guild.members.fetch(args[0]));
      } catch {
        member = member = (
          await message.guild.members.fetch({
            query: args.join(' '),
            limit: 1,
          })
        ).first();
      }
      try {
        if (!member)
          member = (
            await message.guild.members.fetch({
              query: args.join(' '),
              limit: 1,
            })
          ).first();
      } catch {
        return repondre(
          "Veuillez préciser un prodige qui doit rejoindre l'élite !"
        );
      }

      const dirlo = message.guild.roles.cache.get('602823657814753290');
      const heraut = message.guild.roles.cache.find(
        (r) => r.name === "Héraut de la Tour d'Argent"
      );
      if (
        !message.member.roles.cache.has(modo.id) &&
        !message.member.roles.cache.has(dirlo.id) &&
        !message.member.permissions.has('ADMINISTRATOR') &&
        !message.member.roles.cache.has(heraut.id)
      )
        return this.repondre(
          "Vous ne pouvez pas faire entrer quelqu'un dans l'élite ! Pour qui vous vous prenez ?"
        );
      if (!member)
        return repondre(
          "Veuillez préciser un prodige qui doit rejoindre l'élite !"
        );
      if (!member.roles.cache.has('574627365507039242'))
        return repondre(
          "Ce membre n'est pas prodige et ne peut donc pas rejoindre l'élite !"
        );
      if (member.roles.cache.has('724655338556489799'))
        return repondre("Ce membre est déjà dans l'élite !");
      await member.roles.add('724655338556489799').catch((err) => {
        throw err;
      });
      repondre(
        `Félicitations <@${member.id}> ! Te voilà membre de l'Élite de Foxfire, sur le chemin vers la noblesse !`
      );
    }

    // Créer un métier de mentor avec les salons via une commande
    if (message.content.toLowerCase().startsWith(prefix + 'creatementor')) {
      const dirlo = message.guild.roles.cache.find(
          (r) => r.name === 'Directrice de Foxfire'
        ),
        heraut = message.guild.roles.cache.find(
          (r) => r.name === "Héraut de la Tour d'Argent"
        );
      if (
        !message.member.roles.cache.has(modo.id) &&
        !message.member.roles.cache.has(dirlo.id) &&
        !message.member.roles.cache.has(heraut.id) &&
        !message.member.permissions.has('ADMINISTRATOR')
      ) {
        return repondre('Vous ne pouvez pas faire ça !');
      }
      const reg = /<([^>]+)>/;
      if (!reg.test(args.join(' ')))
        return repondre(
          'Veuillez renseigner tous les champs nécessaires : \n`' +
            prefix +
            'creatementor <Nom du rôle du mentor> <couleur du rôle (en MAJ et en anglais ou en (hexa)décimales)> <Nom du salon> <Élèves (prodiges|talent)>`'
        );
      let nom = args
        .join(' ')
        .match(reg)
        .toString()
        .match(/[^<>]+/)
        .toString();

      if (!args.join(' ').match(/<[^>]+> <([^>]+)>/))
        return repondre(
          'Veuillez renseigner tous les champs nécessaires : \n`' +
            prefix +
            'creatementor <Nom du rôle du mentor> <couleur du rôle (en MAJ et en anglais ou en (hexa)décimales)> <Nom du salon> <Élèves (prodiges|talent)>`'
        );

      const couleur = args

        .join(' ')
        .match(/<[^>]+> <([^>]+)>/)[1]
        .toUpperCase();

      let newMentor;
      if (
        !message.guild.roles.cache.find(
          (r) => r.name.toLowerCase() === nom.toLowerCase()
        )
      ) {
        newMentor = await message.guild.roles.create({
          data: {
            name: nom,
            color: couleur,
            mentionable: true,
            position: message.guild.roles.cache.get('721746249426010192')
              .position,
            hoist: false,
            permissions: [
              'ADD_REACTIONS',
              'ATTACH_FILES',
              'CHANGE_NICKNAME',
              'CONNECT',
              'CREATE_INSTANT_INVITE',
              'EMBED_LINKS',
              'READ_MESSAGE_HISTORY',
              'SEND_MESSAGES',
              'SEND_TTS_MESSAGES',
              'SPEAK',
              'STREAM',
              'USE_EXTERNAL_EMOJIS',
            ],
          },
        });
      } else
        newMentor = message.guild.roles.cache.find(
          (r) => r.name.toLowerCase() === nom.toLowerCase()
        );

      let matiere = args.join(' ').match(/<[^>]+> <[^>]+> <([^>]+)>/)[1];
      console.log(args.join(' ').match(/<[^>]+> <[^>]+> <[^>]+> <([^>]+)>/));
      let leType = args.join(' ').match(/<[^>]+> <[^>]+> <[^>]+> <([^>]+)>/)[1];

      if (!matiere || !leType)
        return message.channel.send(
          'Veuillez renseigner tous les champs nécessaires : \n`' +
            prefix +
            'creatementor <Nom du rôle du mentor> <couleur du rôle (en MAJ et en anglais ou en (hexa)décimales)> <Nom du salon> <Élèves (prodiges|talent)>`'
        );

      if (
        !message.guild.roles.cache.find(
          (r) => r.name.toLowerCase() === leType.toLowerCase()
        ) &&
        leType.toLowerCase() !== 'prodige' &&
        leType.toLowerCase() !== 'prodiges'
      )
        return message.channel.send(
          "**L'un des paramètres est incorrect.** Veuillez renseigner **correctement** tous les champs nécessaires : \n`" +
            prefix +
            'creatementor <Nom du rôle du mentor> <couleur du rôle (en MAJ et en anglais ou en (hexa)décimales)> <Nom du salon> <Élèves (prodiges|talent)>`'
        );

      let salon = message.guild.channels.cache.has(matiere)
        ? message.guild.channels.cache.find(
            (s) => s.name === matiere.replace(/ +/g, '-')
          )
        : await message.guild.channels.create(matiere.replace(/ +/g, '-'), {
            parent: message.guild.channels.cache
              .sort((c) => c.type === 'category')
              .find((c) => c.name === 'Foxfire'),
            position: message.guild.channels.cache.get('604242426248560669')
              .rawPosition,
            type: 'text',
            permissionOverwrites: [
              { id: message.guild.roles.everyone, deny: 'VIEW_CHANNEL' },
              {
                id: message.guild.roles.cache.find(
                  (r) =>
                    r.name.toLowerCase() ===
                    (leType.toLowerCase() === 'prodige' ||
                    leType.toLowerCase() === 'prodiges'
                      ? 'prodige'
                      : leType.toLowerCase())
                ),
                allow: [
                  'VIEW_CHANNEL',
                  'SEND_MESSAGES',
                  'ADD_REACTIONS',
                  'USE_EXTERNAL_EMOJIS',
                ],
              },
              {
                id:
                  leType.toLowerCase() !== 'prodige' &&
                  leType.toLowerCase() !== 'prodiges'
                    ? message.guild.roles.cache.find(
                        (r) => r.name === 'Membre de la noblesse'
                      )
                    : message.guild.roles.cache.find((r) => r.name === 'Muted'),
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES',
              },
              {
                id: newMentor,
                allow: [
                  'ADD_REACTIONS',
                  'ATTACH_FILES',
                  'CREATE_INSTANT_INVITE',
                  'EMBED_LINKS',
                  'MANAGE_MESSAGES',
                  'MANAGE_WEBHOOKS',
                  'MENTION_EVERYONE',
                  'READ_MESSAGE_HISTORY',
                  'SEND_MESSAGES',
                  'SEND_TTS_MESSAGES',
                  'VIEW_CHANNEL',
                  'USE_EXTERNAL_EMOJIS',
                ],
              },
            ],
          });

      console.log(newMentor, nom, couleur, matiere);
      repondre(
        `Un nouveau poste a été créé à Foxfire : **${newMentor.name}** ! Le salon de ce cours est ${salon}.`
      );
    }

    // Commande pour normaliser un pseudo
    if (message.content.toLowerCase().startsWith(prefix + 'normalize')) {
      if (
        !message.member.roles.cache.has(modo.id) &&
        !message.member.permissions.has('MANAGE_NICKNAMES')
      )
        return;
      let member = message.mentions.members.first();
      if (!member) member = await message.guild.members.fetch(args[0]);
      if (!member)
        member = (
          await message.guild.members.fetch({
            query: args.join(' '),
            limit: 1,
          })
        ).first();
      if (!member)
        return repondre('Merci de mentionner un membre à normaliser');

      let username = member.nickname ? member.nickname : member.user.username;
      if (
        /[^\x00-\x7A \x80-\x90 \x93-\x9A \xA0-\xA7 \xE0-\xF0]/gu.test(
          username
        ) ||
        /[^\p{L}A-Za-z]/gu.test(username)
      ) {
        let newNickname = await normalize(username);

        if (newNickname.length === 0) newNickname = 'Pseudo à changer';
        await member.setNickname(newNickname);
        await member.guild.channels.cache
          .find((ch) => ch.name === 'logs')
          .send(
            `Le pseudo de <@${member.id}> a été changé de ${username} en ${member.nickname} car il contenait plusieurs caractères non autorisés.`
          );
        return message.channel.send(
          `Le pseudo de ce membre a été changé de ${username} en ${member.nickname} car il contenait plusieurs caractères non autorisés.`
        );
      }
    }
    return true;
  }
};
