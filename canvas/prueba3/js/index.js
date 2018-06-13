

// Variables globales. 
var canvas      = document.getElementById('canvas'); // Lienzo canvas
var ctx         = canvas.getContext('2d'); // 2d
var setWidth    = 600; // tamaño ancho
var setHeight   = 600; // tamaño alto
var checMath    = (600/2)+5; // variable de control. Es correcto el centro?
var scale;      // escala, viene dado pdesde un formulario
var puntos = []; 

// Definimos alto y ancho
canvas.setAttribute('width', setWidth);
canvas.setAttribute('height', setHeight);

// Recuperamos estos datos. Lo necesitaremos más adelante. 
var canvas_ancho  = canvas.getAttribute('width');
var canvas_alto   = canvas.getAttribute('height');



// form
document.getElementById("panelconf").innerHTML = 'X: <input name="inputx" id="inputx" size="3"> Y: <input name="inputy" id="inputy" size="3"><input type="submit" name="engadir"  onclick="get_point();" value="engadir"><br>Escala: <input type="range" id="rangeInput" name="rangeInput" min="10" max="100"  step="10" value="10" onchange="updateTextInput(this.value);"><input type="text" id="textInput" value=""  size="3">';

var val = document.getElementById('rangeInput').value;

updateTextInput(val);

function updateTextInput(val) {
         scale = document.getElementById('textInput').value=val; 
         console.log (document.getElementById('textInput').value=val);
         draw();
        }

/*  ----------------------------
Preramos nuestro eje cartesiano 
    ----------------------------  */

// EJE X ------------------------
function dibuja_eje_X(width, height) {
    ctx.beginPath();
    ctx.moveTo(0,height/2);
    ctx.lineTo(width, height/2);
    ctx.stroke();
}

// Rewrite to handle variable dimensions.
function dibuja_escala_X(width, scale) {
    // Accumulator
    var unitScale = 0;

    ctx.font = "15px Arial";
    ctx.fillText("x",5,(width/2)-10);

    // Render loop
    for (var i = 0; i < (width/scale); i++) {
        unitScale += scale;

        // Condition to check if scale is out of bounds leave scope if true?
        if (unitScale == (width/2) || unitScale == width) {
            continue;
        }
        // Render commands
        ctx.beginPath();
        ctx.moveTo(unitScale,(width/2)+4);
        ctx.lineTo(unitScale,(width/2)-4);
        ctx.stroke();
        ctx.closePath(); // terminamos
    }
    // Condition to check scale size to prevent overdraw?
    if (unitScale >= width) {
        unitScale = 0;
    }
}


// Y  ------------------------
function dibuja_eje_Y(width, height) {
    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2,height);
    ctx.stroke();
}


function dibuja_escala_Y(height, scale) {
    
    var unitScale = 0; // contador unidades escala. 

    ctx.font = "15px Arial";
    ctx.fillText("y",(height/2)-15,15);
    
    
    // Render loop
    for (var i = 0; i < (height/scale); i++) {
        unitScale += scale;
       
        // Condition to check if scale is out of bounds leave scope if true?
        if (unitScale == (height/2) || unitScale == height) {
            continue;
        }
        // Render commands
        ctx.beginPath(); // iniciamos pincel 
        ctx.moveTo( ((height/2)+4) , unitScale); // inicio
        ctx.lineTo( ((height/2)-4) , unitScale);  // movemos a fin
        ctx.stroke(); // levantamos pincel
        ctx.closePath(); // terminamos
    }
    // Condition to check scale size to prevent overdraw?
    if (unitScale >= height) {
        unitScale = 0;
    }
}

function get_point(){
   
    var val_x = document.getElementById('inputx').value;
    var val_y = document.getElementById('inputy').value;

    if(val_x!="" && val_y!="" && !isNaN(val_x) && !isNaN(val_y) ){
             puntos.push([val_x, val_y]); 
             draw();
    } else {
        alert ("debes introducir coordenadas  válidas");
    }

}




function clean(){
        ctx.clearRect(0,0,canvas_ancho,canvas_alto);   
}

function draw(){

        // Pendiente corregir bug escalas. La representación de la escala X e Y tiene una desviación. 
        // function calls
        clean();
        dibuja_eje_X(canvas_ancho, canvas_alto);
        dibuja_eje_Y(canvas_ancho, canvas_alto);
        dibuja_escala_X(canvas_ancho,parseInt(scale));
        dibuja_escala_Y(canvas_alto,parseInt(scale));

        // dibujamos cada punto
        for(var x=0; x<puntos.length;x++){
            var val_x = parseInt(puntos[x][0])*scale;
            var val_y = parseInt(puntos[x][1])*scale;
            // determinamos el cuadrante:
                if(val_x>=0 && val_y>=0){
                    console.log ("1er cuadrante");
                    val_x=(canvas_ancho/2)+val_x;
                    val_y=(canvas_alto/2)-val_y;
                }
                if(val_x>=0 && val_y<=0){
                    console.log ("2d cuadrante");
                    val_x=(canvas_ancho/2)+val_x;
                    val_y=(canvas_alto/2)-val_y;
                }

                if(val_x<=0 && val_y<=0){
                    console.log ("3er cuadrante");
                    val_x=(canvas_ancho/2)+val_x;
                    val_y=(canvas_alto/2)-val_y;
                }

                if(val_x<=0 && val_y>=0){
                     console.log ("4er cuadrante");
                    val_x=(canvas_ancho/2)+val_x;
                    val_y=(canvas_alto/2)-val_y;
                }

        
             ctx.beginPath(); // iniciamos pincel 
             ctx.rect(val_x,val_y,1,1);
             ctx.stroke();
             ctx.closePath(); // terminamos
        }
}


