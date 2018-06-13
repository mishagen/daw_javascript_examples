/*
*	Crearanse obxectos para representar os números complexos e realizar operacións sobre eles. A clase
*	chamarase obxectoComplexo e terá:
*	1. Dous atributos r e i que representarán as partes real e imaxinaria do número complexo.
*	2. Dous geters getR() e getI() que devolverán respectivamente os atributos r e i.
* 	3. Un método getMod2() que devolverá o módulo ó cadrado (r 2 +i 2 ).
*	4. Un métod itera(c) que calculará o novo valor do complexo e que recibirá como parámetro o
*	valor de c.
*	5. Un atributo iteracion que tomará o valor 0 se a sucesión Z n  non diverxe e, encaso contrario,
*	tomará o valor da iteración na que o seu módulo se fixo maior que 2.
*	6. Un método getIteracion() e un método setIteracion(it) para obter ou modificar ese atributo.
*
*/

	/* valiables globales */
var max_it = 100; // Numero máximo de iteracciones. a mayor numero figura más compleja. 
var resolucion = 0.005; // resolucion. por defecto.  5/1000 pixeles
var setWidth    = 600; // tamaño ancho
var setHeight   = 600; // tamaño alto
var globals = {}; // servirá para almacenar el canvas como un objeto y así hacerlo más manejable

// paleta de color 
var mr0 = 0; var mg0 = 0; var mb0 = 0;
while(mr0 == mg0 || mr0 == mb0 || mg0 == mb0) 
{
    mr0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
    mg0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
    mb0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3)); 
}
 
var mr1 = 256 / mr0; var mg1 = 256 / mg0; var mb1 = 256 / mb0;  
// fin paleta de color.




drawMandelbrotSet();
drawCoordinateAxes();

    

function drawMandelbrotSet() {
    	
    	globals.canvas = document.getElementsByTagName('canvas')[0];
    	globals.canvas.setAttribute('width', setWidth);
		globals.canvas.setAttribute('height', setHeight);
    	globals.canvas.ctx = globals.canvas.getContext('2d');

		globals.canvas.ctx.translate(globals.canvas.width / 2, globals.canvas.height / 2); // movemos eje 0.0 canvas al centro del tablero.
		globals.canvas.ctx.scale(1/resolucion, -1/resolucion); // definimos escala. 
		// globals.canvas.ctx.rotate(-90 * Math.PI / 180); // rotamos eje lienzo 90 grados en sentido horario. x es y ;)
    	// globals.canvas.ctx.fillStyle = "black"; // fondo negro
    	imagedata = globals.canvas.ctx.createImageData(setWidth, setHeight);

			    for(y=0;y<setHeight;y++){
					for(x=0;x<setWidth;x++){
						setitera(x,y);
					}
				}     
		globals.canvas.ctx.putImageData(imagedata, 0, 0);


} // drawMandelbrotSet

function setitera(x,y){


		var color;

		var objeto = new obxectoComplexo(0,0);
		
		// si calculamos xo y yo de modo invertido para girar eje en vertical en presentacion.  
		var xo=(x-2*setWidth/3)*resolucion; // 2*alto/3 = punto 0
		
		var yo=(y-setHeight/2)*resolucion; 	// ancho/2 = punto 0 
		// fiesta party!!!!
		for (i=1;i<max_it;i++){
			objeto.itera(xo,yo);
			if(objeto.getMod2()>=4){

			   
			    color = { r: (i % mr0 * mr1), 
			   			 g: (i % mg0 * mg1), 
			   			 b: (i % mb0 * mb1)
			   			};
			   
   			   //  color = { r:255, g:255, b:255}; // negro

				break;
			}else{
				color = { r:0, g:0, b:0};
			}
		}
		
		// console.log("r "+color.r+" b"+color.b+" g:"+color.g);
		var indexc = (y * setWidth + x) * 4;
        imagedata.data[indexc] = color.r;     // red
        imagedata.data[indexc + 1] = color.g; // green
        imagedata.data[indexc + 2] = color.b; // blue
        imagedata.data[indexc + 3] = 255;      // alpha
 
}


  function rotate(){

  	   context = globals.canvas.ctx;
  	   // context.putImageData(imgd, 0, 0); // pintamos  imagen
       context.save(); // salvamos estado. (restore para recuperar);

       myImageData = new Image(); // creamos un objeto imagen
       myImageData.src =context.canvas.toDataURL(); // ruta canvas a imagen. 
       console.log(myImageData); // lo tenemos? 
       context.translate(-context.canvas.width / 2, context.canvas.height / 2);
       context.clearRect(0,0,context.canvas.width,context.canvas.height);  // Limpiamos pantalla
       context.translate(context.canvas.width / 2, context.canvas.height / 2); // trasladamos eje de coordenadas al centro del canvas   
       context.rotate(20 * Math.PI / 180); // rotamos 90 (podemos usar valores negativos)
       
      //  context.drawImage(myImageData,-myImageData.width/2,-myImageData.width/2); // pintamos imagen a partir del centro de la pantalla. ding ding. Todo listo :)
  	  

  }


  function drawCoordinateAxes() {

    /*

    Dibujamos eje de coordenadas por si lo necesitamos para orientacion.

    */

      var ctx = globals.canvas.ctx;
      ctx.lineWidth = resolucion;
      ctx.strokeStyle = "red";

     
      // X
      ctx.beginPath();
      ctx.moveTo(setWidth/2, 0);
      ctx.lineTo(-setWidth/2, 0);
      ctx.stroke();

      // Y
      ctx.beginPath();
      ctx.moveTo(0, setWidth/2);
      ctx.lineTo(0, -setWidth/2);
      ctx.stroke(); 



    } 





function obxectoComplexo(real, imaxinaria){
	this.r = real;
	this.i = imaxinaria;
	this.iteracion = 0;
	
	this.getR = function(){
		return this.r;
	}
	
	this.getI = function(){
		return this.i;
	}
	
	this.getIteracion = function(){
		return this.iteracion;
	}
	
	this.getMod2 = function(){
		return this.r * this.r + this.i * this.i;
	}
	
	this.setIteracion = function(it){
		this.iteracion = it;
	}
	
	this.itera = function(cr,ci){
		var raux = this.r * this.r - this.i * this.i + cr;
		this.i = 2 * this.r * this.i + ci;
		this.r = raux;
	}
}