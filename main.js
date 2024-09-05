const container = document.getElementById('container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

function troca(){
    const bola = document.getElementById('bola');
    const maxX = containerWidth - bola.offsetWidth,
          maxY = containerHeight - bola.offsetHeight;
    const aleatorioX = Math.floor(Math.random()*maxX),
           aleatorioY = Math.floor(Math.random()*maxY);

    bola.style.left = aleatorioX +"px";
    bola.style.top  = aleatorioY +"px";

}


