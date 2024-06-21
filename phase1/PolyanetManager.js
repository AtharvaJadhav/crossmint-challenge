// phase1/PolyanetManager.js

/**
 * A class to manage Polyanets within the Megaverse.
 */
class PolyanetManager {
    constructor(api) {
        this.api = api;
    }

    /**
     * Creates an X-shape with Polyanets on an 11x11 grid, skipping the center for symmetry.
     * @param {number} size - The size of the grid.
     */
    async createXShape(size) {
        for (let i = 0; i < size; i++) {
            if (i !== Math.floor(size / 2)) { // Skip the middle row to create a symmetric X
                await this.api.createObject('polyanets', { row: i, column: i });
                await this.api.createObject('polyanets', { row: i, column: size - 1 - i });
            }
        }
    }
}

module.exports = PolyanetManager;
