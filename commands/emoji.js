const Command = require('../base/Command.js');
const { Message } = require('discord.js');

class Emoji extends Command {
  constructor() {
    super({
      name: 'emoji',
      description: 'Donne un emoji aléatoire fait avec un clavier',
      usage: 'emoji',
      aliases: ['emote', 'clavieremoji', 'dactylemote'],
    });
  }
  /**
   * Donne un emoji aléatoire fait avec un clavier
   * @param { Message } message Le message
   */
  async run(message) {
    const emojis = [
      '(° ͜ʖ ͡°)',
      '¯\\_(ツ)_/¯',
      'ʕ•ᴥ•ʔ',
      '(▀̿Ĺ̯▀̿ ̿)',
      '(ง ͠° ͟ل͜ ͡°)ง',
      'ಠ_ಠ',
      "̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
      '[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]',
      '﴾͡๏̯͡๏﴿',
      '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]',
      '(ᵔᴥᵔ)',
      '(¬‿¬)',
      '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)',
      '(づ￣ ³￣)づ',
      'ლ(ಠ益ಠლ)',
      'ಠ╭╮ಠ',
      '♪~ ᕕ(ᐛ)ᕗ',
      'ヾ(⌐■_■)ノ♪',
      '◉_◉',
      '\\ (•◡•) /',
      '༼ʘ̚ل͜ʘ̚༽',
      '┬┴┬┴┤(･_├┬┴┬┴',
      'ᕦ(ò_óˇ)ᕤ',
      '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',
      '（╯°□°）╯︵( .o.)',
      'ಠ‿↼',
      '◔ ⌣ ◔',
      '(ノಠ益ಠ)ノ彡┻━┻',
      '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)',
      "̿ ̿ ̿'̿'̵͇̿̿з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿",
      '(;´༎ຶД༎ຶ`)',
      '♥‿♥',
      'ᕦ(ò_óˇ)ᕤ',
      '(•_•) ( •_•)>⌐■-■ (⌐■_■)',
      '⌐╦╦═─ ಠ_ಠ , (¬‿¬)',
      '˙ ͜ʟ˙',
      ":')",
      '(°ロ°)☝',
      'ಠ⌣ಠ',
      '(；一_一)',
      '( ⚆ _ ⚆ )',
      '☜(⌒▽⌒)☞',
      "(ʘᗩʘ')",
      '¯\\(°_o)/¯',
      'ლ,ᔑ•ﺪ͟͠•ᔐ.ლ',
      '(ʘ‿ʘ)',
      'ಠ~ಠ',
      'ಠ_ಥ',
      'ಠ‿↼',
      '(>ლ)',
      '(ღ˘⌣˘ღ)',
      'ಠoಠ',
      'ರ_ರ',
      '◔ ⌣ ◔',
      '(✿´‿`)',
      'ب_ب',
      '┬─┬﻿ ︵ /(.□. ）',
      '☼.☼',
      '^̮^',
      '(>人<)',
      '>_>',
      '(/) (°,,°) (/)',
      '(･.◤)',
      '=U',
      '~(˘▾˘~)',
      '| (• ◡•)| (❍ᴥ❍ʋ)',
    ];
    let index = Math.floor(Math.random() * emojis.length); // Math.random() returns a float from 0 - 1.
    message.channel.send(emojis[index]);
  }
}

module.exports = Emoji;
