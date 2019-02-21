/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};
var click=0	;
var select;
/*

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
this.cards = [];
this.sprites = ["8-ball","potato","dinosaur","kronos","rocket","unicorn","guy","zeppelin"];
this.dificultad=2;
this.gs=gs;
this.state="MemoryGame"
this.win=0;
this.loop= function() {
	var aux=this;
	setInterval(function(){
		aux.pinta();}, 16);
};
this.reparte= function() {
	var mazo = [this.dificultad,this.dificultad,this.dificultad,this.dificultad,this.dificultad,this.dificultad,this.dificultad,this.dificultad];
	cont=this.sprites.length *this.dificultad;
	var act;
	while (cont!=0) {
		act=Math.floor((Math.random() * 10))%8;
		if(mazo[act]>0){
			this.cards.push(new MemoryGameCard(this.sprites[act]));
			mazo[act]--;
			cont--;
		} 	
	}
};
this.pinta= function() {
	let i;
	this.gs.drawMessage(this.state+" clicks :"+click);
	for (i=0;i<this.cards.length;i++) { 
		this.cards[i].draw(i,this.gs);
	}
};

this.initGame= function() {
	this.reparte();
	this.loop();
	//this.pinta();
	};
this.onClick= function(card) {
	if (card<this.cards.length&&card>=0&&card!=null){
		if(this.cards[card].state=="boca abajo"){
			click++;
			if (click%2==1){			
				select=card;
				this.cards[card].flip();
			}
			else{
				if(this.cards[card].compareTo(this.cards[select])){
					this.cards[card].found();
					this.cards[select].found();
					
					this.win++;
					if(this.win==8)
						this.state="YOU WIN!!";
					
					else
						this.state="found!";
				}
				else{
					this.cards[card].flip();
					let carta =card;
					let carta2=select;
					let aux1=this.cards[card];
					let aux2=this.cards[select];
					let gs=this.gs;
					this.state="try again";
					setTimeout(function(){
						aux1.flip();
						aux2.flip();  
						}, 250);
					}				
				}
			}
		};
	}
};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
this.sprite=id;
this.state="boca abajo";
this.draw=function(i,gs) {
	if(this.state=="boca abajo")
			gs.draw("back",i);
		
		else
			gs.draw(this.sprite,i);
};
this.flip=function() {
	if(this.state=="boca abajo")
		this.state="boca arriba";
	else
		this.state="boca abajo";
	};
this.found=function() {
	this.state="encontrada";
	};
this.compareTo=function(otherCard) {
	if(this.sprite==otherCard.sprite && this.state!="encontrada")
		return true;
	else
		return false;
	};
};

