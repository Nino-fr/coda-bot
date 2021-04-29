const { Message, TextChannel, Webhook } = require('discord.js'),
  { client } = require('./index.js'),
  prefix = client.config.settings.prefix,
  OwnerID = client.config.ownerID,
  { normalize, HTTPRequest, HTTPSRequest, getValues } = require('./fonctions'),
  axios = require('axios'),
  asc = require('./ascii.json');

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
      /https\:\/\/www\.youtube\.com\/watch\?v=[\w\d\-]+/.test(message.content)
    ) {
      let regYt = /https\:\/\/www\.youtube\.com\/watch\?v=[\w\d\-]+/;
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
          (r) => r.name.trim().toLowerCase() === "les travaux d'apollon"
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

    let wattylink = /https:\/\/www.wattpad.com\/user\/[\w\d-,\.]+/gi;
    let storylink = /https:\/\/www.wattpad.com\/story\/\d+(?:\-[^\s]+)?/gi;
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
      } else if (/my\.w\.tt/.test(message.content)) {
        let lienAndroid = message.content.match(mywtt)[0];
        await axios.default.get(lienAndroid).then(async (resu) => {
          let result = resu.data;
          let regStory = /getElementById\("l"\).src\s*=\s*validate\("nullstory\/([^"]+)"\);\s*window.setTimeout\(function\(\)\s*\{\s*if\s*\(!hasURI\)\s*\{\s*window.top.location\s*=\s*validate\("([^"]+)"\);\s*}\s*intervalExecuted\s*=\s*true;\s*},\s*\d+\);\s*};\s*window.onblur\s*=\s*function\(\)\s*\{\s*hasURI\s*=\s*true;\s*};\s*window.onfocus\s*=\s*function\(\)\s*\{\s*if\s*\(hasURI\)\s*\{\s*window.top.location\s*=\s*validate\("([^"]+)"\);\s*}\s*else\s*if\s*\(intervalExecuted\)\s*\{\s*window.top.location\s*=\s*validate\("([^"]+)/;
          let regUser = /getElementById\("l"\).src\s*=\s*validate\("nulluser\/([^"]+)"\);\s*window.setTimeout\(function\(\)\s*\{\s*if\s*\(!hasURI\)\s*\{\s*window.top.location\s*=\s*validate\("https:\/\/www.wattpad.com\/user\/([^"]+)"\);\s*}\s*intervalExecuted\s*=\s*true;\s*},\s*\d+\);\s*};\s*window.onblur\s*=\s*function\(\)\s*\{\s*hasURI\s*=\s*true;\s*};\s*window.onfocus\s*=\s*function\(\)\s*\{\s*if\s*\(hasURI\)\s*\{\s*window.top.location\s*=\s*validate\("([^"]+)"\);\s*}\s*else\s*if\s*\(intervalExecuted\)\s*\{\s*window.top.location\s*=\s*validate\("([^"]+)/;
          if (regStory.test(result)) {
            let lienOrdi = result.match(regStory)[3];
            await axios.default.get(lienOrdi).then(async (re) => {
              let ress = re.data;
              await axios.default
                .get(
                  ress.match(
                    /<link rel="canonical" href="((?:.(?! ))+)" \/>/
                  )[1]
                )
                .then(async (reees) => {
                  let res = reees.data;
                  let alles = res.match(
                    /<img src="(https:\/\/img\.wattpad\.com\/cover\/[\d\w]+\-[\d\w]+\-[\d\w]+\.jpg)" height="\d+" width="\d+" alt="(?:.(?!><))+">\s?<\/div>\s?<h1>\s?((?:.(?!\/h1>))+)\s?<\/h1>/
                  );
                  let nameOfStory = alles[2];
                  let ascii = /&#x(\d+);/g;
                  if (ascii.test(nameOfStory)) {
                    let pesto = nameOfStory.match(ascii);

                    let authorName = res.match(
                      /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/img\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
                    );
                    let reginfo = /tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Reads))+)\s*Reads">\s*((?:[\dKkMm,\. ](?!Reads))+)\s*Reads?<\/span>\s*<span\s*data-toggle="tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Votes))+)\s*Votes">\s*((?:[\dKk,Mm\. ](?!Votes))+)\s*Votes<\/span>\s*<span>([\d]+)/i;
                    let infosStory = res.match(reginfo);
                    let coverURL = alles[1];
                    let viewCount = infosStory[2];
                    let viewCountPlus = infosStory[1];
                    let voteCountPlus = infosStory[3];
                    let voteCount = infosStory[4];
                    let chapterCount = infosStory[5];
                    for (let i of pesto) {
                      nameOfStory = nameOfStory.replace(
                        ascii,
                        String.fromCharCode(
                          getValues(asc, i.match(/\d+/).toString())
                        )
                      );
                    }
                    console.log(pesto);
                    repondre({
                      embed: {
                        description: `**Informations sur l'histoire [${nameOfStory.replace(
                          ascii,
                          String.fromCharCode(
                            getValues(asc, pesto.match(/\d+/).toString())
                          )
                        )}](${lienOrdi})**\n\n`,
                        thumbnail: { url: coverURL },
                        author: {
                          name: `@${authorName[1]}`,
                          icon_url: authorName[2],
                        },
                        fields: [
                          {
                            name: "Auteur(e) de l'histoire",
                            value: `${authorName[3]} (@${authorName[1]})`,
                          },
                          {
                            name: 'Lectures',
                            value: `${viewCount}${
                              viewCount !== viewCountPlus
                                ? ` (${viewCountPlus})`
                                : ''
                            }`,
                          },
                          {
                            name: 'Votes',
                            value: `${voteCount} ${
                              voteCount !== voteCountPlus
                                ? `(${voteCountPlus})`
                                : ''
                            }`,
                          },
                          {
                            name: 'Chapitres',
                            value: chapterCount,
                          },
                        ],
                        footer: {
                          text: `Histoire par ${authorName[1]}`,
                        },
                        color: 16748341,
                      },
                    });
                  } else {
                    let authorName = res.match(
                      /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/img\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
                    );
                    let reginfo = /tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Reads))+)\s*Reads">\s*((?:[\dKkMm,\. ](?!Reads))+)\s*Reads?<\/span>\s*<span\s*data-toggle="tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Votes))+)\s*Votes">\s*((?:[\dKk,Mm\. ](?!Votes))+)\s*Votes<\/span>\s*<span>([\d]+)/i;
                    let infosStory = res.match(reginfo);
                    let coverURL = alles[1];
                    let viewCount = infosStory[2];
                    let voteCount = infosStory[4];
                    let chapterCount = infosStory[5];
                    let viewCountPlus = infosStory[1];
                    let voteCountPlus = infosStory[3];
                    repondre({
                      embed: {
                        description: `**Informations sur l'histoire [${nameOfStory}](${lienOrdi})**\n\n`,
                        thumbnail: { url: coverURL },
                        author: {
                          name: `@${authorName[1]}`,
                          icon_url: authorName[2],
                        },
                        fields: [
                          {
                            name: "Auteur(e) de l'histoire",
                            value: `${authorName[3]} (@${authorName[1]})`,
                          },
                          {
                            name: 'Lectures',
                            value: `${viewCount}${
                              viewCount !== viewCountPlus
                                ? ` (${viewCountPlus})`
                                : ''
                            }`,
                          },
                          {
                            name: 'Votes',
                            value: `${voteCount}${
                              voteCount !== voteCountPlus
                                ? ` (${voteCountPlus})`
                                : ''
                            }`,
                          },
                          {
                            name: 'Chapitres',
                            value: chapterCount,
                          },
                        ],
                        footer: {
                          text: `Histoire par ${authorName[1]}`,
                        },
                        color: 16748341,
                      },
                    });
                  }
                });
            });
          } else if (regUser.test(result)) {
            let urlwatt = result.match(regUser)[3];
            await axios.default.get(urlwatt).then(async (resss) => {
              let res = resss.data;
              let username = res.match(
                /https:\/\/www.wattpad.com\/user\/((?:.(?! \/>))+)/
              )[1];
              let followersCount = res.match(/(?<="numFollowers":)\d+K?/);
              let followingCount = res.match(/(?<="numFollowing":)\d+K?/);
              let gender = res
                .match(/(?<="gender":")(?:\w+)/)
                .toString()
                .replace(/she/i, 'Femme')
                .replace(/female/i, 'Femme')
                .replace(/male/i, 'Homme')
                .replace(/he/i, 'Homme')
                .replace(/they/i, 'Eux')
                .replace(/unknown/i, 'Inconnu');
              let storyCount = res.match(
                /data\-id="profile\-works">\s*<p>(\d+)<\/p>\n<p>Works<\/p>\n<\/div>/i
              )[1];
              let userAvatarURL = res.match(/(?<="avatar":")(?:.(?!,"is))+/);
              // let regAvatar = /(?<="avatar":")(?:.(?!,"is))+/;
              let pseudo = res
                .match(/(?<=<title>)(?:.(?!\/title))+/)
                .toString()
                .match(/(?:.(?! Wattpad))+/)
                .toString();
              let regcreatedat = /(?<="createDate":")(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)Z/;
              let resultCreatedAt = res.match(regcreatedat);
              let createdat = {
                year: resultCreatedAt[1].toString(),
                month: resultCreatedAt[2].toString(),
                day: resultCreatedAt[3].toString(),
                hour: resultCreatedAt[4].toString(),
                min: resultCreatedAt[5].toString(),
                sec: resultCreatedAt[6].toString(),
              };
              let accountCreatedAt = `Le ${createdat.day}/${createdat.month}/${createdat.year} à ${createdat.hour}h${createdat.min} et ${createdat.sec} secondes`;
              let ascii = /&#x(\d+);/g;
              /*  await pseudo.match(ascii).map(async (matched) => {
          console.log(matched.match(/\d+/).toString());
          console.log(
            String.fromCharCode(getValues(asc, matched.match(/\d+/).toString()))
          );
        });
        if (ascii.test(pseudo)) {
          console.log(true);
          await pseudo.match(ascii).forEach(async (ascc) => {
            await pseudo.replace(
              ascii,
              String.fromCharCode(getValues(asc, ascc.match(/\d+/).toString()))
            );
          });
        } */
              if (ascii.test(pseudo)) {
                let pesdo = pseudo.match(ascii)[1];
                message.channel.send({
                  embed: {
                    author: {
                      name: 'Wattpad',
                      icon_url: 'https://logodix.com/logo/15417.png',
                    },
                    description: `**Informations sur ${username} :**`,
                    fields: [
                      {
                        name: 'Pseudo',
                        value: pseudo.replace(
                          ascii,
                          String.fromCharCode(
                            getValues(asc, pesdo.match(/\d+/).toString())
                          )
                        ),
                        inline: true,
                      },
                      {
                        name: `Nombre d'abonnés`,
                        value: followersCount,
                        inline: true,
                      },
                      {
                        name: `Nombre d'abonnements`,
                        value: followingCount,
                        inline: true,
                      },
                      {
                        name: `Sexe`,
                        value: gender,
                        inline: true,
                      },
                      {
                        name: `Histoires`,
                        value: storyCount,
                        inline: true,
                      },
                      {
                        name: 'Compte créé le',
                        value: accountCreatedAt,
                        inline: true,
                      },
                    ],
                    color: 16748341,
                    thumbnail: {
                      url: userAvatarURL.toString(),
                    },

                    footer: {
                      text: `Informations sur ${username}`,
                    },
                  },
                });
              } else {
                message.channel.send({
                  embed: {
                    author: {
                      name: 'Wattpad',
                      icon_url: 'https://logodix.com/logo/15417.png',
                    },
                    description: `**Informations sur ${`[${username}](${urlwatt})`} :**`,
                    fields: [
                      {
                        name: 'Pseudo',
                        value: pseudo,
                        inline: true,
                      },
                      {
                        name: `Nombre d'abonnés`,
                        value: followersCount,
                        inline: true,
                      },
                      {
                        name: `Nombre d'abonnements`,
                        value: followingCount,
                        inline: true,
                      },
                      {
                        name: `Sexe`,
                        value: gender,
                        inline: true,
                      },
                      {
                        name: `Histoires`,
                        value: storyCount,
                        inline: true,
                      },
                      {
                        name: 'Compte créé le',
                        value: accountCreatedAt,
                        inline: true,
                      },
                    ],
                    color: 16748341,
                    thumbnail: {
                      url: userAvatarURL.toString(),
                    },

                    footer: {
                      text: `Informations sur ${username}`,
                    },
                  },
                });
              }
            });
          }
        });
      }
    }

    // Créer une prévisualisation des liens Wattpad vers une histoire.
    let storyURL = message.content.match(
      /https:\/\/www.wattpad.com\/story\/\d+(?:\-[^\s]+)?/i
    );
    if (storyURL) {
      await axios.default.get(storyURL[0]).then(async (ress) => {
        let res = ress.data;
        let coverURL = res.match(
          /<img src="(https:\/\/img\.wattpad\.com\/cover[^"]+)"/
        )[1];
        console.log(storyURL[0]);
        let nameOfStory = res.match(
          /<div class="story-info__title">((?:.(?!\/div))+)/
        )[1];
        let ascii = /&#x\d+;/g;
        if (ascii.test(nameOfStory)) {
          let authorName = res.match(
            /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/img\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
          );
          let reginfo = /tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Reads))+)\s*Reads">\s*((?:[\dKkMm,\. ](?!Reads))+)\s*Reads?<\/span>\s*<span\s*data-toggle="tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Votes))+)\s*Votes">\s*((?:[\dKk,Mm\. ](?!Votes))+)\s*Votes<\/span>\s*<span>([\d]+)/i;
          let infosStory = res.match(reginfo);
          let viewCount = infosStory[2];
          let viewCountPlus = infosStory[1];
          let voteCountPlus = infosStory[3];
          let voteCount = infosStory[4];
          let chapterCount = infosStory[5];
          for (let i of nameOfStory.match(ascii)) {
            nameOfStory = nameOfStory.replace(
              ascii,
              String.fromCharCode(getValues(asc, i.match(/\d+/).toString()))
            );
          }

          console.log(nameOfStory);
          repondre({
            embed: {
              description: `**Informations sur l'histoire [${nameOfStory}](${storyURL})**\n\n`,
              thumbnail: { url: coverURL },
              author: {
                name: `@${authorName[1]}`,
                icon_url: authorName[2],
                url: 'https://www.wattpad.com/user/' + authorName[1],
              },
              fields: [
                {
                  name: "Auteur(e) de l'histoire",
                  value: `${authorName[3]} (@${authorName[1]})`,
                },
                {
                  name: 'Lectures',
                  value: `${viewCount}${
                    viewCount !== viewCountPlus ? ` (${viewCountPlus})` : ''
                  }`,
                },
                {
                  name: 'Votes',
                  value: `${voteCount}${
                    voteCount !== voteCountPlus ? ` (${voteCountPlus})` : ''
                  }`,
                },
                {
                  name: 'Chapitres',
                  value: chapterCount,
                },
              ],
              footer: {
                text: `Histoire par ${authorName[1]}`,
              },
              color: 16748341,
            },
          });
        } else {
          let authorName = res.match(
            /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/img\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
          );
          let reginfo = /tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Reads))+)\s*Reads">\s*((?:[\dKkMm,\. ](?!Reads))+)\s*Reads?<\/span>\s*<span\s*data-toggle="tooltip"\s*data-placement="bottom"\s*title="((?:[\dKk,\. ](?!Votes))+)\s*Votes">\s*((?:[\dKk,Mm\. ](?!Votes))+)\s*Votes<\/span>\s*<span>([\d]+)/i;
          let infosStory = res.match(reginfo);

          let coverURL = res.match(
            /<img src="(https:\/\/img\.wattpad\.com\/cover[^"]+)"/
          )[1];
          let viewCount = infosStory[2];
          let voteCount = infosStory[4];
          let chapterCount = infosStory[5];
          let viewCountPlus = infosStory[1];
          let voteCountPlus = infosStory[3];
          repondre({
            embed: {
              description: `**Informations sur l'histoire [${nameOfStory}](${storyURL})**\n\n`,
              thumbnail: { url: coverURL },
              author: {
                name: `@${authorName[1]}`,
                icon_url: authorName[2],
                url: 'https://www.wattpad.com/user/' + authorName[1],
              },
              fields: [
                {
                  name: "Auteur(e) de l'histoire",
                  value: `${authorName[3]} (@${authorName[1]})`,
                },
                {
                  name: 'Lectures',
                  value: `${viewCount}${
                    viewCount !== viewCountPlus ? ` (${viewCountPlus})` : ''
                  }`,
                },
                {
                  name: 'Votes',
                  value: `${voteCount}${
                    voteCount !== voteCountPlus ? ` (${voteCountPlus})` : ''
                  }`,
                },
                {
                  name: 'Chapitres',
                  value: chapterCount,
                },
              ],
              footer: {
                text: `Histoire par ${authorName[1]}`,
              },
              color: 16748341,
            },
          });
        }
      });
    }

    // Le rôle modérateur
    const modo = message.guild.roles.cache.find((r) =>
      r.name.toLowerCase().includes('modérateur')
    );
    // Mettre à jour les permissions du rôle modérateur
    if (message.content === 'updatemodo') {
      if (message.guild.id === '786656458657104005') return;
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
      // if (guild.id === '786656458657104005') return;
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

    // Prévisualisation des liens Wattpad vers un profil.
    let urlwatt = /https:\/\/www.wattpad.com\/user\/((?:[^ ])+)/;
    if (urlwatt.test(message.content)) {
      let lien = message.content.match(urlwatt)[0];
      await axios.default.get(lien).then(async (res) => {
        // let regUserName = /https:\/\/www.wattpad.com\/rss?username="(.+(?! )")/;
        //let username = await res.data.match(regUserName);
        let username = message.content.match(urlwatt)[1];
        let followersCount = await res.data.match(/(?<="numFollowers":)\d+K?/);
        let followingCount = await res.data.match(/(?<="numFollowing":)\d+K?/);
        let gender = await res.data
          .match(/(?<="gender":")(?:\w+)/)
          .toString()
          .replace(/she/i, 'Femme')
          .replace(/female/i, 'Femme')
          .replace(/male/i, 'Homme')
          .replace(/he/i, 'Homme')
          .replace(/they/i, 'Eux')
          .replace(/unknown/i, 'Inconnu');
        let storyCount = await res.data.match(
          /data\-id\="profile\-works"\>\s*<p>(\d+)/
        )[1];
        let userAvatarURL = await res.data.match(
          /(?<="avatar":")(?:.(?!,"is))+/
        );
        // let regAvatar = /(?<="avatar":")(?:.(?!,"is))+/;
        let pseudo = await res.data
          .match(/(?<=<title>)(?:.(?!\/title))+/)
          .toString()
          .match(/(?:.(?! Wattpad))+/)
          .toString();
        let regcreatedat = /(?<="createDate":")(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)Z/;
        let resultCreatedAt = await res.data.match(regcreatedat);
        let createdat = {
          year: resultCreatedAt[1].toString(),
          month: resultCreatedAt[2].toString(),
          day: resultCreatedAt[3].toString(),
          hour: resultCreatedAt[4].toString(),
          min: resultCreatedAt[5].toString(),
          sec: resultCreatedAt[6].toString(),
        };
        let accountCreatedAt = `Le ${createdat.day}/${createdat.month}/${createdat.year} à ${createdat.hour}h${createdat.min} et ${createdat.sec} secondes`;
        let ascii = /&#x(\d+);/g;
        /*  await pseudo.match(ascii).map(async (matched) => {
          client.loguer(matched.match(/\d+/).toString());
          client.loguer(
            String.fromCharCode(getValues(asc, matched.match(/\d+/).toString()))
          );
        });
        if (ascii.test(pseudo)) {
          client.loguer(true);
          await pseudo.match(ascii).forEach(async (ascc) => {
            await pseudo.replace(
              ascii,
              String.fromCharCode(getValues(asc, ascc.match(/\d+/).toString()))
            );
          });
        } */
        if (ascii.test(pseudo)) {
          try {
            let pesdo = pseudo.match(ascii)[1];
            await message.channel.send({
              embed: {
                author: {
                  name: 'Wattpad',
                  icon_url: 'https://logodix.com/logo/15417.png',
                },
                description: `**Informations sur ${username} :**`,
                fields: [
                  {
                    name: 'Pseudo',
                    value: pseudo.replace(
                      ascii,
                      String.fromCharCode(
                        getValues(asc, pesdo.match(/\d+/).toString())
                      )
                    ),
                    inline: true,
                  },
                  {
                    name: `Nombre d'abonnés`,
                    value: followersCount,
                    inline: true,
                  },
                  {
                    name: `Nombre d'abonnements`,
                    value: followingCount,
                    inline: true,
                  },
                  {
                    name: `Sexe`,
                    value: gender,
                    inline: true,
                  },
                  {
                    name: `Histoires`,
                    value: storyCount,
                    inline: true,
                  },
                  {
                    name: 'Compte créé le',
                    value: accountCreatedAt,
                    inline: true,
                  },
                ],
                color: 16748341,
                thumbnail: {
                  url: userAvatarURL.toString(),
                },

                footer: {
                  text: `Informations sur ${username}`,
                },
              },
            });
          } catch {
            await message.channel.send({
              embed: {
                author: {
                  name: 'Wattpad',
                  icon_url: 'https://logodix.com/logo/15417.png',
                },
                description: `**Informations sur ${`[${username}](${lien})`} :**`,
                fields: [
                  {
                    name: 'Pseudo',
                    value: pseudo,
                    inline: true,
                  },
                  {
                    name: `Nombre d'abonnés`,
                    value: followersCount,
                    inline: true,
                  },
                  {
                    name: `Nombre d'abonnements`,
                    value: followingCount,
                    inline: true,
                  },
                  {
                    name: `Sexe`,
                    value: gender,
                    inline: true,
                  },
                  {
                    name: `Histoires`,
                    value: storyCount,
                    inline: true,
                  },
                  {
                    name: 'Compte créé le',
                    value: accountCreatedAt,
                    inline: true,
                  },
                ],
                color: 16748341,
                thumbnail: {
                  url: userAvatarURL.toString(),
                },

                footer: {
                  text: `Informations sur ${username}`,
                },
              },
            });
          }
        } else {
          await message.channel.send({
            embed: {
              author: {
                name: 'Wattpad',
                icon_url: 'https://logodix.com/logo/15417.png',
              },
              description: `**Informations sur ${`[${username}](${lien})`} :**`,
              fields: [
                {
                  name: 'Pseudo',
                  value: pseudo,
                  inline: true,
                },
                {
                  name: `Nombre d'abonnés`,
                  value: followersCount,
                  inline: true,
                },
                {
                  name: `Nombre d'abonnements`,
                  value: followingCount,
                  inline: true,
                },
                {
                  name: `Sexe`,
                  value: gender,
                  inline: true,
                },
                {
                  name: `Histoires`,
                  value: storyCount,
                  inline: true,
                },
                {
                  name: 'Compte créé le',
                  value: accountCreatedAt,
                  inline: true,
                },
              ],
              color: 16748341,
              thumbnail: {
                url: userAvatarURL.toString(),
              },

              footer: {
                text: `Informations sur ${username}`,
              },
            },
          });
        }
      });
    }

    // Sanctionner les messages contenant plus de huit mentions et n'étant pas envoyé par un admin ou un modérateur.
    if (message.mentions.members.size > 8) {
      if (message.guild.id === '786656458657104005') return;
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
    let bdw = /((?:(?:con+a(?:r|s)(?:s|d|e)+)|(?:(?:s+a+l+o+p+e+)(?!t+e*))|(?:e+ncu+l[éer]*)|(?:(?<!\w)pu+t+e+s*)|(?:fd+p+)|(?:f[eéèë]l+a[ts]+ion)|(?:(?<!\w)bit+e)|(?:partouze*)|(?:p[eé]+nis)|(?:(?<!\w)cu+l+(?!\w))))/gi;
    if (bdw.test(message.content)) {
      if (message.guild.id === '786656458657104005' || message.author.bot)
        return;
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
        message.content.replace(bdw, ' ||$1||'),
        message.author.displayAvatarURL({ format: 'png' })
      );
      return client.channels.cache
        .get('837008064447905832')
        .send(
          ':warning: Attention : Utilisation de mots grossiers dans le salon ' +
            message.channel.toString() +
            ", je vous conseille d'aller contrôler et surveiller ce salon et sanctionner si besoin d'un warn ou plutôt d'un mute. :warning:",
          {
            embed: {
              description: `[Sauter vers le message](${message.url})`,
              color: '#FF0000',
            },
          }
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

    // Obtenir le code source d'une page Web
    if (message.content.toLowerCase().startsWith(prefix + 'getsource')) {
      const URL = args.join('_'),
        ISHTTPS = /https/.test(URL);

      if (ISHTTPS) {
        try {
          HTTPSRequest(URL).then((res) => {
            const ISJSON = res.startsWith('{');
            if (ISJSON) {
              if (res.length >= 1000) {
                return message.channel.send({
                  files: [
                    { attachment: Buffer.from(res), name: 'source.json' },
                  ],
                });
              } else return message.channel.send('```json\n' + res + '\n```');
            } else {
              if (res.length >= 1000) {
                return message.channel.send({
                  files: [
                    { attachment: Buffer.from(res), name: 'source.html' },
                  ],
                });
              } else return message.channel.send('```html\n' + res + '\n```');
            }
          });
        } catch (err) {
          return message.channel.send('```cs\n' + err.toString() + '\n```');
        }
      } else if (/http/.test(URL)) {
        try {
          await HTTPRequest(URL).then((res) => {
            const ISJSON = res.startsWith('{');
            if (ISJSON) {
              if (res.length >= 1000) {
                return message.channel.send({
                  files: [
                    { attachment: Buffer.from(res), name: 'source.json' },
                  ],
                });
              } else return message.channel.send('```json\n' + res + '\n```');
            } else {
              if (res.length >= 1000) {
                return message.channel.send({
                  files: [
                    { attachment: Buffer.from(res), name: 'source.html' },
                  ],
                });
              } else return message.channel.send('```html\n' + res + '\n```');
            }
          });
        } catch (err) {
          return message.channel.send('```cs\n' + err.toString() + '\n```');
        }
      }
    }

    // Système de suggestions
    /* if (message.content.toLowerCase() === prefix + 'suggestion') {
      if (message.channel.name.includes('suggestions')) {
        await message.delete();

        let msg = await message.channel.messages
          .fetch({ limit: 1 })
          .then((msg) => msg.first());

        await msg.react('708245371792523317');
        await msg.react('❌');
      }
    } */
    return true;
  }
};
