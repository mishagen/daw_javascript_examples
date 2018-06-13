// 7.- Crea una función que reciba como parámetro una cadena, que puede contener paréntesis, 
// y devuelva el texto que se encuentra entre los paréntesis (). Si no existen paréntesis devolverá 
// “”.  .



function _cadena(input){
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
	


