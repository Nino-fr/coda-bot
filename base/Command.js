// Importer le client depuis l'index pour pouvoir l'utiliser dans toutes les commandes sans l'importer grâce au constructor.
const { client } = require('../index.js');

class Command {
  constructor({
    // Le nom de la commande, par défaut null.
    name = null,
    // Une courte description de la commmande, par défaut "Aucune".
    description = 'Aucune',
    // La catégorie pour la page d'aide, par défaut "Utilitaires".
    category = 'Utilitaires',
    // Comment utiliser la commande, par défaut "Aucun".
    usage = 'Aucun',
    // Si la commande est active ou non, par défaut oui.
    enabled = true,
    // Si la commande ne peut être utilisée que dans les serveurs, pas en mp, par défaut non.
    guildOnly = false,
    // Les aliases, raccourcis des noms des commandes. Stockés dans un tableau.
    aliases = new Array(),
    // Le niveau de permission minimum requis pous la commande, par défaut "User", le plus bas
    permLevel = 'User',
  }) {
    this.client = client;
    this.conf = { enabled, guildOnly, aliases, permLevel };
    this.help = { name, description, category, usage };
    this.repondre = this.client.repondre;
  }
}
module.exports = Command;
