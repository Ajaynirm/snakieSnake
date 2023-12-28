const playBoard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");

let gameOver=false;
let foodX,foodY;
let snakeBody = [];
let snakeX=10,snakeY=10;
let velocityX=0,velocityY=0;

let score=0;
let highScore= localStorage.getItem("high-score") || 0;
highScoreElement.innerText=`High Score : ${highScore}`;

const changeFoodPosition = () => {
    // passing random value as position 
    foodX = Math.floor(Math.random() * 30) +1;
    foodY= Math.floor(Math.random () * 30) +1;   
};
const handleGameOver = () => {

     // clearing timer and reloading page        
    clearInterval(setIntervalId);
    alert("Game Over!")
    location.reload();
};

const changeDirection = (e) =>{
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX=1;
        velocityY=0;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX=-1;
        velocityY=0;
    }
   
}

controls.forEach( key =>{
    key.addEventListener("click",() => changeDirection({key: key.dataset.key}));
});



const initGame = () => {

 if(gameOver) return handleGameOver();

 

    let htmlMarkUp=`<div class="food" style="grid-area : ${foodY} / ${foodX} " ></div>`;


    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
    
        //pushing food position to snake body
        snakeBody.push([foodX,foodY]);
        score++;

        highScore= score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        
        scoreElement.innerText=`Score : ${score}`;
        highScoreElement.innerText=`High Score : ${highScore}`;
        
     }

    //shifting forward value of elements in snake body by one
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=[...snakeBody[i-1]];

    }

    snakeBody[0] =  [snakeX,snakeY];

    //Updating snake head direction based on current velocity  
    snakeX +=velocityX;
    snakeY +=velocityY;

    //checking snake head is out of wall
    if(snakeX <=0 || snakeX > 30 || snakeY <=0 || snakeY >30){
        gameOver=true;
    }
    for(let i=0;i<snakeBody.length;i++){
        //Adding div for each part of snake body
        htmlMarkUp += `<div class="head" style="grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
    }
    
    playBoard.innerHTML=htmlMarkUp;
};

changeFoodPosition();

// 125 spead of snake
setIntervalId=setInterval(initGame, 125);

document.addEventListener('keydown',changeDirection);

