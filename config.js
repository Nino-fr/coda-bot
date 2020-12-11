/**
 * @typedef {{
  ownerID: '428582719044452352',
  version: string,

  admins: string[],

  support: string[],

  token: string,

  assistanceToken: string,

  settings: {
    prefix: string,
    modLogChannel: string,
    modRole: string,
    adminRole: string,
    systemNotice: string,
    welcomeEnabled: string,
    welcomeMessage: string,
  },

  permLevels: object[],
}}
 */
let BotConfig;

/**
 * @type {BotConfig}
 */
const config = {
  ownerID: '428582719044452352',
  version: '2.6.4',

  // Bot Admins. Tableau des ID des administrateurs du bot
  admins: [
    '428582719044452352',
    '557612750734491661',
    '536283567865593856',
    '699294152193736704',
  ],

  // Bot Support. Tableau des ID des membres du support du bot du bot
  support: ['428582719044452352', '557612750734491661', '536283567865593856'],

  // Le token de votre bot, trouvable sur https://discordapp.com/developers/applications/me
  token: 'secretToken',

  assistanceToken: 'tokenSecret',

  defaultSettings: {
    prefix: '&',
    modLogChannel: 'logs',
    modRole: 'Émissaire 『MODÉRATEUR 』',
    adminRole: 'Conseiller 『Administrateur』',
    systemNotice: 'true',
    welcomeEnabled: 'true',
    welcomeMessage: 'Bienvenue dans ce serveur {{user}} !',
  },

  permLevels: [
    // Niveau de permission des simples membres
    {
      level: 1,
      name: 'Membre',
      // Pas besoin de vérifier, tout le monde est membre
      check: () => true,
    },

    {
      level: 2,
      // Niveau de permission des modérateurs du serveur
      name: 'Moderateur',
      // Les lignes suivantes vérifient que l'utilisateur possède bien un rôle contenant "mod"
      check: (message) => {
        try {
          const modRole = message.guild.roles.cache.find((r) =>
            r.name.toLowerCase().includes('mod')
          );
          if (modRole && message.member.roles.cache.has(modRole.id))
            return true;
        } catch (e) {
          return false;
        }
      },
    },

    {
      level: 3,
      name: 'Administrateur',
      // Les lignes suivantes vérifient que l'utilisateur possède bien un rôle contenant "admin"
      check: (message) => {
        try {
          const adminRole = message.guild.roles.cache.find((r) =>
            r.name.toLowerCase().includes('admin')
          );
          return adminRole && message.member.roles.cache.has(adminRole.id);
        } catch (e) {
          return false;
        }
      },
    },

    // Niveau de permission des administrateurs du bot
    {
      level: 4,
      name: 'Bot Admin',
      check: (message) => config.admins.includes(message.author.id),
    },

    // Niveau de permission du/des propriétaire(s) du bot
    {
      level: 5,
      name: 'Propriétaire',
      // Si un seul propriétaire, faire :
      check: (message) => config.ownerID === message.author.id,
      // Si plusieurs propriétaires, faire :
      // check: (message) => ["ID du premier propriétaire", "ID du deuxième", "etc"].includes(message.author.id)
    },
  ],
};

module.exports = config;
