const Command = require('../base/Command.js');

class View extends Command {
  constructor() {
    super({
      name: 'view',
      description: "Voir l'épingle demandée",
      usage: 'view <epingle>',
      aliases: ['voir', 'viewEpingle', 'voirEpingle'],
      permLevel: 'Administrateur',
      category: 'Gardiens des cités perdues',
    });
  }

  async run(message, args, level) {
    try {
      let epingle = args.join(' ');
      let user = message.member;
      switch (epingle) {
        case 'Lutin':
          message.channel.send(
            '*Te tend un papotin.*\nTiens ' +
              user.toString() +
              ` : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.\nBon appétit, et bonne chance !\n\n*${user} termine de manger son papotin*\n\n*${user} ouvre la boîte*\n\nC'est...\n\n\n\n\n\n<:Iggy:610877650508054569> Un lutin ! <:Iggy:610877650508054569>\nLe lutin n'est pas rare. C'est une épingle commune.\nIl y en a 321 dans le monde.\n\nAccroche ton épingle où tu veux !`,
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
            `*Te tend un papotin.*\nTiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.\nBon appétit, et bonne chance !\n\n\n*${user} termine de manger son papotin*\n\n*${user} ouvre la boîte*\n\nC'est...\n\n\n\n\n\nUn Verminion ! \nUn Verminion est un animal qui ressemble beaucoup à un hamster de la taille d’un rottweiler à la fourrure violette. Ils possèdent des yeux noirs vitreux et de grosses joues rebondies. Comme tout les rongeurs, ils possèdent aussi des dents de devants assez longues mais contrairement à ceux des lapins ou des hamsters, les leurs sont pointues comme des crocs. Ces êtres sont carnivores et se nourrissent de petits animaux tels que des écureuils ou des rats ou encore des lutins. C’est une espèce inconnue aux yeux des humains et Grady et Edaline font de leurs mieux pour les faire adapter au régime végétarien. \nUn Verminion est une bête qui a un très fort caractère. Ils sont désobéissants et grognent souvent lorsqu’ils sont approchés de trop près. Ils n’ont pas peur des elfes.\n\nLe Verminion n'est pas rare : il y a 302 épingles comme cela dans le monde.\nAccroche ton épingle où tu veux !`,
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
            `*Te tend un papotin.*\nTiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.\nBon appétit, et bonne chance !\n\n\n*${user} termine de manger son papotin*\n\n${user} ouvre la boîte*\n\nC'est...\n\n\n\n<:licorne:604247929351438336> Une licorne ! <:licorne:604247929351438336>\n\nLes licornes sont des chevaux argentés ou blancs. La famille Heks s'est occupée de plusieurs générations de licornes. Contrairement aux alicornes, elles n'ont pas d'ailes. Cependant, comme ces dernières et la plupart des équidés, elles ne survivent pas aux naissances multiples. Leur particularité est la corne torsadée qui surmonte leur front.\n\nElles sont extrêmement rares. Il y en a 54 en tout dans le monde entier.\n\nAccroche ton épingle où tu veux !`,
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

Les apyrodons sont rares ! Il y en a 58 dans le monde
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

Les boobries sont une espèce d'oiseau qui font des bruits assourdissants. Ils sont décrits comme des oiseaux noirs de la taille d'un perroquet avec des yeux noirs brillants, une queue jaune et de longs cils bouclés.

Les boobries ne sont pas rares. Il y a 360 boobries dans le monde.

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

Comme les Gorgonops sont en voie d'extinction, il n'y a que 28 épingles comme celle-là dans le monde.
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

Les Krakens sont hyper rares. Il n'y a que 15 épingles comme celle-ci dans le monde.
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

Les Kelpies sont très rares. Il n'y a que 47 épingles comme celle-ci dans le monde.
Accroche ton épingle où tu veux !`);
          break;
        case 'Jaculus':
          message.channel.send(
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !


*${user} termine de manger son papotin*

*${user} ouvre la boîte*

C'est...




🎉 Un Jaculus ! 🎉

Le jaculus est un petit animal (on peut le tenir en main) qui ressemble à un serpent avec des ailes. 
Son régime alimentaire est constitué de sang. Il suce le sang d'animaux, ce qui montre qu'il s'agit d'un carnivore ou peut-être d'un omnivore. Son venin est très précieux en Médecine. Il y en a chez Slurps & Burps.

Le jaculus n'est pas rare : il y en a 784 dans le monde.
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://cdn.discordapp.com/attachments/604298958285832203/771327542300508200/serpent_aillle.png',
                  name: 'jaculus.png',
                },
              ],
            }
          );
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

Les sasquatches ne sont pas très rares. Cette épingle a 161 sœurs.
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

Ils sont très rares : il n'y en a plus que 83 dans le monde !
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

Ils sont rares : il y en a 136 dans le monde.
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

Ils sont très rares : il y en a  50 répertoriés.
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

Elles sont très rares : 54 méganeuras sont répertoriées à ce jour.
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

Cette épingle est très rare : il n'existe que 26 selkies.
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

Ils ne sont pas rares : 167 gremlins sont répertoriés à ce jour.
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
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...

🎉 Un Colibri lunaire 🎉

Les colibris lunaires, ou "Suldreen" dans la langue des lumières, sont des oiseaux très rares. Ils sont parés des plumes argentées ou bleues disposées en roue comme le paon, de longues jambes comme une grue et un cou semblable à celui d'un cygne. Ces oiseaux pondent leurs œufs dans l'océan et permettent à la marée de les emporter, laissant le bébé se débrouiller seul.

Ils sont très rares : il y en a 87 dans le monde.
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
          message.channel.send(`*Te tend un papotin.*
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
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...






🎉 Une Alicorne !!! 🎉

Félicitations ! Tu as obtenu Luna, la jeune alicorne fille de Silveny et Greyfell !

Je n'ai pas besoin de t'expliquer ce qu'est une alicorne. Tu le sais très bien. 

Cette épingle fait partie des plus rares du monde : seulement 4 Alicornes existent !.
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
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...

🎉 Un Alcyon ! 🎉

Ce sont des oiseaux aux plumes bleus, assez petits, comme on peut le voir sur le badge de la prestigieuse école elfique.
De l'avis de Dex, ils sont assez boiteux, car leur seul atout est de pouvoir sentir quand les tempêtes arrivent.


Cette épingle n'est pas rare : 894 Alcyon ont été répertoriés dans le monde.
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
        case 'Titanoboa':
          message.channel.send(
            `*Te tend un papotin.*
Tiens ${user} : Voici un papotin. C'est un bonbon à mâcher au caramel. Il est décrit comme ayant un goût de caramel mélangé avec du beurre de cacahuète avec une crème centrale. Chaque bonbon est dans une boîte carrée en argent avec une épingle de créature à collectionner dans une petite pochette en velours.
Bon appétit, et bonne chance !

${user} termine de manger son papotin

${user} ouvre la boîte

C'est...

🎉 Un Titanoboa ! 🎉

Les titanoboas sont de gigantesques serpents. Les Gobelins s'en servent pour guider diverses transports (calèches, carosses...).
Le titanoboa le plus connu est **Étincelle**, celui de la reine Hylda.


Cette épingle n'est pas rare : 245 titanoboas sont répertoriés à l'heure actuelle.
Accroche ton épingle où tu veux !`,
            {
              files: [
                {
                  attachment:
                    'https://cdn.discordapp.com/attachments/604298958285832203/773575568653811712/Titanoboa.jpg',
                  name: 'titanoboa.png',
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

module.exports = View;
