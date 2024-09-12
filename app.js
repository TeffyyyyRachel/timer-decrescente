var divTempo = document.getElementById('tempo');
var minutosHTML = document.getElementById('minutos');
var segundosHTML = document.getElementById('segundos');
var tituloPagina = document.querySelector('title');
var alarme = document.getElementById('alarme');
var botaoPause = document.getElementById('botao-pause');
var botaoFullscreen = document.getElementById('tela-cheia');
var tempoCorrendo = false;
var pausado = false;
var intervalo;

function atualizarDisplay(minutos, segundos) {
    minutosHTML.innerText = minutos < 10 ? '0' + minutos : minutos;
    segundosHTML.innerText = segundos < 10 ? '0' + segundos : segundos;
    tituloPagina.innerText = (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
}

function minutagem(minutos,segundos) {
    if (tempoCorrendo) {
        console.log('Espere o tempo acabar');
    }
    else {
    
    tempoCorrendo = true;
    atualizarDisplay(minutos,segundos);

    intervalo = setInterval(()=>{
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalo);
                tempoCorrendo = false;
                tituloPagina.innerText = 'Timer decrescente';
                alarme.play();
                return;
            }
            minutos--;
            segundos = 59;
        } else {
            segundos--;
        }

        atualizarDisplay(minutos,segundos);        
    }, 1000)}
}

function zerar() {
    clearInterval(intervalo);
    atualizarDisplay(0,0);
    tempoCorrendo = false;
    tituloPagina.innerText = 'Timer decrescente';
    pausado = false;
    botaoPause.innerText = 'Pausar';
}

function pausarContinuar() {
    var minutosTranscorridos = parseInt(minutosHTML.innerText);
    var segundosTranscorridos = parseInt(segundosHTML.innerText);

    if (minutosTranscorridos == 0 & segundosTranscorridos == 0) {
        return;
    }

    if (pausado) {
        tempoCorrendo = false;        
        minutagem(minutosTranscorridos,segundosTranscorridos);
        botaoPause.innerText = 'Pausar';
        pausado = false;
        tempoCorrendo = true;
    }
    else {        
        clearInterval(intervalo);
        botaoPause.innerText = 'Continuar';
        pausado = true;
    }
}

function telaCheia() {
    if (!document.fullscreenElement) {
        divTempo.classList.add('fullscreen-mode');
        if (divTempo.requestFullscreen) {
            divTempo.requestFullscreen();
        } else if (divTempo.mozRequestFullScreen) { // Para Firefox
            divTempo.mozRequestFullScreen();
        } else if (divTempo.webkitRequestFullscreen) { // Para Chrome, Safari e Opera
            divTempo.webkitRequestFullscreen();
        } else if (divTempo.msRequestFullscreen) { // Para IE/Edge
            divTempo.msRequestFullscreen();
        }

        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(err => {
                console.log("Falha ao mudar para o modo paisagem", err);
            });
        }
    } else {
        if (document.exitFullscreen) {
            divTempo.classList.remove('fullscreen-mode');
        }
    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        divTempo.classList.remove('fullscreen-mode');
    }
});