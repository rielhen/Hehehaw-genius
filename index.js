var podeJogar = false;
var indiceJogador = 0;

//anota tecla pressionada
$(".vermelho").click(function() {
  console.log("vermelho clicado!");
});

$(".verde").click(function() {
  console.log("verde clicado!");
});

$(".amarelo").click(function() {
  console.log("amarelo clicado!");
});

$(".azul").click(function() {
  console.log("azul clicado!");
});

//Adiciona animação ao botão pressionado
$(document).ready(function() {
    $('.btn').click(function() {

        $(this).addClass('pressed');
      
          setTimeout(() => {
        $(this).removeClass('pressed');
      }, 100);

    });
  });

//adiciona som ao botão pressionado
$(document).ready(function(){
  $(".btn").click(function(){
    var btnID = $(this).attr('id');
    som(btnID);
  });
});

//estrutura switch para o som
function som (key){
  switch(key){
    case "verde":
      var verde = new Audio ("./audios/verde.mp3");
      verde.play();
      break;

    case "amarelo":
      var amarelo = new Audio ("./audios/amarelo.mp3");
      amarelo.play();
      break;

    case "vermelho":
      var vermelho = new Audio ("./audios/vermelho.mp3");
      vermelho.play();
      break;
    
    case "azul":
      var azul = new Audio ("./audios/azul.mp3");
      azul.play();
      break;
  
    default:
      console.log(key);
    }
}

//cria a sequência aleatória
var cores = ["azul","verde","amarelo","vermelho"];
var sequencia = [];

function ordem(){
  var indexAleatorio= Math.floor(Math.random()*4);
  sequencia.push(cores[indexAleatorio]);
  console.log ("Sequencia atual:",sequencia);
}

//acende os botões de acordo com a ordem
function tocarSequencia() {
  podeJogar = false;
  var i = 0;

  var intervalo = setInterval(function () {
    if (i >= sequencia.length) {
      clearInterval(intervalo);
      podeJogar = true;
      indiceJogador = 0;

     
      $("h1").text("Sua vez!");

      return;
    }

    var corAtual = sequencia[i];
    $("#" + corAtual).addClass("pressed");
    som(corAtual);

    setTimeout(function () {
      $("#" + corAtual).removeClass("pressed");
    }, 500);

    i++;
  }, 800);
}


//Acompanha os cliques do jogador
var indiceJogador = 0;

$(".btn").click(function() {
  if (!podeJogar) return; // ignora cliques precoces

  var corClicada = $(this).attr("id");


  $(this).addClass("pressed");
  som(corClicada);
  setTimeout(() => $(this).removeClass("pressed"), 100);

  //checa se a cor está certa
  if (corClicada === sequencia[indiceJogador]) {
    indiceJogador++;

    if (indiceJogador === sequencia.length) {
      podeJogar = false;
      setTimeout(proximaRodada, 1000);
    }
  } else {
  
// jogador errou
$("body").addClass("game-over");
setTimeout(() => $("body").removeClass("game-over"), 200);
var erro = new Audio("./audios/errado.mp3");
erro.play();


$("h1").html("Você errou!<br>Pontuação Final: " + sequencia.length + "<br>Pressione A para começar");

// reseta o jogo
indiceJogador = 0;
sequencia = [];
podeJogar = false;
  }
});

//roda proxima rodada
function proximaRodada() {
  $("h1").text("Preste atenção na sequência...");
  ordem();           
  tocarSequencia(); 
  setTimeout(() => {
  }, sequencia.length * 800 + 200); 
}

//começa o jogo com tecla pressionada
$(document).keypress(function(event) {
  if (event.key.toLowerCase() === "a" && sequencia.length === 0) {
    $("h1").text("Jogo iniciado!");
    proximaRodada();
  }

});

var podeJogar = false;


