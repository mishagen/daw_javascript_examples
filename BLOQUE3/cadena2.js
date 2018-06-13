//  8.- Crea una función que reciba como parámetros una cadena y un número. Si el número es 
// 1, devolverá la parte de la cadena que se encuentra entre paréntesis. Si el número es un 2, 
// devolverá la parte de la cadena que se encuentra entre los signos < y >. Por defecto, si no se 
// introduce el segundo parámetro, deberá buscar lo que se encuentre entre paréntesis.



function _cadena(input){
   alert("cadena1");

   document.write("La cadena es: "+ input+"<br>");

  // definicion variables. devuelven la posicion del caracter buscado dentro del string.
  var n = input.indexOf("\("); 
  var q = input.indexOf("\)");

  document.write("localizados parentesis en posiciones: "+n+","+q);
  document.write("<br>");


  // document.write(n+","+q);

  // pasamos string a array auxiliar
  var aux = input.split("");

  // recorremos array y mostramos caracteres entre posiciones n+1 y q-1
      for(i=n+1;i<q;i++){
        // document.write(input[i]+"<br>"); // @_@ funciona, por si acaso hacemos las cosas bien :)
        document.write(aux[i]+"<br>");
      }
}



function _cadena2(input,input2){
  alert("cadena2");

   document.write("La cadena es: "+ input+"<br>");

  // definicion variables. devuelven la posicion del caracter buscado dentro del string.
  var n = input.indexOf("\("); 
  var q = input.indexOf("\)");

  document.write("localizados parentesis en posiciones: "+n+","+q);
  document.write("<br>");


  // document.write(n+","+q);

  // pasamos string a array auxiliar
  var aux = input.split("");

  if (input2== 1) { //muestra lo que está dentro de los parentesis.

  // recorremos array y mostramos caracteres entre posiciones n+1 y q-1
      for(i=n+1;i<q;i++){
        // document.write(input[i]+"<br>"); // @_@ funciona, por si acaso hacemos las cosas bien :)
        document.write(aux[i]+"<br>");
      }
  } else { 

    for(i=0;i<n;i++){
        // document.write(input[i]+"<br>"); // @_@ funciona, por si acaso hacemos las cosas bien :)
        document.write(aux[i]+"<br>");
      }
     for(i=q+1;i<input.length;i++){
        // document.write(input[i]+"<br>"); // @_@ funciona, por si acaso hacemos las cosas bien :)
        document.write(aux[i]+"<br>");
      }

  }
}



function _verifica(input,input2){


  
       if(input2 == 1 || input2 == 2){
          _cadena2(input, input2);
        } else {
          _cadena(input);

        }
  
}





function _error(){

    document.write("error");
}

	


