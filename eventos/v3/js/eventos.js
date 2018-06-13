var contador1=0;
var contador2=0;
var data;
var log=[];



init();



function init(){ // FUNCION INICIA PROGRAMA

		checkwebstorage(); // tenemos algo?
       //  setInterval(mover,100); // cada x tiempo detectamos si pulsacion




        /* añadimos event listener */
        var box1 = document.getElementById('box1');
        var box2 = document.getElementById('box2');
        var msg = document.getElementById('msg');

        	if (window.addEventListener){ // si no es iexplorer <9
						box1.addEventListener("mouseover",selected,false);	
						box2.addEventListener("mouseover",selected,false);
						msg.addEventListener("keypress", mover,false);


					} else {
						box1.attachEvent("onmouseover",selected);
						box2.attachEvent("onmouseover",selected);
						msg.attachEvent("onkeypress", mover);
					}

		data=box1; printer();
		data=box2; printer();
		data=undefined;
}


function checkwebstorage(){ // FUNCION DETECTA SI EXISTE INFORMACION ALMACENADA EN WEBSTORAGE Y CONSULTA SU VALOR INVOCANDO A GETCOOKIE

		if(localStorage){
			if(localStorage.getItem("box1")){
			contador1 = localStorage.getItem("box1");
		 	} 
		 	if(localStorage.getItem("box2")){
			contador2 = localStorage.getItem("box2");
		 	} 


		} else {
			// console.log("no webstorage no party");
		}
	}

			
function selected(evento){
			var aux = evento.target || evento.srcElement; 
			if(aux.id!="" &&  aux!=undefined){
				data=aux;
			}
			console.log(data.id);
			
}

function mover(e){
			if(e.target || e.srcElement){ // es una pulsacion de teclado lo que mandamos? 
		
			if(e.keyCode){ e.preventDefault(); keyvalue = e.key; keycode = e.keyCode; }
			if(e.charCode){ e.returnValue = false; keyvalue = e.char; keycode = e.charCode; } // i.explorer 8 o
			console.log(keyvalue);
			// console.log(e.keyCode);

			if(data!=undefined &&  (data.id=="box1" || data.id=="box2")){
				// console.log(e.keyCode);
                                switch(keycode){
                                    case 43: // +
                                         // e.preventDefault(); 
                                         if(data.id=="box1"){
                                         	contador1++;
                                         }

                                         if(data.id=="box2"){
                                         	contador2++;
                                         }

                                        log.push(e.key);
                                        printer();
                                        break;

                                    case 45: // -
                                        // e.preventDefault(); 

                                       
		                                     if(data.id=="box1" && contador1>0){
	                                         	contador1--;
	                                         }

	                                         if(data.id=="box2" && contador2>0){
	                                         	contador2--;
	                                         }
	                                    log.push(e.key);
                                        printer();	 
                                        break;
                                }
            }
        }
          

        localStorage.setItem("box1", contador1);
        localStorage.setItem("box2", contador2);


        //  console.log(log.length);
        if(log.length>=6){
  			log.shift();
  		}

  		var msg = document.getElementById('msg');
  		    msg.value=log.toString();
      
        
}



function printer(){

  var aux = 0;
  var his;
  if(data!=undefined && data!=null){
	  	if(data.id=="box1"){
	  		aux=contador1;
	  	}

	  	 if(data.id=="box2"){
	  		aux=contador2;
	  	}
	  	
  		document.getElementById(data.id).innerHTML = "<h1>"+aux+"</h1>";

  		

  }

  
}