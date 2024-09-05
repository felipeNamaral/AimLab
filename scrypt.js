const startBtn = document.querySelector('#start');
const telas = document.querySelectorAll(".tela");
const timeEl = document.querySelector('#time');
const jogo = document.querySelector('#jogo');
const acertosEl = document.querySelector('#acertos');
const precisaoEl = document.querySelector('#precisao');
const acetosOver = document.querySelector("#acertos_over");
const precisaoOver = document.querySelector("#precisao_over");
const restartBtns = document.querySelectorAll('.restart');
const fullScreenBtn = document.querySelector('#telaCheia')



let time =30;
let jogando = true;
let interval;
let acertos = 0,
    erros = 0
    precisao = 0;


startBtn.addEventListener("click", () => {
    telas[0].classList.add("up");
    startGame();
})

function startGame() {
    jogando = true;
    interval = setInterval(decreaseTime, 1000);
    createRandomBola()
}
function decreaseTime() {
    if (time === 0) {
        finishGame();
    }
    let current = --time;
    let miliseconds = time * 1000;

    let minutes = Math.floor(miliseconds / (1000 * 60));
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);
    //zero na direita
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    setTime('${minutes}:${seconds}')
}

function setTime() {
    timeEl.innerHTML = time;
}

function createRandomBola() {


    const bola = document.createElement("div");
    const { width, height } = jogo.getBoundingClientRect();
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    bola.classList.add('bola');
    bola.style.left = `${x}px`;
    bola.style.top = `${y}px`;
    jogo.append(bola);

    bola.addEventListener("animationend", () => {
        bola.remove()
        createRandomBola();

;
    })
}



jogo.addEventListener('click', (e) => {
    if (e.target.classList.contains('bola')) {
        acertos++;
        e.target.remove();
        createRandomBola();
    } else {
        erros++;
    }
    acertosEl.innerHTML = acertos;
    calculatePrecisao();
})




function calculatePrecisao() {
    precisao = (acertos / (acertos + erros)) * 100;
    precisao = precisao.toFixed(2);
    precisaoEl.innerHTML = `${precisao}%`;
}

function finishGame(){
    jogando = false;
    clearInterval(interval);
    jogo.innerHTML ="";
    telas[1].classList.add("up");
    acertosEl.innerHTML = 0;
    timeEl.innerHTML = "00:00";
    precisaoEl.innerHTML = '0%';

    acetosOver.innerHTML = acertos;
    precisaoOver.innerHTML = `${precisao}%`;
}



restartBtns.forEach((btn) =>{
    btn.addEventListener('click', restartGame);
})

function restartGame(){
    finishGame();
    telas[0].classList.remove("up");
    telas[1].classList.remove("up");
    acertos = 0;
    precisao = 0;
    time = 30;
    erros = 0;
    jogando = false;
}

fullScreenBtn.addEventListener('click', fullScreen);

let elem = document.documentElement;

function fullScreen(){
    if(elem.requestFullscreen){
        elem.requestFullscreen();
    }else if(elem.mozRequestFullScreen){
        elem.mozRequestFullScreen();
    }else if(elem.webkitRequestFullScreen){
        elem.webkitRequestFullscreen();
    }else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
    }
}

