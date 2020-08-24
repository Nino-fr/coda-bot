const Canvas = require("canvas");

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  // Declare a base size of the font
  let fontSize = 70;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (ctx.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return ctx.font;
};
module.exports = async (user) => {
  let wChannel = user.guild.channels.cache.find((serv) =>
    serv.name.includes("bienvenue")
  );
  const sayArray = [
    `**${user}** a rejoint le serveur, cachez vous !`,
    `Qui veux des chips ? **${user}** a rejoint le serveur !`,
    `Hey, **${user}**, bienvenue sur **${user.guild.name}** ! Amuse-toi bien !`,
    `Attention ! **${user}** vient de débarquer !`,
    `**${user}** est entré(e) dans le monde étrange de ce serveur ! Bonne chance !`,
    `Bienvenue ${user} ! Tu as apporté du chocolat ?`,
    `Oh, mais qui voilà ? C'est ${user} !`,
  ];

  // random
  const math = Math.floor(Math.random() * sayArray.length);

  //Envoi de l'embed dans le channel défini au début
  if (wChannel)
    wChannel.send({
      embed: {
        color: 0x4fce69,
        title: "**Bienvenue** 👋 ",
        description: `${sayArray[math]}`,
      },
    });
  if (wChannel) {
    let canvas = Canvas.createCanvas(700, 250);
    let ctx = canvas.getContext("2d");

    let background = await Canvas.loadImage("./wallpaper.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      "Bienvenue dans ce serveur,",
      canvas.width / 2.5,
      canvas.height / 3.5
    );

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${user.displayName}!`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${user.displayName}`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    let avatarlink = user.user.displayAvatarURL({ format: "png" });
    let avatar = await Canvas.loadImage(avatarlink);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    wChannel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "welcome.png",
        },
      ],
    });
  }
};
