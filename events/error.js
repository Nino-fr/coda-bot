module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (error) {
    this.client.logger.log(`Une erreur d'API est survenue avec Discord.js : \n${JSON.stringify(error)}`, "error");
  }
};
