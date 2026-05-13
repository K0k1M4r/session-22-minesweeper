/**
 * 10x Academy - Session 22: Functions Lab
 * GRID DEFUSER CORE LOGIC
 *
 * Welcome, Agent. The system's core diagnostic checks have suffered a logic failure.
 * We need you to reconstruct the mathematical and logical rules of the Grid Defuser
 * using basic variables, math operators, comparison operators, and functions.
 *
 * If these functions are perfectly fixed, the Grid Engine will boot and play correctly.
 * If they are broken, the Engine will crash and the game will remain unplayable!
 *
 * Remember: You MUST use return statements.
 */

/**
 * Task 1: Calculate Grid Size
 * The engine needs to dedicate enough memory for the entire board.
 * Multiply the number of rows by the number of columns.
 *
 * @param {number} rows
 * @param {number} cols
 * @returns {number} The total number of cells.
 */
function calculateGridSize(rows, cols) {
  // TODO: Return rows multiplied by cols
  return 1; // TEMPORARY
}

/**
 * Task 2: Check Boundaries
 * The engine needs to know if a coordinate is outside the board to avoid crashing.
 * A coordinate is Out of Bounds if:
 * - row is less than 0
 * - row is greater than or equal to totalRows
 * - col is less than 0
 * - col is greater than or equal to totalCols
 *
 * Use the Logical OR operator (||) and relational operators (<, >=) to combine these!
 *
 * @param {number} row
 * @param {number} col
 * @param {number} totalRows
 * @param {number} totalCols
 * @returns {boolean} true if it is out of bounds, false otherwise.
 */
function isOutOfBounds(row, col, totalRows, totalCols) {
  // TODO: Write a return statement that evaluates the 4 conditions combined by ||
  return false; // TEMPORARY - This will crash the engine on edge clicks!
}
/**
 * Task 3: Identify Anomalies (Mines)
 * The engine stores cell contents as an internal secret number.
 * A value of 9 specifically means the cell contains a mine.
 * Return true if the value is exactly equal to 9.
 *
 * @param {number} cellValue
 * @returns {boolean} true if it's a mine, false otherwise
 */
function isMineCell(cellValue) {
  // TODO: Use strict equality (===) to check if cellValue is 9
  return false; // TEMPORARY
}

/**
 * Task 4: Identify Safe Cells
 * A cell is safe if its value is strictly NOT equal to 9.
 *
 * @param {number} cellValue
 * @returns {boolean}
 */
function isSafeCell(cellValue) {
  // TODO: Use strict inequality (!==) to check if cellValue is not 9
  return false; // TEMPORARY
}

/**
 * Task 5: Verify Defusal Complete (Win Condition)
 * The player wins ONLY when the total revealed safe cells exactly
 * matches the required safe cells.
 *
 * @param {number} revealedCells - The amount of non-mine cells clicked
 * @param {number} totalSafeCells - The target amount of safe cells to clear
 * @returns {boolean} true if they match, false otherwise.
 */
function isGameWon(revealedCells, totalSafeCells) {
  // TODO: Use strict equality (===)
  return false; // TEMPORARY
}

/**
 * Task 6: System Score Calculator
 * Each safely revealed cell is worth 10 points. Calculate the total score.
 *
 * @param {number} revealedCount - Number of safe cells revealed
 * @returns {number} The total score
 */
function calculateScore(revealedCount) {
  // TODO: Multiply revealedCount by 10 and return it
  return 0; // TEMPORARY
}
