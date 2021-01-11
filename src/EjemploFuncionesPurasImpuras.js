//Las props son inmutables porque no se pueden modificar
function sumaPura(a,b){
	return a + b;
}
function sumaImpura(a,b){
	return a + b + Math.random();
}
let b = 2;
function sumaImpura2(a){
	b = a + b;
	return b;
}