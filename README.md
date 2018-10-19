[Lire en Français](https://github.com/)
# Mars Invaders (SpaceInvaders project) (English)

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

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

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
