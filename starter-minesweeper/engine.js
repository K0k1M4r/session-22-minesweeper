document.addEventListener('DOMContentLoaded', () => {
    // Game configuration
    const GRID_ROWS = 10;
    const GRID_COLS = 10;
    const TOTAL_MINES = 10;
    
    // DOM Elements
    const gridEl = document.getElementById('grid');
    const resetBtn = document.getElementById('reset-button');
    const minesDisplay = document.getElementById('mines-display');
    const scoreDisplay = document.getElementById('score-display');
    
    // State
    let gridValues = []; // 2D array of numbers (9 = mine, 0-8 = near mines)
    let cells = []; // 2D array of DOM elements
    let revealedCount = 0;
    let flagsCount = 0;
    let gameOver = false;
    let hasBooted = false;

    // Initialize Game
    function initGame() {
        // Validation check 1: Does the student's size calculator work?
        try {
            const size = typeof calculateGridSize === 'function' ? calculateGridSize(GRID_ROWS, GRID_COLS) : 1;
            if (size !== 100) {
                gridEl.innerHTML = '<div style="color:red; padding:20px; font-weight:bold; font-family:sans-serif; text-align:center;">SYSTEM CORRUPTION:<br>Invalid memory size allocation.<br>Check calculateGridSize().</div>';
                return;
            }
        } catch (e) {
            console.error("Boot Failed", e);
            return;
        }

        hasBooted = true;
        gridEl.innerHTML = '';
        gridEl.style.gridTemplateColumns = `repeat(${GRID_COLS}, 24px)`;
        cells = [];
        gridValues = [];
        revealedCount = 0;
        flagsCount = 0;
        gameOver = false;
        
        resetBtn.textContent = '🙂';
        updateDisplays();

        // Initialize empty number grid
        for (let r = 0; r < GRID_ROWS; r++) {
            gridValues[r] = [];
            for (let c = 0; c < GRID_COLS; c++) {
                gridValues[r][c] = 0;
            }
        }

        // Place mines (9 = mine)
        let minesPlaced = 0;
        while (minesPlaced < TOTAL_MINES) {
            const r = Math.floor(Math.random() * GRID_ROWS);
            const c = Math.floor(Math.random() * GRID_COLS);
            if (gridValues[r][c] !== 9) {
                gridValues[r][c] = 9;
                minesPlaced++;
            }
        }

        // Create DOM cells
        for (let r = 0; r < GRID_ROWS; r++) {
            const rowArr = [];
            for (let c = 0; c < GRID_COLS; c++) {
                const cellEl = document.createElement('div');
                cellEl.classList.add('cell');
                cellEl.dataset.row = r;
                cellEl.dataset.col = c;
                
                cellEl.addEventListener('click', () => handleCellClick(r, c));
                cellEl.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    handleRightClick(r, c);
                });

                gridEl.appendChild(cellEl);
                rowArr.push(cellEl);
            }
            cells.push(rowArr);
        }
    }

    function formatNumber(num) {
        return num.toString().padStart(3, '0');
    }

    function updateDisplays() {
        minesDisplay.textContent = formatNumber(Math.max(0, TOTAL_MINES - flagsCount));
        
        try {
            const score = typeof calculateScore === 'function' ? calculateScore(revealedCount) : 0;
            scoreDisplay.textContent = formatNumber(Math.max(0, score || 0));
        } catch (e) {
            console.error(e);
        }
    }

    function handleRightClick(r, c) {
        if (!hasBooted || gameOver) return;
        const cellEl = cells[r][c];
        
        if (cellEl.classList.contains('revealed')) return;

        if (cellEl.classList.contains('flag')) {
            cellEl.classList.remove('flag');
            flagsCount--;
        } else {
            cellEl.classList.add('flag');
            flagsCount++;
        }
        updateDisplays();
    }

    // This internal engine function relies PERFECTLY on student's logic!
    function getAdjacentCount(r, c) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const checkR = r + dr;
                const checkC = c + dc;

                // VALIDATION: Does their outOfBounds function work?
                // If it fails, trying to access gridValues[checkR][checkC] will THROW AN ERROR
                // and break the entire game execution loop!
                if (!isOutOfBounds(checkR, checkC, GRID_ROWS, GRID_COLS)) {
                    // VALIDATION: Check if it's a mine using their function
                    const val = gridValues[checkR][checkC];
                    if (isMineCell(val)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    function handleCellClick(r, c) {
        if (!hasBooted || gameOver) return;
        
        const cellEl = cells[r][c];
        if (cellEl.classList.contains('revealed') || cellEl.classList.contains('flag')) return;

        const val = gridValues[r][c];

        // VALIDATION: Does the student's code recognize a mine?
        if (isMineCell(val)) {
            triggerGameOver(r, c);
            return;
        }

        // Must be safe!
        if (isSafeCell(val)) {
            revealCell(r, c);
            
            try {
                let totalSafe = (GRID_ROWS * GRID_COLS) - TOTAL_MINES;
                let isWon = false;
                
                if (typeof isGameWon === 'function') isWon = isGameWon(revealedCount, totalSafe);

                if (isWon) {
                    triggerWin();
                }
            } catch (e) {
                console.error(e);
            }
        }
    }

    function revealCell(r, c) {
        if (typeof isOutOfBounds === 'function' && isOutOfBounds(r, c, GRID_ROWS, GRID_COLS)) return;
        
        const cellEl = cells[r][c];
        if (cellEl.classList.contains('revealed') || cellEl.classList.contains('flag')) return;

        cellEl.classList.add('revealed');
        revealedCount++;
        
        let adjacent = 0;
        try {
            adjacent = getAdjacentCount(r, c);
        } catch (e) {
            console.error("ENGINE SECURE FAULT: The outOfBounds function is broken, resulting in a system crash.", e);
            gridEl.style.opacity = '0.2';
            document.querySelector('.title-text').textContent = 'FATAL EXCEPTION HAS OCCURRED';
            gameOver = true;
            return;
        }

        if (adjacent > 0) {
            cellEl.textContent = adjacent;
            cellEl.dataset.adjacent = adjacent;
        } else {
            // Flood fill for empty cells
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    revealCell(r + dr, c + dc);
                }
            }
        }
        updateDisplays();
    }

    function triggerGameOver(hitR, hitC) {
        gameOver = true;
        resetBtn.textContent = '😵';
        
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const cellEl = cells[r][c];
                const val = gridValues[r][c];
                
                if (isMineCell(val)) {
                    if (r === hitR && c === hitC) {
                        cellEl.classList.add('mine'); 
                    } else if (!cellEl.classList.contains('flag')) {
                        cellEl.classList.add('mine-revealed');
                    }
                } else if (cellEl.classList.contains('flag')) {
                    cellEl.style.backgroundColor = 'pink';
                }
            }
        }
    }

    function triggerWin() {
        gameOver = true;
        resetBtn.textContent = '😎';
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                if (isMineCell(gridValues[r][c])) {
                    const cellEl = cells[r][c];
                    if (!cellEl.classList.contains('flag')) {
                        cellEl.classList.add('flag');
                        flagsCount++;
                    }
                }
            }
        }
        updateDisplays();
    }

    resetBtn.addEventListener('click', () => {
        if (!hasBooted) location.reload();
        else initGame();
    });

    resetBtn.addEventListener('mousedown', () => resetBtn.classList.add('pressed'));
    resetBtn.addEventListener('mouseup', () => resetBtn.classList.remove('pressed'));
    resetBtn.addEventListener('mouseleave', () => resetBtn.classList.remove('pressed'));

    initGame();
});
