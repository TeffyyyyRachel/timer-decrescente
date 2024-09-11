var minutosHTML = document.getElementById('minutos');
var segundosHTML = document.getElementById('segundos');
var tituloPagina = document.querySelector('title');
var alarme = document.getElementById('alarme');
var botaoPause = document.getElementById('botao-pause');
var tempoCorrendo = false;
var pausado = false;
var intervalo;

function minutagem(minutos,segundos) {
    if (tempoCorrendo) {
        console.log('Espere o tempo acabar');
    } 
    
    else {
    
    tempoCorrendo = true;

    // Se o tempo for menor do que 10 minutos, adiciono o 0 à esquerda do tempo
    if (minutos < 10) {
        minutosHTML.innerText = '0' + minutos;
        tituloPagina.innerText = '0' + minutos + ':00';
    } else {
        minutosHTML.innerText = minutos;
        tituloPagina.innerText = minutos + ':00';
    }

    intervalo = setInterval(()=>{
        if (minutos < 10 & segundos < 10) {
            minutosHTML.innerText = '0' + minutos;
            segundosHTML.innerText = '0' + segundos;
            tituloPagina.innerText = '0' + minutos + ':' + '0' + segundos;
        } else if (minutos < 10) {
            minutosHTML.innerText = '0' + minutos;
            segundosHTML.innerText = segundos;
            tituloPagina.innerText = '0' + minutos + ':' + segundos;
        } else if (segundos < 10) {
            minutosHTML.innerText = minutos;
            segundosHTML.innerText = '0' + segundos; 
            tituloPagina.innerText = minutos + ':' + '0' + segundos;
        } else {
            minutosHTML.innerText = minutos;
            segundosHTML.innerText = segundos; 
            tituloPagina.innerText = minutos + ':' + segundos;
        }
        
        if (segundos == 0){
            minutos -= 1;
            segundos = 59;
        }

        if (minutos < 0) {
            clearInterval(intervalo);
            tempoCorrendo = false;
            tituloPagina.innerText = 'Timer decrescente';
            alarme.play();
        }

        segundos -= 1;
        
    }, 1000)}
}

function zerar() {
    clearInterval(intervalo);
    minutosHTML.innerText = '00';
    segundosHTML.innerText = '00';
    tempoCorrendo = false;
    tituloPagina.innerText = 'Timer decrescente';
}

function pausarContinuar() {
    if (pausado) {
        botaoPause.innerText = 'Pausar';
        pausado = false;
        
        var minutosTranscorridos = parseInt(minutosHTML.innerText);
        var segundosTranscorridos = parseInt(segundosHTML.innerText);

        minutagem(minutosTranscorridos,segundosTranscorridos);
        tempoCorrendo = true;
    }
    else {
        clearInterval(intervalo);
        botaoPause.innerText = 'Continuar';
        pausado = true;
        tempoCorrendo = false;
    }
}