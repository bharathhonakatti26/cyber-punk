# Cyber-Punk 3D Landing Page

This is a **Cyber-Punk-themed 3D landing page** built using **Three.js** and **Vite**. It features a 3D model, HDRI environment, and post-processing effects to create a visually stunning experience.

## Features

- **3D Scene**: Built with Three.js, featuring a GLTF model.
- **HDRI Environment**: Realistic lighting using an HDRI texture.
- **Post-Processing**: Includes effects like RGB shift for a cyberpunk aesthetic.
- **Responsive Design**: Adapts to different screen sizes.
- **Customizable**: Easily replace assets like the 3D model and textures.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bharathhonakatti26/cyber-punk.git
   cd cyber-punk
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173/` to see the landing page in action.

## Usage

- To customize the 3D model, replace the `model.glb` file in the `public` directory with your own GLTF model.
- To change the HDRI environment, replace the `hdr.jpg` file in the `public` directory with your own HDRI texture.
- Modify the `postprocessing.js` file to adjust the post-processing effects to your liking.

## Technologies Used

- **Three.js**: A JavaScript library for 3D graphics.
- **Vite**: A fast build tool and development server.
- **GLTFLoader**: A Three.js loader for GLTF 3D models.
- **RGBShiftShader**: A shader for creating RGB shift effects.

---

**Note**: This template is a starting point. Feel free to modify it to better fit your project needs.
