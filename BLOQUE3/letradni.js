function _letradni (input){

	var dni;
	var letr;
	var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
	var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;


			input = input.toUpperCase();  //todo a mayusculas. así evitamos errores.
	


    		var verify = (expresion_regular_dni.test(input)) ?  true: false; //verificamos que cumple la expresión regular del DNI. usamos .test
 
    		dni = input.substr(0,input.length-1); // extraemos número mediante substr
    		dni = dni.replace('X', 0); // NIE? Usamos replace para que el calculo de la letra no se vea afectado. :)
        	dni = dni.replace('Y', 1); //
        	dni = dni.replace('Z', 2); //
            letr = input.substr(input.length-1,1); // extraemos letra. 

     	   	// var verificalong = (dni>=11111111 && dni<= 99999999)? true: false; // no hace falta verficiar por rango de valor. ya lo hacemos con la expresion regular. 

     	   	var operacion = (dni%23);

     	   	  if (letras[operacion] == letr && verify==true){
				   		alert("CALCULADO: "+letras[operacion]);
				   		
					   //alert(operacion);
				       
				   		alert ("DNI CORRECTO");
				   		
				   		
				   } else {
				   		
				   		alert("\"\"");
				   }




}

