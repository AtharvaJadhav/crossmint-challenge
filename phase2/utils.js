// utils.js

/**
 * Processes the cell to determine its type and corresponding properties.
 * @param {string} cell - The cell value from the goal map.
 * @returns {object} - An object containing the type and additional properties.
 */
function processCell(cell) {
    if (cell === 'POLYANET') {
        return { type: 'polyanets' };
    } else if (cell.endsWith('_SOLOON')) {
        const color = cell.split('_')[0].toLowerCase();
        return { type: 'soloons', color };
    } else if (cell.endsWith('_COMETH')) {
        const direction = cell.split('_')[0].toLowerCase();
        return { type: 'comeths', direction };
    } else {
        return { type: 'unknown' };
    }
}

module.exports = { processCell };
