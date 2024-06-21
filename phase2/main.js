// main.js

const MegaverseAPI = require('./MegaverseAPI');
const { processCell } = require('./utils');

async function main() {
    const candidateId = '762f5612-4528-4c35-938b-976e99d03203';  // Replace with your actual candidate ID
    const api = new MegaverseAPI('https://challenge.crossmint.io/api', candidateId);

    try {
        const goalMapResponse = await api.fetchGoalMap();
        const goalMap = goalMapResponse.goal;

        for (let row = 0; row < goalMap.length; row++) {
            for (let col = 0; col < goalMap[row].length; col++) {
                const cell = goalMap[row][col];
                console.log(`Processing cell at (${row}, ${col}): ${cell}`);
                const { type, ...properties } = processCell(cell);

                if (type === 'unknown') {
                    console.log(`Skipping unknown cell type: ${cell}`);
                    continue;
                }

                await api.createObject(type, { row, column: col, ...properties });
            }
        }
    } catch (error) {
        console.error('An error occurred during the Megaverse creation process:', error);
    }
}

main();
