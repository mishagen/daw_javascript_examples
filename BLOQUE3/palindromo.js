// 6.- Un palíndromo es una palabra, número o frase que se lee igual adelante que atrás. Ejemplo:
//rotor, salas...
//Implementar una función que reciba una cadena y compruebe si es palíndromo o no.
// Mostrará por pantalla la palabra introducida, la palabra al revés, y la conclusion en un alert.



function _palindromo (input){

 
  var resultado = "La cadena \""+input+"\" \n"; // variable resultado. Esto mostrará el texto el resltado concatenado con el final del la funcion.
 
  // Pasar a minusculas la cadena
  var cadenaOriginal = input.toLowerCase();
 
  // Convertir la cadena en un array
  var letrasEspacios = cadenaOriginal.split("");
 
  // Eliminar los espacios en blanco
  var cadenaSinEspacios = "";
	  for(i in letrasEspacios) {
	    if(letrasEspacios[i] != " ") {
	      cadenaSinEspacios += letrasEspacios[i];
	    }
  	}
 
  var letras = cadenaSinEspacios.split("");
  var letrasReves = cadenaSinEspacios.split("").reverse();
 
  // Este paso tambien es muy largo porque no se utiliza la sentencia "break"
  var iguales = true;

  
  for(i in letras) {
    if(letras[i] == letrasReves[i]) {
      // Todo bien
    }
    else {
      // Alguna letra es distinta, por lo que ya no es un palindromo
      iguales = false;
    }
  }
 
  if(iguales) {
    resultado += " es un palindromo";
   document.write(resultado);
  }
  else {
    resultado += " no es un palindromo";
     document.write(resultado);
  }
 
  // return resultado;
}
	


