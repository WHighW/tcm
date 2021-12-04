var tabuleiro = "<table id='t1' style='background-color:#3f9b0b; border-collapse: collapse;' align=center border=1>";
var infoPontos = document.getElementById('pontuacao');
for (x = 0; x < 10; x++) {
    tabuleiro += "<tr>";
    for (y = 0; y < 10; y++) {
        tabuleiro += "<td id=td" + x + "_" + y + " style='width:30px; height:30px;'> </td>";
    }
    tabuleiro += "</tr>";
}
tabuleiro += "</table>";
document.getElementById('principal').innerHTML = tabuleiro;
cobra = [
    [5, 0]
];
direcao = 2;
vivo = true;

function desenhapedaco(x, y) {
    document.getElementById('td' + x + '_' + y).style.background = "#206B39";
}

function apagapedaco(x, y) {
    document.getElementById('td' + x + '_' + y).style.background = "#3f9b0b";
}

function geramaca() {
    mx = parseInt(Math.random() * 10)
    my = parseInt(Math.random() * 10)
    document.getElementById('td' + mx + '_' + my).style.background = "#ff3333";
}

function pontuou(x, y) {
    infoPontos.innerHTML = 'Pontuação: \n' + (cobra.length - 1) + ' quadrado!';
}

function anda() {
    apagapedaco(cobra[cobra.length - 1][0], cobra[cobra.length - 1][1]);
    if (mx == cobra[0][0] && my == cobra[0][1]) {
        geramaca();
        cobra[cobra.length] = [10, 10];
        pontuou();
    }
    for (x = cobra.length - 1; x > 0; x--) {
        cobra[x][0] = cobra[x - 1][0];
        cobra[x][1] = cobra[x - 1][1];
    }
    if (direcao == 0) cobra[0][1]--;
    if (direcao == 1) cobra[0][0]--;
    if (direcao == 2) cobra[0][1]++;
    if (direcao == 3) cobra[0][0]++;
    if (cobra[0][0] < 0 || cobra[0][1] < 0 || cobra[0][0] > 9 || cobra[0][1] > 9) {
        vivo = false;
    }
    for (x = 1; x < cobra.length; x++) {
        if (cobra[x][0] == cobra[0][0] && cobra[x][1] == cobra[0][1]) vivo = false;
    }
    if (vivo) {
        desenhapedaco(cobra[0][0], cobra[0][1]);
        setTimeout('anda();', 300);
    } else {
        alert('Você perdeu, tente novamente\nVocê pegou ' + (cobra.length - 1) + ' quadrado');
        document.getElementById('message').innerHTML = "<div id='reiniciar' style='position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);'><input style='cursor:pointer; font-size:50px;' type='button' value='Reiniciar'</div>";
        document.getElementById('reiniciar').addEventListener("click", reiniciar);
    }
}

function start() {
    document.getElementById('iniciar').style.display = "none";
    pontuou();
    geramaca();
    anda();
}

function reiniciar(){
    window.location.reload();
}

function pegadirecao(tecla) { //alert(tecla);
    if (tecla == 37) direcao = 0;
    if (tecla == 38) direcao = 1;
    if (tecla == 39) direcao = 2;
    if (tecla == 40) direcao = 3;
}