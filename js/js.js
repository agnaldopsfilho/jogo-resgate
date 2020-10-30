function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

	//Principais variáveis do jogo
	
var jogo = {}
var TECLA = {
	upArrow: 38,
	downArrow: 40,
	s: 83  
	}

	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
		});
	
	
		$(document).keyup(function(e){
		   jogo.pressionou[e.which] = false;
		});
	
//Game Loop

jogo.timer = setInterval(loop,5/*milessegundos*/);

function loop() {

movefundo();
movejogador();

} // Fim da função loop()


//Função que movimenta o fundo do jogo
	
function movefundo() {
	
	esquerda = parseFloat($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-0.5/*px*/);
	
	} // fim da função movefundo()

	
	function movejogador() {
	
	if (jogo.pressionou[TECLA.upArrow]) {
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-3);

	}
	
	if (jogo.pressionou[TECLA.downArrow]) {
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+3);	
	}
	
	if (jogo.pressionou[TECLA.S]) {
		
		//Chama função Disparo	
	}

	} // fim da função movejogador()



} // Fim da função start



