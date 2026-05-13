# Mentoring Session 22: JavaScript Functions Lab (Minesweeper Logic)

## Overview
Welcome to the Session 22 Mentoring Lab! In this session, you will purely practice **JavaScript Functions** (parameters, return values, and mathematical logic). You will be repairing the core logic of a classic retro Minesweeper game.

The visual interface (HTML/CSS) and the complex DOM interaction engine (`engine.js`) are functionally built. However, the game relies strictly on **your functions** to decipher the grid! If your code isn't perfectly complete, the engine will either throw a `FATAL CORRUPTION` error and refuse to boot, or crash immediately when you click a cell.

## Context (Sessions 20-22)
This lab honors the strict boundary of what you have learned up to Session 22:
- **Session 20/21**: Variables (`let`, `const`), Data Types, Arithmetic operators (`+`, `-`, `*`), Comparison operators (`===`, `!==`, `>`, `<`), Logical Operators (`||`), and basic logic.
- **Session 22**: Creating functions, receiving parameters, returning values, and separating concerns.

*Note: You have not officially learned `if`/`else` control structures (Session 24) or Arrays/Loops (Session 25/26) yet! That is why the `engine.js` handles the complex grid loops, while you handle the foundational grid math using ONLY `return` statements and operators.*

## Your Tasks
All of your work will take place in `starter/core-logic.js`. 

Read the comments carefully above each function.

### Task 1: Calculate Grid Size
Complete `calculateGridSize(rows, cols)` by multiplying the grid dimensions and returning the result. The engine uses this to allocate board memory! 

### Task 2: Check Boundaries
Complete `isOutOfBounds(row, col, totalRows, totalCols)`. The engine needs to know when it hits the edge of the board. You must construct a logical statement using strict comparators (`<`, `>=`) and the Logical OR operator (`||`). 
If this is broken, the engine will read invalid memory and the game will crash when you click!

### Task 3: Identify Anomalies (Mines)
Complete `isMineCell(cellValue)`. The engine stores a secret number (`9`) mathematically representing a mine. Return `true` if the passed value is exactly equal to 9.

### Task 4: Identify Safe Cells
Complete `isSafeCell(cellValue)`. Return `true` if the value is strictly NOT equal to 9.

### Task 5: Defuse Complete Verification (Win Condition)
Complete the `isGameWon(revealedCells, totalSafeCells)` function. 
- Return a boolean (`true`/`false`).
- Use the strict equality operator (`===`) to check if the `revealedCells` has exactly equalled the `totalSafeCells`. 

### Task 6: System Score Calculator
Complete the `calculateScore(revealedCount)` function. 
- The score scales identically to your progress. Return `revealedCount` multiplied by 10.

## Running the Lab
1. Open `starter/index.html` in your browser.
2. An error will show up immediately. The game cannot even boot without your memory size calculations.
3. Add the correct math logic to `core-logic.js`. 
4. Hit refresh! Every time you fix a function, the engine will progress further up until the game is fully playable.
