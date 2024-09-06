const startBtn = document.querySelector('#start');
const telas = document.querySelectorAll(".tela");
const timeEl = document.querySelector('#time');
const jogo = document.querySelector('#jogo');
const acertosEl = document.querySelector('#acertos');
const precisaoEl = document.querySelector('#precisao');
const acetosOver = document.querySelector("#acertos_over");
const precisaoOver = document.querySelector("#precisao_over");
const restartBtns = document.querySelectorAll('.restart');
const fullScreenBtn = document.querySelector('#telaCheia');
const modo1Btn = document.querySelector('#modo1');
const modo2Btn = document.querySelector('#modo2');

const bola1 = document.querySelector('#bola1');
const bola2 = document.querySelector('#bola2');
const bola3 = document.querySelector('#bola3');




let time = 70;
let jogando = true;
let interval;
let acertos = 0,
    erros = 0,
    precisao = 0;


startBtn.addEventListener("click", () => {
    telas[0].classList.add("up");
    
})

modo1Btn.addEventListener('click',() =>{
    telas[1].classList.add('up');
    startGame();
})

modo2Btn.addEventListener('click',() => {
    telas[1].classList.add('up');
    startGame2();
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
    //zero na esquerda
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    setTime(`${minutes}:${seconds}`);
}

function setTime(time) {
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
    precisao = (acertos / (acertos + erros)) * 400;
    precisao = precisao.toFixed(2);
    precisaoEl.innerHTML = `${precisao}%`;
}

function finishGame() {
    jogando = false;
    clearInterval(interval);
    jogo.innerHTML = "";
    telas[2].classList.add("up");
    acertosEl.innerHTML = 0;
    timeEl.innerHTML = "00:00";
    precisaoEl.innerHTML = '0%';

    acetosOver.innerHTML = acertos;
    precisaoOver.innerHTML = `${precisao}%`;
}



restartBtns.forEach((btn) => {
    btn.addEventListener('click', restartGame);
})

function restartGame() {
    finishGame();
    telas[0].classList.remove("up");
    telas[1].classList.remove("up");
    telas[2].classList.remove("up");
    acertos = 0;
    precisao = 0;
    time = 30;
    erros = 0;
    jogando = false;
}

fullScreenBtn.addEventListener('click', fullScreen);

let elem = document.documentElement;

function fullScreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}






function startGame2(){
    jogando = true;
    interval = setInterval(decreaseTime, 1000);
    createRandomBola1();
    createRandomBola2();
    createRandomBola3();

    bola1.style.width = '50px';
    bola1.style.height = '50px';

    bola2.style.width = '50px';
    bola2.style.height = '50px';

    bola3.style.width = '50px';
    bola3.style.height = '50px';

}

function createRandomBola1(){
    


    const { width, height } = jogo.getBoundingClientRect();
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    bola1.classList.add('bola1');
    bola1.style.left = `${x}px`;
    bola1.style.top = `${y}px`;
    jogo.append(bola1);

}

function createRandomBola2(){
    


    const x2 = Math.random() * (window.innerWidth - 200);
    const y2 = Math.random() * (window.innerHeight - 200);
    bola2.classList.add('bola2');
    bola2.style.left = `${x2}px`;
    bola2.style.top = `${y2}px`;
    jogo.append(bola2);
}


function createRandomBola3(){
    


    const x3 = Math.random() * (window.innerWidth - 200);
    const y3 = Math.random() * (window.innerHeight - 200);
    bola3.classList.add('bola3');
    bola3.style.left = `${x3}px`;
    bola3.style.top = `${y3}px`;
    jogo.append(bola3);
   
}


//bola 1 

jogo.addEventListener('click', (e) => {
    if (e.target.classList.contains('bola1')) {
        acertos++;
        e.target.remove();
        createRandomBola1()
    } else {
        erros++;
    }
    acertosEl.innerHTML = acertos;
    calculatePrecisao();
})


//bola 2

jogo.addEventListener('click', (e) => {
    if (e.target.classList.contains('bola2')) {
        acertos++;
        e.target.remove();
        createRandomBola2();
    } else {
        erros++;
    }
    acertosEl.innerHTML = acertos;
    calculatePrecisao();
})

//bola 3
jogo.addEventListener('click', (e) => {
    if (e.target.classList.contains('bola3')) {
        acertos++;
        e.target.remove();
        createRandomBola3();
    } else {
        erros++;
    }
    acertosEl.innerHTML = acertos;
    calculatePrecisao();
})