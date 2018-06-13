// 9.- Crea una función que genere un número entero aleatorio entre min y max, que serán
// pasados como parámetros. Por defecto min = 1 y max = 100. Podrás utilizar esta función en
// los siguientes ejercicios
// 10.- Genera 100 números enteros aleatorios no repetidos entre 1 y 1000 y guardarlos en array. 
// Luego ordenalos y listalos para comprobar si están repetidos. 



function _alea(){ // funcion genera numero aleatorio de 1 a 100 
	// Math.round(Math.random()*(b-a)+parseInt(a));

   var valor = Math.round(Math.random()*(100-1)+parseInt(1));
   valor = parseInt(valor);
   return valor;
}


function _aleatoria(min,max){  // si min o max vacio llama a alea(); si no genera alea en rango soclitado.

   var valor;
  if (min=="" || max==""){
   alea();
} else {
   valor = Math.round(Math.random()*(max-min)+parseInt(min));
   valor = parseInt(valor);
}

  return valor;
  
}


//--------------------- exclusivo ejercicio 10 ----------------------------------------------

function _compare(lista,valor){ // funcion compara. Usa función de clase IndexOF. Si lo encuentra devuelve true.
	var aux = lista.indexOf(valor);
	var verify = true;

	if(aux!=0){
		verify = false;
	} else {
		verify =true;
	}
	
	return verify;
}


function _order(lista){

		lista.sort(function(a,b){ 
			return a - b
		    //return b - a
		})
	
}



function _read(lista){

	for (var x=0; x<lista.length;x++){
		document.write(lista[x]);
		document.write("<br>"); 	 
	}


}


function _bucle(){	//bucle  genera lista 100 numeros aleatorios diferentes entre 1 y 1000 y los guarda en un array
	var valor; 

	var lista = new Array(); // declaramos array.

	for (var i = 0; i<100; i++){ // iniciamos bucle for para que haga la operacion 100 veces. 
	// valor=_alea(); // llama a funcion _alea que devuelve numero aleatorio de 1 a 100.
	 valor = _aleatoria(1,1000); // lo mismo que lo anterior pero definiendo valor min y max

	if (_compare(lista,valor)!=true){
		lista.push(valor); //
		// document.write(valor+"/"+lista.length); 
	  // document.write("<br>"); 	 
	} else {
		i=i-1; // si valor encontrado forzamos a for a que repita el paso anterior.
	}
	
	
	
	}

	// document.write(_order(lista));
	// 
 
_order(lista);
_read(lista);
//document.write(lista);





/**

	for (var i = 0; i<100; i++){
		valor=_alea(); // llama funcion alea
		
		if (_compara(lista,valor)==false){
			lista.push(valor); //
		document.write(valor); 
		} else {
			i=lista.length();
		}
	}
 */
}




