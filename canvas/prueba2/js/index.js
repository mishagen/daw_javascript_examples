

// Variables globales. 
var canvas      = document.getElementById('canvas'); // Lienzo canvas
var ctx         = canvas.getContext('2d'); // 2d
var setWidth    = 500; // tamaño ancho
var setHeight   = 500; // tamaño alto
var checMath    = (500/2)+5; // variable de control. Es correcto el centro?

// Definimos alto y ancho
canvas.setAttribute('width', setWidth);
canvas.setAttribute('height', setHeight);

// Recuperamos estos datos. Lo necesitaremos más adelante. 
var canvas_ancho    = canvas.getAttribute('width');
var canvas_alto   = canvas.getAttribute('height');

/*  ----------------------------
Preramos nuestro eje cartesiano 
    ----------------------------  */

// EJE X
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


// Y

function dibuja_eje_Y(width, height) {
    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2,height);
    ctx.stroke();
}


function dibuja_escala_Y(height, scale) {
    // Accumulator
    var unitScale = 0;
    
    
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



// function calls
dibuja_eje_X(canvas_ancho, canvas_alto);
dibuja_escala_X(canvas_ancho,10);
dibuja_eje_Y(canvas_ancho, canvas_alto);
dibuja_escala_Y(canvas_alto,10);