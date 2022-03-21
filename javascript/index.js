const somfundo = new Audio("music/fundo2.mp3");
const somgameover = new Audio("music/perdeu2.mp3");
const sommover = new Audio("music/move.mp3")
const somcomer = new Audio("music/moedamario.mp3")

var direcao = { x: 0, y: 0 };
var cobrinha = [{ x: 5, y: 5 }]
var fruta = {
    x: Math.floor(Math.random() * 16)+2,
    y: Math.floor(Math.random() * 16)+2
}
var pontos = 0;

var ultimaVezAtt = 0;
var velocidade = 5;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimaVezAtt) / 1000 < (1 / velocidade)) {
        return;
    }
    ultimaVezAtt = tempoAtual;
    atualizacaoJogo();
}

function verificarColisao() {
    //verifica colisão com ela memsa
    for (var i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y) {
            return true;
        }
    }
    //verifica colisão com as paredes
    if (cobrinha[0].x >= 20 || cobrinha[0].x <= 0 || cobrinha[0].y >= 20 || cobrinha[0].y <= 0) {
        return true;
    }
    return false;
}

function verificarComerFrutinha() {
    if (cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y) {
        fruta.x = Math.floor(Math.random() * 16)+2;
        fruta.y = Math.floor(Math.random() * 16)+2;
        somcomer.play();
        pontos += 10;
        pontuacao.innerHTML = pontos + " Pontos <br> Leonardo Ruch";
        cobrinha.unshift(
            {
                x: cobrinha[0].x + direcao.x, 
                y: cobrinha[0].y + direcao.y
            }
        )
    }
}

function atualizacaoJogo() {
    var colidiu = verificarColisao();
    if (colidiu == true) {
        somfundo.pause();
        somgameover.play();
        direcao.x = 0;
        direcao.y = 0;
        cobrinha = [{ x: 5, y: 5 }]
        pontos = 0;
        pontuacao.innerHTML = pontos + " Pontos <br> Leonardo Ruch";
        alert("KK o cara perdeu no jogo da cobrinha kk")
    }

    verificarComerFrutinha()

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }
    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;

    

    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            parteCobrinha.classList.add("head");
        } else {
            parteCobrinha.classList.add("tronco");
        }

        board.appendChild(parteCobrinha);
    }


    var food = document.createElement("div")
    food.style.gridColumnStart = fruta.x;
    food.style.gridRowStart = fruta.y;
    food.classList.add("fruta")
    board.appendChild(food)
}
function verificarCliqueTeclado(e) {
    sommover.play();
    somfundo.play();

    switch (e.code) {
        ///////////////////////////////////////////////////////  DIREÇÃO
        case "Numpad8":
        case "KeyW":
        case "ArrowUp":
            direcao.x = 0;
            direcao.y = -1;
            break;
        case "Numpad2":
            case "KeyS":
        case "ArrowDown":
            direcao.x = 0;
            direcao.y = 1;
            break;
        case "Numpad4":
        case "KeyA":
        case "ArrowLeft":
            direcao.x = -1;
            direcao.y = 0;
            break;
        case "Numpad6":
        case "KeyD":
        case "ArrowRight":
            direcao.x = 1;
            direcao.y = 0;
            break;
        ///////////////////////////////////////////////////////  DIAGONAL
        case "Numpad9":
            direcao.x = 1;
            direcao.y = -1;
            break;
        case "Numpad7":
            direcao.x = -1;
            direcao.y = -1;
            break;
        case "Numpad3":
            direcao.x = 1;
            direcao.y = 1;
            break;
        case "Numpad1":
            direcao.x = -1;
            direcao.y = 1;
            break;
        /////////////////////////////////////////////////////// PARAR
        case "Numpad5":
        case "Space":
            direcao.x = 0;
            direcao.y = 0;
            break;
        ///////////////////////////////////////////////////////  VELOCIDADE
        case "NumpadAdd":
            velocidade++;
            break;
        case "NumpadSubtract":
            velocidade--;
            break;

    }
}

window.addEventListener('keydown', (e) => verificarCliqueTeclado(e))


principal();