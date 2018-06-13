// 11.- Realizar un programa que nos muestre por pantalla los 5 últimos números 
// de entre dos dados(Se inicializarán dos variables).

function _keygen (size){

var dictionary = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','w','x','y','z','#','-','@',0,1,2,3,4,5,6,7,8,9,10];




size=_verifica(size);

// generar bucle n repeticiones que devuelva el valor de posiciones aleatorias dentro del array. 

for (var y=0;y<size; y++){
var x=_alea(dictionary);
//document.write(x); 
document.write(dictionary[x]);
}




}

function _verifica(size){ // funcion verifica si longitud asignada usuario es mayor que 8. Por defecto aplicará ese valor.
		if(size<8 ){
			alert("la longitud debe ser mayor o igual a 8 caracteres");
		 	 size=8;
		 		
		} return size;		 	
}


function _alea(dictionary){ // funcion genera numero tomando como valor max la longitud del array
	// Math.round(Math.random()*(b-a)+parseInt(a));
   var valor = Math.floor((Math.random() * (dictionary.length-1)) + 0);
   valor = parseInt(valor);
   return valor;
}
 



