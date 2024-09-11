var minutosHTML = document.getElementById('minutos');
var segundosHTML = document.getElementById('segundos');
var tituloPagina = document.querySelector('title');
var alarme = document.getElementById('alarme');
var botaoPause = document.getElementById('botao-pause');
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
}

function pausarContinuar() {
    if (pausado) {
        tempoCorrendo = false;
        var minutosTranscorridos = parseInt(minutosHTML.innerText);
        var segundosTranscorridos = parseInt(segundosHTML.innerText);
        
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