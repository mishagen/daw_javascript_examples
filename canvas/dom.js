
var elemento;
var canvas;

 
function clean(){ // funcion limpiar DOM y añade botones basicos del juego.
        
         // limpiamos tablero de xogo
         elemento=document.getElementById("dibujo-canvas");
         while(elemento.hasChildNodes()){
            elemento.removeChild(elemento.firstChild);
         } 

         dibujar(); // dibujamos tablero inicial    
         
}



function inicio(){ // inicio del juego
          // clean();
           dibujar(); // dibujamos tablero inicial         
}

function dibujar(){
           console.info('dibujando...');
          /* dibujamos el tablero, una tabla de 5 por 5 celdas */
          // --------------------------------------------------------------------------------
            /* var tablero =function (){


                        // Obtener la referencia del elemento donde crearemos la tabla.
                        elemento = document.getElementById("dibujo-canvas");
                       
                        // Crea un elemento <table> y un elemento <tbody>
                        var canvas   = document.createElement("canvas");
                            canvas.setAttribute("id", "lienzo1");
                            canvas.setAttribute("style", "width:300px; height:300px;");
                           
                            elemento.appendChild(canvas); // agregamos imagen a celda creada       
            } 
         
            tablero(); */

            ej1=document.getElementById("lienzo1"); 
            lienzo1=ej1.getContext("2d");
            lienzo1.lineWidth=1;
            lienzo1.strokeStyle = '#000'; 
     
          //EJEX
          lienzo1.beginPath(); // Inicio pincel
          lienzo1.moveTo(150,0); // lo ubicó para iniciar el dibujo
          lienzo1.lineTo(150,300); // trazo la linea hasta este punto
          lienzo1.stroke(); // levanto el pincel
          lienzo1.closePath(); // me alisto para realizar otra parte del dibujo


          var counter = 30;
          var x_coord = 150;
          var y_coord = 0;
          var c_width = 300;

           for (var i = 0; i <= counter; i++) {
               lienzo1.beginPath(); // Inicio pincel
                if (i == 0) {
                   lienzo1.moveTo(x_coord, c_width);
                   lienzo1.lineTo(c_width, y_coord);
                } else {
                   lienzo1.moveTo(x_coord, y_coord);
                   lienzo1.lineTo(x_coord, y_coord + 5);
                }
                lienzo1.closePath();
                lienzo1.stroke();
                if (i != 0) lienzo1.fillText(i, x_coord - 5, y_coord + 15);
               //  counter++;
           }
















        //EJE Y
          lienzo1.beginPath(); // Inicio pincel
          lienzo1.moveTo(0,150);// lo ubicó para iniciar el dibujo
          lienzo1.lineTo(300,150);// trazo la linea hasta este punto
          lienzo1.stroke();// levanto el pincel
          lienzo1.closePath();// me alisto para realizar otra parte del dibujo

          /* Definir el grosor del lápiz lienzo1.lineWidth=1;(en pixeles)
              Definir el color del lápiz lienzo1.strokeStyle = ‘#000’;
              Alistar todo para el dibujo lienzo1.beginPath();
              Ubicar el lápiz desde donde iniciará mi trazo lienzo1.moveTo(X,Y);
              Realizar el trazo lienzo1.lineTo(X,Y);
              Finalizar el trazo lienzo1.closePath();
              Levantar el lápiz lienzo1.stroke(); */
}








