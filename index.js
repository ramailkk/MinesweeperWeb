class Board {
    constructor(rows, cols, bombs, r, c) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(0));
        this.bombs = bombs;
        this.displayBoard = Array.from({ length: rows }, () => Array(cols).fill(-1));
        this.firstGenerate(r, c);
        this.bombDirections();
        this.makeMove(r, c);
        this.gameover = "N";
    }

    firstGenerate(r, c) {
        while (this.bombs > 0) {
            let ranR = Math.floor(Math.random() * this.rows);
            let ranC = Math.floor(Math.random() * this.cols);
            if (!(ranR === r && ranC === c) && this.board[ranR][ranC] !== -1) {
                this.board[ranR][ranC] = -1;
                this.bombs--;
            }
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.board[i][j] !== -1) {
                    this.board[i][j] = 0;
                }
            }
        }
    }

    bombDirections() {
        let nearbyBombs = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.board[i][j] !== -1) {
                    // Left side check
                    if ((i - 1) >= 0)
                        nearbyBombs += this.incrementBomb(i - 1, j);
                    // Right check
                    if ((i + 1) !== this.rows)
                        nearbyBombs += this.incrementBomb(i + 1, j);
                    // Up Check
                    if ((j - 1) >= 0)
                        nearbyBombs += this.incrementBomb(i, j - 1);
                    if ((j + 1) !== this.cols)
                        nearbyBombs += this.incrementBomb(i, j + 1);
                    // Up Left Check
                    if ((i - 1) >= 0 && (j - 1) >= 0)
                        nearbyBombs += this.incrementBomb(i - 1, j - 1);
                    // Down Left Check
                    if ((i - 1) >= 0 && (j + 1) !== this.cols)
                        nearbyBombs += this.incrementBomb(i - 1, j + 1);
                    // Up Right Check
                    if ((i + 1) !== this.rows && (j - 1) >= 0)
                        nearbyBombs += this.incrementBomb(i + 1, j - 1);
                    // Down Right Check
                    if ((i + 1) !== this.rows && (j + 1) !== this.cols)
                        nearbyBombs += this.incrementBomb(i + 1, j + 1);
                } else if (this.board[i][j] === -1) {
                    nearbyBombs = -1;
                }
                this.board[i][j] = nearbyBombs;
                nearbyBombs = 0;
            }
        }
    }

    incrementBomb(row, col) {
        if (this.board[row][col] === -1)
            return 1;
        return 0;
    }

    makeMove(i, j) {
        if(this.gameover !== "N")
            return;

        if(this.board[i][j] != -1){
        if (this.board[i][j] === 0)
                this.expand(i, j);
        else 
                this.displayBoard[i][j] = this.board[i][j];
    }
    else{
        this.gameover = "D";
        for (let rows = 0; rows < this.board.length; rows++) {
            for (let cols = 0; cols < this.board[0].length; cols++) {
                if(this.board[rows][cols] === -1 ){
                    this.displayBoard[rows][cols] = -2;
                }
            }            
        }
    }
    }

    expand(i, j) {
        this.displayBoard[i][j] = this.board[i][j];
        if (this.board[i][j] !== 0)
            return;
        // Left Check
        if ((i - 1) >= 0 && this.displayBoard[i - 1][j] === -1)
            this.expand(i - 1, j);
        // Right check
        if ((i + 1) !== this.rows && this.displayBoard[i + 1][j] === -1)
            this.expand(i + 1, j);
        // Up Check
        if ((j - 1) >= 0 && this.displayBoard[i][j - 1] === -1)
            this.expand(i, j - 1);
        if ((j + 1) !== this.cols && this.displayBoard[i][j + 1] === -1)
            this.expand(i, j + 1);
        // Up Left Check
        if ((i - 1) >= 0 && (j - 1) >= 0 && this.displayBoard[i - 1][j - 1] === -1)
            this.expand(i - 1, j - 1);
        // Down Left Check
        if ((i - 1) >= 0 && (j + 1) !== this.cols && this.displayBoard[i - 1][j + 1] === -1)
            this.expand(i - 1, j + 1);
        // Up Right Check
        if ((i + 1) !== this.rows && (j - 1) >= 0 && this.displayBoard[i + 1][j - 1] === -1)
            this.expand(i + 1, j - 1);
        // Down Right Check
        if ((i + 1) !== this.rows && (j + 1) !== this.cols && this.displayBoard[i + 1][j + 1] === -1)
            this.expand(i + 1, j + 1);
    }
}

// game mode selection
var mode = document.getElementsByClassName("options");
for (let i = 0; i < mode.length; i++) {
    const element = mode[i];
    element.onclick = function(){
        if(element.innerHTML === "Beginner")
            heavyReset(9,9,10);
        if(element.innerHTML === "Intermediate")
            heavyReset(16,16,40);
        if(element.innerHTML === "Expert")
            heavyReset(16,35,99);
        
    }
}
    document.addEventListener('DOMContentLoaded', (event) => {
        const form = document.getElementById('myForm');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way
            
            var input1 = parseInt(document.getElementById('rows').value);
            var input2 = parseInt(document.getElementById('cols').value);
            var input3 = parseInt(document.getElementById('num_bombs').value);

            document.getElementById('rows').value = "";
            document.getElementById('cols').value = "";
            document.getElementById('num_bombs').value = "";
                        
            if(isNaN(input1) === false && isNaN(input2) === false && isNaN(input3) === false)
                {
                    input1 = Math.max(input1,9);
                    input1 = Math.min(input1,30)

                    input2 = Math.max(input2,9);
                    input2 = Math.min(input2,45)

                    input3 = Math.max(input3,5);
                    input3 = Math.min(input3,(input1 * input2)/3);
        
                    heavyReset(input1,input2,input3);
                    // You can now handle the values as needed
                    // For example, send them to a server using fetch or XMLHttpRequest
                }
            
        
        });
    });
var resetButton = document.getElementById("resetBoard");

function heavyReset(rows, cols,originalbombs){
    const parent = document.getElementById("cells");
    parent.innerHTML = "";
    document.getElementById("time").innerHTML = "";
    document.getElementById("bombs").innerHTML = "";
    istimerRunning = true;
    startTime = Math.floor(Date.now() / 1000);
    resetButton.style.backgroundImage = "url('smile.png')";
    newGame(rows,cols, originalbombs);
}
var startTime = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
var istimerRunning = true;

function startTimeCounter() {
    if(!istimerRunning)
        return;
    var now = Math.floor(Date.now() / 1000); // get the time now
    var diff = now - startTime; // diff in seconds between now and start
    m = checkDigits(diff); // add a leading zero if it's single digit
    document.getElementById("time").innerHTML = m; // update the element where the timer will appear
    var t = setTimeout(startTimeCounter, 999); // set a timeout to update the timer

}
function checkDigits(i) {
    if(i >= 999)
        return 999;
    
    if(i<0 && i>=-9){
        i = "0" + i;
    } 
    if(i<-9 ){
        return i;
    }

    if (i < 10 && i>=0) {
        i = "00" + i
    };  // add zero in front of numbers < 10
    
    if(i < 100 & i>= 10){
        i = "0" + i;
    };
    return i;
}
function stopTimer() {
    istimerRunning = false;
}


function newGame(rows, cols, originalbombs){
var buttonrows = rows;
var buttoncols = cols;
const element = document.getElementById("cells");
var firstPressed = false;
var gameboard;
const buttonsizeheight = 30 ;
const buttonsizewidth = 30;
var arrayofButtons = Array.from({ length: buttonrows }, () => Array(buttoncols).fill(0))
var bombs = originalbombs; 
document.getElementById("bombs").innerHTML = checkDigits(bombs);


document.documentElement.style.setProperty('--dynamic-width', `calc(${buttonsizewidth}px * ${buttoncols})`);

document.documentElement.style.setProperty('--dynamic-height', `calc(${buttonsizeheight}px * ${buttonrows})`);

resetButton.onclick = function(){
    resetEverything();
}
resetButton.onmousedown = function(){
    resetButton.style.border = "3px #808080 solid";
    // border-top: 4px #ffffff solid;
    // border-left: 4px #ffffff solid;
    // border-right: 4px #808080 solid;
    // border-bottom: 4px #808080 solid;
    resetButton.style.margin = "2px";
    // resetButton.style.marginLeft = "3px";
}
resetButton.onmouseup = function(){
    resetButton.style.border = "";
    resetButton.style.margin = "";
    resetButton.style.marginLeft = "";
    resetButton.style.marginBottom = "";
}
resetButton.onmouseout = function(){
    resetButton.style.border = "";
    resetButton.style.margin = "";
    resetButton.style.marginLeft = "";
    resetButton.style.marginBottom = "";
}


startTimeCounter();





for (let index = 0; index < buttonrows; index++) {
    for (let j = 0; j < buttoncols; j++) {
    const para = document.createElement("button");
    para.style.width = `${buttonsizewidth}px`;
    para.style.height = `${buttonsizeheight}px`;


    para.className = "buttons";
    para.id = index + "-" + j;
    para.style.backgroundImage = "";

      para.oncontextmenu = function(event){
            event.preventDefault();
            if(!firstPressed)
                return;
            if(firstPressed){
                if(gameboard.gameover !== "N")
                    return;
            }
            if(para.style.backgroundImage === "" && para.innerHTML === ""){
                para.style.backgroundImage = "url('flag.png')"
            bombs--;
            document.getElementById("bombs").innerHTML = checkDigits(bombs);
            }
            else if(para.style.backgroundImage === 'url("flag.png")' ){
                para.style.backgroundImage = "";
            bombs++;
            document.getElementById("bombs").innerHTML = checkDigits(bombs);
            }
        }

        var clicked = false;
        var mouseonbutton = false;
    
        para.onmousedown = function(event){
            if(event.button !== 0)
                return;
            if(firstPressed)
                if(gameboard.gameover !=='N')
                    return;
            
            para.style.border = '2px solid #808080';
            clicked = true;
        }
        para.onmouseup = function(event){
            if(firstPressed)
                if(gameboard.gameover !=='N')
                    return;

            if(event.button !== 0)
                return;


            if(clicked === true){
                if(!firstPressed){
                    firstPressed = true;
                    gameboard = new Board(buttonrows,buttoncols,bombs,index,j);
                }
                if(gameboard.gameover !== "N")
                    return;
                if(para.style.backgroundImage !== "")
                    return;
                else{
                    gameboard.makeMove(index,j);
                    if(JSON.stringify(gameboard.displayBoard) === JSON.stringify(gameboard.board)){
                        gameboard.gameover = "W";
                        resetButton.style.backgroundImage = "url('win.png')";
                        bombs = 0;
                    }
                    if(gameboard.gameover !== "N")
                        stopTimer();
                }
                updateCells(index,j);
            }
            else
            para.style.border = "";
            clicked = false;
        } 
    
        para.onmouseout = function(event){
            if(event.button !== 0)
                return;

            para.style.border = "";
            event.stopPropagation();
            
        }
        element.onmouseout = function(){
            clicked = false;
        }
        para.onmouseover = function(event){
            if(event.button !== 0)
                return;
            mouseonbutton = true;
            if(clicked === true){
                para.style.border = '2px solid #808080';
            }
        }     
    
        para.onclick = function(){
            
            if(!firstPressed){
                firstPressed = true;
                gameboard = new Board(buttonrows,buttoncols,bombs,index,j);
            }
            if(gameboard.gameover !== "N")
                return;
            if(para.style.backgroundImage !== "")
                return;
            else{
                gameboard.makeMove(index,j);
                if(JSON.stringify(gameboard.displayBoard) === JSON.stringify(gameboard.board)){
                    gameboard.gameover = "W";
                    resetButton.style.backgroundImage = "url('win.png')";
                    bombs = 0;
                }
                if(gameboard.gameover !== "N")
                    stopTimer();
            }
            updateCells(index,j);
        }

    const node = document.createTextNode("");
    para.appendChild(node);
    element.appendChild(para);
    arrayofButtons[index][j] = para;
    }

}

function updateCells(index,col){
for (let i = 0; i < arrayofButtons.length; i++) {
    for (let j = 0; j < arrayofButtons[0].length; j++) {

        if(gameboard.gameover === "W"){
            if(gameboard.displayBoard[i][j] === -1){
                arrayofButtons[i][j].style.backgroundImage = 'url("flag.png")';
            }
        }

        if(gameboard.displayBoard[i][j] > 0){
            if(arrayofButtons[i][j].style.backgroundImage ==='url("flag.png")'
            ){
                arrayofButtons[i][j].style.backgroundImage = "";
                bombs++;
            }
            arrayofButtons[i][j].onclick = null;
                arrayofButtons[i][j].oncontextmenu = function(event){
                    event.preventDefault();
                };
                arrayofButtons[i][j].onmousedown = null;
                arrayofButtons[i][j].onmouseup = null;
                arrayofButtons[i][j].onmouseout = null;
            arrayofButtons[i][j].style.background = "#C0C0C0";
            arrayofButtons[i][j].style.border = '2px solid #808080'
            arrayofButtons[i][j].innerHTML = gameboard.displayBoard[i][j];
            arrayofButtons[i][j].style.color = "White";
            if(arrayofButtons[i][j].innerHTML === "1")
                arrayofButtons[i][j].style.color = "#0001F9";
            else if(arrayofButtons[i][j].innerHTML === "2")
                arrayofButtons[i][j].style.color = "#017E00";
            else if(arrayofButtons[i][j].innerHTML === "3")
                arrayofButtons[i][j].style.color = "#FD0000";
            else if(arrayofButtons[i][j].innerHTML === "4")
                arrayofButtons[i][j].style.color = "#010180";
            else if(arrayofButtons[i][j].innerHTML === "5")
                arrayofButtons[i][j].style.color = "#830003";
            else if(arrayofButtons[i][j].innerHTML === "6")
                arrayofButtons[i][j].style.color = "#008080";
            else if(arrayofButtons[i][j].innerHTML === "7")
                arrayofButtons[i][j].style.color = "#000000";
            else if(arrayofButtons[i][j].innerHTML === "8")
                arrayofButtons[i][j].style.color = "#808080";
        }
        else if(gameboard.displayBoard[i][j] == 0){
            if(arrayofButtons[i][j].style.backgroundImage === 'url("flag.png")' ){
                arrayofButtons[i][j].style.backgroundImage = "";
                bombs++;
            }

            arrayofButtons[i][j].onclick = null;
                arrayofButtons[i][j].oncontextmenu = function(event){
                    event.preventDefault();
                };
                arrayofButtons[i][j].onmousedown = null;
                arrayofButtons[i][j].onmouseup = null;
                arrayofButtons[i][j].onmouseout = null;
            arrayofButtons[i][j].innerHTML = "";
            arrayofButtons[i][j].style.background = "#C0C0C0";
            arrayofButtons[i][j].style.border = '2px solid #808080'
        }

        else if(gameboard.displayBoard[i][j] === -2){
            
            resetButton.style.backgroundImage = "url('death.png')";
            if(arrayofButtons[i][j].style.backgroundImage === 'url("flag.png")')
                continue;
            arrayofButtons[i][j].style.border = '2px solid #808080'
            if (index === i && col === j) {
                arrayofButtons[i][j].style.backgroundColor = "red";
            } else {
                arrayofButtons[i][j].style.backgroundColor = "#C0C0C0";
            }
            arrayofButtons[i][j].style.backgroundImage = "url('bomb.gif')";
            arrayofButtons[i][j].style.backgroundSize = `${buttonsizewidth+20}px ${buttonsizeheight+20}px`;
            arrayofButtons[i][j].onmousedown = null;
                arrayofButtons[i][j].onmouseup = null;
                arrayofButtons[i][j].onmouseout = null;
        }
        if(gameboard.gameover === "D"){
            if(arrayofButtons[i][j].style.backgroundImage === 'url("flag.png")' && gameboard.displayBoard[i][j] !==-2)
                arrayofButtons[i][j].style.backgroundColor ="red";
        }
    }  
}
document.getElementById("bombs").innerHTML = checkDigits(bombs); 
}
function resetEverything(){
// if(!firstPressed){
//     istimerRunning = true;
//         startTime = Math.floor(Date.now() / 1000);
//         startTimeCounter();
//     return
// }
//         for (let i = 0; i < arrayofButtons.length; i++){
//             for (let j = 0; j < arrayofButtons[0].length; j++) {
//                 arrayofButtons[i][j].innerHTML = "";
//                 arrayofButtons[i][j].style.background = "";
//                 arrayofButtons[i][j].style.backgroundImage = ""
//                 arrayofButtons[i][j].style.border  = "";
//                 resetButton.style.backgroundImage = "url('smile.png')";
//             }   
//         }
//         bombs = originalbombs;
//         document.getElementById("bombs").innerHTML = checkDigits(bombs);
//         gameboard = null;
//         firstPressed = false;
//         istimerRunning = true;
//         startTime = Math.floor(Date.now() / 1000);
//         startTimeCounter();
// ******* USING HEAVYRESET INSTEAD BECAUSE ITS EASIER FOR NOW
heavyReset(buttonrows,buttoncols,originalbombs);
}
}
newGame(9,9,5);
