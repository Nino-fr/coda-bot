const { MessageEmbed } = require('discord.js');

exports.run = (err, message, client) => {
  console.log('✅ Erreur évitée : ' + err);

  const error_embed = new MessageEmbed()
    .setColor('#2f3136')
    .setDescription(
      '🔺 **Il y a eu une erreur avec le bot :**\n```js\n' + err + '```'
    );
  let only_at = err.stack
    .slice(err.toString().length)
    .split('at')[1]
    .split('(')[0]
    .split(')')[0]
    .trim();
  if (message) {
    if (message.author.bot) return;

    let message_content = message.content.split(' ');
    if (message_content.length > 20)
      message_content =
        message_content.slice(0, 20).join(' ') +
        ' [...] ' +
        message_content[message_content.length - 1];
    if (!message.content) message_content = 'Aucun contenu de message !';

    error_embed.addField(
      '🔺 Utilisateur : ',
      message.author.tag + ' | ' + message.author.id,
      true
    );
    error_embed.addField('🔺 Message / Commande : ', message_content, true);
    error_embed.addField('🔺 Lien vers le message : ', message.url);

    const error_embed_channel = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription(
        `🔺 **Il y a eu une erreur avec le bot !** \nFichier et ligne : ${
          '```cs\n# ' + only_at + '\n```'
        }\n\n **Nino, le créateur du bot, a été prévenu du problème, il est inutile de le signaler.**`
      );

    message.channel.send(error_embed_channel);
  }

  error_embed.addField(
    '🔺 Précisions :',
    '```\nNom : ' + err.name + '\nMessage : ' + err.message + '```',
    true
  );
  error_embed.addField('🔺 Fichier et Ligne: ', '```cs\n# ' + only_at + '```');

  client.channels.cache.get('738363648447217695').send(error_embed);
  client.channels.cache.get('738363648447217695').send('<@428582719044452352>');
};

exports.help = {
  name: 'error',
};
