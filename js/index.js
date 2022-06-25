
let currentTurn = 'circle'; // ['circle', 'x-cirlce']
let visitedCells = new Array(3).fill().map(() => new Array(3).fill(false));
let filledValues = new Array(3).fill().map(() => new Array(3).fill(''));
let turn = null;
let playAgain = null;
let msgDiv = null;
let winnerDeclared = false;
let uniqueCellsClicked  = 0;
/**
 * On Loading of window
 */
window.onload = function() {
    try {
        let cells = document.querySelectorAll('.cell');
        cells.forEach(function(cell, index) { 
            let row = Math.floor((index)/3);
            let col = (index)%3;
            cell.addEventListener('click', e=>clickedCell(e, row, col))
        })
        turn = document.getElementById('turn');
        playAgain = document.getElementById('play-again');
        msgDiv = document.getElementById('msg');
        playAgain.addEventListener('click', resetGame);
    } catch (error) {
        document.getElementById('msg').innerHTML = 'Error loading JS';
    }

}


/**
 * 
 * @param {*} e : event object
 * @param {*} row : the row to be clicked
 * @param {*} col : the column to be clicked
 */
const clickedCell = (e, row, col)=>{
    try {
        if(visitedCells[row][col] || winnerDeclared) return;
        let isCurrentCircle = (currentTurn==='circle') ? true : false;
        e.target.innerHTML = isCurrentCircle ? '<i class="ph-circle"></i>' : '<i class="ph-x-circle"></i>'
        e.target.classList.add('animate__animated');
        e.target.classList.add('animate__pulse');
        setTimeout(()=>{
            e.target.classList.remove('animate__animated');
            e.target.classList.remove('animate__pulse');
        }, 2000);
        visitedCells[row][col] = true;
        filledValues[row][col] = isCurrentCircle ? 'C':'X';
        if(turn) turn.innerHTML = isCurrentCircle ? 'Turn: <i class="ph-x-circle"></i>' : 'Turn: <i class="ph-circle"></i>';
        rowCheck(row, col) 
        colCheck(row, col)
        if(row===col) leftDiagonal(row, col)
        if((row+col)==2) rightDiagonal(row, col)

        uniqueCellsClicked++; // increase cells click count
        checkDraw();
        currentTurn = isCurrentCircle ? 'x-circle' :'circle';
    } catch (error) {
        msgDiv.innerHTML = error?.message ?? 'Unknown error occurred'
    }

} 


/**
 * 
 */
const rowCheck= (row, col)=>{
    // check curr row
    let currentVal = filledValues[row][col];
    let isLeftMatch = true;
    let isRightMatch = true;
    // left check
    for(let i=col-1;i>=0;){
        if(visitedCells[row][i] && filledValues[row][i]===currentVal){
            i--;
        }else{
            isLeftMatch = false;
            break;
        }
    } 
    // right check
    for(let i=col+1;i<3;){
        if(visitedCells[row][i] && filledValues[row][i]===currentVal){
            i++;
        }else{
            isRightMatch = false;
            break;
        }
    } 

    // console.log({isLeftMatch, isRightMatch});
    if(isLeftMatch && isRightMatch) declareWinner();
}


/**
 * 
 */
const colCheck= (row, col)=>{
    // check curr row
    let currentVal = filledValues[row][col];
    let isTopMatch = true;
    let isBottomMatch = true;
    // top check
    for(let i=row-1;i>=0;){
        if(visitedCells[i][col] && filledValues[i][col]===currentVal){
            i--;
        }else{
            isTopMatch = false;
            break;
        }
    } 
    // bottom check
    for(let i=row+1;i<3;){
        if(visitedCells[i][col] && filledValues[i][col]===currentVal){
            i++;
        }else{
            isBottomMatch = false;
            break;
        }
    } 

    // console.log({isTopMatch, isBottomMatch});
    if(isTopMatch && isBottomMatch) declareWinner();

}

/**
 * 
 */
const leftDiagonal= (row, col)=>{
    // check curr row
    let currentVal = filledValues[row][col];
    let isTopLeftMatch = true;
    let isBottomRightMatch = true;
    // top check
    for(let i=row-1;i>=0;){
        if(visitedCells[i][i] && filledValues[i][i]===currentVal){
            i--;
        }else{
            isTopLeftMatch = false;
            break;
        }
    } 
    // bottom check
    for(let i=row+1;i<3;){
        if(visitedCells[i][i] && filledValues[i][i]===currentVal){
            i++;
        }else{
            isBottomRightMatch = false;
            break;
        }
    } 

    // console.log({isTopLeftMatch, isBottomRightMatch});

    if(isTopLeftMatch && isBottomRightMatch) declareWinner();


}


/**
 * 
 */
const rightDiagonal= (row, col)=>{
    // check curr row
    let currentVal = filledValues[row][col];
    let isTopRightMatch = true;
    let isBottomLeftMatch = true;
    // top check
    for(let i=row-1, j=col+1;i>=0 && j<3;){
        if(visitedCells[i][j] && filledValues[i][j]===currentVal){
            i--;
            j++;
        }else{
            isTopRightMatch = false;
            break;
        }
    } 
    // bottom check
    for(let i=row+1, j=col-1;i<3 && j>=0;){
        if(visitedCells[i][j] && filledValues[i][j]===currentVal){
            i++;
            j--;
        }else{
            isBottomLeftMatch = false;
            break;
        }
    } 

    if(isTopRightMatch && isBottomLeftMatch) declareWinner();

}

/**
 * Declare winner
 */
const declareWinner = ()=>{
    let isCurrentCircle = (currentTurn==='circle') ? true : false;
    
    if(msgDiv) {
        msgDiv.innerHTML = isCurrentCircle ? '<i class="ph-circle"></i>' : '<i class="ph-x-circle"></i>'
        msgDiv.innerHTML += ' &nbsp; &nbsp; won this round!!!'
    }
    if(playAgain){
        playAgain.classList.remove('d-none');
        playAgain.classList.add('animate__animated');
        playAgain.classList.add('animate__fadeInLeftBig');
    }

    document.getElementById('tic-tac-container').style.border = '2px solid #30c530db';

    winnerDeclared = true;
}


/**
 * Reset the game
 */
const resetGame = ()=>{
    try {
        visitedCells = new Array(3).fill().map(() => new Array(3).fill(false)); // clear visited array
        filledValues = new Array(3).fill().map(() => new Array(3).fill('')); // clear filled values
        currentTurn = 'circle';
        if(turn) turn.innerHTML = 'Turn: <i class="ph-circle"></i>';
        playAgain.classList.add('d-none');
        playAgain.classList.remove('animate__animated');
        playAgain.classList.remove('animate__fadeInLeftBig');
        msgDiv.innerHTML = '';
        let cells = document.querySelectorAll('.cell');
        cells.forEach(function(cell, index) { 
            cell.innerHTML= index+1;
        })
        winnerDeclared = false;
        uniqueCellsClicked = 0;
        document.getElementById('tic-tac-container').style.border = 'none';
    } catch (error) {
        msgDiv.innerHTML = error?.message ?? 'Unknown error occurred'
    }
}


/**
 * Check if match was a draw
 */
const checkDraw = ()=>{
    try {
        if(uniqueCellsClicked===9 && !winnerDeclared){
            resetGame();
        }
    } catch (error) {
        throw error;
    }
}