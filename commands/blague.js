const Command = require('../base/Command.js');
const fetch = require('node-fetch');

class Blague extends Command {
  constructor() {
    super({
      name: 'blague',
      description: 'Fait une blague aléatoire',
      usage: 'blague',
      aliases: ['joke', 'blagues'],
      category: 'Fun',
    });
  }

  async run(message, args, level) {
    try {
      fetch('https://www.blagues-api.fr/api/random', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDI4NTgyNzE5MDQ0NDUyMzUyIiwibGltaXQiOjEwMCwia2V5IjoiQ3pCWjJUOERyUnZDR0k1TFhNamJtbFE1eGxLQ0NOSUZmeVJNdzR3NGNvdzV2N2l3V3kiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNy0xNlQxNDoyMTowNSswMjowMCIsImlhdCI6MTU5NDkwMjA2NX0.8BukmNCGxs0kAyZaO-ZCXhbLFHVrznkYp6n4uQKJF_0`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.repondre(
            message,
            `[Blague de type **${data.type}**]\n${data.joke}\n${data.answer}`
          );
        });
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Blague;
