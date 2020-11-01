function start() { // Inicio da função start()

	$("#inicio").hide();
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");


	//Principais variáveis do jogo
	var pontos=0;
	var salvos=0;
	var perdidos=0;
	
	var podeAtirar=true;
	var fimdejogo=false;	
	var jogo = {}
	var TECLA = {
		upArrow: 38,
		downArrow: 40,
		S: 83  
	}

	jogo.pressionou = [];

	var velocidade=6;
	var posicaoY = parseInt(Math.random() * 334);
	


	
	
	//Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
		});
	
	
		$(document).keyup(function(e){
		   jogo.pressionou[e.which] = false;
		});
	


//Game Loop

jogo.timer = setInterval(loop,30/*milessegundos*/);

function loop() {

movefundo();
movejogador();
moveinimigo1() 
moveinimigo2();
moveamigo();
colisao();
placar()


} // Fim da função loop()


//Função que movimenta o fundo do jogo
	
function movefundo() {
	
	esquerda = parseFloat($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-1/*px*/);
	
	} // fim da função movefundo()

	
	function movejogador() {
	
	if (jogo.pressionou[TECLA.upArrow]) {
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-6);

		if (topo<=4) {
		
			$("#jogador").css("top",topo+0);
		}

	}
	
	if (jogo.pressionou[TECLA.downArrow]) {
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+6);

		if (topo>=430) {	
			$("#jogador").css("top",topo-0);
				
		}

		
		
	}
	
	if (jogo.pressionou[TECLA.S]) {
		
		disparo()//Chama função Disparo	
	}

	} // fim da função movejogador()


	function moveinimigo1() {

	posicaoX = parseInt($("#inimigo1").css("left"));
	$("#inimigo1").css("left",posicaoX-velocidade);
	$("#inimigo1").css("top",posicaoY);
		
		if (posicaoX<=0) {
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",689);
		$("#inimigo1").css("top",posicaoY);
			
		}
} //Fim da função moveinimigo1()



function moveinimigo2() {
	posicaoX = parseInt($("#inimigo2").css("left"));
$("#inimigo2").css("left",posicaoX-2);
			
	if (posicaoX<=0) {
		
	$("#inimigo2").css("left",775);
				
	}
} // Fim da função moveinimigo2()


function moveamigo() {
	
	posicaoX = parseInt($("#amigo").css("left"));
	$("#amigo").css("left",posicaoX+4);
				
		if (posicaoX>906) {
			
		$("#amigo").css("left",0);
					
		}

} // fim da função moveamigo()


function disparo() {
	
	if (podeAtirar==true) {
		
	podeAtirar=false;
	
	topo = parseInt($("#jogador").css("top"))
	posicaoX= parseInt($("#jogador").css("left"))
	tiroX = posicaoX + 194;
	topoTiro=topo+41;
	$("#fundoGame").append("<div id='disparo'></div");
	$("#disparo").css("top",topoTiro);
	$("#disparo").css("left",tiroX);
	
	var tempoDisparo=window.setInterval(executaDisparo, 30);
	
	} //Fecha podeAtirar
 
   	    function executaDisparo() {
	    posicaoX = parseInt($("#disparo").css("left"));
	    $("#disparo").css("left",posicaoX+25); 

        		if (posicaoX>900) {
						
			window.clearInterval(tempoDisparo);
			tempoDisparo=null;
			$("#disparo").remove();
			podeAtirar=true;
					
                   }
	} // Fecha executaDisparo()
} // Fecha disparo()


function colisao() {
	var colisao1 = ($("#jogador").collision($("#inimigo1")));
	var colisao2 = ($("#jogador").collision($("#inimigo2")));
	var colisao3 = ($("#disparo").collision($("#inimigo1")));
	var colisao4 = ($("#disparo").collision($("#inimigo2")));
	var colisao5 = ($("#jogador").collision($("#amigo")));
	var colisao6 = ($("#inimigo2").collision($("#amigo")));
	
	// jogador com o inimigo1
			
		if (colisao1.length>0) {
			
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X,inimigo1Y) ;
		
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
			}
	   
		
			// jogador com o inimigo2 
		if (colisao2.length>0) {
	
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao2(inimigo2X,inimigo2Y);
					
			$("#inimigo2").remove();
				
			reposicionaInimigo2();
				
			}	
		

			// Disparo com o inimigo1
		
		if (colisao3.length>0) {
			
			pontos=pontos+100;
		
		
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));

			explosao1(inimigo1X,inimigo1Y);
			$("#disparo").css("left",950);

			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);

			}

			// Disparo com o inimigo2
		
		if (colisao4.length>0) {
			
			pontos=pontos+50;
			
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			
			
			explosao2(inimigo2X,inimigo2Y);
			$("#disparo").css("left",950);
			$("#inimigo2").remove();
			
			reposicionaInimigo2();

			}
			// jogador com o amigo
		
		if (colisao5.length>0) {
			salvos++;
			reposicionaAmigo();
			$("#amigo").remove();

			}
	
		
		
			//Inimigo2 com o amigo

		if (colisao6.length>0) {
			
			perdidos++;

			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosao3(amigoX,amigoY);
			$("#amigo").remove();

			reposicionaAmigo();

			}

	} //Fim da função colisao()
	
		
	
	//Explosão 1		

	function explosao1(inimigo1X,inimigo1Y) {
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		var div=$("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:50}, "slow");
		
		var tempoExplosao=window.setInterval(removeExplosao, 750);
		
			function removeExplosao() {
				
				div.remove();
				window.clearInterval(tempoExplosao);
				tempoExplosao=null;
				
			}
			
		} // Fim da função explosao1()
	

		
	
	//Reposiciona Inimigo2
	
	function reposicionaInimigo2() {
	
		var tempoColisao4=window.setInterval(reposiciona4, 5000);
			
			function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4=null;
				
				if (fimdejogo==false) {
				
				$("#fundoGame").append("<div id=inimigo2></div");
				
				}
				
			}	
		}	
	
	
	//Explosão2
	
	function explosao2(inimigo2X,inimigo2Y) {
	
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		var div2=$("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao2=window.setInterval(removeExplosao2, 750);
		
			function removeExplosao2() {
				
				div2.remove();
				window.clearInterval(tempoExplosao2);
				tempoExplosao2=null;
				
			}
			
			
		} // Fim da função explosao2()

		
//Reposiciona Amigo
	
	function reposicionaAmigo() {
	
	var tempoAmigo=window.setInterval(reposiciona6, 6000);
	
		function reposiciona6() {
		window.clearInterval(tempoAmigo);
		tempoAmigo=null;
		
		if (fimdejogo==false) {
		
		$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
		
		}
		
	}
	
} //Fim da função reposicionaAmigo() 

//Explosão3
	
function explosao3(amigoX,amigoY) {
	$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
	$("#explosao3").css("top",amigoY);
	$("#explosao3").css("left",amigoX);
	var tempoExplosao3=window.setInterval(resetaExplosao3, 750);
	function resetaExplosao3() {
	$("#explosao3").remove();
	window.clearInterval(tempoExplosao3);
	tempoExplosao3=null;
			
	}
	
	} // Fim da função explosao3


	function placar() {
	
		$("#placar").html(`<h2> Pontos: ${pontos}  Salvos: ${salvos}  Perdidos: ${perdidos} </h2>`);
		
	} //fim da função placar()

} // Fim da função start




