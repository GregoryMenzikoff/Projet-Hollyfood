

BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE "user", "role", "comment", "recipe", "ingredient", "work", "tag", "favorite", "score", "recipe_has_ingredient", "recipe_has_tag" CASCADE;

INSERT INTO "role"
  ("name")
VALUES
  ('membre'),
  ('admin');
  
INSERT INTO "user"
  ( "name","firstname","email","password", "role_id")
VALUES
  ('Menzikoff','Gregory','gregory.menzikoff@oclock.school','$2y$10$iQrd6.9uVdv5.j05j.Wiiu60grBpX8KoWDWPGGjsnrSd8xQAP9f6O', 2),
  ('Revillon','Frederic','frederic.revillon@oclock.school','$2y$10$iQrd6.9uVdv5.j05j.Wiiu60grBpX8KoWDWPGGjsnrSd8xQAP9f6O', 2),
  ('Senor','Florian','florian.senor@oclock.school','$2y$10$iQrd6.9uVdv5.j05j.Wiiu60grBpX8KoWDWPGGjsnrSd8xQAP9f6O', 2);

INSERT INTO "ingredient"
("name") 
VALUES 
('Tomate(s)'), ('Steak(s) haché(s)'), ('Feuille(s) de lasagne'), ('Sauce provençale'), ('Gruyère râpé'), ('Lait'), ('Beurre'), ('Crème liquide'), ('Herbes de Provence'), ('Oignon(s)'), ('Parmesan râpé'), ('Vodka réfrigérée'), ('Liqueur de café'), ('crème légère'), ('Poitrine fumée'), ('Carotte(s)'), ('Poireau(x)'), ('Pomme(s) de terre'), ('Chou(x) vert'), ('Cheddar'), ('Sauce Teriyaki'), ('Ketchup'), ('Tranche(s) Ananas'), ('Feuille(s) Salade'), ('Collier de veau'), ('Sel'), ('Poivre'), ('Oignon pique d un clou de girofle'), ('Branche(s) de Céleri'), ('Farine'), ('Jaune(s) d oeuf'), ('Crème épaisse'), ('Champignons de Paris'), ('Oignons nouveaux'), ('Branche(s) Cerfeuil'), ('Branche(s) Estragon'), ('Branche(s) Persil'), ('Brin(s) de Ciboulette'), ('oeuf(s)'), ('Saucisse(s)'), ('Tomates pelées'), ('Gousse(s) d ail'), ('Boulettes de viande'), ('Sucre'), ('Concentré de tomates'), ('Huile d olive'), ('Spaghettis'), ('Praire(s)'), ('Langoustine(s)'), ('Fruits de mer'), ('Vin blanc'), ('Pâte(s) brisée'), ('Mélasse'), ('Filet(s) de poulet'), ('Pain(s) pita'), ('Cumin en poudre'), ('Citron(s)'), ('Coriandre en poudre'), ('Yaourt à la grecque'), ('Sachet de laitue'), ('Concombre'), ('Oignon rouge'), ('Botte(s) de coriandre'), ('Eau'), ('Bicarbonate de soude'), ('Pomme(s) Reinette'), ('Cannelle en poudre'), ('Cassonade'), ('Pièce(s) de boeuf à griller'), ('Riz de Camargue parfumé'), ('Fenouil'), ('Gingembre frais'), ('Orange(s)'), ('Fécule de maïs'), ('Vinaigre de tomate'), ('Sauce Soja'), ('Huile'), ('Pepperoni'), ('Purée de tomates fraiches'), ('Basilic'), ('Pâte(s) à pizza'), ('Mozzarella(s) di Buffala'), ('Nouilles à Ramen'), ('Porc Chashu'), ('Oeuf(s) mollet'), ('Pâte Miso'), ('Pousses de bambou'), ('Cube(s) de bouillon de porc'), ('Huile de sésame'), ('Algue Nori'), ('Vert d oignons nouveaux'), ('Narutomaki'), ('Myrtilles'), ('Poudre à lever'), ('Extrait de vanille'), ('Cacao en poudre'), ('Glace chocolat noir'), ('Glace chocolat au lait'), ('Chantilly'), ('Copeaux de chocolat'), ('Vin rouge'), ('Bouillon Maggi'), ('Levure chimique'), ('Pâte(s) sablée'), ('Poudre d amandes'), ('Piment fort en poudre'), ('Paprika'), ('Pois chiches secs'), ('Olives noirs'), ('Feuille(s) de laurier'), ('Tranche(s) de pain de mie'), ('Cheddar blanc'), ('Cheddar jaune');

INSERT INTO "work"
  ("title", "synopsis", "quote", "picture")
VALUES
('Garfield', 'Les aventures de Garfield, le chat le plus paresseux de la Terre et de Jon, son maître simplet mais sympathique. Le matou sarcastique va devoir apprendre à partager sa vie bien tranquille avec un nouveau colocataire, le chien fou Odie. D abord excédé, il se révèlera par la suite responsable et héroïque.', 'Il est doux de ne pas s agiter quand d  autres le font pour vous. - Garfield', 'https://images.wakelet.com/resize?id=LaHYf2_Q1jeMQ-uWW2kFj&h=1536&w=1536&q=85'),
('The Big Lebowski', 'Jeff Lebowski, prénommé le Duc, est un paresseux qui passe son temps à boire des coups avec son copain Walter et à jouer au bowling, jeu dont il est fanatique. Un jour deux malfrats le passent à tabac. Il semblerait qu un certain Jackie Treehorn veuille récupérer une somme d  argent que lui doit la femme de Jeff. Seulement Lebowski n est pas marié. C est une méprise, le Lebowski recherché est un millionnaire de Pasadena. Le Duc part alors en quête d  un dédommagement auprès de son richissime homonyme.', ' Est-ce que j ai l air d  un homme marié ? La cuvette des chiottes est relevée mec ! - LE DUC','https://images.wakelet.com/resize?id=VCkpVkmhDbu_RXX5ZKg1i&h=1536&w=1536&q=85'),
('La Soupe aux Choux', 'Le Claude et Le Bombé vivent dans un petit hameau. Le premier est veuf, le second célibataire. Ensemble, ils passent la plupart de leur temps à trinquer. Une nuit, un extra terrestre atterrit dans le champ de Claude. Il ne semble pas agressif.','" Eh ben si on peut plus péter sous les étoiles sans faire tomber un martien, il va nous en arriver des pleines brouettes ! " - LE GLAUDE','https://images.wakelet.com/resize?=EzIAFGEiMhz-LccsqMudA&h=1536&w=1536&q=85'),
('Pulp Fiction', 'L odyssée sanglante et burlesque de petits malfrats dans la jungle de Hollywood à travers trois histoires qui s entremêlent. Dans un restaurant, un couple de jeunes braqueurs, Pumpkin et Yolanda, discutent des risques que comporte leur activité. Deux truands, Jules Winnfield et son ami Vincent Vega, qui revient d  Amsterdam, ont pour mission de récupérer une mallette au contenu mystérieux et de la rapporter à Marsellus Wallace.','Ça reste entre toi, moi et monsieur l obsédé sexuel qui va en chier longtemps avant de terminer sa vie de Pédale. - MARSELLUS','https://images.wakelet.com/resize?id=e57NawxqGfvE7YQ4YgXcG&h=1536&w=1536&q=85'),
('OSS 117 : LE CAIRE, NID D ESPIONS', 'Égypte, 1955, le Caire est un véritable nid d espions. Tout le monde se méfie de tout le monde : Anglais, Français, Soviétiques, la famille du Roi déchu Farouk, les Aigles de Kheops, secte religieuse. Le Président de la République Française, Monsieur René Coty, envoie son arme maîtresse mettre de l ordre dans cette pétaudière au bord du chaos : Hubert Bonisseur de la Bath, dit OSS 117.',' À l occasion, je vous mettrai un petit coup de polish. - OSS 117','https://images.wakelet.com/resize?id=jB4ug-VX1MxsKufJon8LJ&h=1536&w=1536&q=85'),
('Les recettes du bonheur', 'Une famille indienne a quitté sa terre natale pour s installer dans le village de Saint-Antonin-Noble-Val, dans le sud de la France. Hassan Kadam a toujours eu le flair pour la nourriture et, en compagnie de son père et de ses proches, il désire ouvrir un restaurant indien. Cette nouvelle est accueillie glacialement par Madame Mallory, la chef et propriétaire d un restaurant réputé qui attend avec impatience sa nouvelle étoile Michelin.', ' C est la grande cuisine qu on enterre. - Madame Mallory' , 'https://images.wakelet.com/resize?id=Q-QWeJ-87rWe2bVBPGCDJ&h=1536&w=1536&q=85'),
('Le Parrain', 'En 1945, à New York, les Corleone sont une des 5 familles de la mafia. Don Vito Corleone, parrain de cette famille, marie sa fille à un bookmaker. Sollozzo, parrain de la famille Tattaglia, propose à Don Vito une association dans le trafic de drogue, mais celui-ci refuse. Sonny, un de ses fils, y est quant à lui favorable. Afin de traiter avec Sonny, Sollozzo tente de faire tuer Don Vito, mais celui-ci en réchappe.',' Ce n est pas personnel, c est uniquement les affaires... - Don Corleone','https://images.wakelet.com/resize?id=aZm69acBf1a7bsEGuJbgU&h=1536&w=1536&q=85'),
('Le Grand Bleu', 'Depuis l enfance, une rivalité oppose deux fans de plongée, le Français Jacques Mayol et l Italien Enzo Molinari. À l âge adulte, ils continuent à s affronter, descendant toujours plus profond, en apnée. Un jour, Jacques rencontre Johanna, qui travaille avec un professeur venu étudier les réactions d un corps immergé sous la glace, et c est le coup de foudre.', ' J ai été fiancé une fois... une semaine ! J ai jamais vu ma mère dans un état pareil !! Elle repeignait les murs avec les raviolis ! - Enzo Molinari', 'https://images.wakelet.com/resize?id=6kYv6J6kTc8-ECNWBdxvo&h=1536&w=1536&q=85'),
('Harry Potter à l école des sorciers', 'Orphelin, Harry Potter a été recueilli à contrecœur par son oncle Vernon et sa tante Pétunia, aussi cruels que mesquins, qui n hésitent pas à le faire dormir dans le placard sous l escalier. Constamment maltraité, il doit en outre supporter les jérémiades de son cousin Dudley, garçon cupide et archi-gâté par ses parents. De leur côté, Vernon et Pétunia détestent leur neveu dont la présence leur rappelle sans cesse le tempérament imprévisible des parents du garçon et leur mort mystérieuse.
À l approche de ses 11 ans, Harry ne s attend à rien de particulier - ni carte, ni cadeau, ni même un goûter d anniversaire. Et pourtant, c est à cette occasion qu il découvre qu il est le fils de deux puissants magiciens et qu il possède lui aussi d extraordinaires pouvoirs. Quand on lui propose d intégrer Poudlard, la prestigieuse école de sorcellerie, il trouve enfin le foyer et la famille qui lui ont toujours manqué... et s engage dans l aventure de sa vie.
','Tout est possible du moment qu on a assez de cran. - Harry Potter','https://images.wakelet.com/resize?id=a9jys18Ql9aJVSG6IOQSg&h=1536&w=1536&q=85'),
('Avengers', 'Quand un ennemi inattendu fait surface pour menacer la sécurité et l équilibre mondial, Nick Fury, directeur de l agence internationale pour le maintien de la paix, connue sous le nom du S.H.I.E.L.D., doit former une équipe pour éviter une catastrophe mondiale imminente...',' - Vous faites le beau avec votre armure, mais sans elle vous êtes quoi ?
- Un génie, milliardaire, play-boy, philanthrope. - Captain America et Tony Stark','https://images.wakelet.com/resize?id=FjfsuhEYAcvM9s9eCHSI3&h=1536&w=1536&q=85'),
('American pie', 'L année scolaire se termine au lycée de Great Falls. Désespéré depuis que ses parents l ont surpris dans une situation plus que gênante devant un film X, Jim, élève de terminale, scelle un pacte avec sa bande de copains : finis les plaisirs solitaires, ils seront tous des hommes avant d entrer à la fac. Il leur reste donc trois semaines pour utiliser toutes les techniques possibles de séduction.',' C est toi que t envoies en l air, pas un satellite ! - Jessica','https://images.wakelet.com/resize?id=dS-5JlfY0ahkiXKs6fgKr&h=1536&w=1536&q=85'),
('Wok of Love', 'Un chef étoilé traversant une mauvaise passe décide de reprendre un médiocre restaurant chinois dont les employés sont d anciens gangsters.',' On ne peut pas vivre dans ce monde avec toute sa tête. - Dan Sae Woo','https://images.wakelet.com/resize?id=3cegmC7FCP4ZmSUlnd0uj&h=1536&w=1536&q=85'),
('Breaking bad', 'Walter White, 50 ans, est professeur de chimie dans un lycée du Nouveau-Mexique. Pour réunir de l argent afin de subvenir aux besoins de sa famille, Walter met ses connaissances en chimie à profit pour fabriquer et vendre du crystal meth.', '', ''),
('Naruto', 'Dans le village de Konoha vit Naruto, un jeune garçon détesté et craint des villageois du fait qu il détienne en lui Kyuubi (démon renard à neuf queues) d une incroyable force, qui a tué un grand nombre de personnes. Le ninja le plus puissant de Konoha à l époque, le quatrième Hokage, Minato Namikaze, réussit à sceller ce démon dans le corps de Naruto. Malheureusement il y laissa la vie. C est ainsi que douze ans plus tard, Naruto rêve de devenir le plus grand Hokage de Konoha afin que tous le reconnaissent à sa juste valeur. Mais la route pour devenir Hokage est très longue et Naruto sera confronté à un bon nombre d épreuves et devra affronter de nombreux ennemis pour atteindre son but !',' Dès le moment où quelqu un pense à toi quelque part, cet endroit devient ton foyer. -NARUTO','https://images.wakelet.com/resize?id=Hta8j_Iu6ZXsNavOyzcI6&h=1536&w=1536&q=85'),
('Desperate Housewives', 'Le quotidien mouvementé de quatre femmes : Susan Mayer, Lynette Scavo, Bree Van de Kamp et Gabrielle Solis. Elles vivent à Wisteria Lane, une banlieue chic de Fairview, stéréotype des quartiers résidentiels des classes aisées américaines.',' Le contraire de l amour n est pas la haine ; c est l indifférence...  - BREE','https://images.wakelet.com/resize?id=ZhdCjuycGevd7jKhhfgTq&h=1536&w=1536&q=85'),
('Riverdale', 'Sous ses airs de petite ville tranquille, Riverdale cache en réalité de sombres secrets. Alors qu une nouvelle année scolaire débute, le jeune Archie Andrews et ses amis Betty, Jughead, et Kevin voient leur quotidien bouleversé par la mort mystérieuse de Jason Blossom, un de leurs camarades de lycée.','J ai combattu. Tous les jours. Je n ai pas arrêté de me battre. Je me suis battu pour ma vie. - ARCHIE ANDREWS','https://images.wakelet.com/resize?id=zZ-JHkHRH1DyDa-6rxpde&h=1536&w=1536&q=85'),
('Friends', 'Ils sont six amis : Chandler et Joey, colocataires d un appartement dans Manhattan, Monica et Phoebe, qui partagent l appartement d en face. Et puis il y a Ross, le frère de Monica, un paléontologue qui déplore que sa femme enceinte se soit découverte lesbienne. Et enfin Rachel, une copine d enfance de Monica qui déboule en robe de mariée et en fuite dans le café où la bande se retrouve. Ross a toujours été amoureux de Rachel. Il lui fait une cour maladroite. La première saison d une série culte. Les personnages marivaudent. Lintrigue entre Ross et Rachel s installe.',' Joey pas faire cadeau de son manger ! - JOEY','https://images.wakelet.com/resize?id=ajFvOpVssmTUyJCYeAe6k&h=1536&w=1536&q=85'),
('Game of Thrones', 'Neuf familles nobles rivalisent pour le contrôle du Trône de Fer dans les sept royaumes de Westeros. Pendant ce temps, des anciennes créatures mythiques oubliées reviennent pour faire des ravages.','Faire la guerre est plus simple que d élever ses filles. - NED STARK','https://images.wakelet.com/resize?id=l4Wts7IV6WM-7eq4hF7nP&h=1536&w=1536&q=85'),
('Kaamelot', 'Le quotidien banal et burlesque du roi Arthur et des chevaliers de la Table ronde.',' Au bout d un moment, il est vraiment druide, c mec-là, ou ça fait quinze ans qu il me prend pour un con ? - LE ROI ARTHUR','https://images.wakelet.com/resize?id=dvY0H1bTWLcGy7tIE_CvE&h=1536&w=1536&q=85'),
('Jane the Virgin', 'Jane Villanueva est une jeune femme latine très pieuse qui tient à rester vierge jusqu au mariage même si elle file le parfait amour avec Mickael. Lors d une visite de contrôle chez son gynécologue, elle se retrouve inséminée artificiellement par accident et tombe enceinte.',' Je fais des études brillantes, suivre une recette c est pas dur !  - JANE VILLANUEVA','https://images.wakelet.com/resize?id=sJvYtiXc37f6KtxHlCwa_&h=1536&w=1536&q=85');

INSERT INTO "tag"
  ("name")
VALUES
  ('Serie'),
  ('Film'),
  ('Salé'),
  ('Sucré');

 
INSERT INTO "recipe"
  ("slug","name", "description", "picture", "instruction", "total_time", "servings", "difficulty", "work_id","user_id")
VALUES
  ('lasagne-de-garfield','Lasagne de Garfield', 'Les lasagnes sont à la fois des pâtes alimentaires en forme de feuilles rectangulaires, et une recette de cuisine italienne à base de couches alternées de pâtes lasagnes, parmesan, mozzarella, ou ricotta, et de sauce bolognaise ou sauce béchamel, gratinée au four.', 'https://images.wakelet.com/resize?id=YaGux7Ie1bP9JcJXGLDUm&h=1536&w=1536&q=85', '1- PrÃ(c)chauffez votre four Ã  180Â°C ', '1:15:00', 6, 'Moyenne', 1, 1),
  ('Le-grilled-cheese-sandwich','Le Grilled Cheese Sandwich', 'Originaire des USA, le " Grilled Cheese Sandwich " se compose de fromage fondu entre deux tranches de pain grillées. Décliné de bien des manières selon les familles et les régions, il fait office d un des plus célèbres dérivés veggie du croque-monsieur puisqu il n inclut généralement pas d autres aliments juste du cheddar jaune et blanc.', 'https://images.wakelet.com/resize?id=gZevudjRo8LafA8oWCTyA&h=1536&w=1536&q=85', '1-Beurrez une tranche de pain de mie puis, faites-la dorer dans une poêle, sur feu moyen.
2-Beurrez la seconde tranche de pain de mie, baissez le feu sur doux puis, déposez-la dans la poêle. Ajoutez les cheddars.
3-Refermez avec la seconde tranche de pain de mie dorée et poursuivez la cuisson sur feu doux afin que le fromage soit totalement fondu sans pour autant brûler le pain.4-Dressez sur un plat de service accompagné d une salade verte puis, dégustez aussitôt !', '0:15:00', 2, 'Facile',  20, 3),
  ('les-pates-bolo-de-joey','Les pâtes bolo de Joey', 'La sauce bolognaise est une recette de sauce traditionnelle de la cuisine italienne, originaire de Bologne en Émilie-Romagne, à base de bœuf haché, sauce tomate, oignon, céleri, carottes, et d huile d olive.', '
', '1-Commencez par hacher l ail, l oignon, la carotte et le céleri de façon à obtenir de petits dés. Puis, dans une grande casserole, faites revenir les légumes ainsi coupés avec de l huile d olive, pendant environ 5 minutes à feu doux. Veillez à remuer fréquemment avec une cuillère en bois afin que ça n attache pas.
2-À feu plus vif, ajoutez la viande hachée à la préparation jusqu à ce qu elle brunisse et s agglomère pour former de petites boulettes. De même que précédemment, remuez le tout pour éviter que ça n attache au fond de la casserole. Coupez grossièrement les tomates puis ajoutez-les à la préparation, ainsi que le vin, le bouillon et le sucre. Enfin, parsemez d un soupçon de persil - selon votre goût - et portez à ébullition.
3-Une fois cette étape réalisée, réduisez la flamme et laissez mijoter pendant 1h30. Cette cuisson longue et douce a pour effet de faire s évaporer l alcool et donner à la sauce une texture idéale car, pour rappel, étymologiquement la sauce bolognaise évoque le ragoût.
4-L ultime étape est celle de la cuisson des spaghettis, auxquels il est conseillé d ajouter un filet d huile afin qu ils ne collent pas.
', '0:40:00', 1, 'Moyenne',  17, 3),
  ('la-pizza-de-walter','La pizza de Walter', 'La pizza est une recette de cuisine traditionnelle de la cuisine italienne, originaire de Naples à base de galette de pâte à pain, garnie principalement d huile d olive, de sauce tomate, de mozzarella et d autres ingrédients et cuite au four.', 'https://images.wakelet.com/resize?id=u2TVlK133WfGovsVUJda7&h=1536&w=1536&q=85', '1-Préchauffer le four à 250 °C 2-Éplucher l oignon et l ail et faire suer dans un peu d huile d olive, saler, poivrer et déposer dans la cuve du blender.
3-Ajouter la purée de tomates et quelques feuilles de basilic. Mixer pour obtenir une sauce lisse. Vider le blender.
4-Égoutter les boules de mozzarella et les couper en tranches.
5-Étaler la pâte à pizza sur une plaque allant au four. Répartir ensuite la sauce tomate sur une épaisseur de quelques millimètres, disposer les tranches de mozzarella.
6-Enfourner pendant 8 min.', '00:15:00', 2, 'Facile',  13, 1),
('Le-big-kahuna-burger', 'Le Big Kahuna Burger', 'Un hamburger, ou par aphérèse burger, est un sandwich d origine allemande, composé de deux pains de forme ronde généralement garnis d une galette de steak haché et de crudités, salade, tomate, oignon, cornichon ainsi que de sauce.', 'https://images.wakelet.com/resize?id=KoAmXq69bLbBsmdDKVpC0&h=1536&w=1536&q=85', '1-Préchauffez le four à 160°C.
2-Placez les rondelles d ananas dans une assiette creuse avec la sauce Teriyaki. Laissez mariner 20 minutes.
3-Pendant ce temps, lavez les tomates et découpez 8 tranches régulières, pas trop fines.
4-Ouvrez les pains à burger. Placez-les sur une plaque de four, mie vers le haut, et déposez une tranche de fromage sur chaque moitié inférieure. 5-Enfournez pendant 10 minutes.
6-Enfournez pendant 35 à 40 minutes, dans la partie basse du four.', '00:50:00', 1, 'Moyenne', 4 , 3),
('le-houmous-de-monica', 'Le Houmous de Monica', 'Le houmous ou hommos est une préparation culinaire du Proche-Orient, composée notamment de purée de pois chiches et de tahini. Il s agit d un plat typique de la cuisine arabe, arménienne, turque et levantine.', 'https://images.wakelet.com/resize?id=gTbJFjWPfavsa90s-8VW6&h=1536&w=1536&q=85', '1-La veille, mettre à tremper les pois chiches dans de l eau froide.
2-Les mettre dans 2 l d eau froide avec le laurier et 1 gousse d ail, porter à ébullition et laisser cuire 1 h 30 à 2 h.
3-Saler et poivrer à mi-cuisson.
4-Égoutter les pois chiches, conserver l eau de cuisson.
5-Mixer les pois chiches en purée, remettre dans une casserole et chauffer à feu doux.
6-Incorporer 10 cl d huile tiède en fouettant, allonger un peu de jus de cuisson et du jus de citron.
7-Écraser l ail avec 2 cuillerées d huile, rajouter cela dans la casserole hors du feu, saupoudrer d une pincée de piment.
8-Servir saupoudré de paprika, garni d olives noires et accompagné de quartiers de citrons sans oublier le pain libanais.', '14:00:00', 6, 'Facile', 17 , 3),
('la-tarte-aux-myrtilles-de-seli', 'La tarte aux myrtilles de Séli', 'La tarte aux myrtilles ou tarte aux bleuets est une tarte sucrée / pâtisserie garnie de myrtilles ou de bleuets.', 'https://images.wakelet.com/resize?id=5Pk-FrhVWgDyfoPGhARV1&h=1536&w=1536&q=85', '1-Étaler la pâte dans un plat à tarte. La piquer avec une fourchette et la saupoudrer de poudre d amandes.
2-Garnir la pâte avec les myrtilles.
3-Faire cuire au four 15 minutes à 210°C.
4-Mélanger la crème, le sucre et les œufs.
5-Verser la préparation sur la pâte.
6-Pour finir, refaire cuire au four 15 minutes à 210°C.', '00:25:00', 6, 'Facile', 19 , 1),
('la-soupe-aux-choux', 'La Soupe aux Choux', 'La soupe aux choux est une soupe dont l ingrédient de base est le chou. En raison de sa facilité à cultiver et de son coût relativement peu élevé, le chou entre comme ingrédient principal dans des soupes appartenant à la gastronomie de nombreux pays.', 'https://images.wakelet.com/resize?id=CwVOz4M8pEseORQkW-oQg&h=1536&w=1536&q=85', '1-Lavez le poireau et coupez-le en rondelles. Épluchez la carotte et détaillez-la en morceaux. 2-Lavez le chou, détachez les feuilles. Épluchez les pommes de terre et coupez-les en cubes...
3-Dans une cocotte, faites fondre le beurre à feu doux. Ajoutez le poireau, les carottes, la rave et les pommes de terre. Salez, poivrez.
4-Recouvrez d eau puis ajoutez les feuilles du chou, ainsi que la poitrine fumée.
5-Laissez mijoter 1 heure à feu doux et servez.', '01:20:00', 4, 'Moyenne', 3 , 2),
('le-lemon-cake-de-sansa-stark', 'Le Lemon cake de Sansa Stark', 'Gâteau au citron', 'https://images.wakelet.com/resize?id=KbaH2SVIAsNks29cLZyN0&h=1536&w=1536&q=85', '1-Préchauffez le four à 180 °C (th. 6). Rincez le citron puis râpez son zeste au-dessus d un saladier. Ajoutez le sucre et les œufs et fouettez vivement jusqu à ce que le mélange mousse.
2-Incorporez le beurre fondu, le jus de citron, puis la farine et la levure. Mélangez bien pour obtenir une pâte homogène.
3-Répartissez la pâte dans des petits moules ou dans des empreintes en silicone puis enfournez pour 20 à 25 min. Servez tiède ou froid.', '00:45:00', 4, 'facile', 18 , 3),
('le-milkshake-au-chocolat-de-riverdale', 'Le milkshake au chocolat de Riverdale', 'Un milk-shake ou milkshake ou lait frappé au Canada ou frappé en Suisse romande et en Nouvelle-Angleterre, est une recette traditionnelle de boisson glacée frappée de la cuisine des États-Unis, à base de lait, crème glacée, sirops, arômes divers, et fruits, mélangés au shaker ou au mixeur.', 'https://images.wakelet.com/resize?id=5BSN5qclUAAeqDDqXlAWi&h=1536&w=1536&q=85', '1-Il suffit de verser dans un mixeur le lait, le cacao et la glace et de mixer. 
2-Versez ensuite le contenu dans un grand verre, recouvrez de chantilly et de 3-copeaux de chocolat.
4-Dégustez', '00:10:00', 1, 'Facile', 16 , 1),
('wok-n-love', 'Wok n love', 'Le wok se présente comme une marmite profonde à fond arrondi, en forme de calotte sphérique. Cet ustensile est courant en Chine, populaire aussi bien dans les régions de l Est, du Sud, que dans toute l Asie du Sud-Est1, ainsi que dans d autres parties du monde.', 'https://images.wakelet.com/resize?id=IJNYyjecmxTYpxdwDxyra&h=1536&w=1536&q=85', '1-Mettez une casserole d eau à chauffer, elle servira à cuire le riz.
2-Épluchez les carottes. Faites-en des tagliatelles à l aide d un économe (comme si vous les épluchiez en tournant la carotte, vous pouvez également, si vous préférez et pour aller un peu plus vite, les râper avec une râpe à gros trous). Mettez de côté.
3-Coupez les branches du fenouil (gardez quelques brins verts pour la fin). Coupez-le en 2 dans la longueur puis râpez-le à l aide d une râpe à gros trous (si vous n avez pas de râpe, faites de fines lamelles). Jetez la partie dure au centre (le trognon). Mettez de côté avec les carottes.
4-Épluchez et à l aide d une râpe fine, râpez finement 20 g de gingembre (jetez les parties filandreuses). Coupez la pièce de bœuf en fines lamelles (tenez votre couteau légèrement oblique dans le même sens que les fibres, ce sera plus facile). Mettez de côté séparément.
5-Quand l eau bout, versez-y le riz et faites-le cuire 12 minutes. Une fois cuit, égouttez-le et couvrez-le pour le garder au chaud.
6-Récupérez le jus de l orange et versez-le dans un bol. Dans un 2ème bol, versez la fécule de maïs. Ajoutez-y un peu du jus de l orange (2 cs pour 2 pers.) et mélangez bien avec une fourchette pour qu il n y ait pas de grumeaux. Ajoutez ensuite le reste du jus de l orange, le vinaigre de tomate et mélangez à nouveau. Mettez de côté.
7-Dans un wok (ou une grande poêle), faites chauffer de l huile neutre (2 cs pour 2 pers.). Une fois le wok bien chaud, faites-y revenir le fenouil et les carottes à feu vif pendant 4 à 5 min. en remuant souvent puis répartissez dans les assiettes. 
Dans le même wok toujours à feu vif, reversez un petit filet d huile. Déposez les lamelles de viande, le gingembre râpé et la sauce soja. Laissez cuire 2 min., toujours en remuant puis ajoutez la sauce à l orange. Laissez mijoter pendant encore 1 à 2 min. juste le temps que la sauce commence à épaissir. 
Passez à table en servant la viande grillée sur le lit de légumes et accompagnée du riz parfumé. Nappez le tout de sauce à l orange et parsemez éventuellement des brins verts du fenouil mis de côté', '00:30:00', 4, 'Difficile', 12 , 2),
('la-blanquette-de-veau', 'La Blanquette de Veau', 'La blanquette, ou blanquette de veau ou blanquette de veau à l ancienne, est une recette de cuisine traditionnelle de cuisine française, à base de viande de veau cuite dans un bouillon avec carotte, poireau, oignon et bouquet garni, liée en sauce blanche et aux champignons de Paris.', 'https://images.wakelet.com/resize?id=vyhJN8a4Q8jEPbuQn0SKP&h=1536&w=1536&q=85', '1-Placez la viande de veau dans une cocotte et couvrez d eau froide. Portez à ébullition, égouttez et rincez la viande. Remettez la viande dans la cocotte et couvrez d eau froide.
2-Faites cuire à frémissements, salez avec du gros sel et écumez, puis ajoutez les légumes de la garniture aromatique (carotte, oignon piqué d un clou de girofle, blanc de poireau, branche de céleri) sans les couper.
3-Laissez cuire à frémissements 45 minutes à couvert. Réservez la viande et passez le bouillon au chinois.
4-Dans une casserole, faites fondre 30 grammes de beurre à feu doux, puis incorporez la farine. Mélangez avec une cuillère en bois et laissez légèrement cuire avant de verser le bouillon chaud. Mélangez au fouet, portez à ébullition et faites cuire 15 minutes à feu doux. 
5-Délayez le jaune d oeuf dans la crème fraiche. Ajoutez-les au roux blanc tout en mélangeant énergiquement.
6-Laissez épaissir à feu doux, puis ajoutez la viande et les petits champignons de Paris lavés. Rectifiez l assaisonnement.
7-Pour la garniture à l ancienne, épluchez et lavez tous les légumes. Taillez les carottes, le céleri et les poireaux en morceaux. Laissez entiers les oignons et les champignons.
8-Faites cuire tous les légumes, séparément, 10 minutes à l eau bouillante salée.
9-Au moment de servir, réchauffez la blanquette de veau dans sa sauce, puis ajoutez les légumes.', '00:40:00', 4, 'Moyenne', 5 , 3),
('spaghetti-del-mare', 'Spaghetti del mare', 'Spaghetti aux fruits de mer, spécialité italienne', 'https://images.wakelet.com/resize?id=nfb85cY7U5530us0mB9VO&h=1536&w=1536&q=85', '1-Pelez l ail et émincez-le finement.
2-Dans une casserole, faites revenir l ail dans 2 cuillères d huile d olive. Ajoutez le vin blanc juste avant coloration de l ail.
3-Ajoutez le mélange de fruits de mer, baissez le feu et laissez mijoter 10 minutes à feu moyen.
4-Dans une cocotte, diluez le court-bouillon dans 1 litre d eau. Portez à ébullition et ajoutez les langoustines et les coquillages. Laissez frémir 3 minutes. Égouttez et décortiquez les langoustines en conservant la queue.
5-Changez l eau de la cocotte et faites cuire les spaghettis al dente, selon les instructions du paquet.
6-Egouttez les spaghettis et servez par assiette. Arrosez du reste d huile d olive, mélangez avec une portion de mélange de fruits de mer à l ail.', '00:40:00', 4, 'Moyenne', 8 , 3),
('le-white-russian', 'Le White Russian', 'Le Russe blanc ou White Russian ou Caucasien dans les pays anglophones, est un cocktail dérivé du Black Russian, à base de vodka, de liqueur de café et de crème fraîche, servi avec des glaçons dans un verre old fashioned.', 'https://images.wakelet.com/resize?id=yH_er1hIQILaTvRYA4RhJ&h=1536&w=1536&q=85', 'Combiner les ingrédients dans un grand verre sur de la glace. Remuer doucement.', '00:10:00', 1,'Facile', 2 , 3),
('la-tarte-a-la-melasse-d-harry-potter', 'La tarte à la mélasse d Harry Potter', 'Si vous êtes gourmand, ce grand classique du Royaume Uni est pour vous. À servir chaud comme dessert avec de la crème ou de la glace.', 'https://images.wakelet.com/resize?id=zaiOoGWq5Z0p_EzsZ2lmY&h=1536&w=1536&q=85', '1-Préchauffez le four à 220°C.
2-Fouettez l œuf avec la mélasse, le lait, la farine et le sucre.
3-Déroulez la pâte brisée. Tapissez-en un moule à tarte chemisé de papier de cuisson, puis découpez les bords qui dépassent.
4-Versez le mélange à la mélasse sur le fond de tarte.
5-Avec la pâte restante, réalisez de fines bandes et déposez-les en croisillons sur la tarte.
6-Enfournez pendant 35 à 40 minutes, dans la partie basse du four.', '00:50:00', 6, 'Moyenne', 9 , 3),
('les-muffins-de-bree-van-de-kamp', 'Les muffins de Bree Van De Kamp', 'Les muffins sont de petits gâteaux individuels s apparentant aux madeleines.', 'https://images.wakelet.com/resize?id=cKEANLauTglbsIyj69xH8&h=1536&w=1536&q=85', '1-Préchauffer le four à 180°C.
2-Graisser et plancher le moule à muffins.
3-Battre ensemble le beurre, les œufs, le sel et le sucre.
4-Mélangez la farine avec la levure chimique et tamisez-la dans le premier mélange, en alternant avec le lait.
5-Incorporer la vanille.
6-Ajouter les myrtilles.
7-Versez dans le moule à muffins et faites cuire pendant une trentaine de minutes.', '00:40:00', 4, 'Moyenne', 15 , 3),
('les-ramen-ichiraku', 'Les Ramen Ichiraku', 'Dans sa forme traditionnelle, il s agit d une soupe de nouilles, à base de bouillon agrémenté de nombreuses variantes d ingrédients animaux, végétaux et aromates (poissons, viandes, légumes, algues, œuf, etc.). Importé de Chine à la fin du XIXe siècle, il est à ce jour considéré comme faisant partie des plats emblématiques de la gastronomie japonaise.', 'https://images.wakelet.com/resize?id=zirUfGWgaXdt8vrAsgI5U&h=1536&w=1536&q=85', '1-Faire cuire les nouilles comme indiqué sur l emballage et réserver dans un grand bol.
2-En parallèle, faire bouillir 600g d eau et y faire fondre le bouillon
3-Délayer la pâte miso avec un peu de bouillon chaud
4-Ajouter la pâte miso au bouillon
5-Reprendre les nouilles réservées dans un grand bol
6-Ajouter la feuille d algue nori coupée en 3
7-Ajouter les tranches de porc chashu, les pousses de bambou et l oeuf coupé en 2
8-Ajouter le narutomaki, ajouter le vert d oignon
9-Recouvrir de bouillon très chaud et parsemer d huile de sésame', '05:10:00', 1, 'Difficile', 14 , 3),
('la-sauce-bolognese-du-parrain', 'La sauce Bolognese du Parrain', 'La sauce bolognaise est une recette de sauce traditionnelle de la cuisine italienne, originaire de Bologne en Émilie-Romagne, à base de bœuf haché, sauce tomate, oignon, céleri, carottes, et d huile d olive.', 'https://images.wakelet.com/resize?id=VayhFL1m_xLaurqomVMhL&h=1536&w=1536&q=85', '1-Faites griller les saucisses italiennes et les boulettes de viande à la poêle, 10 minutes environ. Découpez les saucisses en rondelles. Réservez au chaud.
2-Pelez l ail et hachez-le. 
3-Dans une casserole à feu moyen, faites chauffer l huile d olive. Ajoutez l ail et faites-le revenir quelques minutes, sans le laisser griller.
4-Ajoutez les tomates et le concentré. Laissez mijoter 5 minutes en remuant.
5-Ajoutez les saucisses et les boulettes de viande, le vin puis le sucre. Réduisez le feu et laissez mijoter 20 minutes, en remuant de temps en temps.
6-Servez chaud ou stockez en bocal stérilisé.', '01:00:00', 8, 'Moyenne', 7 , 3),
('l-omelette-aux-fines-herbes', 'L omelette aux fines herbes', 'L omelette est une préparation culinaire à base d œufs battus, salée ou sucrée, parfois garnie, fourrée, aromatisée ou flambée traditionnellement cuite à la poêle avec un corps gras.', 'https://images.wakelet.com/resize?id=47PGyST_2X6KC4zqpT6VM&h=1536&w=1536&q=85', '1-Effeuillez toutes les herbes. Blanchissez-les dans l eau bouillante salée, séparément, puis refroidissez-les immédiatement à l eau glacée. Séchez-les et hachez-les finement.
2-Dans un saladier, cassez les œufs et fouettez-les vivement. Ajoutez les herbes, mélangez.
3-Faites fondre le beurre dans une poêle antiadhésive, à feu doux. Versez-y les œufs.
4-Laissez cuire doucement en soulevant les bords pour laisser couler les œufs encore liquide, puis décollez délicatement lorsque les œufs sont presque complètement pris.
5-Pliez l omelette en deux à l aide d une fourchette et faites-la glisser sur une assiette préalablement beurrée.
6-Servez aussitôt.', '00:25:00', 6, 'Facile', 6 , 3),
('Apple-pie', 'Apple Pie', 'L apple pie américaine consiste en une garniture généreuse de pommes épicées à la cannelle entre deux pâtes, à la manière d une tourte.', 'https://images.wakelet.com/resize?id=KKOoJKCdc6WsBVysOUfdr&h=1536&w=1536&q=85', '1-Pour la pâte : dans un bol, délayer l œuf avec le sucre en poudre et une pincée de sel. Mettez la farine sur le plan de travail, faites un puits au centre, versez-y le contenu du bol, puis le beurre fondu (surtout pas du beurre liquide !) et le beurre de cacahuète. Malaxez le tout jusqu à obtenir une pâte homogène.Scinder en deux pâtons. Étalez-les au rouleau sur du papier sulfurisé et mettez une des deux pâtes dans le fond du moule.
2 - Préchauffez le four à 180°C
3-Garniture : pelez les pommes, épépinez-les et coupez-les en petits dés. Lancez un caramel à sec avec les deux sucres puis ajoutez le beurre une fois le sucre roussi.
4-Ajoutez les pommes puis la cannelle au goût.
5-Remuez régulièrement jusqu à ce que les pommes deviennent fondantes.
6-Une fois les pommes devenues fondantes, mettez-les sur la pâte (laissez 1 à 2 cm au bord sans mettre de pommes).
7-Mettez la deuxième pâte sur les pommes (soit entière soit en créant un tissage assez serré).
8-Rabattez les bords de la pâte du dessous sur celle du dessus. Battez un jaune d oeuf avec une cuillère à soupe d eau. Au pinceau, badigeonner ce mélange sur la tourte.
9-Enfourner pour 25 min environ à chaleur tournante à 180°C (thermostat 6)', '00:40:00', 4, 'Moyenne', 11 , 3),
('chawarma-de-tony-stark', 'Chawarma de Tony Stark', 'Le chawarma ou shawarma est le kebab traditionnel des cuisines levantine et turque.', 'https://images.wakelet.com/resize?id=qHJgh7nf_XPKajiI2YtYz&h=1536&w=1536&q=85', '1-Pour la marinade, pelez et hachez les gousses d ail. Mettez-les dans un saladier, versez l huile d olive et le jus d un citron pressé. Ajoutez la coriandre et le cumin en poudre, le paprika fumé, du sel et du poivre. Plongez les filets de poulet dans la préparation et laissez mariner au réfrigérateur pendant 3 heures.
2-Pour la sauce, épluchez la gousse d ail et réduisez-la en petits morceaux à l aide d un presse-ail. Dans un bol, versez le yaourt à la grecque, ajoutez l ail, le jus d un demi-citron pressé, le cumin en poudre, du sel et du poivre. Recouvrez la préparation et conservez au frais jusqu au moment de servir.
3-Dans un saladier, ajoutez la laitue, l oignon rouge épluché et coupé en petits morceaux. Faites de même pour le demi-concombre. Rincer et ciseler la demi botte de coriandre, pressez le jus d un demi-citron et ajoutez le tout à la salade. Versez un peu d huile d olive, assaisonnez avec un peu de sel et de poivre.
4-Découpez les filets de poulets en petits morceaux. Dans une poêle, faites-les revenir dans la marinade jusqu à ce qu ils soient cuits et deviennent bien dorés.
5-Ouvrez les pains pita en deux et garnissez-les sur une moitié en mettant un peu de salade, quelques morceaux de poulet et un peu de sauce.
6-Roulez chaque pain pita et dégustez votre chawarma !', '00:23:00', 4, 'Facile', 10 , 3);

INSERT INTO "comment"
  ( "description", "recipe_id", "user_id")
VALUES
  ('Lorem', 1, 1);
 
INSERT INTO "score"
  ( "rating", "recipe_id", "user_id")
VALUES
  (2, 1, 1),
  (3, 2, 1),
  (4, 3, 1),
  (5, 4, 1),
  (3, 3, 2);
  
INSERT INTO "recipe_has_ingredient"
  ( "ingredient_id", "recipe_id")
VALUES
  (1, 1);
    
INSERT INTO "recipe_has_tag"
  ( "recipe_id", "tag_id")
VALUES
  (1, 2),
  (1, 3),
  (2, 1),
  (2, 3),
  (3, 1),
  (3, 3),
  (4, 1),
  (4, 3),
  (5, 2),
  (5, 3),
  (5, 4),
  (6, 1),
  (6, 3),
  (7, 1),
  (7, 4),
  (8, 2),
  (8, 3),
  (9, 1),
  (9, 4),
  (10, 1),
  (10, 4),  
  (11, 1),
  (11, 3),
  (12, 2),
  (12, 3),
  (13, 2),
  (13, 3),
  (14, 2),
  (14, 4),
  (15, 2),
  (15, 4),
  (16, 1),
  (16, 4),
  (17, 1),
  (17, 3),
  (18, 2),
  (18, 3),
  (19, 2),
  (19, 3),
  (20, 2),
  (20, 4),
  (21, 2),
  (21, 3);

  
INSERT INTO "favorite"
  ( "user_id", "recipe_id")
VALUES
  (1, 1);

COMMIT;
