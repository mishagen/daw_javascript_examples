// 3. Crea una función que reciba un parámetro, un precio, y devuelva el precio con IVA incluido,
// suponiendo que el IVA es 21%. Deberá devolver el resultado con 2 decimales.. 

// 4. Crea una función que reciba dos parámetros, precio e IVA, y devuelva el precio con el IVA
// indicado. Deberá devolver el resultado con 2 decimales.

// 5.- Modifica la función anterior de forma que si no se envía el segundo parámetro a la misma,
// el valor por defecto del iva sea del 10%.



function _iva21 (input){

	var valor = 1.21;

	input = parseFloat(input).toFixed( 2 ); // nos aseguramos que es un float  con precisión de dos decimales;)

	var cal = input*1.21;
	alert ("precio con IVA:"+cal);
	
}


function _iva (input, iva){
	
	iva = parseInt(iva);
	input = parseFloat(input);
	iva = (iva/100)+1;

	var cal = input*iva;
	cal= parseFloat(cal).toFixed( 2 ); // nos aseguramos que es un float  con precisión de dos decimales;)
	
	alert ("precio con IVA:"+cal);

}


function _ivafix (input, iva){

	if(iva == "") {
		iva=10;	
	}
	_iva(input,iva);

		
}


