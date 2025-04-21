let gameName="Guess Game";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} is programmed By Tsunamy`;

// inputs
let numberOfTries=6;
let numberOfLetters=6;
let currentTry=1;
let hints=3;

// The words of play
let words=["school", "elzero" , "Edward" ];
let wordTocheck=words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordTocheck);

let messageArea=document.querySelector(".message");
// Guess Game
function generatInputs(){
    const inputsContainer=document.querySelector(".inputs");
    // inputs fields
    for(let i=1 ; i<=numberOfTries ; i++){
        const tryDiv=document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i} <span>`;
        if(i!=1) tryDiv.classList.add("disabled-inputs"); //Add disable class to ~1 tries 
        for(let j=1 ; j<=numberOfLetters ; j++){
            const input=document.createElement("input");
            input.type=`text`;
            input.id=`try${i}-letter${j}`;
            input.setAttribute('maxlength',1);
            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus(); //the first letter is activated 

    const inputDisabled=document.querySelectorAll(".disabled-inputs input");
    inputDisabled.forEach( (input) => (input.disabled=true) ); //Disable inputs of each try has class disabled-inputs and input

    // auto moving while writing
    const inputs=document.querySelectorAll("input");
    inputs.forEach ((input,index)=>{
    input.addEventListener("input" , function(){
        this.value=this.value.toUpperCase();
        const nextInput=inputs[index+1];
        if(nextInput) nextInput.focus();
    });
    input.addEventListener("keydown",function(event){
        const currentIndex = Array.from(inputs).indexOf(event.target);
        if(event.key=="ArrowRight"){
            const nextIndex= currentIndex+1;
            if(nextIndex < inputs.length) inputs[nextIndex].focus();
        }
        if(event.key=="ArrowLeft"){
            const prevIndex= currentIndex - 1;
            if(prevIndex >= 0) inputs[prevIndex].focus();
        }
    });
    });
}
// end moving

// the logic of chek
const chekInput=document.querySelector(".check");
chekInput.addEventListener("click",handlChecking);

// The handl Checking
function handlChecking(){
    let sucsess=true;
    for(let i=1;i<=numberOfLetters;i++){
        const inputField=document.querySelector(`#try${currentTry}-letter${i}`);
        const letter=inputField.value.toLowerCase();
        const correctLetter=wordTocheck[i-1];

        if(letter === correctLetter){
            inputField.classList.add("in-place");
        }
        else if(wordTocheck.includes(letter)){
            inputField.classList.add("not-in-place");
            sucsess=false;
        }
        else{
            inputField.classList.add("wrong");
            sucsess=false;
        }
    }
    // If he wins
    if(sucsess){
         messageArea.innerHTML=`Hurray <span>You Win because you are A good Donkey<span>`;

         let allInputs=document.querySelectorAll(".inputs > div");
         allInputs.forEach( (tryDiv) => tryDiv.classList.add("disabled-inputs")); 
         chekInput.disabled=true;
    }
    // if he doesn't win
    else{
        const currentTryInput= document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInput.forEach( (input) => input.disabled=true );

        currentTry++;
        const nextTryInput=document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInput.forEach( (input) => input.disabled=false);

        let el= document.querySelector(`.try-${currentTry}`);
        if(el) {
            messageArea.innerHTML=`Sorry <span>Try Again<span>`;
            el.classList.remove("disabled-inputs");
            el.children[1].focus();
        }
        else 
        chekInput.disabled=true;
         messageArea.innerHTML=`You Are Donkey <span>The Word was ${wordTocheck}<span>`;
    }
}

const checkHint=document.querySelector(".hint");
checkHint.addEventListener("click",getHint);

// Manage Hints
const hint=document.querySelector(`.hint > span`);
hint.innerHTML=`${hints}`;
function getHint(){
    hint.innerHTML=`${hints}`;
    const enabledIndex =document.querySelectorAll(`input:not([disabled])`);
    const emptyEnabledInput=Array.from(enabledIndex).filter((input) => input.value==="");
    if(hints){
        hints--;
        const hint=document.querySelector(`.hint > span`);
        hint.innerHTML=`${hints}`;
        let randomIndex=Math.floor(Math.random() * emptyEnabledInput.length);
        let randomInput=emptyEnabledInput[randomIndex];
        let indexToFill=Array.from(enabledIndex).indexOf(randomInput);
        if(indexToFill != -1){
            randomInput.value=wordTocheck[indexToFill].toUpperCase();
            console.log(randomInput);
        }
    }
    else{
        hint.disabled=true;
    }
}


window.onload=function(){
    generatInputs()
};


