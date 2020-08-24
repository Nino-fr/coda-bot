const moment = require("moment");
moment.locale("fr");
const warns = require("../../warns.json");
const colours = require("../../colours.json");
const fs = require("fs");
const { loguer, getValues } = require("../../fonctions");
const asc = require("../../ascii.json");
const axios = require("axios");
const { prefix, OwnerID } = require("../../botconfig.json");

module.exports = async (bot, message) => {
  const repondre = (msg) => {
    message.channel.send(msg);
  };
  const warnMember = (membre, reason) => {
    if (!warns[membre.id]) {
      warns[membre.id] = [];
    }
    warns[membre.id].unshift({
      username: membre.user.username,
      raison: reason,
      date: moment.utc(message.createdAt).format("L"),
      modérateur: message.author.username,
      serveur: message.guild.name,
    });
    fs.writeFileSync("./warns.json", JSON.stringify(warns));
    repondre(
      `:white_check_mark: ${membre} a été warn pour la raison suivante :`
    );
    let embed = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setAuthor(`Log de modération`, bot.user.avatarURL())
      .addField("Type :", "Warn")
      .addField("Membre :", membre.user.username)
      .addField("Modérateur :", message.author.username)
      .addField("Raison :", reason)
      .setTimestamp();

    let sChannel = message.guild.channels.cache.find((c) => c.name === "logs");
    sChannel.send(embed);
  };
  function hook(name, channel, title, msg, avatar) {
    // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel) return loguer("Channel not specified.");
    if (!title) return loguer("Title not specified.");
    if (!msg) return loguer("msg not specified.");
    if (!name) return loguer("Aucun nom soumis");
    if (!avatar)
      avatar =
        "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"; // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.

    avatar = avatar.replace(/\s/g, "");

    // This is the start of creating the webhook
    channel
      .fetchWebhooks() // This gets the webhooks in the channel
      .then((webhook) => {
        // Fetches the webhook we will use for each hook
        let foundHook = webhook.find((webh) => webh.name === name); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

        // This runs if the webhook is not found.
        if (!foundHook) {
          channel
            .createWebhook(name, { avatar: avatar }) // The png image will be the default image seen under the channel. Change it to whatever you want.
            .then((webhook) => {
              // Finally send the webhook
              webhook
                .send(msg, {
                  username: title,
                  avatarURL: avatar,
                })
                .catch((error) => {
                  // We also want to make sure if an error is found, to report it in chat.
                  loguer(error);
                  return channel.send(
                    "**Something went wrong when sending the webhook. Please check console.**"
                  );
                });
            });
        } else {
          // That webhook was only for if it couldn't find the original webhook
          foundHook
            .send(msg, {
              // This means you can just copy and paste the webhook & catch part.
              username: title,
              avatarURL: avatar,
            })
            .catch((error) => {
              // We also want to make sure if an error is found, to report it in chat.
              loguer(error);
              return channel.send(
                "**Something went wrong when sending the webhook. Please check console.**"
              );
            });
        }
      });
  }
  let invitationlink = /(?:https?:\/\/)?discord.gg\/[\w\d]+/gim;
  if (invitationlink.test(message.content)) {
    if (!message.channel.name.includes("pub")) {
      await message.delete();
      let nom = message.member.nickname
        ? message.member.nickname
        : message.author.username;
      await hook(
        nom,
        message.channel,
        nom,
        message.content.replace(invitationlink, "[Invitation]"),
        message.author.displayAvatarURL()
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
      !message.channel.name.includes("pub") &&
      !message.channel.name.includes("partage")
    ) {
      await message.delete();
      let nom = message.member.nickname
        ? message.member.nickname
        : message.author.username;
      return hook(
        nom,
        message.channel,
        nom,
        message.content
          .replace(wattylink, "[Pub profil Wattpad]")
          .replace(storylink, "[Pub histoire Wattpad]")
          .replace(mywtt, "[Pub Wattpad]"),
        message.author.displayAvatarURL()
      );
    }
  }
  if (/https:\/\/my.w.tt\/[^ ]+/gi.test(message.content)) {
    let lienAndroid = await message.content.match(mywtt)[0];
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
                let pesto = await nameOfStory.match(ascii)[1];

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
                        name: "Lectures",
                        value: `${viewCount} (${viewCountPlus})`,
                      },
                      {
                        name: "Votes",
                        value: `${voteCount} (${voteCountPlus})`,
                      },
                      {
                        name: "Chapitres",
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
                        name: "Lectures",
                        value: `${viewCount} (${viewCountPlus})`,
                      },
                      {
                        name: "Votes",
                        value: `${voteCount} (${voteCountPlus})`,
                      },
                      {
                        name: "Chapitres",
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
            .replace(/she/i, "Femme")
            .replace(/female/i, "Femme")
            .replace(/male/i, "Homme")
            .replace(/he/i, "Homme")
            .replace(/they/i, "Eux")
            .replace(/unknown/i, "Inconnu");
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
                  name: "Wattpad",
                  icon_url: "https://logodix.com/logo/15417.png",
                },
                description: `**Informations sur ${username} :**`,
                fields: [
                  {
                    name: "Pseudo",
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
                    name: "Compte créé le",
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
                  name: "Wattpad",
                  icon_url: "https://logodix.com/logo/15417.png",
                },
                description: `**Informations sur ${`[${username}](${urlwatt})`} :**`,
                fields: [
                  {
                    name: "Pseudo",
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
                    name: "Compte créé le",
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
  let storyURL = await message.content.match(
    /https:\/\/www.wattpad.com\/story\/\d+\-[^\s]+/i
  );
  if (storyURL) {
    axios.default.get(storyURL.toString()).then(async (res) => {
      let alles = await res.data.match(
        /<img src="(https:\/\/a\.wattpad\.com\/cover\/[\d\w]+\-[\d\w]+\-[\d\w]+\.jpg)" height="\d+" width="\d+" alt="(?:.(?!><))+">\s?<\/div>\s?<h1>\s?((?:.(?!\/h1>))+)\s?<\/h1>/
      );
      let nameOfStory = alles[2];
      let ascii = /&#x(\d+);/g;
      if (ascii.test(nameOfStory)) {
        let pesto = await nameOfStory.match(ascii)[1];

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
        loguer(pesto);
        repondre({
          embed: {
            description: `**Informations sur l'histoire [${nameOfStory.replace(
              ascii,
              String.fromCharCode(getValues(asc, pesto.match(/\d+/).toString()))
            )}](${storyURL})**\n\n`,
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
                name: "Lectures",
                value: `${viewCount} (${viewCountPlus})`,
              },
              {
                name: "Votes",
                value: `${voteCount} (${voteCountPlus})`,
              },
              {
                name: "Chapitres",
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
                name: "Lectures",
                value: `${viewCount} (${viewCountPlus})`,
              },
              {
                name: "Votes",
                value: `${voteCount} (${voteCountPlus})`,
              },
              {
                name: "Chapitres",
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
  const modo = message.guild.roles.cache.find((r) => r.name === "Modérateur");
  if (message.content === "updatemodo") {
    message.guild.channels.cache.forEach(async (ch) => {
      if (ch.name !== "conseil" && !ch.name.includes("château")) {
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
      "ADD_REACTIONS",
      "ATTACH_FILES",
      "CHANGE_NICKNAME",
      "CONNECT",
      "CREATE_INSTANT_INVITE",
      "DEAFEN_MEMBERS",
      "EMBED_LINKS",
      "MANAGE_MESSAGES",
      "MANAGE_NICKNAMES",
      "MANAGE_WEBHOOKS",
      "MENTION_EVERYONE",
      "MOVE_MEMBERS",
      "MUTE_MEMBERS",
      "PRIORITY_SPEAKER",
      "READ_MESSAGE_HISTORY",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "SPEAK",
      "STREAM",
      "USE_EXTERNAL_EMOJIS",
      "VIEW_AUDIT_LOG",
      "VIEW_CHANNEL",
      "VIEW_GUILD_INSIGHTS",
    ]);
  }
  if (message.content === prefix + "leave") {
    bot.guilds.cache.forEach(async (g) => {
      if (g.id !== "574626014664327178" || g.id !== "707875749343789066")
        await g.leave();
    });
  }
  if (message.content === prefix + "listemojis") {
    let guilde = bot.guilds.cache.find((g) => g.name === "Test bots");
    await repondre(guilde.emojis.cache.map((e) => `${e.name} : ${e.id}`));
  }
  if (message.content.startsWith(prefix + "react")) {
    try {
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      await args.shift();
      let msg = message.channel.messages.fetch(args[0]);
      await message.delete();
      (await msg).react(args[1]);
    } catch {
      return repondre(
        "Erreur d'utilisation, veuillez réessayer en suivant ce modèle : `&react <id du message> <id de la réaction>`"
      );
    }
  }
  if (message.content === prefix + "anciens") {
    let guild = message.guild;
    let anciensarray = [];
    guild.members.cache.forEach((mem) => {
      if (Date.now() - mem.joinedTimestamp >= 15778800000) {
        anciensarray.push(mem.user.tag);
      }
    });
    repondre(anciensarray.join("\n"));
  }
  if (message.content.startsWith(`${prefix}status`)) {
    if (!message.author.id === OwnerID) return;
    message.delete();
    let args = message.content.split(" ").slice(1);
    bot.user.setPresence({ status: args[0].toLowerCase() });
  }
  if (message.content === "postcode") {
    repondre({
      embed: {
        color: 2860732,
        title: `:handshake: Aide à l'envoi de code`,
        description:
          '__**Pour formater votre code sur Discord :**__\n\n> \\`\\`\\`langage\n> Code à formater\n> \\`\\`\\`\n\n__Exemple :__\n\n> \\`\\`\\`js\n> loguer("Je suis un exemple de code");\n> \\`\\`\\`\n```js\nloguer("Je suis un exemple de code");\n```\n\nSi le code est trop grand (+ de 2000 caractères), vous avez une liste de sites ci-dessous pour déposer votre code.\n\n__**Liste de sites pour déposer votre code :**__\n\n>> [sourcebin](http://sourceb.in)\n>> [hastebin](https://hasteb.in)\n>> [gist](https://gist.github.com)',
      },
    });
  }
  let urlwatt = /https:\/\/www.wattpad.com\/user\/((?:[^ ])+)/;
  if (urlwatt.test(message.content)) {
    let lien = message.content.match(urlwatt)[0];
    axios.default.get(lien).then(async (res) => {
      //let regUserName = /https:\/\/www.wattpad.com\/rss?username="(.+(?! )")/;
      //let username = await res.data.match(regUserName);
      let username = await message.content.match(urlwatt)[1];
      let followersCount = await res.data.match(/(?<="numFollowers":)\d+K?/);
      let followingCount = await res.data.match(/(?<="numFollowing":)\d+K?/);
      let gender = await res.data
        .match(/(?<="gender":")(?:\w+)/)
        .toString()
        .replace(/she/i, "Femme")
        .replace(/female/i, "Femme")
        .replace(/male/i, "Homme")
        .replace(/he/i, "Homme")
        .replace(/they/i, "Eux")
        .replace(/unknown/i, "Inconnu");
      let storyCount = await res.data.match(
        /data\-id\="profile\-works"\>\n\<p\>(\d+)\<\/p\>\n\<p\>Works\<\/p\>\n\<\/div\>/
      )[1];
      let userAvatarURL = await res.data.match(/(?<="avatar":")(?:.(?!,"is))+/);
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
              name: "Wattpad",
              icon_url: "https://logodix.com/logo/15417.png",
            },
            description: `**Informations sur ${username} :**`,
            fields: [
              {
                name: "Pseudo",
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
                name: "Compte créé le",
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
              name: "Wattpad",
              icon_url: "https://logodix.com/logo/15417.png",
            },
            description: `**Informations sur ${`[${username}](${lien})`} :**`,
            fields: [
              {
                name: "Pseudo",
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
                name: "Compte créé le",
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
  try {
    if (message.content.includes("https://discord.com/channels/")) {
      if (message.author.bot) return;

      let n = message.content.indexOf("h", "https");
      let mmm = message.content.substr(n, 85);
      let serveurid = mmm.substring(29, 47);
      let serveur = bot.guilds.cache.get(serveurid);
      let salonid = mmm.substring(48, 66);
      let messageid = mmm.substring(67, 86);
      let salon = bot.channels.cache.get(salonid);
      let lien = mmm;
      await salon.messages.fetch(messageid).then(async (m) => {
        await repondre({
          embed: {
            color: 12124160,
            title: `Message de ${m.author.tag}`,
            description: `${m.content}\n\n[Aller vers le message](${lien})`,
            footer: {
              text: `Message du salon ${salon.name} dans le serveur ${serveur.name}`,
            },
            timestamp: new Date(),
          },
        }); /* 
          if (message.attachments) {
            await repondre(
              "Ce message content un ou plusieurs fichiers. Le(s) voici ci-dessous"
            );
            message.attachments.forEach(async (attach) => {
              await repondre(attach);
            });
          }
         
          if (message.embeds !== []) {
            await repondre("Ce message est un embed. Voici l'embed ci-dessous :");
            message.embeds.forEach(async (em) => {
              await repondre(em);
            });
          } */
      });
    }
    if (message.content.includes("https://discordapp.com/channels/")) {
      if (message.author.bot) return;

      let n = message.content.indexOf("h", "https");
      let mmm = message.content.substr(n, 88);
      let serveurid = mmm.substring(32, 50);
      let serveur = bot.guilds.cache.get(serveurid);
      let salonid = mmm.substring(51, 69);
      let messageid = mmm.substring(70, 89);
      let salon = bot.channels.cache.get(salonid);
      let lien = mmm;
      await salon.messages.fetch(messageid).then(async (m) => {
        await repondre({
          embed: {
            color: 12124160,
            title: `Message de ${m.author.tag}`,
            description: `${m.content}\n\n[Aller vers le message](${lien})`,
            footer: {
              text: `Message du salon ${salon.name} dans le serveur ${serveur.name}`,
            },
            timestamp: new Date(),
          },
        });
        /* if (message.attachments) {
            await repondre(
              "Ce message content un ou plusieurs fichiers. Le(s) voici ci-dessous"
            );
            message.attachments.forEach(async (attach) => {
              await repondre(attach);
            });
          }
          if (message.embeds !== []) {
            await repondre("Ce message est un embed. Voici l'embed ci-dessous :");
            message.embeds.forEach(async (em) => {
              await repondre(em);
            });
          } */
      });
    }
  } catch {
    return;
  }
  if (message.content.toLowerCase() === `${prefix}selfrole percy jackson`) {
    if (message.guild.id === "707875749343789066") {
      let mem = message.member;
      let role = message.guild.roles.cache.find(
        (r) => r.name === "Percy Jackson"
      );
      if (!role) return repondre("Aucun rôle ne porte ce nom.");
      mem.roles
        .add(role.id)
        .then(repondre("Je vous ai bien ajouté le rôle Percy Jackson !"));
    }
  }
  if (
    message.content.toLowerCase() === `${prefix}selfrole les travaux d'apollon`
  ) {
    if (message.guild.id === "707875749343789066") {
      let mem = message.member;
      let role = message.guild.roles.cache.find(
        (r) => r.name === "Les Travaux d'Apollon"
      );
      if (!role) return repondre("Aucun rôle ne porte ce nom.");
      mem.roles
        .add(role.id)
        .then(
          repondre("Je vous ai bien ajouté le rôle Les Travaux d'Apollon !")
        );
    }
  }
  if (message.content.toLowerCase() === `${prefix}selfrole magnus chase`) {
    if (message.guild.id === "707875749343789066") {
      let mem = message.member;
      let role = message.guild.roles.cache.find(
        (r) => r.name === "Magnus Chase"
      );
      if (!role) return repondre("Aucun rôle ne porte ce nom.");
      mem.roles
        .add(role.id)
        .then(repondre("Je vous ai bien ajouté le rôle Magnus Chase !"));
    }
  }
  if (
    message.content.toLowerCase() === `${prefix}selfrole les chroniques de kane`
  ) {
    if (message.guild.id === "707875749343789066") {
      let mem = message.member;
      let role = message.guild.roles.cache.find(
        (r) => r.name === "Les chroniques de Kane"
      );
      if (!role) return repondre("Aucun rôle ne porte ce nom.");
      mem.roles
        .add(role.id)
        .then(
          repondre("Je vous ai bien ajouté le rôle Les chroniques de Kane !")
        );
    }
  }
  if (message.content.toLowerCase() === `${prefix}selfrole héros de l'olympe`) {
    if (message.guild.id === "707875749343789066") {
      let mem = message.member;
      let role = message.guild.roles.cache.find(
        (r) => r.name === "Héros de l'Olympe"
      );
      if (!role) return repondre("Aucun rôle ne porte ce nom.");
      mem.roles
        .add(role.id)
        .then(repondre("Je vous ai bien ajouté le rôle Héros de l'Olympe !"));
    }
  } /* 
    if (message) {
      if (message.channel.type === "text") {
        loguer(
          `Message de ${message.author.tag} envoyé dans le serveur ${message.guild.name} dans le salon ${message.channel.name} (ID : ${message.channel.id}) : ${message.content}`
        );
      }
    } */
  if (message.mentions.members.size > 5) {
    if (
      message.member.roles.cache.has(modo.id) ||
      message.member.permissions.has("ADMINISTRATOR")
    )
      return;
    repondre(
      "Non mais oh ! Du calme sur les mentions ! Je te mets un warn, ça t'apprendra."
    );
    warnMember(message.member, "Plus de cinq mentions dans un seul message.");
  }
  // let bdw1 = /conna(?:r|s)s?d?e?/gi;
  // let bdw2 = /salope\W/gi;
  // let bdw3 = /encul[ée]*/gi;
  // let bdw4 = /[^\w]pu+te+s?/gi;
  // let bdw5 = /[^\w]fdp+/gi;
  let bdw = /(?:(?:conna(?:r|s)(?:s|d|e))|(?:(?:s+a+l+o+p+e+)(?!t+e?))|(?:e+ncu+l[ée]*)|(?:pu+t+e+s*)|(?:fd+p+))/gi;
  if (bdw.test(message.content)) {
    //if (message.member.roles.cache.has(modo.id)) return;
    /* repondre("Surveille ton langage ! Pour la peine, je te mets un warn !");
      warnMember(message.member, "Grossier personnage"); */
    let nom = message.member.nickname
      ? message.member.nickname
      : message.author.username;
    await message.delete();
    await hook(
      nom,
      message.channel,
      nom,
      message.content.replace(bdw, " [mot grossier]"),
      message.author.displayAvatarURL()
    );
  }
  if (
    message.content === "<@699294152193736704>" ||
    message.content === "<@!699294152193736704>"
  ) {
    repondre(
      `Mon préfix est \`&\` ! Écris \`&help\` pour la liste des commandes.`
    );
  }
  if (message.content === "The poulpe") {
    message.delete();
    repondre("<a:poulpe:726180002588262422>");
  }
  let args = message.content.slice(prefix.length).slice(1).trim().split(/ +/g);
  if (message.content.startsWith(prefix + "retenue")) {
    if (message.guild.id === "574626014664327178") {
      let mentor = message.guild.roles.cache.find((r) => r.name === "Mentor");
      let dirlo = message.guild.roles.cache.find(
        (r) => r.name === "Directeur de Foxfire"
      );
      let heraut = message.guild.roles.cache.find(
        (r) => r.name === "Héraut de la Tour d'Argent"
      );

      if (
        message.member.roles.cache.has(mentor.id) ||
        message.member.roles.cache.has(dirlo.id) ||
        message.member.roles.cache.has(heraut.id) ||
        message.member.roles.cache.has(modo.id)
      ) {
        let puni =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]);
        let muted = await message.guild.roles.cache.find(
          (r) => r.name === "muted"
        );
        if (!puni) return repondre("Qui dois-je mettre en retenue ?");
        let raison = args.slice(1).slice(1).join(" ");
        let prodig = message.guild.roles.cache.find(
          (r) => r.name === "Prodige"
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
                raison ? raison : "Aucune"
              }\n\`\`\``,
              color: 6071551,
            },
          });
          setTimeout(function () {
            puni.roles.remove(muted.id);
            repondre.send(`La retenue de ${puni} est terminée !`);
          }, 120000);
        } else {
          return repondre(
            "Vous ne pouvez mettre en retenue que les prodiges !"
          );
        }
      } else
        return repondre(
          "Vous n'avez pas le droit de mettre des gens en retenue !"
        );
    } else return repondre("Vous ne pouvez pas mettre des gens en retenue !");
  }
  if (message.content.startsWith(prefix + "finretenue")) {
    let mentor = message.guild.roles.cache.find((r) => r.name === "Mentor");
    let dirlo = message.guild.roles.cache.find(
      (r) => r.name === "Directeur de Foxfire"
    );
    let heraut = message.guild.roles.cache.find(
      (r) => r.name === "Héraut de la Tour d'Argent"
    );

    if (
      message.member.roles.cache.has(mentor.id) ||
      message.member.roles.cache.has(dirlo.id) ||
      message.member.roles.cache.has(heraut.id) ||
      message.member.roles.cache.has(modo.id)
    ) {
      let puni =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let muted = await message.guild.roles.cache.find(
        (r) => r.name === "muted"
      );
      let prodig = message.guild.roles.cache.find((r) => r.name === "Prodige");
      if (!puni) return repondre("Qui doit arrêter sa retenue ?");
      if (!puni.roles.cache.has(prodig.id))
        return repondre(
          "Cette personne n'est pas un prodige ! Comment pourrait-elle être en retenue ?"
        );
      let raison = args.slice(1).slice(1).join(" ");
      if (puni.roles.cache.has(muted.id)) {
        await puni.roles.remove(muted.id);
        repondre(
          `Tu as de la chance ${puni} ! ${message.member} a décidé d'arrêter ta retenue pour la raison suivante : ${raison}`
        );
      } else return repondre("Cette personne n'est pas en retenue, voyons !");
    } else return repondre("Tu n'as pas le droit de faire ça !");
  }
  if (message.content.startsWith(prefix + "noblesse")) {
    let elite = message.guild.roles.cache.find(
      (r) => r.name === "Élite de Foxfire"
    );
    let noble =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args.slice(1)[0]);
    if (!noble) return repondre("Veuillez préciser un membre");
    if (!noble.roles.cache.has(elite.id))
      return repondre("Cette personne n'est pas dans l'Élite de Foxfire.");
    let dirlo = message.guild.roles.cache.find(
      (r) => r.name === "Directeur de Foxfire"
    );
    let heraut = message.guild.roles.cache.find(
      (r) => r.name === "Héraut de la Tour d'Argent"
    );
    if (
      !message.member.roles.cache.has(modo.id) &&
      !message.member.roles.cache.has(dirlo.id) &&
      !message.member.roles.cache.has(heraut.id)
    ) {
      return repondre("Vous ne pouvez pas faire ça !");
    }
    let noblesse = message.guild.roles.cache.find(
      (r) => r.name === "Membre de la noblesse"
    );
    let reg = /<([^>]+)>/;
    let metier = message.guild.roles.cache.find(
      (r) => r.name === args.slice(1).join(" ").match(reg)[1]
    );
    let talent = message.guild.roles.cache.find(
      (r) => r.name === args.slice(3).join(" ").match(reg)[1]
    );
    let prodig = message.guild.roles.cache.find((r) => r.name === "Prodige");
    let newPseudo = args
      .slice(1)
      .slice(2)
      .join(" ")
      .match(/<[^>]+> <([^>]+)>/)[1];
    // loguer(args.slice(1).slice(2).join(" "));
    await noble.roles.add(noblesse.id);
    await noble.roles.add(metier.id);
    await noble.roles.add(talent.id);
    await noble.setNickname(newPseudo);
    await noble.roles.remove(elite.id);
    await noble.roles.remove(prodig.id);
    await repondre(
      `Félicitations ${noble} ! Tu as rejoins la noblesse et obtenu le métier ${metier.name} et le talent ${talent.name}`
    );
  }
};
