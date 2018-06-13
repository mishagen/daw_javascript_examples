
// --------------------------------------------------------------
// Torres de Hanoi JS 0.9
//
//   Autor:     Miguel Parada VÃ¡zquez
//   Ult. Mod.: 2016/11/18
//
// --------------------------------------------------------------
// <gpl>
//
// Copyright (C) 2016  Miguel Parada VÃ¡zquez

// Este programa es software libre; puede distribuirlo y/o
// modificarlo bajo los terminos de la Licencia Publica General
// GNU tal como ha sido publicada por la Fundacion para el
// Software Libre; ya sea la version 2 de la Licencia, o (a su
// conveniencia) cualquier version posterior.
// 
// Este programa es distribuido con la esperanza de ser util, pero
// SIN GARANTIA ALGUNA; sin siquiera la garantia implicita de
// COMERCIALIZACION o de APTITUD PARA UN PROPOSITO ESPECIFICO.
// Consulte la Licencia Publica General GNU para mayores detalles.
// 
// Puede obtener una copia de la Licencia Publica General GNU
// desde:
//     http://www.gnu.org/copyleft/gpl.es.html
//
// ----
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation; either version 2 of
// the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You can obtain a copy of the GNU General Public License from:
//     http://www.gnu.org/copyleft/gpl.html
// 
// </gpl>
// --------------------------------------------------------------

// --------------------------------------------------------------
//		DECLARACION DE VARIABLES
// --------------------------------------------------------------

var torres = [], aux = []; //array asociativo (torre[1],torre[2],torre[3]) que contendrÃ¡ objetos fichas.


var condicion;
var findejuego;

var ficha1 = new ficha(80,'ficha');
var ficha2 = new ficha(100,'ficha');
var ficha3 = new ficha(120,'ficha');
var ficha4 = new ficha(140,'ficha');
var ficha5 = new ficha(160,'ficha');


// --------------------------------------------------------------
// 		FUNCIONES 
// --------------------------------------------------------------
function ficha(size,type) { // constructor fichas
	this.size = size;
	this.type = type;
}

function inicio(){ // iniciamos. ponemos todas las fichas en la torre1. 
	torres[1] = [ficha5,ficha4,ficha3,ficha2,ficha1];
	torres[2] = [];
	torres[3] = [];
	aux[1] = []; // actuarÃ¡ como auxiliar
	findejuego=false; // si true juego terminado
	dibuja();
}


function dibuja(){ // dibuja fichas en pantalla. 
	 if (aux[1] != ''){
	 	
	 	document.getElementById('cabeza').innerHTML = '<div class="'+aux[1][0].type+'" style="width:'+aux[1][0].size+'px;"></div>';
	 } else {
	 	document.getElementById('cabeza').innerHTML = '';
	 }

	 for (var m=1; m<4; m++){

	 	var torre = "torre";
	 	torre = torre.concat(m);

	 	if (torres[m]){
	 	var msg; var space = 270-(torres[m].length*34);
	 	var out='<div class="titulo" onclick="torre('+m+')">Torre '+m+'</div><div class="recheo" style="height:'+space+'px;"></div>'; 
	 	for(var x=torres[m].length-1; x>=0;x--){
	 		msg = '<div class="'+torres[m][x].type+'" style="width:'+torres[m][x].size+'px;"></div>';
	 		out = out.concat(msg);
	 		
	 	}
	 	document.getElementById(torre).innerHTML = out; 
	 	
	 	} else {
	 	document.getElementById(torre).innerHTML = '<div class="titulo" onclick="torre('+m+')">Torre '+m+'</div><div class="recheo" style="height:200px;"></div>';
	 	} 
	}
}


function torre(n){ // funcion procesa ficha top de la torre seleccionada.
	if (!findejuego){
		mensaje(0);

		var x = torres[n].length-1;

		if (torres[n].length !=0 ){ // si torre[n] tiene fichas...
			cabeza(n);
			
		} else {

			if (torres[n].length==0 && aux[1].length==0){ // si torre[n] no tiene fichas y no hay fichas en aux
				mensaje (1);
			}

			if (torres[n].length==0 && aux[1].length!=0){	// si torre[n] no tiene fichas y hay fichas en aux
				torres[n].push(aux[1].pop());
				}
		}
	}
	dibuja();
}


function cabeza(n){ // funcion con la lÃ³gica de juego
	
	condicion = (aux[1].length!=0 && torres[n].length!=0)? 1: 2; // segÃºn el momento de juego irÃ¡ a uno u otro encaminamiento.

	switch (condicion) {

			case 1: // movimiento 1. mueve ficha elejida de cachÃ© a torre si se cumple condicion.  
				
					if(aux[1][0].size < torres[n][torres[n].length-1].size){ 
						torres[n].push(aux[1].pop());
					} else {
						mensaje(2);
					}
			break;
			case 2: // movimiento 2. mueve de torre a cachÃ©.
					
					aux[1].push(torres[n].pop());
				
			break;
	} 
	

	if (torres[3].length==5){ // comprobar si juego terminado?
			findejuego=true;
			mensaje(5);
	}
	dibuja();

}

function mensaje(n){ // mensajes que se mostrarÃ¡n durante le juego.
		switch (n) {

			case 0: 
				document.getElementById('mensaxes').innerHTML = "";
			break;
			case 1: 
				document.getElementById('mensaxes').innerHTML = "La torre de origen estÃ¡ vacia";
			break;

			case 2: document.getElementById('mensaxes').innerHTML =  "Movimiento no permitido";
			break;

			case 5: document.getElementById('mensaxes').innerHTML =  'Â¡Felicidades! Juego terminado.<br><button  onclick="inicio()" type="button">Volver a jugar</button>';
			break;
			} 
}







