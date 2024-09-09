var minutosHTML = document.getElementById('minutos');
var segundosHTML = document.getElementById('segundos');
var tituloPagina = document.querySelector('title');
var tempoCorrendo = false;
var intervalo;
var alarme = document.getElementById('alarme');

function minutagem(tempo) {
    if (tempoCorrendo) {
        console.log('Espere o tempo acabar');
    } 
    
    else {
    
    tempoCorrendo = true;

    // Se o tempo for menor do que 10 minutos, adiciono o 0 à esquerda do tempo
    if (tempo < 10) {
        minutosHTML.innerText = '0' + tempo;
        tituloPagina.innerText = '0' + tempo + ':00';
    } else {
        minutosHTML.innerText = tempo;
    }

    var minutosInt = tempo - 1
    var segundosInt = 59;

    intervalo = setInterval(()=>{
        if (minutosInt < 10 & segundosInt < 10) {
            minutosHTML.innerText = '0' + minutosInt;
            segundosHTML.innerText = '0' + segundosInt;
            tituloPagina.innerText = '0' + minutosInt + ':' + '0' + segundosInt;
        } else if (minutosInt < 10) {
            minutosHTML.innerText = '0' + minutosInt;
            segundosHTML.innerText = segundosInt;
            tituloPagina.innerText = '0' + minutosInt + ':' + segundosInt;
        } else if (segundosInt < 10) {
            minutosHTML.innerText = minutosInt;
            segundosHTML.innerText = '0' + segundosInt; 
            tituloPagina.innerText = minutosInt + ':' + '0' + segundosInt;
        } else {
            minutosHTML.innerText = minutosInt;
            segundosHTML.innerText = segundosInt; 
            tituloPagina.innerText = minutosInt + ':' + segundosInt;
        }
        
        if (segundosInt == 0){
            minutosInt -= 1;
            segundosInt = 59;
        }

        if (minutosInt < 0) {
            clearInterval(intervalo);
            tempoCorrendo = false;
            tituloPagina.innerText = 'Timer decrescente';
            alarme.play();
        }

        segundosInt -= 1;
        
    }, 10)}
}


function zerar() {
    clearInterval(intervalo);
    minutosHTML.innerText = '00';
    segundosHTML.innerText = '00';
    tempoCorrendo = false;
    tituloPagina.innerText = 'Timer decrescente';
}