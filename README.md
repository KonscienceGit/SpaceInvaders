[Lire en Français](https://github.com/)
# Mars Invaders (SpaceInvaders project) (English)

This is the resulting project of my Advanced Computer Graphic/Image Synthesis course, at the [University of Pau UPPA](https://www.univ-pau.fr/en/home.html). 

The aim of the assignement was to create a JavaScript game using the WebGL graphic API, in the fashion of the popular game Space Invaders.

## How to use

This visualizer use JavaScript so you only need a WebGL capable browser!

You can access the project by those links:

* [The game, Mars Invaders](https://konsciencegit.github.io/SpaceInvaders/src/html/marsInvaders.html)
* [The assignement report](https://konsciencegit.github.io/SpaceInvaders/rapport.html)(in French).

It is recommended to use a personal computer, as the controls are keyboard inputs only for now, but you can still access the documentation and the game main menu on a mobile device.

## What is this

This is a high fidelity 3D interactive visualization of Mars, using detailed normal and displacement maps accurately depicting its surface. By using the sliders on the GUI it is possible to accentuate the normal and displacement maps, increase the number of polygons of the model to increase the displacement map details (can freeze for some dozen of seconds at lod n°8) and some more options.

## How did I made this

This started as a school project. The assignment was to make a video game through WebGL, and in the making I was curious about how to generate high details models from textures. So I tried to make a high fidelity modelisation of mars went to search if there was easy to use normal maps for mars and I didn't found any that satisfied my needs. I decided to make my own using a precise laser height map from the MOLA laser altimeter orbiting mars, converted it to a more usable png height map (since original file size was 11GB and using grey shades of 16bit depth or more) and the converted it to a normal map and a displacement map. Tools used are linked in the Acknowledgments section below.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

### JavaScript libraries
* [three.min.js, the JS library implementing WebGL](https://threejs.org/build/three.min.js)
* [OrbitControls.min.js, allowing mouse control of the camera](https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)
* [dat.gui.min.js, for fast and easy creation of a screen interface](https://github.com/dataarts/dat.gui)
### Tools, Textures and Cartographies
* [Color textures of Mars and the Milky Way](https://www.solarsystemscope.com/textures/)
* [Mars laser height map, created by MOLA (Mars Orbiter Laser Altimeter)](https://astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2)
* [OpenEV, geospatial data visualizer](http://openev.sourceforge.net/)
* [CrazyBump, tool for making normal and displacement maps](http://crazybump.com/)
* [NormalMap Online, online tool for making normal and displacement maps](http://cpetry.github.io/NormalMap-Online/)
