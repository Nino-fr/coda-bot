const Canvas = require('canvas');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    const verify = async () => {
      if (member.guild.id !== '574626014664327178') return;
      let username = member.user.username;
      if (/[^\x00-\x7F]+/gu.test(member.user.username)) {
        let newNickname = username.replace(/_/g, ' ').replace(/-/g, ' ');
        let tochange = newNickname.match(/([^\x00-\x7F]+)/gu);
        tochange[1]
          ? tochange.forEach(
              (matched) =>
                (newNickname = newNickname
                  .replace(matched, matched.normalize('NFKC'))
                  .replace(matched, ''))
            )
          : (newNickname = newNickname
              .replace(matched, matched.normalize('NFKC'))
              .replace(matched, ''));
        newNickname = newNickname.replace(/([^\x00-\x7F]+)/gu, '');

        if (newNickname.length === 0) newNickname = 'Pseudo à changer';
        await member.setNickname(newNickname);
        await member.guild.channels.cache
          .find((ch) => ch.name === 'logs')
          .send(
            `Le pseudo de <@${member.id}> a été changé de ${member.user.username} en ${member.nickname} car il contenait plusieurs caractères non autorisés.`
          );
      }
      let regGDCP = /(?:(?:f+i+t+z+)|(?:k+e+f+e+)|(?:s+[yi]+l+v+e+n+[iy]+)|(?:g+r+a+d+y+)|(?:e+d+a+l+i+n+e+)|(?:d+e+l+l+a+)|(?:a+l+d+e+n+))/gi;
      if (regGDCP.test(member.user.username)) {
        let newNickname = 'Pseudo à changer';
        await member.setNickname(newNickname);
        await member.guild.channels.cache
          .find((ch) => ch.name === 'logs')
          .send(
            `Le pseudo de <@${member.id}> a été changé de ${member.user.username} en ${member.nickname} car il contenait un nom d'un personnage de GDCP.`
          );
      }
    };
    await verify();
    // Load the guild's settings
    const settings = this.client.getSettings(member.guild);

    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== 'true') return;

    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace(
      '{{user}}',
      member.user
    );

    // Send the welcome message to the welcome channel
    // There's a place for more configs here.
    member.guild.channels.cache
      .find((c) => c.name.includes('bienvenue'))
      .send(welcomeMessage)
      .catch(console.error);

    /**
     * Appliquer le texte sur une image
     * @param {Canvas.Canvas} canvas
     * @param {string} text
     */

    const applyText = (canvas, text) => {
      try {
        const ctx = canvas.getContext('2d');

        // Declare a base size of the font
        let fontSize = 70;

        do {
          // Assign the font to the context and decrement it so it can be measured again
          ctx.font = `${(fontSize -= 10)}px sans-serif`;
          // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);

        // Return the result to use in the actual canvas
        return ctx.font;
      } catch (err) {
        this.client.utils.get('error').run(err, message, this.client);
      }
    };
    let wChannel = await member.guild.channels.cache.find((ch) =>
      ch.name.includes('bienvenue')
    );

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(
      'Bienvenue dans ce serveur,',
      canvas.width / 2.5,
      canvas.height / 3.5
    );

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(
      `${member.displayName}`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: 'png' })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    await wChannel.send({
      files: [
        {
          attachment: canvas.toBuffer('image/png', 'image/png'),
          name: 'welcome.png',
        },
      ],
    });
  }
};
