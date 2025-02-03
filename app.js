//let title =document.querySelector('h1');
//title.innerHTML ='Secret number game';


//let paragraph = document.querySelector('p');
//paragraph.innerHTML = 'Pick a number between 1 and 10';
let usedNumbers =[];
let numLimit=10;
let secretNumber=randomNumber();
let tries=1;


function showTextScreen(tag, text){
    let field = document.querySelector(tag);
    field.innerHTML=text;
    responsiveVoice.speak(text, 'US English Female', {rate:1.2})
}

function starterMsg(){
    showTextScreen('h1', 'Secret number game');
    showTextScreen('p', 'Pick a number between 1 and 10');
}
starterMsg();

function checkGuess() {
    let guess=document.querySelector('input').value;
    if (guess==secretNumber){
        showTextScreen('h1','You hit it!!');
        let tryWord= tries>1 ? 'tries' : 'try';
        let msgTries= `You found out the secret number in ${tries} ${tryWord}!`;
        showTextScreen('p', msgTries);
        document.getElementById('restart').removeAttribute('disabled');
    }else{
        if(guess>secretNumber){
            showTextScreen('p','Secret Number is smaller');
        }else{
            showTextScreen('p', 'Secret Number is bigger');
        }
        //tries=tries+1;
        tries++;
        clear();
    }
}

function randomNumber(){
   let pickedNumber= parseInt(Math.random()*numLimit+1);
   let amountElements = usedNumbers.length;
   if(amountElements==10){
    usedNumbers=[];
   }
   if (usedNumbers.includes(pickedNumber)){
        return randomNumber();
   }else{
        usedNumbers.push(pickedNumber);
        console.log(usedNumbers);
        return pickedNumber;
   }
}

function clear(){
    guess=document.querySelector('input');
    guess.value='';
}

function restartGame(){
    secretNumber=randomNumber();
    clear();
    tries=1;
    starterMsg();
    document.getElementById('restart').setAttribute('disabled',true);
}