const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "emoji",
    description:
      "Envoie un emoji aléatoire fait avec des éléments du clavier. Exemple : (° ͜ʖ ͡°)",
    usage: prefix + "emoji",
    category: "Pour tous",
    accessableby: "Tout le monde",
    aliases: ["randomemoji", "émoji", "randomémoji"],
  },
  run: async (bot, message, args) => {
    const emojis = [
      "(° ͜ʖ ͡°)",
      "¯\\_(ツ)_/¯",
      "ʕ•ᴥ•ʔ",
      "(▀̿Ĺ̯▀̿ ̿)",
      "(ง ͠° ͟ل͜ ͡°)ง",
      "ಠ_ಠ",
      "̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
      "[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]",
      "﴾͡๏̯͡๏﴿",
      "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
      "(ᵔᴥᵔ)",
      "(¬‿¬)",
      "(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",
      "(づ￣ ³￣)づ",
      "ლ(ಠ益ಠლ)",
      "ಠ╭╮ಠ",
      "♪~ ᕕ(ᐛ)ᕗ",
      "ヾ(⌐■_■)ノ♪",
      "◉_◉",
      "\\ (•◡•) /",
      "༼ʘ̚ل͜ʘ̚༽",
      "┬┴┬┴┤(･_├┬┴┬┴",
      "ᕦ(ò_óˇ)ᕤ",
      "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻",
      "（╯°□°）╯︵( .o.)",
      "ಠ‿↼",
      "◔ ⌣ ◔",
      "(ノಠ益ಠ)ノ彡┻━┻",
      "(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",
      "̿ ̿ ̿'̿'̵͇̿̿з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿",
      "(;´༎ຶД༎ຶ`)",
      "♥‿♥",
      "ᕦ(ò_óˇ)ᕤ",
      "(•_•) ( •_•)>⌐■-■ (⌐■_■)",
      "⌐╦╦═─ ಠ_ಠ , (¬‿¬)",
      "˙ ͜ʟ˙",
      ":')",
      "(°ロ°)☝",
      "ಠ⌣ಠ",
      "(；一_一)",
      "( ⚆ _ ⚆ )",
      "☜(⌒▽⌒)☞",
      "(ʘᗩʘ')",
      "¯\\(°_o)/¯",
      "ლ,ᔑ•ﺪ͟͠•ᔐ.ლ",
      "(ʘ‿ʘ)",
      "ಠ~ಠ",
      "ಠ_ಥ",
      "ಠ‿↼",
      "(>ლ)",
      "(ღ˘⌣˘ღ)",
      "ಠoಠ",
      "ರ_ರ",
      "◔ ⌣ ◔",
      "(✿´‿`)",
      "ب_ب",
      "┬─┬﻿ ︵ /(.□. ）",
      "☼.☼",
      "^̮^",
      "(>人<)",
      ">_>",
      "(/) (°,,°) (/)",
      "(･.◤)",
      "=U",
      "~(˘▾˘~)",
      "| (• ◡•)| (❍ᴥ❍ʋ)",
    ];
    let index = Math.floor(Math.random() * emojis.length); // Math.random() returns a float from 0 - 1.
    message.channel.send(emojis[index]);
    console.log(`Commande emoji exécutée dans le serveur ${message.guild.name}`)
  },
};