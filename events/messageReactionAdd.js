const { MessageReaction } = require('discord.js');
const { client } = require('../index.js');

module.exports = class {
  constructor() {
    this.client = client;
  }
  /**
   *
   * @param { MessageReaction } reaction
   * @param { import('discord.js').PartialUser } user
   */
  async run(reaction, user) {
    if (reaction.partial) await reaction.fetch();
    if (user.partial) await user.fetch();
    if (reaction.message.guild.id === '786656458657104005') {
      let message = reaction.message,
        member = await message.guild.members.fetch(user.id);
      if (reaction.emoji.name === '🥑') {
        if (!member.roles.cache.has('802265946545717301'))
          await member.roles.add('802265946545717301').catch(console.error);
      } else if (reaction.emoji.name === '🐧') {
        if (!member.roles.cache.has('802609189590925372'))
          await member.roles.add('802609189590925372').catch(console.error);
      } else if (reaction.emoji.name === '🧀') {
        if (!member.roles.cache.has('802265941437186058'))
          await member.roles.add('802265941437186058').catch(console.error);
      } else if (reaction.emoji.name === '🍫') {
        if (!member.roles.cache.has('802265943962550354'))
          await member.roles.add('802265943962550354').catch(console.error);
      } else if (reaction.emoji.name === '🌿') {
        if (!member.roles.cache.has('802265745878024243'))
          await member.roles.add('802265745878024243').catch(console.error);
      } else if (reaction.emoji.name === '🐱') {
        if (!member.roles.cache.has('802265948257779722'))
          await member.roles.add('802265948257779722').catch(console.error);
      } else if (reaction.emoji.name === '🇳🇱') {
        if (!member.roles.cache.has('786672749309329449'))
          await member.roles.add('786672749309329449').catch(console.error);
      } else if (reaction.emoji.name === '🇩🇪') {
        if (!member.roles.cache.has('786672362695295026'))
          await member.roles.add('786672362695295026').catch(console.error);
      } else if (reaction.emoji.name === '🇪🇸') {
        if (!member.roles.cache.has('786672151225827400'))
          await member.roles.add('786672151225827400').catch(console.error);
      } else if (reaction.emoji.name === '🇬🇷') {
        if (!member.roles.cache.has('786672471612194818'))
          await member.roles.add('786672471612194818').catch(console.error);
      } else if (reaction.emoji.name === '🇻🇦') {
        if (!member.roles.cache.has('786839975504248862'))
          await member.roles.add('786839975504248862').catch(console.error);
      } else if (reaction.emoji.name === '🤨') {
        if (!member.roles.cache.has('786915077600182283'))
          await member.roles.add('786915077600182283').catch(console.error);
      } else if (reaction.emoji.name === '🤦') {
        if (!member.roles.cache.has('801873378373926934'))
          await member.roles.add('801873378373926934').catch(console.error);
      }
    }
  }
};
