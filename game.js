const gameInfo = document.querySelector(".game-info");
const buttonClick = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let currentPlayer
let gameGrid
let count =0


function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "" , "", "", "", "", ""];
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`
    })
    gameInfo.innerText = `Current Player -  ${currentPlayer}`
}
initGame()

function handleClick(index){

    if(gameGrid[index] === ""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        count++;

        //swap 
        swapTurn();

        // to check if any player has won or not
        checkGameOver();
    }
}

function swapTurn(){
    if (currentPlayer === "X"){
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X"
    }
    gameInfo.innerText = `Current Player -  ${currentPlayer}`
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
})


function checkGameOver(){
    let winner = ""

    winningPositions.forEach((position) => {
        if(gameGrid[position[0]] !== "" && gameGrid[position[0]] === gameGrid[position[1]] 
        && gameGrid[position[1]] === gameGrid[position[2]]){
            winner = gameGrid[position[0]]
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win') ;
        }
    })

    if(winner){
        gameInfo.innerText = `Winner is - ${winner}`
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })
    }
    console.log(count, winner)
    if(count === 9 && winner === ""){
        gameInfo.innerText = "Game Draw"
    }
}
buttonClick.addEventListener("click", initGame)

