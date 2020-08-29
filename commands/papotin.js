const Command = require('../base/Command.js');
const { Message } = require('discord.js');

class Papotin extends Command {
  constructor() {
    super({
      name: 'papotin',
      description: "Donne un papotin à l'utilisateur",
      usage: 'papotin',
      aliases: ['epingle'],
      guildOnly: true,
      category: 'Gardiens des cités perdues',
      enabled: true,
    });
  }
  /**
   *
   * @param {Message} message
   */
  async run(message) {
    try {
      if (!message.channel.id === '720691147340775535')
        return this.repondre(
          message,
          'Veuillez vous rendre dans le salon <#720691147340775535> pour exécuter cette commande !'
        );
      let papoRole = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === 'papotin'
      );
      if (!message.member.roles.cache.has(papoRole.id))
        return this.repondre(message, "Vous n'avez acheté aucun papotin !");

      function randomise() {
        var num = Math.random() * 100;

        if (num < 5) return 1;
        if (num < 55) return 2;
        else return 3;
      }
      let base = randomise();

      await this.client.papotins.ensure(message.author.id, {
        epingles: [],
        boost: false,
        lastUpdate: new Date(),
      });

      if (this.client.papotins.get(message.author.id, 'boost') === 'boosted')
        this.client.papotins.set(message.author.id, false, 'boost');
      if (this.client.papotins.get(message.author.id, 'boost') === true) {
        base = 1;
        this.client.papotins.set(message.author.id, 'boosted', 'boost');
      }

      let epingle;
      console.log(base);
      let names,
        randOne,
        randTwo,
        randThree,
        randFour,
        randFive,
        randSix,
        rand,
        arr;

      switch (base) {
        case 1:
          names = [
            'Argentavis',
            'Licorne',
            'Méganeura',
            'Selkie',
            'Colibri lunaire',
            'Kelpie',
            'Gorgonops',
            'Apyrodon',
            'Mastodonte',
          ];
          randOne = Math.floor(Math.random() * names.length);
          randTwo = Math.floor(Math.random() * names.length);
          randThree = Math.floor(Math.random() * names.length);
          randFour = Math.floor(Math.random() * names.length);
          randFive = Math.floor(Math.random() * names.length);
          randSix = Math.floor(Math.random() * names.length);
          arr = [randOne, randTwo, randThree, randFour, randFive, randSix];
          for (let ii of names) {
            let regex = new RegExp(', ' + names.indexOf(ii) + ',', 'g');
            let tomatch = ', ' + arr.join(', ') + ',';
            let matched = tomatch.match(regex);
            if (matched) {
              if (matched.length === 5) {
                epingle = 'Grogodon';
                break;
              } else if (matched.length === 3) {
                epingle = 'Kraken';
                break;
              } else if (matched.length === 4) {
                epingle = 'Alicorne';
                break;
              } else if (matched.length > 1) {
                epingle = ii;
                break;
              }
            } else matched = undefined;
          }
          if (epingle === undefined || epingle === null)
            epingle = [
              'Argentavis',
              'Licorne',
              'Méganeura',
              'Selkie',
              'Colibri lunaire',
              'Kelpie',
              'Gorgonops',
              'Apyrodon',
              'Mastodonte',
            ].random();
          console.log(epingle);
          break;
        case 2:
          names = ['Sasquatch', 'Banshee', 'Gremlin'];
          randOne = Math.floor(Math.random() * names.length);
          randTwo = Math.floor(Math.random() * names.length);
          randThree = Math.floor(Math.random() * names.length);
          randFour = Math.floor(Math.random() * names.length);
          randFive = Math.floor(Math.random() * names.length);
          randSix = Math.floor(Math.random() * names.length);
          arr = [randOne, randTwo, randThree, randFour, randFive, randSix];
          for (let ii of names) {
            let regex = new RegExp(', ' + names.indexOf(ii) + ',', 'g');
            let tomatch = ', ' + arr.join(', ') + ',';
            let matched = tomatch.match(regex);
            if (matched) {
              if (matched.length === 6) {
                epingle = 'Grogodon';
                break;
              } else if (matched.length === 4) {
                epingle = 'Alicorne';
                break;
              } else if (matched.length > 1) {
                epingle = ii;
                break;
              }
            } else matched = undefined;
            console.log('Matched : ' + matched);
          }
          if (epingle === undefined || epingle === null)
            epingle = ['Sasquatch', 'Banshee', 'Gremlin'].random();
          console.log(epingle);

          break;
        case 3:
          names = ['Verminion', 'Jaculus', 'Lutin', 'Boobrie', 'Alcyon'];
          randOne = Math.floor(Math.random() * names.length);
          randTwo = Math.floor(Math.random() * names.length);
          randThree = Math.floor(Math.random() * names.length);
          randFour = Math.floor(Math.random() * names.length);
          randFive = Math.floor(Math.random() * names.length);
          randSix = Math.floor(Math.random() * names.length);
          arr = [randOne, randTwo, randThree, randFour, randFive, randSix];
          for (let ii of names) {
            let regex = new RegExp(', ' + names.indexOf(ii) + ',', 'g');
            let matched = (', ' + arr.join(', ') + ',').match(regex);
            let tomatch = ', ' + arr.join(', ') + ',';
            console.log(tomatch);
            if (matched) {
              if (matched.length > 1) {
                epingle = ii;
                break;
              }
            } else matched = undefined;
          }
          if (epingle === undefined || epingle === null)
            epingle = [
              'Verminion',
              'Jaculus',
              'Lutin',
              'Boobrie',
              'Alcyon',
            ].random();
          console.log(epingle);
          break;
      }

      if (epingle === undefined || epingle === null)
        epingle = [
          'Argentavis',
          'Licorne',
          'Méganeura',
          'Selkie',
          'Colibri lunaire',
          'Kelpie',
          'Gorgonops',
          'Apyrodon',
          'Mastodonte',
          'Sasquatch',
          'Banshee',
          'Gremlin',
          'Verminion',
          'Jaculus',
          'Lutin',
          'Boobrie',
          'Alcyon',
          'Kraken',
        ].random();
      if (epingle === undefined || epingle === null) epingle = 'Alicorne';
      await this.client.papotins
        .get(message.author.id, 'epingles')
        .push(epingle);

      await message.member.roles
        .remove(papoRole.id)
        .catch((err) =>
          this.client.channels.cache.get('746688731557265481').send(err)
        );
      let user = message.author;
      switch (epingle) {
        case 'Lutin':
          message.channel.send(
            '*Te tend un papotin.*\nTiens ' +
              user.toString() +
              ` : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.\nBon appétit, et bonne chance !\n\n*${user} termine de manger son papotin*\n\n*${user} ouvre la boîte*\n\nC'est...\n\n\n\n\n\n<:Iggy:610877650508054569> Un lutin ! <:Iggy:610877650508054569>\nLe lutin n'est pas rare. C'est une épingle commune.\nIl y en a 287 dans le monde.\n\nAccroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/c/c1/Sm_iggy.jpg/revision/latest/scale-to-width-down/185?cb=20190104133038&path-prefix=fr',
                  name: 'lutins.png',
                },
              ],
            }
          );
          break;
        case 'Verminion':
          message.channel.send(
            `*Te tend un papotin.*\nTiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.\nBon appétit, et bonne chance !\n\n\n*${user} termine de manger son papotin*\n\n*${user} ouvre la boîte*\n\nC'est...\n\n\n\n\n\nUn Verminion ! \nUn Verminion est un animal qui ressemble beaucoup à un hamster de la taille d’un rottweiler à la fourrure violette. Ils possèdent des yeux noirs vitreux et de grosses joues rebondies. Comme tout les rongeurs, ils possèdent aussi des dents de devants assez longues mais contrairement à ceux des lapins ou des hamsters, les leurs sont pointues comme des crocs. Ces êtres sont carnivores et se nourrissent de petits animaux tels que des écureuils ou des rats ou encore des lutins. C’est une espèce inconnue aux yeux des humains et Grady et Edaline font de leurs mieux pour les faire adapter au régime végétarien. \nUn Verminion est une bête qui a un très fort caractère. Ils sont désobéissants et grognent souvent lorsqu’ils sont approchés de trop près. Ils n’ont pas peur des elfes.\n\nLe Verminion n'est pas très rare : il y a 98 épingles comme cela dans le monde.\nAccroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/2/20/Verminion.jpg/revision/latest?cb=20180330181623&path-prefix=fr',
                  name: 'verminion.png',
                },
              ],
            }
          );
          break;
        case 'Licorne':
          message.channel.send(
            `*Te tend un papotin.*\nTiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.\nBon appétit, et bonne chance !\n\n\n*${user} termine de manger son papotin*\n\n${user} ouvre la boîte*\n\nC'est...\n\n\n\n<:licorne:604247929351438336> Une licorne ! <:licorne:604247929351438336>\n\nLes licornes sont des chevaux argentés ou blancs. La famille Heks s'est occupée de plusieurs générations de licornes. Contrairement aux alicornes, elles n'ont pas d'ailes. Cependant, comme ces dernières et la plupart des équidés, elles ne survivent pas aux naissances multiples. Leur particularité est la corne torsadée qui surmonte leur front.\n\nElles sont extrêmement rares. Il y en a 34 en tout dans le monde entier.\n\nAccroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/7/77/Licorne.jpg/revision/latest?cb=20190119180300&path-prefix=fr',
                  name: 'licorne.png',
                },
              ],
            }
          );
          break;
        case 'Apyrodon':
          message.channel.send(
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Apyrodon ! 🎉

Les Apyrodons sont des créatures ressemblant à des ptérodactyles de la taille d'un aigle. Ils ont une fourrure dorée résistante au feu et sont assez rare. Ils vivent souvent proche des volcans car ils ont besoin de feu pour maintenir une température corporelle normale, ce qui représente pour les elfes une température extrêmement élevée. Si leur température corporelle est trop basse, il risquent de mourir rapidement. C'est aussi la mascotte du niveau 7 de Foxfire.

Les apyrodons sont assez rares ! Il y en a 56 dans le monde
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment: 'https://i.imgur.com/1GWPV22.png',
                  name: 'apyrodon.png',
                },
              ],
            }
          );
          break;
        case 'Boobrie':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




Un boobrie !

Les boobries sont une espèce d'oiseau qui font des bruits assourdissants. Ils sont décrits comme des oiseaux noirs de la taille d'un perroquet avec des yeux noirs brillants, des plumes jaunes et de longs cils bouclés.

Les boobries ne sont pas très rares. C'est donc une épingle commune. Il y a 141 boobries dans le monde.

Accroche ton épingle où tu veux !`);
          break;
        case 'Gorgonops':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Gorgonops !! 🎉

Les Gorgonops sont des créatures en voie d'extinction. Il ressemble à une sorte de croisements étranges entre un tigre à dent de sable, un hippopotame et un rat géant ; ils sont très laids et carnivores. Ils sont présents dans une zone à l'écart interdit aux visiteurs dans le sanctuaire.

Les Gorgonops sont en voie d'extinction. Il n'y a que 24 épingles comme celle-là dans le monde.
Accroche ton épingle où tu veux !`);
          break;
        case 'Kraken':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Kraken ! 🎉

Le Kraken est une énorme bête aquatique verte. Ils ressemblent à un mélange entre une pieuvre, un éléphant et un lion. Ces créatures ont six crocs, un nez tentaculaire en forme de trompe et un corps visqueux. Ils sont référencés et il est révélé qu'ils vivent dans des eaux plus froides.

Les Krakens sont hyper rares. Il n'y a que 10 épingles comme celle-ci dans le monde.
Accroche ton épingle où tu veux !`);
          break;
        case 'Kelpie':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Kelpie ! 🎉

Le Kelpie est un animal vivant dans la *Vallée Crépusculaire*, près de Rimeshire (chez les Dizznee). C'est un endroit que certains décrivent comme le plus froid des Cités Perdues.
On peut donc en déduire que le Kelpie est un animal qui apprécie le froid.

Les Kelpies sont rares. Il n'y a que 21 épingles comme celle-ci dans le monde.
Accroche ton épingle où tu veux !`);
          break;
        case 'Jaculus':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Jaculus ! 🎉

Le jaculus est un petit animal (on peut le tenir en main) qui ressemble à un serpent avec des ailes. 
Son régime alimentaire est constitué de sang. Il suce le sang d'animaux, ce qui montre qu'il s'agit d'un carnivore ou peut-être d'un omnivore. Son venin est très précieux en Médecine. Il y en a chez Slurps & Burps.

Le jaculus n'est pas rare : il y en a 223 dans le monde.
Accroche ton épingle où tu veux !`);
          break;
        case 'Sasquatch':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un sasquatch ! 🎉

Les sasquatches sont de grandes créatures vertes, poilues, aux yeux pétillants et aux plumes vert vif. Ils ont le nez en forme de bec et, grâce à une caractéristique sur leurs mains et leurs pieds, ils sont capables de grimper aux arbres (en laissant des traces de rayures). Ils sont également capables de se balancer sur les vignes.

Les sasquatches sont rares. Cette épingle a 52 sœurs.
Accroche ton épingle où tu veux !`);
          break;
        case 'Argentavis':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




Un Argentavis ! 🎉

Les Argentavis sont de gigantesques oiseaux bleus argentés. Charognards de nature, ils peuvent devenir végétariens une fois apprivoisés. Ils ont aussi la capacité de voler très haut : d'après Sophie, il vole "parmi les étoiles scintillantes". Grady et Edaline en ont apprivoisé un.

Ils sont très rares : il n'y en a plus que 25 dans le monde !
Accroche ton épingle où tu veux !`);
          break;
        case 'Banshee':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Banshee ! 🎉

Les banshees sont des créatures ressemblant à des furets et qui peuvent sentir quand quelqu'un est en danger. Ils crient quand les maladies de quelqu'un sont mortelles et se posent à côté d'eux quand ils meurent et sont sur leurs dernières respirations. Parfois, ils vont s'allonger à côté de quelqu'un, mais il survivra miraculeusement, mais c'est rare et n'arrive généralement pas. Bullhorn a fait cela pendant 2 semaines quand Sophie Foster s'est évanouie après l'enlèvement.

Ils sont rares : il y en a 57 dans le monde.
Accroche ton épingle où tu veux !`);
          break;
        case 'Mastodonte':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Mastodonte ! 🎉

Il n'y a pas besoin de préciser ce qu'est un mastodonte !

Ils sont très rares : il y en a  26 répertoriés.
Accroche ton épingle où tu veux !`);
          break;
        case 'Méganeura':
          message.channel.send(
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Une Méganeura ! 🎉

Les méganeuras sont d’imposantes créatures aux ailes souvent assez jolies. Elles ressemblent à des libellules géantes.

Elles sont très rares : 22 méganeuras sont répertoriées à ce jour.
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/6/68/Meganeura.jpg/revision/latest?cb=20190311170028&path-prefix=fr',
                  name: 'meganeura.png',
                },
              ],
            }
          );
          break;
        case 'Selkie':
          message.channel.send(`*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Une selkie ! 🎉

Les Selkies sont des créatures très imposantes à mi chemin entre les otaries et les serpents : elles ont de longs corps enroulés tel des ressorts et une tête hérissé de vibrisses. Ces créatures vivent généralement à l'écart des cités perdues : on peut par exemple en trouver à l'île d'encre (la porte d'accès à l'Atlantide).

Leur peau congelée à différents usages : les elfes s'en servent comme un médicament ou pour attirer des escalurgeons qui trouvent cette odeur irrésistible.

Cette épingle est très rare : il n'existe que 19 selkies.
Accroche ton épingle où tu veux !`);
          break;
        case 'Gremlin':
          message.channel.send(
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...





🎉 Un gremlin ! 🎉
Les gremlins sont des animaux qui passent leur temps à démonter tous les objets qui leur tombent sous la main.
C'est aussi la mascotte du niveau 1 de Foxfire.

Ils ne sont pas rares : 115 gremlins sont répertoriés à ce jour.
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/d/db/Gremlin.png/revision/latest?cb=20200727123259&path-prefix=fr',
                  name: 'gremlin.png',
                },
              ],
            }
          );
          break;
        case 'Colibri lunaire':
          message.channel.send(
            `Te tend un papotin.
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...

🎉 Un Colibri lunaire 🎉

Les colibris lunaires, ou "Suldreen" dans la langue des lumières, sont des oiseaux très rares. Ils sont parés des plumes argentées ou bleues disposées en roue comme le paon, de longues jambes comme une grue et un cou semblable à celui d'un cygne. Ces oiseaux pondent leurs œufs dans l'océan et permettent à la marée de les emporter, laissant le bébé se débrouiller seul.

Ils sont très rares : il y en a 16 dans le monde.
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'http://2.bp.blogspot.com/-D6wRZSKfgIY/UsNPsUZ8HjI/AAAAAAAAEWw/wXFoRsXfJHU/s1600/moonlark+front.jpg',
                  name: 'colibrilunaire.png',
                },
              ],
            }
          );
          break;
        case 'Gorgodon':
          message.channel.send(`Te tend un papotin.
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...

🎉 Un Gorgodon ! 🎉

Les gorgodons sont des hybrides créés par Lady Gisela pour garder son Nocturna. C'est un mélange d'Apyrodon pour la résistance au feu, de Gorgonops pour leurs crocs, d'Argentavis pour leurs ailes immenses et d'Euryptéride pour leurs queues venimeuses. Ils ont fini par être beaucoup plus meurtriers que prévu, car la génétique peut être complexe. Il ont au final des crocs, des griffes et des dards venimeux, la capacité de voler, de respirer sous l’eau, d’escalader les murs et de se camoufler.

Cette épingle fait partie des plus rares du monde : il y a eu en tout 3 gorgodons qui ont existé (2 sont morts malheureusement).
Accroche ton épingle où tu veux !`);
          break;
        case 'Alicorne':
          message.channel.send(
            `Te tend un papotin.
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...






🎉 Une Alicorne !!! 🎉

Félicitations ! Tu as obtenu Luna, la jeune alicorne fille de Silveny et Greyfell !

Je n'ai pas besoin de t'expliquer ce qu'est une alicorne. Tu le sais très bien. 

Cette épingle fait partie des plus rares du monde : seulement 4 Alicornes existent dans le monde !.
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/a/ad/Capture_d%E2%80%99%C3%A9cran_2020-05-10_%C3%A0_18.59.51.png/revision/latest/scale-to-width-down/185?cb=20200510170130&path-prefix=fr',
                  name: 'alicorne.png',
                },
              ],
            }
          );
          break;
        case 'Alcyon':
          message.channel.send(
            `Te tend un papotin.
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...

🎉 Un Alcyon ! 🎉

Ce sont des oiseux aux plumes bleus, assez petit, comme on peut le voir sur le badge de la prestigieuse école elfique .
De l'avis de Dex, ils sont assez boiteux, car leur seul atout est de pouvoir sentir quand les tempêtes arrivent.


Cette épingle n'est pas rare : 234 Alcyon ont été répertoriés dans le monde.
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://vignette.wikia.nocookie.net/gardiens-des-cites-perdue/images/b/b3/Alcyon.png/revision/latest?cb=20200727122846&path-prefix=fr',
                  name: 'alcyon.png',
                },
              ],
            }
          );
          break;
      }
    } catch (err) {
      this.client.utils.get('error').run(err, message, this.client);
    }
  }
}

module.exports = Papotin;
