
var nota=0;
var cont=0;
var i=1;

/* Pograma javascript. 
* Dados 3 numeros calcular media y mostrar resultado.
*/


// Peticion de datos: utilizamos un do while para crear bucle que pida los 3 numeros. 
do {
	var data = prompt("Indica nota"+i); // pedimos dato
		

		if(data != null){
 
				if (isNaN(data)!=true){ // usamos isNaN para verificar que introducimos un valor.
						// parseamos a valor INT y asi filtramos posible basura de string
						nota+=parseInt(data);    // sumamos valores
						cont++;         // sumamos contador definimos while (cont<3)
						i++;            // nota 1, 2 ,3 ...
					} else {			// Si resulta NaN (vacio), entonces... 
						alert ("tienes que introducir un valor válido");
						cont=0;			// contador a "cero", volvemos a empezar
						i=1;
					}
	 } else {		// Si resulta NaN (vacio), entonces... 
	 				alert ("Operacion abortada");
					break;
					}

} while (isNaN(data)==true || cont<3);  // bucle condicion: Si introducimos valores numericos o contador <3 


// Resolvemos media.
if (true ) {
	var media = nota/cont; // divimos sumatorio de notas entre su numero de notas. 
	document.write("Media es " + nota + " entre " + cont+"?<br>");
	document.write("El resultado es " + media);
}