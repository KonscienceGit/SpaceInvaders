![Capture of the game Mars Invaders](https://github.com/KonscienceGit/SpaceInvaders/blob/master/Screenshoot/MIgame.jpg)

# Mars Invaders (SpaceInvaders project) (English)
[Lire en Français](https://github.com/)


This is the resulting project of my Advanced Computer Graphic/Image Synthesis course, at the [University of Pau UPPA](https://www.univ-pau.fr/en/home.html). 

The aim of the assignement was to create a JavaScript game using the WebGL graphic API, in the fashion of the popular game Space Invaders.

## How to use

This visualizer use JavaScript so you only need a WebGL capable browser!

You can access the project by those links:

* [The game, Mars Invaders](https://konsciencegit.github.io/SpaceInvaders/src/html/marsInvaders.html)
* [The assignement report](https://konsciencegit.github.io/SpaceInvaders/rapport.html) (in French).

It is recommended to use a personal computer, as the game's controls are keyboard inputs only (for now), but you can still access the documentation and the game main menu on a mobile device.

## What is this

This is a small video game made in the scope of a school assignement. The subject was to create a Space Invaders-like game using Javascript and the WebGL graphic API.

This programm features:
* A basic game logic loop similar to Space Invaders with
  * Player input processing
  * Projectile collision detection
  * Smart enemy fire aiming
  * Non-granular evolutive difficulty
  * Score system
  * Player health and game over mechanism

* Detailed Background graphisms
  * A spinning highly accurate model of Mars, [you can see it in details on my github here](https://github.com/KonscienceGit/MarsJS).
  * A high definition skybox picturing the Milky Way

* Basic 3D modeled objects (in blender)

* Many computer graphics techniques that can be tweaked in real-time:
  * Normal mapping
  * Displacement mapping
  * UV mapping
  * Anisotropic filtering
  * Basic tessellation
  * Backface culling (skybox)
  * Basic alteration of object's Z-buffer rendering order (skybox)
  
## How did I made this

This project's creation is further detailed [in this report](https://konsciencegit.github.io/SpaceInvaders/rapport.html) (in French).

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](https://github.com/KonscienceGit/SpaceInvaders/blob/master/LICENCE) file for details

## Acknowledgments

### JavaScript libraries
* [three.min.js, the JS library implementing WebGL](https://threejs.org/build/three.min.js)
* [OrbitControls.min.js, allowing mouse control of the camera, not used here](https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)
* [dat.gui.min.js, for fast and easy creation of a screen interface](https://github.com/dataarts/dat.gui)
* [jquery-3.3.1.min.js for loading web ressources](https://github.com/jquery/jquery)
* [jquery.event.move.js, jquery.twentytwenty.js, for visual differences slider between images](https://zurb.com/playground/twentytwenty)
* [Stats.min.js for monitoring FPS](https://github.com/mrdoob/stats.js)
* [THREEx.FullScreen.min.js for making the browser page fullscreen](http://learningthreejs.com/data/THREEx/THREEx.FullScreen.js)
* [OBJLoader.min.js for loading OBJ 3D models](https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders)

### Tools, Textures and Cartographies
* [Color textures of Mars and the Milky Way](https://www.solarsystemscope.com/textures/)
* [Mars laser height map, created by MOLA (Mars Orbiter Laser Altimeter)](https://astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2)
* [OpenEV, geospatial data visualizer](http://openev.sourceforge.net/)
* [CrazyBump, tool for making normal and displacement maps](http://crazybump.com/)
* [NormalMap Online, online tool for making normal and displacement maps](http://cpetry.github.io/NormalMap-Online/)

# Mars Invaders (projet SpaceInvaders) (Français)

Ceci est le projet résultant de mon cour de Synthèse d'Images Avancée, à l'[Université de Pau et des Pays de l'Adour UPPA](https://www.univ-pau.fr/en/home.html). 

Le but du projet était de créer un jeu en JavaScript à l'aide de la librairie graphique WebGL, dans la lignée du célèbre jeu d'arcade Space Invders.

## Comment l'utiliser
Ce jeu utilise JavaScript donc vous n'avez besoin que d'un navigateur web supportant WebGL!

Vous pouvez accéder au projet grâce à ces liens:
* [Mars Invaders, le jeu](https://konsciencegit.github.io/SpaceInvaders/src/html/marsInvaders.html)
* [Le compte rendu du projet](https://konsciencegit.github.io/SpaceInvaders/rapport.html) (documentation).

Il est recommendé d'utiliser un ordinateur personnel, car les controles du jeu sont par clavier uniquement (pour le moment) mais vous pouvez tout de même consulter la documentation du projet ou accéder au menu principal du jeu par un appareil mobile.

## Qu'est-ce exactement

Ce projet est un petit jeu vidéo fait dans le cadre d'un projet universitaire. Le sujet était de créer un jeu similaire au jeu d'arcade Space Invaders, en utilisant JavaScript et l'API graphique WebGL.

Ce programme inclut:
* Une boucle de logique de jeu basique, similaire à Space Invaders, dont:
  * Le traitement des entrées clavier du joueur
  * La détection des collisions des projectiles
  * Une visée intelligente primitive des enemis
  * L'évolution progressive de la difficultée
  * Un système de score
  * Un système de vies et de "game over"

* Un décor d'arriere plan détaillé:
  * Un modèle fidèle et détaillé de la planète Mars, [que vous pouvez observer en détail sur mon github ici](https://github.com/KonscienceGit/MarsJS).
  * Une skybox haute définition représentant la voie Lactée

* Des objets basiques modélisés (sous blender)

* Plusieurs techniques de programmation graphique, pouvant être ajustées en temps réel:
  * Normal mapping
  * Displacement mapping
  * UV mapping
  * Filtrage anisotropique
  * Tessellation basique
  * Backface culling (skybox)
  * Modification basique de l'ordre de rendu d'un objet sur le Zbuffer (skybox)
  
## Comment

La création de ce projet est plus amplement documentée [dans ce rapport](https://konsciencegit.github.io/SpaceInvaders/rapport.html).

## License

Le projet est sous la licence GNU General Public License v3.0 - voir le fichier [LICENSE](https://github.com/KonscienceGit/SpaceInvaders/blob/master/LICENCE) pour plus de détails.

## Sources et remerciements

### Bibliothèques JavaScript
* [three.min.js, la bibliotheque implémentant WebGL](https://threejs.org/build/three.min.js)
* [OrbitControls.min.js, permettant le control de la caméra](https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)
* [dat.gui.min.js, pour implémenter une interface simplement et rapidement](https://github.com/dataarts/dat.gui)
* [jquery-3.3.1.min.js pour charger les ressources web](https://github.com/jquery/jquery)
* [jquery.event.move.js, jquery.twentytwenty.js, pourl a comparaison dynamique d'images](https://zurb.com/playground/twentytwenty)
* [Stats.min.js pour afficher les temps d'images](https://github.com/mrdoob/stats.js)
* [THREEx.FullScreen.min.js pour afficher le naviguateur en plein écran](http://learningthreejs.com/data/THREEx/THREEx.FullScreen.js)
* [OBJLoader.min.js pour charger des modèles 3D .OBJ](https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders)

### Outils, Textures and Cartographies
* [Map de couleurs de Mars et de la Voie Lactée](https://www.solarsystemscope.com/textures/)
* [Map d'altitude de Mars, générée par le MOLA (Mars Orbiter Laser Altimeter) de la navette "Mars Global Surveyor" (MGS)](https://astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2)
* [OpenEV, visualiseur de données géospatiales](http://openev.sourceforge.net/)
* [CrazyBump, éditeur de map d'altitude et de normal maps](http://crazybump.com/)
* [NormalMap Online, éditeur de map d'altitude et de normal maps](http://cpetry.github.io/NormalMap-Online/)
