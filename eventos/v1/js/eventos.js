var contador1=0;
var contador2=0;
var data;

init();

function init(){ // FUNCION INICIA PROGRAMA

		checkwebstorage(); // tenemos algo?
        setInterval(mover,100); // cada x tiempo detectamos si pulsacion




        /* añadimos event listener */
        var box1 = document.getElementById('box1');
        var box2 = document.getElementById('box2');

        	if (window.addEventListener){ // si no es iexplorer <9
						box1.addEventListener("mouseover",selected,false);	
						box2.addEventListener("mouseover",selected,false);


					} else {
						box1.attachEvent("onmouseover",selected);
						box2.attachEvent("onmouseover",selected);
					}

		data=box1; anuncio();
		data=box2; anuncio();
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
			console.log("no webstorage no party");
		}
	}

			
function selected(evento){
			aux = evento.target || evento.srcElement; 
			if(aux.id!="" &&  aux!=undefined){
				data=aux;
			}
			console.log(data.id);
			
}

function mover(){
			
			if(data!=undefined &&  (data.id!="box1" || data.id!="box2")){
				document.body.onkeydown=function(e){
                                switch(e.keyCode){
                                    case 187: // +
                                        e.preventDefault(); historico();
                                         if(data.id=="box1"){
                                         	contador1++;
                                         }

                                         if(data.id=="box2"){
                                         	contador2++;
                                         }
                                         
                                        break;
                                    case 189: // -
                                        e.preventDefault(); historico();

                                       
		                                     if(data.id=="box1" && contador1>0){
	                                         	contador1--;
	                                         }

	                                         if(data.id=="box2" && contador2>0){
	                                         	contador2--;
	                                         }
                                        	 
                                        break;
                                    
                                }
                };

       			 document.body.onkeyup=function(e){
                    
                                switch(e.keyCode){


                                	case 187: // +
                                        e.preventDefault();
                                        
                                        break;
                                   case 189: // -
                                        e.preventDefault();
                          
                                        break;
                                      
                                }
                };
             anuncio(); // llamada a mostrar valores

            }

        localStorage.setItem("box1", contador1);
        localStorage.setItem("box2", contador2);
      
        
}

function anuncio(){
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

  function historico(){
  	 var aux = 0;
  	 var newItem;
  	 var textnode;
  	 var list;
  	if(data!=undefined && data!=null){
	  	if(data.id=="box1"){
	  		aux=contador1;

	  		 newItem = document.createElement("p");
		  	 textnode = document.createTextNode(aux);
		     newItem.appendChild(textnode);

		     list = document.getElementById("msg1");
		     list.insertBefore(newItem, list.childNodes[0]);
		      if(list.childNodes[5]){
			         list.removeChild(list.childNodes[5]);
			   }

	  	}

	  	 if(data.id=="box2"){
	  		aux=contador2;

	  		 newItem = document.createElement("p");
		  	 textnode = document.createTextNode(aux);
		     newItem.appendChild(textnode);

		     list = document.getElementById("msg2");
		     list.insertBefore(newItem, list.childNodes[0]);
		     if(list.childNodes[5]){
			         list.removeChild(list.childNodes[5]);
			   }

	  	}

  	}
  
}