//13.- Crea un script que compruebe si los paréntesis introducidos en una cadena de texto son 
// correctos. Ejemplo válido : Pepito (  (Sanchez) y ) Alvarez 
// Pero si tecleamos : Jose ( luis )) Perales y (( Perales ) 
// será incorrecto. 

function _verifica (texto){ // esta funcion verifica si Pepito (  (Sanchez) y ) Alvarez // ES FUNCIONAL PERONO RESUELVE EL PROBLEMA PLANTEADO
		document.write(texto.length);

		var h=0; var f=0;

		
		for (var x=0;x<texto.length;x++){
			 if (texto[x]=="\("){
			 	h++;
			 }
			 if (texto[x]=="\)"){
			 	f++;
			 }
		}

		for (var x=0;x<texto.length;x++){
			 
			}
		

		var check=(h+f)%2;

		if (check!=0){

			document.write("la cadena "+texto+" es erronea(revisa los parentesis");
		} else {
		   document.write("la cadena "+texto+" es correcta( ok parentesis");

		}

}

function _verifica2(texto){
	// http://regexr.com/
	// var expresion_regular1=/\(\([a-zA-Z0-9]+\)/g; // valida ((pepe)
	// var expresion_regular2=/\([a-zA-Z0-9]+\)\)/g; // valida (pepe))
	// var expresion_regular3=/\(\s*\(\s*[a-zA-Z0-9]+\)/g; // valida ( (pepe)
	var expresion_regular3=/\(\s*\(\s*[A-Za-z0-9]*\s*\)\s*\w*\s*\)/g; // valida ( ( pe83pe) y )
    var verify = (expresion_regular3.test(texto)) ?  true: false; 

     //  document.write(verify);

    if (verify = true) {
    	document.write("la cadena "+texto+" es correcta( ok parentesis");
    } else {
    	
    	document.write("la cadena "+texto+" es erronea(revisa los parentesis");

    } 

  


}



/* /\(\s*\(\s*[a-zA-Z0-9]+\)\s*\w*\s*\)/g;
\( Escaped character. Matches a "(" character (char code 40).
\s Whitespace. Matches any whitespace character (spaces, tabs, line breaks).
* Star. Match 0 or more of the preceding token.
\( Escaped character. Matches a "(" character (char code 40).
\s Whitespace. Matches any whitespace character (spaces, tabs, line breaks).
* Star. Match 0 or more of the preceding token.
[ Character set. Match any character in the set.
\w Word. Matches any word character (alphanumeric & underscore).
* Character. Matches a "*" character (char code 42).
\d Digit. Matches any digit character (0-9).
* Character. Matches a "*" character (char code 42).
]
+ Plus. Match 1 or more of the preceding token.
\) Escaped character. Matches a ")" character (char code 41).
\s Whitespace. Matches any whitespace character (spaces, tabs, line breaks).
* Star. Match 0 or more of the preceding token.
\w Word. Matches any word character (alphanumeric & underscore).
* Star. Match 0 or more of the preceding token.
\s Whitespace. Matches any whitespace character (spaces, tabs, line breaks).
* Star. Match 0 or more of the preceding token.
\) Escaped character. Matches a ")" character (char code 41). 
*/


/*

Character classes
.	any character except newline
\w \d \s	word, digit, whitespace
\W \D \S	not word, digit, whitespace
[abc]	any of a, b, or c
[^abc]	not a, b, or c
[a-g]	character between a & g
Anchors
^abc$	start / end of the string
\b \B	word, not-word boundary
Escaped characters
\. \* \\	escaped special characters
\t \n \r	tab, linefeed, carriage return
\u00A9	unicode escaped ©
Groups & Lookaround
(abc)	capture group
\1	backreference to group #1
(?:abc)	non-capturing group
(?=abc)	positive lookahead
(?!abc)	negative lookahead
Quantifiers & Alternation
a* a+ a?	0 or more, 1 or more, 0 or 1
a{5} a{2,}	exactly five, two or more
a{1,3}	between one & three
a+? a{2,}?	match as few as possible
ab|cd	match ab or cd





*/