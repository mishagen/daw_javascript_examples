
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