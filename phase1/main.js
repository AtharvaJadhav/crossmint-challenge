// phase1/main.js

const MegaverseAPI = require('./MegaverseAPI');
const PolyanetManager = require('./PolyanetManager');

/**
 * Main function to run the Megaverse creation script.
 */
async function main() {
    const api = new MegaverseAPI('https://challenge.crossmint.io/api', 'your-candidate-id');
    const polyManager = new PolyanetManager(api);

    console.log('Starting to create the X-shape...');
    await polyManager.createXShape(11);
    console.log('X-shape creation complete!');
}

main().catch(console.error);
