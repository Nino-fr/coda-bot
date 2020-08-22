const { Message, TextChannel, Webhook } = require('discord.js'),
  { client } = require('./index.js').default,
  prefix = client.config.defaultSettings.prefix,
  OwnerID = client.config.ownerID,
  moment = require('moment'),
  { getValues } = require('./fonctions'),
  loguer = client.loguer,
  asc = require('./ascii.json'),
  axios = require('axios');

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
    if (message.content.includes('https://discord.com/channels/')) {
      try {
        if (message.author.bot) return;

        let n = message.content.indexOf('h', 'https');
        let mmm = message.content.substr(n, 85);
        let serveurid = mmm.substring(29, 47);
        let serveur = client.guilds.cache.get(serveurid);
        let salonid = mmm.substring(48, 66);
        let messageid = mmm.substring(67, 86);
        let salon = client.channels.cache.get(salonid);
        let lien = mmm;
        await salon.messages.fetch(messageid).then((m) => {
          if (m.embeds.length !== 0) {
            client.repondre(
              message,
              'Ce message contenait un embed. En voici une représentation ci-dessous.'
            );
            return message.channel.send({
              embed: m.embeds[0],
            });
          }
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

          return message.channel.send({
            embed: mEmbed,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (message.content.includes('https://discordapp.com/channels/')) {
      try {
        if (message.author.bot) return;

        let n = message.content.indexOf('h', 'https');
        let mmm = message.content.substr(n, 88);
        let serveurid = mmm.substring(32, 50);
        let serveur = client.guilds.cache.get(serveurid);
        let salonid = mmm.substring(51, 69);
        let messageid = mmm.substring(70, 89);
        let salon = client.channels.cache.get(salonid);
        let lien = mmm;
        await salon.messages.fetch(messageid).then((m) => {
          if (m.embeds.length !== 0) {
            //Ce message contenait un embed. En voici une représentation ci-dessous.
            client.repondre(
              message,
              'Ce message contenait un embed. En voici une représentation ci-dessous.'
            );
            return message.channel.send({
              embed: m.embeds[0],
            });
          }
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

          return message.channel.send({
            embed: mEmbed,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (
      message.content.includes('lenght' || 'lenhgt' || 'lenhgt' || 'lenhtg')
    ) {
      try {
        if (message.author.bot) {
          return;
        } else
          return client.repondre(
            message,
            ":warning: Ce n'est pas `lenght` ni une autre écriture, mais c'est `length`."
          );
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    if (message.content.startsWith(prefix + 'rien')) {
      try {
        client.repondre(message, '__\n__');
      } catch (err) {
        client.utils.get('error').run(err, message, client);
      }
    }
    if (/https\:\/\/youtu\.be\/[\w\d\-]+/.test(message.content)) {
      function convertMS(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        return {
          d: d,
          h: h,
          m: m,
          s: s,
        };
      }

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

      const { getInfo } = require('ytdl-getinfo');
      let title, description, owner, urlowner, duration, totalduration;
      const fetchVideoInfo = require('updated-youtube-info');
      await getInfo(url.toString()).then((info) => {
        let item = info.items[0];
        description = item.description;
        title = item.fulltitle;
        owner = item.uploader;
        urlowner = item.uploader_url;
        totalduration = convertMS(parseInt(item.duration + '000'));
        duration = `${totalduration.h} heures ${totalduration.m} minutes et ${totalduration.s} secondes`;
      });
      let video = await fetchVideoInfo(videoId);
      message.channel.send({
        embed: {
          description: `**[${title}](${url})**\n  par **[${owner}](${urlowner})**`,
          fields: [
            {
              name: 'Description',
              value:
                description.length > 1300
                  ? description
                      .slice(0, 1300)
                      .split(/ +/g)
                      .splice(
                        description.slice(0, 1300).split(/ +/g).length - 2
                      )
                      .join(' ') + ` [\[...\]](${url})`
                  : description,
            },
            {
              name: '⏲️ Durée de la vidéo',
              value: duration,
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
      function convertMS(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        return {
          d: d,
          h: h,
          m: m,
          s: s,
        };
      }

      let regYt = /https\:\/\/www\.youtube\.com\/watch\?v\=[\w\d\-]+/;
      let url = message.content.match(regYt);
      let videoId = message.content
        .match(regYt)
        .toString()
        .match(/(?<=https:\/\/www.youtube.com\/watch\?v=)[\w\d\-]+/)
        .toString();
      // const fetch = require('node-fetch');
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

      const { getInfo } = require('ytdl-getinfo');
      let title, description, owner, urlowner, duration, totalduration;
      const fetchVideoInfo = require('updated-youtube-info');
      await getInfo(url.toString()).then((info) => {
        let item = info.items[0];
        description = item.description;
        title = item.fulltitle;
        owner = item.uploader;
        urlowner = item.uploader_url;
        totalduration = convertMS(parseInt(item.duration + '000'));
        duration = `${totalduration.h} heures ${totalduration.m} minutes et ${totalduration.s} secondes`;
      });
      let video = await fetchVideoInfo(videoId);
      message.channel.send({
        embed: {
          description: `**[${title}](${url})**\n  par **[${owner}](${urlowner})**`,
          fields: [
            {
              name: 'Description',
              value:
                description.length > 1300
                  ? description
                      .slice(0, 1300)
                      .split(/ +/g)
                      .splice(
                        description.slice(0, 1300).split(/ +/g).length - 2
                      )
                      .join(' ') + ` [\[...\]](${url})`
                  : description,
            },
            {
              name: '⏲️ Durée de la vidéo',
              value: duration,
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
              webhook.send(msg, {
                username: title,
                avatarURL: avatar,
              });
            });
        } else {
          foundHook.send(msg, {
            username: title,
            avatarURL: avatar,
          });
        }
      });
    }

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
    let invitationlink = /(?:https?:\/\/)?discord.gg\/[\w\d]+/gim;
    if (invitationlink.test(message.content)) {
      if (!message.channel.name.includes('pub')) {
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
    if (/https:\/\/my.w.tt\/[^ ]+/gi.test(message.content)) {
      let lienAndroid = message.content.match(mywtt)[0];
      await axios.default.get(lienAndroid).then(async (result) => {
        let regStory = /getElementById\("l"\).src\s*=\s*validate\("nullstory\/((?:.(?!\(;\s*))+)"\);\s*window.setTimeout\(function\(\)\s*\{\s*\s*if\s*\(!hasURI\)\s*\{\s*\s*window.top.location\s*=\s*validate\("((?:.(?!\(;\s*))+)"\);\s*\s*}\s*\s*intervalExecuted\s*=\s*true;\s*},\s*\d+\);\s*};\s*window.onblur\s*=\s*function\(\)\s*\{\s*hasURI\s*=\s*true;\s*};\s*window.onfocus\s*=\s*function\(\)\s*\{\s*if\s*\(hasURI\)\s*\{\s*\s*window.top.location\s*=\s*validate\("((?:.(?!\(;\s*))+)"\);\s*}\s*else\s*if\(intervalExecuted\)\s*\{\s*\s*window.top.location\s*=\s*validate\("((?:.(?!\(;\s*))+)"\);\s*}\s*}\s*<\/script/;
        let regUser = /getElementById\("l"\).src\s*=\s*validate\("nulluser\/((?:.(?!\(;\s*))+)"\);\s*window.setTimeout\(function\(\)\s*\{\s*\s*if\s*\(!hasURI\)\s*\{\s*\s*window.top.location\s*=\s*validate\("https:\/\/www.wattpad.com\/user\/((?:.(?!\(;\s*))+)"\);\s*\s*}\s*\s*intervalExecuted\s*=\s*true;\s*},\s*\d+\);\s*};\s*window.onblur\s*=\s*function\(\)\s*\{\s*hasURI\s*=\s*true;\s*};\s*window.onfocus\s*=\s*function\(\)\s*\{\s*if\s*\(hasURI\)\s*\{\s*\s*window.top.location\s*=\s*validate\("((?:.(?!\(;\s*))+)"\);\s*}\s*else\s*if\(intervalExecuted\)\s*\{\s*\s*window.top.location\s*=\s*validate\("((?:.(?!\(;\s*))+)"\);\s*}\s*}\s*<\/script/;
        if (regStory.test(result.data)) {
          let lienOrdi = await result.data.match(regStory)[3];
          await axios.default.get(lienOrdi).then(async (ress) => {
            await axios.default
              .get(
                ress.data.match(
                  /<link rel="canonical" href="((?:.(?! ))+)" \/>/
                )[1]
              )
              .then(async (res) => {
                let alles = await res.data.match(
                  /<img src="(https:\/\/a\.wattpad\.com\/cover\/[\d\w]+\-[\d\w]+\-[\d\w]+\.jpg)" height="\d+" width="\d+" alt="(?:.(?!><))+">\s?<\/div>\s?<h1>\s?((?:.(?!\/h1>))+)\s?<\/h1>/
                );
                let nameOfStory = alles[2];
                let ascii = /&#x(\d+);/g;
                if (ascii.test(nameOfStory)) {
                  let pesto = await nameOfStory.match(ascii);

                  let authorName = res.data.match(
                    /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/a\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
                  );
                  let reginfo = /<span data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Reads))+)\s?Reads">\s?((?:[\dKk,\. ](?!Reads))+)\s?Reads<\/span>\s?<span\s?data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Votes))+)\s?Votes">\s?((?:[\dKk,\. ](?!Votes))+)\s?Votes<\/span>\s?<span>([\d]+)\s?Part\s?Story<\/span>\s?<\/div>\s?<div\s?class="promotion-description-story-details">\s<\/div>/i;
                  let infosStory = await res.data.match(reginfo);
                  loguer(reginfo.test(res.data));
                  let coverURL = await alles[1];
                  let viewCount = await infosStory[2];
                  let viewCountPlus = await infosStory[1];
                  let voteCountPlus = await infosStory[3];
                  let voteCount = await infosStory[4];
                  let chapterCount = await infosStory[5];
                  for (let i of pesto) {
                    nameOfStory = await nameOfStory.replace(
                      ascii,
                      String.fromCharCode(
                        getValues(asc, i.match(/\d+/).toString())
                      )
                    );
                  }
                  loguer(pesto);
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
                          value: `${viewCount} (${viewCountPlus})`,
                        },
                        {
                          name: 'Votes',
                          value: `${voteCount} (${voteCountPlus})`,
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
                  let authorName = res.data.match(
                    /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/a\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
                  );
                  let reginfo = /<span data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Reads))+)\s?Reads">\s?((?:[\dKk,\. ](?!Reads))+)\s?Reads<\/span>\s?<span\s?data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Votes))+)\s?Votes">\s?((?:[\dKk,\. ](?!Votes))+)\s?Votes<\/span>\s?<span>([\d]+)\s?Part\s?Story<\/span>\s?<\/div>\s?<div\s?class="promotion-description-story-details">\s<\/div>/i;
                  let infosStory = await res.data.match(reginfo);
                  loguer(reginfo.test(res.data));
                  let coverURL = await alles[1];
                  let viewCount = await infosStory[2];
                  let voteCount = await infosStory[4];
                  let chapterCount = await infosStory[5];
                  let viewCountPlus = await infosStory[1];
                  let voteCountPlus = await infosStory[3];
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
                          value: `${viewCount} (${viewCountPlus})`,
                        },
                        {
                          name: 'Votes',
                          value: `${voteCount} (${voteCountPlus})`,
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
        } else if (regUser.test(result.data)) {
          let urlwatt = await result.data.match(regUser)[3];
          await axios.default.get(urlwatt).then(async (res) => {
            let username = await res.data.match(
              /https:\/\/www.wattpad.com\/user\/((?:.(?! \/>))+)/
            )[1];
            let followersCount = await res.data.match(
              /(?<="numFollowers":)\d+K?/
            );
            let followingCount = await res.data.match(
              /(?<="numFollowing":)\d+K?/
            );
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
              /data\-id\="profile\-works"\>\n\<p\>(\d+)\<\/p\>\n\<p\>Works\<\/p\>\n\<\/div\>/
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
              loguer(matched.match(/\d+/).toString());
              loguer(
                String.fromCharCode(getValues(asc, matched.match(/\d+/).toString()))
              );
            });
            if (ascii.test(pseudo)) {
              loguer(true);
              await pseudo.match(ascii).forEach(async (ascc) => {
                await pseudo.replace(
                  ascii,
                  String.fromCharCode(getValues(asc, ascc.match(/\d+/).toString()))
                );
              });
            } */
            if (ascii.test(pseudo)) {
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
            } else {
              await message.channel.send({
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

    // if (message.content.includes("tu es passé level 7 ! Et tu as aussi gagné")) {
    //   if (message.author.id === "628944382162370571") {
    //     /*let messagecontent = (await message.channel.messages.fetch())
    //       .array()
    //       .slice((await message.channel.messages.fetch()).size - 1)
    //       .pop();
    //     let msg = (await message.channel.messages.fetch()).find(
    //       (m) => m.content === messagecontent
    //     );
    //     let mem = msg.member;
    //     */
    //     let mem = message.mentions.members.first();
    //     let noble = message.guild.roles.cache.find(
    //       (r) => r.name === "Membre de la noblesse"
    //     );
    //     let prodige = message.guild.roles.cache.find((r) => r.name === "Prodige");
    //     if (!prodige) return repondre("Une erreur est survenue.");
    //     if (!noble) return repondre("Une erreur est survenue.");
    //     mem.roles.add(noble.id);
    //     mem.roles.remove(prodige.id);
    //     repondre(`Bravo ${mem} !`);
    //   }
    // }
    let storyURL = message.content.match(
      /https:\/\/www.wattpad.com\/story\/\d+\-[^\s]+/i
    );
    if (storyURL) {
      axios.default.get(storyURL.toString()).then(async (res) => {
        let alles = await res.data.match(
          /<img src="(https:\/\/a\.wattpad\.com\/cover\/[\d\w]+\-[\d\w]+\-[\d\w]+\.jpg)" height="\d+" width="\d+" alt="(?:.(?!><))+">\s?<\/div>\s?<h1>\s?((?:.(?!\/h1>))+)\s?<\/h1>/
        );
        let nameOfStory = alles[2];
        let ascii = /&#x\d+;/g;
        if (ascii.test(nameOfStory)) {
          let authorName = res.data.match(
            /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/a\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
          );
          let reginfo = /<span data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Reads))+)\s?Reads">\s?((?:[\dKk,\. ](?!Reads))+)\s?Reads<\/span>\s?<span\s?data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Votes))+)\s?Votes">\s?((?:[\dKk,\. ](?!Votes))+)\s?Votes<\/span>\s?<span>([\d]+)\s?Part\s?Story<\/span>\s?<\/div>\s?<div\s?class="promotion-description-story-details">\s<\/div>/i;
          let infosStory = await res.data.match(reginfo);
          loguer(reginfo.test(res.data));
          let coverURL = await alles[1];
          let viewCount = await infosStory[2];
          let viewCountPlus = await infosStory[1];
          let voteCountPlus = await infosStory[3];
          let voteCount = await infosStory[4];
          let chapterCount = await infosStory[5];
          for (let i of nameOfStory.match(ascii)) {
            nameOfStory = await nameOfStory.replace(
              ascii,
              String.fromCharCode(getValues(asc, i.match(/\d+/).toString()))
            );
          }

          loguer(nameOfStory);
          repondre({
            embed: {
              description: `**Informations sur l'histoire [${nameOfStory}](${storyURL})**\n\n`,
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
                  value: `${viewCount} (${viewCountPlus})`,
                },
                {
                  name: 'Votes',
                  value: `${voteCount} (${voteCountPlus})`,
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
          let authorName = res.data.match(
            /<a href="\/user\/((?:.(?! ))+)" class="(?:.(?!>))+">\s?<img src="(https:\/\/a\.wattpad\.com\/useravatar\/(?:.(?!\d+\.\d+))+\.\d+\.\d+\.jpg)" width="\d+" height="\d+" alt="((?:.(?! \/))+)" \/>\s?<\/a>/
          );
          let reginfo = /<span data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Reads))+)\s?Reads">\s?((?:[\dKk,\. ](?!Reads))+)\s?Reads<\/span>\s?<span\s?data-toggle="tooltip"\s?data-placement="bottom"\s?title="((?:[\dKk,\. ](?!Votes))+)\s?Votes">\s?((?:[\dKk,\. ](?!Votes))+)\s?Votes<\/span>\s?<span>([\d]+)\s?Part\s?Story<\/span>\s?<\/div>\s?<div\s?class="promotion-description-story-details">\s<\/div>/i;
          let infosStory = await res.data.match(reginfo);
          loguer(reginfo.test(res.data));
          let coverURL = await alles[1];
          let viewCount = await infosStory[2];
          let voteCount = await infosStory[4];
          let chapterCount = await infosStory[5];
          let viewCountPlus = await infosStory[1];
          let voteCountPlus = await infosStory[3];
          repondre({
            embed: {
              description: `**Informations sur l'histoire [${nameOfStory}](${storyURL})**\n\n`,
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
                  value: `${viewCount} (${viewCountPlus})`,
                },
                {
                  name: 'Votes',
                  value: `${voteCount} (${voteCountPlus})`,
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
    const modo = message.guild.roles.cache.find((r) => r.name === 'Modérateur');
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
    if (message.content === prefix + 'leave') {
      client.guilds.cache.forEach(async (g) => {
        if (g.id !== '574626014664327178' && g.id !== '707875749343789066')
          await g.leave();
      });
    }
    if (message.content === prefix + 'listemojis') {
      let guilde = client.guilds.cache.find((g) => g.name === 'Brol');
      repondre(guilde.emojis.cache.map((e) => `${e.name} : ${e.id}`));
    }
    if (message.content === prefix + 'anciens') {
      let guild = message.guild;
      let anciensarray = [];
      guild.members.cache.forEach((mem) => {
        if (Date.now() - mem.joinedTimestamp >= 15778800000) {
          anciensarray.push(mem.user.tag);
        }
      });
      repondre(anciensarray.join('\n'));
    }
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    args.shift();
    if (message.content.startsWith(`${prefix}status`)) {
      if (!message.author.id === OwnerID) return;
      message.delete();
      await client.user.setStatus(args[0].toLowerCase());
    }
    let urlwatt = /https:\/\/www.wattpad.com\/user\/((?:[^ ])+)/;
    if (urlwatt.test(message.content)) {
      let lien = message.content.match(urlwatt)[0];
      axios.default.get(lien).then(async (res) => {
        //let regUserName = /https:\/\/www.wattpad.com\/rss?username="(.+(?! )")/;
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
          /data\-id\="profile\-works"\>\n\<p\>(\d+)\<\/p\>\n\<p\>Works\<\/p\>\n\<\/div\>/
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
          loguer(matched.match(/\d+/).toString());
          loguer(
            String.fromCharCode(getValues(asc, matched.match(/\d+/).toString()))
          );
        });
        if (ascii.test(pseudo)) {
          loguer(true);
          await pseudo.match(ascii).forEach(async (ascc) => {
            await pseudo.replace(
              ascii,
              String.fromCharCode(getValues(asc, ascc.match(/\d+/).toString()))
            );
          });
        } */
        if (ascii.test(pseudo)) {
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

    if (message.content.startsWith(prefix + 'retenue')) {
      if (message.guild.id === '574626014664327178') {
        const mentor = message.guild.roles.cache.find(
          (r) => r.name === 'Mentor'
        );
        const dirlo = message.guild.roles.cache.find(
          (r) => r.name === 'Directeur de Foxfire'
        );
        const heraut = message.guild.roles.cache.find(
          (r) => r.name === "Héraut de la Tour d'Argent"
        );

        if (
          message.member.roles.cache.has(mentor.id) ||
          message.member.roles.cache.has(dirlo.id) ||
          message.member.roles.cache.has(heraut.id) ||
          message.member.roles.cache.has(modo.id)
        ) {
          const puni =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
          const muted = message.guild.roles.cache.find(
            (r) => r.name === 'muted'
          );
          if (!puni) return repondre('Qui dois-je mettre en retenue ?');
          let raison = args.slice(1).slice(1).join(' ');
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
            }, 120000);
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
    if (message.content.startsWith(prefix + 'finretenue')) {
      const mentor = message.guild.roles.cache.find((r) => r.name === 'Mentor');
      const dirlo = message.guild.roles.cache.find(
        (r) => r.name === 'Directeur de Foxfire'
      );
      const heraut = message.guild.roles.cache.find(
        (r) => r.name === "Héraut de la Tour d'Argent"
      );

      if (
        message.member.roles.cache.has(mentor.id) ||
        message.member.roles.cache.has(dirlo.id) ||
        message.member.roles.cache.has(heraut.id) ||
        message.member.roles.cache.has(modo.id)
      ) {
        const puni =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]);
        const muted = message.guild.roles.cache.find((r) => r.name === 'muted');
        const prodig = message.guild.roles.cache.find(
          (r) => r.name === 'Prodige'
        );
        if (!puni) return repondre('Qui doit arrêter sa retenue ?');
        if (!puni.roles.cache.has(prodig.id))
          return repondre(
            "Cette personne n'est pas un prodige ! Comment pourrait-elle être en retenue ?"
          );
        let raison = args.slice(1).slice(1).join(' ');
        if (puni.roles.cache.has(muted.id)) {
          await puni.roles.remove(muted.id);
          repondre(
            `Tu as de la chance ${puni} ! ${message.member} a décidé d'arrêter ta retenue pour la raison suivante : ${raison}`
          );
        } else return repondre("Cette personne n'est pas en retenue, voyons !");
      } else return repondre("Tu n'as pas le droit de faire ça !");
    }
    if (message.content.startsWith(prefix + 'noblesse')) {
      const elite = message.guild.roles.cache.find(
        (r) => r.name === 'Élite de Foxfire'
      );
      const noble =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args.slice(1)[0]);
      if (!noble) return repondre('Veuillez préciser un membre');
      if (!noble.roles.cache.has(elite.id))
        return repondre("Cette personne n'est pas dans l'Élite de Foxfire.");
      const dirlo = message.guild.roles.cache.find(
        (r) => r.name === 'Directeur de Foxfire'
      );
      const heraut = message.guild.roles.cache.find(
        (r) => r.name === "Héraut de la Tour d'Argent"
      );
      if (
        !message.member.roles.cache.has(modo.id) &&
        !message.member.roles.cache.has(dirlo.id) &&
        !message.member.roles.cache.has(heraut.id)
      ) {
        return repondre('Vous ne pouvez pas faire ça !');
      }
      const noblesse = message.guild.roles.cache.find(
        (r) => r.name === 'Membre de la noblesse'
      );
      const reg = /<([^>]+)>/;
      const metier = message.guild.roles.cache.find(
        (r) => r.name === args.slice(1).join(' ').match(reg)[1]
      );
      const talent = message.guild.roles.cache.find(
        (r) => r.name === args.slice(3).join(' ').match(reg)[1]
      );
      const prodig = message.guild.roles.cache.find(
        (r) => r.name === 'Prodige'
      );
      let newPseudo = args
        .slice(1)
        .slice(2)
        .join(' ')
        .match(/<[^>]+> <([^>]+)>/)[1];
      // loguer(args.slice(1).slice(2).join(" "));
      await noble.roles.add(noblesse.id);
      await noble.roles.add(metier.id);
      await noble.roles.add(talent.id);
      await noble.setNickname(newPseudo);
      await noble.roles.remove(elite.id);
      await noble.roles.remove(prodig.id);
      repondre(
        `Félicitations ${noble} ! Tu as rejoins la noblesse et obtenu le métier ${metier.name} et le talent ${talent.name}`
      );
    }
    if (message.content === 'initdatabases') {
      // client.papotins.deleteAll();
      if (!message.author.id === OwnerID) return;
      const initDatabases = async () => {
        const papotins = await JSON.parse(
          (
            await client.channels.cache
              .get('746688731557265481')
              .messages.fetch('746706426931445771')
          ).content
            .replace('```json', '')
            .replace('```', '')
        );
        console.log(papotins);
        for (const [key, value] of Object.entries(papotins)) {
          client.papotins.set(key, {
            epingles: value.epingles,
            boost: value.boost,
            lastUpdate: new Date(),
          });
        }

        console.log(client.papotins);
      };
      initDatabases();
    }
  }
};