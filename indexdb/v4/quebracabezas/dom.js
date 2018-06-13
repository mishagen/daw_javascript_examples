

/* declaracion de variables globales */

var elemento; // elemento del dom
var n_imaxen; // nueva imagen
var figuras = [
            '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',
            '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png',
            '17.png', '18.png', '19.png', '20.png', '21.png', '22.png','23.png','24.png','img.png'
            ]; 


var mapa; // será un array que determine donde está cada figura durante el juego
var solucion; // será un array que almacenará la solución del juego. 

var n_click=0; // numero de clicks durante el juego
var t_ini = 0; // tiempo inicial en milisegundos. Inicia en cero. 
var t_fin; // tiempo final
var display; // contador

var lim_col=5; // Columnas (5)
var lim_row=5; // Filas (5)

var dataBase; // conexion bbdd
var dbName; // nombre de la base de datos
var indexedDB; //
var loader = false ; // booleano. ¿recuperamos una pardida guardada? ;)
var n_saves = 0;  // numero de partidas salvadas. por defecto cero. 
var savegames = [] ; // array almacena nombre partidas. 

startDB(); // iniciamos bbdd ... 
   

var reload = function() {
  location.reload();
}

/* FIN declaracion de variables globales */
//--------------------------------------------------------------------------------------------------------


// metodos ------------------------------------------------------------------------------------------------ 
     
function startDB() { // funcion inicia conexion a bbdd 


                dbName="xogo";
               // nuestro navegador soporta indexedDB? 
                indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

                if (!window.indexedDB) {
                     window.alert("Your browser doesn't support a stable version of IndexedDB.");
                }




                // abrimos bbdd e indicamos versión. 
                dataBase = indexedDB.open(dbName, 1);
                
                dataBase.onupgradeneeded = function (e) { // si la base de datos no existe la creamos. 

                    active = dataBase.result;
                    
                    object = active.createObjectStore("partida", { keyPath : 'id', autoIncrement : true }); // 
                    // object.createIndex('by_id', 'id', { unique : true }); // nota unique nos asegura que no tendremos entradas duplicadas. 
                    object.createIndex('by_nome', 'nome', { unique : true });
                    // object.createIndex('by_xogada', 'xogada', { unique : false });

                };

                dataBase.onsuccess = function (e) {
                    console.info('Base de datos cargada correctamente');
                    count_saves(); // Tenemos partidas salvadas que podemos recuperar? 
                    // ¿tenemos partidas salvadas? // ACCEDEMOS BBDD PARA CONSULTAR ESTE DATO :)
                    /* var active = dataBase.result;
                    var transaction = active.transaction(['partida'], 'readonly');
                    var objectStore = transaction.objectStore('partida');
                    var myIndex = objectStore.index('by_id'); 
                    var countRequest = myIndex.count();
                      countRequest.onsuccess = function() {
                         n_saves = countRequest.result;
                         console.log("tenemos "+n_saves+" partidas salvadas"); 
                      };*/

                };
        
                dataBase.onerror = function (e)  {
                    console.log('Error cargando la base de datos');
                };
} // fin  startDB()





function gardar(){ // funcion agrega partida a bbdd.
                console.info('Gardando...');
                savegames.splice(0,savegames.length); // vaciamos array que usamos para guardar indices nome partida

                var nome;
                do {
                 nome = prompt ('Indica para gardar partida');
                 alert(nome);
                }  while ( nome == "" && nome == undefined && nome == null);

                if( nome != "" && nome != undefined && nome != null){
                var active = dataBase.result;
                var data = active.transaction(["partida"], "readwrite");
                var object = data.objectStore("partida");

                var request = object.put({ // registramos en bbdd datos de la partida
                    nome: nome,
                    tempo: t_fin,
                    n_click: n_click,
                    xogada: mapa
                });

                request.onerror = function (e) { // si hay un error lo mostramos por consola
                    console.error(request.error.name + '\n\n' + request.error.message);
                    alert('Xa existe unha partida gardada co mesmo nome');
                    gardar();
                };

                data.oncomplete = function (e) { // terminada la operacion continuamos tareas.
                  
                   n_saves = count_saves();  // cuantas partidas salvadas tenemos?
                  
                  //  console.dir(savegames);
                   // VOLVER 


                   // limpiamos nodos hijos del select para actualizar
                   select=document.getElementById("xogos");
                     while(select.hasChildNodes()){
                        select.removeChild(select.firstChild);
                     } 

                  // actualizamos select añadiendo los option necesarios
                  setTimeout(function(){
                      if(n_saves==0){
                        var option = document.createElement("option");
                          option.setAttribute("value", "");
                          option.setAttribute("disabled", true);
                          option.setAttribute("selected", true);
                          option.innerHTML = "Xogos gardados";
                          select.appendChild(option);

                      } else {

                      for (var j = 0; j <= n_saves; j++) {
                  
                      var option = document.createElement("option");
                     
                        if(j>0){
                            option.setAttribute("value", savegames[j-1]);
                                // nome = get_nome(j);    
                            //  option.innerHTML = "xogo gardado"+ j;
                             option.innerHTML = savegames[j-1];
                          
                         
                        } else { // si j es igual a cero añadimos un option vacio no seleccionable.
                           option.setAttribute("value", "");
                           option.setAttribute("disabled", true);
                           option.setAttribute("selected", true);
                           option.innerHTML = "Xogos gardados";
                        }
                     
                          select.appendChild(option);
                        
                        }

                      } // fin if (n_saves==0)


                  if (window.addEventListener){
                           select.addEventListener("change",cargar,false); 
                          } else {
                            // alert("explorer"+isIE);
                           select.attachEvent("onchange",cargar);
                          }


                  },400); // setTimeout

                   console.info('Save OK...');
                    

                };
              }
                     
}


function count_saves(){ // funcion cuenta numero de partidas.  
               //  savegames = null; // BORRAMOS ARRAY NOMBRE PARTIDAS SALVADAS:
                // savegames = [];

                

                var active = dataBase.result;
                /* var data = active.transaction(["partida"], "readonly");
                var object = data.objectStore("partida");

                var myIndex = object.index('by_id');
                
                var request = myIndex.count();
                 request.onsuccess = function() {
                    n_saves = request.result;
                    console.info("partidas guardadas: "+request.result);
                   
                 } */

                  var transaction = active.transaction(["partida"], "readonly");
                  var objectStore = transaction.objectStore("partida"); 
                  var count = objectStore.count();

                  count.onsuccess = function() {
                        // console.log(count.result);
                         n_saves = count.result;

                         for(var x=0; x<=n_saves; x++){
                            get_nome(x);
                         }

                         console.log("partidas guardadas: "+n_saves);  
                  };
}


function get_nome(i) { // funcion consulta en bbdd nome.  
          

                      var nome ="";
                      var active = dataBase.result;
                      var data = active.transaction(["partida"], "readonly");
                      var object = data.objectStore("partida");

                      var request = object.get(parseInt(i));

                      request.onsuccess = function () {
                          partida  = request.result;
                          if (partida !== undefined) {
                                // console.dir(partida);
                                // console.info(partida.nome);
                                 savegames.push(partida.nome);

                              
                             //   console.info('CONSUTA OK...');
                             //  return partida.nome;   
                          }
                      };


                    
              
                              
}
















function cargar() {

              // Obtener la referencia a la lista
              var lista = document.getElementById("xogos");
             
              // Obtener el índice de la opción que se ha seleccionado
              var indiceSeleccionado = lista.selectedIndex;
              // Con el índice y el array "options", obtener la opción seleccionada
              var opcionSeleccionada = lista.options[indiceSeleccionado];
             
              // Obtener el valor y el texto de la opción seleccionada
              var textoSeleccionado = opcionSeleccionada.text;
              var valorSeleccionado = opcionSeleccionada.value;
             
            // alert("Opción seleccionada: " + textoSeleccionado + "\n Valor de la opción: " + valorSeleccionado);



              setTimeout(function(){
                  if(confirm("Coidado!\n  Seguro que queres cargar esta partida?")){
                      var active = dataBase.result;
                      var data = active.transaction(["partida"], "readonly");
                      var object = data.objectStore("partida");
                      var index = object.index("by_nome"); // indice
                      var request = index.get(String(valorSeleccionado));

                     

                      request.onsuccess = function () {
                          partida  = request.result;
                          if (partida !== undefined) {
                             loader = true; // tenenemos una partida guardada. iniciamos transaccion!!! 
                             t_ini=Date.now()-partida.tempo;

                             n_click=partida.n_click;
                             mapa=partida.xogada.slice(0);
                             console.info('LOAD OK...');
                             console.log(partida.xogada);
                       
                              
                                clean(); 
                                setTimeout(function(){ iniciar(); mezclar(); },500); // esperamos 500 milisegundos para que clean() pueda hacer su trabajo.
                          }
                      };


                      request.onerror = function (e) {
                        console.error(request.error.name + '\n\n' + request.error.message);

                      };
                    }
               }, 400);                   
}


/* --------------------------------------------------------------------------------------------------------- */ 
 
function clean(){ // funcion limpiar DOM y añade botones basicos del juego.
        

     setTimeout(function(){ n_saves =  count_saves();}, 400); // consutamos numero partidas disponibles.


     setTimeout(function() {
         // limpiamos tablero de xogo
         elemento=document.getElementById("mensaxes");
         while(elemento.hasChildNodes()){
            elemento.removeChild(elemento.firstChild);
         } 
         // si existe un crono lo detenemos.
         if(display){
           clearInterval(display); 
         }
         
         

       // añadimos botones
       boton_ini=document.getElementById("inicio");

       if(boton_ini && !loader){ // si existe el boton inicio iniciamos juego y añadimos botones. 
        iniciar();

        if (window.addEventListener){
                         boton_ini.addEventListener("click",mezclar,false); 
                      } else {
                        // alert("explorer"+isIE);
                        boton_ini.attachEvent("onclick",mezclar.reload);
                      }


        var select = document.createElement("select");
                  select.setAttribute("name", "xogos");
                  select.setAttribute("id", "xogos");

                  if(n_saves==0){
                  var option = document.createElement("option");
                    option.setAttribute("value", "");
                    option.setAttribute("disabled", true);
                    option.setAttribute("selected", true);
                    option.innerHTML = "Xogos gardados";
                    select.appendChild(option);

                  } else {

                  for (var j = 0; j <= n_saves; j++) {
                  var option = document.createElement("option");
                   
                    if(j>0){
                            option.setAttribute("value", savegames[j-1]);
                                // nome = get_nome(j);    
                            //  option.innerHTML = "xogo gardado"+ j;
                             option.innerHTML = savegames[j-1];
                          
                         
                        } else { // si j es igual a cero añadimos un option vacio no seleccionable.
                           option.setAttribute("value", "");
                           option.setAttribute("disabled", true);
                           option.setAttribute("selected", true);
                           option.innerHTML = "Xogos gardados";
                        }
                    select.appendChild(option);
                  }
                  } // fin if

         if (window.addEventListener){
                       select.addEventListener("change",cargar,false); 
                      } else {
                        // alert("explorer"+isIE);
                       select.attachEvent("onchange",cargar);
                      }

     
            elemento=document.getElementById("listaxe");
            elemento.appendChild(select); 

        } else {
          console.log("no ini no cry");
        }
     }, 500);
     console.info(n_saves);
}



function iniciar(){ // inicio del juego
          console.info('Inicio juego...');
          solucion = figuras.slice(0); // array que almacenará la "solucion"
          
        
          if(!loader){
            n_click = 0; // si iniciamos juego nuevo el numero de clics inicial debe ser igual a cero. 
            mapa = figuras.slice(0); // array que almacenará el "tablero;
          } 
          
          dibujar(); // dibujamos tablero inicial          
}

function dibujar(){
           console.info('dibujando...');
          /* dibujamos el tablero, una tabla de 5 por 5 celdas */
          // --------------------------------------------------------------------------------
           var tablero =function (){


                        // Obtener la referencia del elemento donde crearemos la tabla.
                        elemento = document.getElementById("mensaxes");
                       
                        // Crea un elemento <table> y un elemento <tbody>
                        var tabla   = document.createElement("table");
                        var tblBody = document.createElement("tbody");
                       
                        // Crea las celdas
                        for (var i = 0; i < lim_col; i++) {
                          // Crea las columnas de la tabla
                          var columna = document.createElement("tr");
                       
                          for (var j = 0; j < lim_row; j++) {
                            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                            // texto sea el contenido de <td>, ubica el elemento <td> al final
                            // de la columna de la tabla
                            var celda = document.createElement("td");
                            // var textoCelda = document.createTextNode("celda en la columna "+i+", columna "+j);

                                var imaxe=imx(); // aqui añadimos la imagen. usamos una función aunque podríamos añadirlo directamente.


                            celda.appendChild(imaxe); // agregamos imagen a celda creada
                            columna.appendChild(celda); // agregamos celda a columna creada
                          }
                       
                          // agrega la columna al final de la tabla (al final del elemento tblbody)
                          tblBody.appendChild(columna);
                        }
                       
                        // posiciona el <tbody> debajo del elemento <table>
                        tabla.appendChild(tblBody);
                        // appends <table> into <body>
                        elemento.appendChild(tabla);
                        // modifica el atributo "border" de la tabla y lo fija a "2";
                        tabla.setAttribute("style", "margin:0 auto;");
            } 
          /* Fin dibujamos el tablero */
          //--------------------------------------------------------------------------------

           
          /* alta imagen */
          //--------------------------------------------------------------------------------
           var x=0; 
           var imx = function(){ 
                     n_imaxen=document.createElement("img");
                                n_imaxen.className = "img";
                                n_imaxen.id = mapa[x];
                                n_imaxen.src="png/"+mapa[x];
                                n_imaxen.name="img";
                                n_imaxen.setAttribute('width','100px');
                                x++;
                   return n_imaxen;
            }
            /* fin alta imagen */
            //--------------------------------------------------------------------------------

            x=0;
            tablero();      
}




function mezclar(){
            console.info('mezclando...');
            // limpiamos botonera // 
            elemento=document.getElementById("listaxe");
             while(elemento.hasChildNodes()){
               elemento.removeChild(elemento.firstChild);
             }
            // añadimos botones //

             

               var  boton_iniciar = document.createElement("input");
                    boton_iniciar.type="Button";
                    boton_iniciar.value="Terminar";
                    // boton_iniciar.setAttribute("onClick","location.reload()");

                    if (window.addEventListener){
                        boton_iniciar.addEventListener("click",reload,true); 
                      } else {
                        // alert("explorer"+isIE);
                       boton_iniciar.attachEvent("onclick",reload);
                      }
          


              var  boton_pausa = document.createElement("input");
                   boton_pausa.type="Button";
                   boton_pausa.value="pausa";
                   // boton_pausa.setAttribute("onClick","hideDiv()");


                    if (window.addEventListener){
                         boton_pausa.addEventListener("click",hideDiv,false); 
                      } else {
                        // alert("explorer"+isIE);
                       boton_pausa.attachEvent("onclick",hideDiv);
                      }


        
             var select = document.createElement("select");
                  select.setAttribute("name", "xogos");
                  select.setAttribute("id", "xogos");

                  if(n_saves==0){
                  var option = document.createElement("option");
                    option.setAttribute("value", "");
                    option.setAttribute("disabled", true);
                    option.setAttribute("selected", true);
                    option.innerHTML = "Xogos gardados";
                    select.appendChild(option);

                  } else {

                  for (var j = 0; j <= n_saves; j++) {
                  var option = document.createElement("option");
                   
                     if(j>0){
                            option.setAttribute("value", savegames[j-1]);
                                // nome = get_nome(j);    
                            //  option.innerHTML = "xogo gardado"+ j;
                             option.innerHTML = savegames[j-1];
                          
                         
                        } else { // si j es igual a cero añadimos un option vacio no seleccionable.
                           option.setAttribute("value", "");
                           option.setAttribute("disabled", true);
                           option.setAttribute("selected", true);
                           option.innerHTML = "Xogos gardados";
                        }
                    select.appendChild(option);
                  }
                  } // fin if

         if (window.addEventListener){
                       select.addEventListener("change",cargar,false); 
                      } else {
                        // alert("explorer"+isIE);
                       select.attachEvent("onchange",cargar);
                      }


              var boton_gardar = document.createElement("input");
                  boton_gardar.type="Button";
                  boton_gardar.value="gardar";

                  if (window.addEventListener){
                         boton_gardar.addEventListener("click",gardar,false); 
                      } else {
                       
                       boton_gardar.attachEvent("onclick",gardar);
                      }




                   elemento.appendChild(boton_iniciar);
                   elemento.appendChild(boton_pausa);
                   elemento.appendChild(select);

                  
                   elemento.appendChild(boton_gardar);

                // mezclamos ---------------------

                   if(!loader){ // solo mezclamos fichas si no recuperamos una partida guardada. 

                   location_img=mapa.indexOf("img.png");

                          for(var n=0;n<200;n++){
                                if(location_img>=0&& location_img<=25){
                                       var mleft = document.getElementsByTagName ('img') [location_img-1];
                                       var mright = document.getElementsByTagName ('img') [location_img+1];
                                       var mup = document.getElementsByTagName ('img') [location_img-5];
                                       var mdown = document.getElementsByTagName ('img') [location_img+5];


                                       var chou =Math.floor(Math.random() * (4) + 1);
                                        
                                
                                         switch( chou ){
                                                      case 1: 
                                                         if(mleft){cambia(mleft);}
                                                          break;
                                                      case 2: 
                                                          if(mright){cambia(mright);}
                                                          break;
                                                      case 3: 
                                                         if(mup){cambia(mup);}
                                                          break;
                                                      case 4: 
                                                         if(mdown){cambia(mdown);}
                                                          break;
                                                    }
                                   }
                          }  // fin for.
                            n_click=0;
                            t_ini = Date.now(); // tiempo inicial es ahora.   
                    }  // fin if(!loader);  


                    setAttr(); // añade atributos a fichas juego 
                    display = setInterval(anuncio, 300); // iniciamos timer
                    
                   
}

// ------------------------------------------------------------------------------------
function cambia(data){
      console.info('xogada...');
      if(data.target){
        var imagen = data.target || data.srcElement; 
      } else {
        var imagen = data; 
      }

   //  var imagen = data.target || data.srcElement; 
     console.log(imagen);
    // var imagen = imagen.tarjet;
    n_click++;
    unsetAttr();
   
    /* localizamos posicion fichas */
    location_pieza= mapa.indexOf(imagen.id);
    location_img=mapa.indexOf("img.png");




            /* intercambiamos posicion */
    
            var kk = document.getElementsByTagName ('img') [location_pieza];
            var mm = document.getElementsByTagName ('img') [location_img];

            var jji = kk.id; // auxiliar
  
            kk.id=mm.id;
            kk.src="png/"+mm.id;
            
            mm.id=jji;
            mm.src="png/"+jji; 
            mapa[location_pieza]=kk.id;
            mapa[location_img]=mm.id;

             /* fin intercambiamos posicion */

            
    
    setAttr();
    if (t_ini>0){ // si juego inciado o en curso...
    var snd = new Audio("sound/click.wav"); // sonido al  mover
        snd.play(); 
    setTimeout(function(){fin_xogo()},10); // comprueba si condicion fun de juego es ok. 
    }
}

function setAttr(){ // funcion añadde atributos a elementos del dom cercanos a ficha comodin ("img.png")


               location_img=mapa.indexOf("img.png");
                                   if(location_img>=0&& location_img<=25){
                                       var mleft = document.getElementsByTagName ('img') [location_img-1];  // Posicion n-1 (izq)
                                       var mright = document.getElementsByTagName ('img') [location_img+1]; // Posicion n+1 (dcha)
                                       var mup = document.getElementsByTagName ('img') [location_img-5];    // Posicion n-5 (sup)
                                       var mdown = document.getElementsByTagName ('img') [location_img+5];  // Posicion n+5 (inf)


                                           if(mleft){

                                               if (window.addEventListener){
                                                     mleft.addEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mleft.attachEvent("onclick",cambia);
                                                  }
                                              // mleft.setAttribute('onClick','cambia(this)');
                                              mleft.style.cursor = "pointer"; // para que muestre el icono de la mano en lugar de la flecha al pasar el ratón sobre el elemento.
                                           }

                                           if(mright){


                                                if (window.addEventListener){
                                                     mright.addEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mright.attachEvent("onclick",cambia);
                                                  }
                                              // mright.setAttribute('onClick','cambia(this)');
                                              mright.style.cursor = "pointer";
                                           }

                                           if(mup){
                                                if (window.addEventListener){
                                                     mup.addEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mup.attachEvent("onclick",cambia);
                                                  }


                                             //  mup.setAttribute('onClick','cambia(this)');
                                              mup.style.cursor = "pointer";
                                           }

                                           if(mdown){

                                                   if (window.addEventListener){
                                                     mdown.addEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mdown.attachEvent("onclick",cambia);
                                                  }


                                             //  mdown.setAttribute('onClick','cambia(this)');
                                              mdown.style.cursor = "pointer";
                                           }
                                   }
 }


function unsetAttr(){ // funcion elimina atributos a elementos del dom cercanos a ficha comodin ("img.png")

               location_img=mapa.indexOf("img.png");
                                   if(location_img>0 && location_img<25){
                                       var mleft = document.getElementsByTagName ('img') [location_img-1];
                                       var mright = document.getElementsByTagName ('img') [location_img+1];
                                       var mup = document.getElementsByTagName ('img') [location_img-5];
                                       var mdown = document.getElementsByTagName ('img') [location_img+5];

                                        

                                          if(mleft){


                                               if (window.addEventListener){
                                                     mleft.removeEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mleft.detachEvent("onclick",cambia);
                                                  }
                                             //  mleft.removeAttribute("onClick");
                                              mleft.style.cursor = "auto";
                                           }

                                           if(mright){

                                              if (window.addEventListener){
                                                     mright.removeEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mright.detachEvent("onclick",cambia);
                                                  }
                                             //  mright.removeAttribute("onClick");
                                              mright.style.cursor = "auto";
                                           }

                                           if(mup){
                                               if (window.addEventListener){
                                                     mup.removeEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mup.detachEvent("onclick",cambia);
                                                  }
                                             //  mup.removeAttribute("onClick");
                                               mup.style.cursor = "auto";
                                           }

                                           if(mdown){
                                              if (window.addEventListener){
                                                     mdown.removeEventListener("click",cambia,false); 
                                                  } else {
                                                    // alert("explorer"+isIE);
                                                   mdown.detachEvent("onclick",cambia);
                                                  }
                                              //mdown.removeAttribute("onClick");
                                               mdown.style.cursor = "auto";
                                           }

                                   }
}





// ------------------------------------------------------------------------------------

function fin_xogo(){

      console.log(mapa);
      console.log(solucion);


  if ( mapa.toString() === solucion.toString()){
       t_fin = Date.now();
       var t_total = (t_fin - t_ini)/1000;
       clearInterval(display);  
       unsetAttr();  
       var snd = new Audio("sound/success.wav"); // sonido en caso exito
            snd.play(); 
     
      

      setTimeout(function(){
          if(confirm("GAÑACHES!!!\nnumero clicks:"+n_click+"\ntiempo juego " +time()+"\n¿volver a xogar?")){
           
            // clean(); 
            // setTimeout(function(){iniciar()},200);
            setTimeout(function(){clean()},200);
          }
        }, 3400);  
  }
}



function anuncio(){
  // var marco = document.getElementById(cabeza);
  document.getElementById("cabeza").innerHTML = "<h2>XOGADAS: "+n_click+"</h2><p>tempo: "+time()+"</p>";
 
}
// ------------------------------------------------------------------------------------

function time(){
    // asignar el valor de las unidades en milisegundos
var msecPerMinute = 1000 * 60;
var msecPerHour = msecPerMinute * 60;
var msecPerDay = msecPerHour * 24;

// asignar la fecha en milisegundos
var date = new Date(Date.now());
var dateMsec = date.getTime();
var  interval  = (date.getTime()- t_ini);

t_fin=interval;


// Calcula cuentos días contiene el intervalo. Substraer cuantos días
//tiene el intervalo para determinar el sobrante
var days = Math.floor(interval / msecPerDay );
interval = interval - (days * msecPerDay );

// Calcula las horas , minutos y segundos
var hours = Math.floor(interval / msecPerHour );
interval = interval - (hours * msecPerHour );

var minutes = Math.floor(interval / msecPerMinute );
interval = interval - (minutes * msecPerMinute );

var seconds = Math.floor(interval / 1000 );

// Devuelve el resultado.
var timer = (days + " Días, " + hours + " Horas, " + minutes + " Minutos, " + seconds + " Segundos.");
return timer;
}

// ------------------------------------------------------------------------------------
function hideDiv(){ // Funcion oculta div donde se muestran las imagenes del juego. 

   document.getElementById('mensaxes').style.visibility = 'hidden'; // ocultamos
   document.getElementById("cabeza").innerHTML = "<h2>PAUSA</h2>"; //  mostramos mensaje "Pausa"
   clearInterval(display); // detenemos intervalo  que muestra el tiempo transcurrido.
   console.info("en pausa");

           /* borramos elementos en #listaxe */
          elemento=document.getElementById("listaxe"); 
              while(elemento.hasChildNodes()){
               elemento.removeChild(elemento.firstChild);
             }


              /* Añadimos botones  inicar y continuar */
               var  boton_iniciar = document.createElement("input");
                    boton_iniciar.type="Button";
                    boton_iniciar.value="Terminar";
                    // boton_iniciar.setAttribute("onClick","location.reload()");


                      if (window.addEventListener){
                          boton_iniciar.addEventListener("click",reload,false); 
                      } else {
                        // alert("explorer"+isIE);
                        boton_iniciar.attachEvent("onclick",reload);
                      }


               var boton_continuar = document.createElement("input");
                   boton_continuar.type="Button";
                   boton_continuar.value="continuar";
                  //  boton_continuar.setAttribute("onClick","showDiv()");


                   if (window.addEventListener){
                          boton_continuar.addEventListener("click",showDiv,false); 
                      } else {
                        // alert("explorer"+isIE);
                        boton_continuar.attachEvent("onclick",showDiv);
                      }

                   elemento.appendChild(boton_iniciar);
                   elemento.appendChild(boton_continuar);
                   
}
// ------------------------------------------------------------------------------------

function showDiv(){ // Funcion muestra div donde se muestran las imagenes del juego. 
          document.getElementById('mensaxes').style.visibility = 'visible';
   
                            // activamos de nuevo el intervalo para que vuelva a mostrar tiempo donde lo dejamos. 
                            t_ini = Date.now()-t_fin;  
                            display = setInterval(anuncio, 300);
                           

             elemento=document.getElementById("listaxe");
             while(elemento.hasChildNodes()){
               elemento.removeChild(elemento.firstChild);
             }

               var  boton_iniciar = document.createElement("input");
                    boton_iniciar.type="Button";
                    boton_iniciar.value="Terminar";
                    // boton_iniciar.setAttribute("onClick","location.reload()");

                      if (window.addEventListener){
                          boton_iniciar.addEventListener("click",reload,false); 
                      } else {
                        // alert("explorer"+isIE);
                        boton_iniciar.attachEvent("onclick",reload);
                      }

              var boton_pausa = document.createElement("input");
                  boton_pausa.type="Button";
                  boton_pausa.value="pausa";
                  boton_pausa.setAttribute("onClick","hideDiv()");

                    if (window.addEventListener){
                         boton_pausa.addEventListener("click",hideDiv,false); 
                      } else {
                        // alert("explorer"+isIE);
                        boton_pausa.attachEvent("onclick",hideDiv);
                      }


              var select = document.createElement("select");
                  select.setAttribute("name", "xogos");
                  select.setAttribute("id", "xogos");

                  if(n_saves==0){
                  var option = document.createElement("option");
                    option.setAttribute("value", "");
                    option.setAttribute("disabled", true);
                    option.setAttribute("selected", true);
                    option.innerHTML = "Xogos gardados";
                    select.appendChild(option);

                  } else {

                  for (var j = 0; j <= n_saves; j++) {
                  var option = document.createElement("option");
                   
                   if(j>0){
                            option.setAttribute("value", savegames[j-1]);
                                // nome = get_nome(j);    
                            //  option.innerHTML = "xogo gardado"+ j;
                             option.innerHTML = savegames[j-1];
                          
                         
                        } else { // si j es igual a cero añadimos un option vacio no seleccionable.
                           option.setAttribute("value", "");
                           option.setAttribute("disabled", true);
                           option.setAttribute("selected", true);
                           option.innerHTML = "Xogos gardados";
                        }
                    select.appendChild(option);
                  }
                  } // fin if

         if (window.addEventListener){
                       select.addEventListener("change",cargar,false); 
                      } else {
                        // alert("explorer"+isIE);
                       select.attachEvent("onchange",cargar);
                      }

             var boton_gardar = document.createElement("input");
                 boton_gardar.type="Button";
                 boton_gardar.value="gardar";

                    if (window.addEventListener){
                           boton_gardar.addEventListener("click",gardar,false); 
                        } else {
                          // alert("explorer"+isIE);
                         boton_gardar.attachEvent("onclick",gardar);
                        }

                   elemento.appendChild(boton_iniciar);
                   elemento.appendChild(boton_pausa);
                   elemento.appendChild(select);
                   elemento.appendChild(boton_gardar);
}





