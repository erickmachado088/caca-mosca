
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

var criaMoscartempo = 1500;

var nivel = window.location.search;
nivel = nivel.replace("?", "");

if (nivel === "normal") {
    criaMoscartempo = 1500;
} else if (nivel === "dificil") {
    criaMoscartempo = 1000;
} else if (nivel === "chucknorris") {
    criaMoscartempo = 750;
}

// Ajustar tamanho da tela
function ajustarTamanhoPalvoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustarTamanhoPalvoJogo();

// Cronômetro
var cronometro = setInterval(function () {
    tempo -= 1;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = "Vitoria.html";
    } else {
        document.getElementById("cronometro").innerHTML = tempo;
    }

}, 1000);

// Gerar posição aleatória da mosca
function posicaoRandomica() {

    // Remover mosca anterior, se existir
    if (document.getElementById("mosca")) {

        document.getElementById("mosca").remove();

        if (vidas > 3) {
            window.location.href = "fim_de_jogo.html";
        } else {
            document.getElementById("v" + vidas).src =
                "imagens/coracao_vazio.png";

            vidas++;
        }
    }

    var posicaox = Math.floor(Math.random() * largura) - 90;
    var posicaoy = Math.floor(Math.random() * altura) - 90;

    // Criar mosca
    var mosca = document.createElement("img");

    mosca.src = "imagens/mosca.png";
    mosca.className = tamanhoAleatorio() + " " + ladoAleatorio();

    mosca.style.left = posicaox + "px";
    mosca.style.top = posicaoy + "px";
    mosca.style.position = "absolute";

    mosca.id = "mosca";

    // Ao clicar na mosca, remover
    mosca.onclick = function () {
        this.remove();
    };

    document.body.appendChild(mosca);
}

// Tamanho aleatório
function tamanhoAleatorio() {

    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return "mosca1";

        case 1:
            return "mosca2";

        case 2:
            return "mosca3";
    }
}

// Lado aleatório
function ladoAleatorio() {

    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return "ladoA";

        case 1:
            return "ladoB";
    }
}

// Criar moscas automaticamente
var criaMosca = setInterval(function () {
    posicaoRandomica();
}, criaMoscartempo);
