let btnRef = document.querySelectorAll(".button_option");
let popupRef =document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn =document.getElementById("restart");
let msgRef =document.getElementById('message');

let winningPattern=[
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

//player 'X' plays first
let xTurn = true;
let count = 0;

//disable all buttons
const disabledButtons= () =>{
    btnRef.forEach((element)=> (element.disabled = true));

    //enable popup
    popupRef.classList.remove("hide");
};



//enable all buttons (for new game and restart)
const enableButtons =() =>{
    btnRef.forEach((element)=>{
        element.innerText ="";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

//this function is executed when a player wins
const winFunction =(letter)=>{
    disabledButtons();
    if(letter =='X'){
        msgRef.innerHTML ="&#x1F389; <br> 'X' Wins";
    }
    else {
        msgRef.innerHTML ="&#x1F389; <br> 'O' Wins";
    }
};

//function for draw
const drawFunction =() =>{
    disabledButtons();
    msgRef.innerHTML="&#x1F60E; <br> It's a Draw";
};

//new game
newgameBtn.addEventListener("click", () =>{
    count =0;
    enableButtons();
});
restartBtn.addEventListener("click", () =>{
    count =0;
    enableButtons();
});

//win logic
const winChecker =() => {
    //loop through all win pattterns
    for(let i of winningPattern){
        let[element1, element2,element3]=[
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        //check if elementa are filled 
        //if 3 empty elements are same and would giv win as
        if(element1 != "" && element2 != "" && element3 !=""){
            if(element1== element2 && element2 == element3){
                //if all the 3 buttons are same then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
};

//Display
btnRef.forEach((element) =>{
    element.addEventListener("click",() =>{
        if(xTurn){
            xTurn = false;
            //Display X
            element.innerText ="X";
            element.disabled =true;
        }
        else{
            xTurn =true;
            //display "O"
            element.innerText ="O";
            element.disabled =true;

        }
        //Increment count on each click
        count ++;
        if(count == 9){
            //it's draw since all the 9 blocks are visited
            drawFunction();
        }
        //check for win on every click
        winChecker();
    });
});

//enable buttons and disable popups
window.onload=enableButtons();
