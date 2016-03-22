angular.module("forc", []).controller("forca", function($scope) {
	
	var palavra = [];
		palavra [1] = "AERODROMO";
		palavra [2] = "ASA";
		palavra [3] = "CUMULUSNIMBUS";
		palavra [4] = "PITOT";
	var patual = "";
	var patualarray = [];
	var traco = [];
	traco [1] = "___-___-___-___-___-___-___-___-___"; //9
	traco [2] = "___-___-___"; //3
    traco [3] = "___-___-___-___-___-___-___-___-___-___-___-___-___"; //13
	traco [4] = "___-___-___-___-___"; //5
	var formados = false;
    var atual = 1;
    var tracos= "";
    var erros=0;
	var dicaatual = 1;
	var letradig = "";
	var parajogo = false;
	var tracoexc = [];
	var ganhou = false;
	$scope.gfim = "";

$scope.conectar = function (){
	
	return "Conectado";
}

$scope.dica = function (){
	if (parajogo){
		
			return $scope.gfim;
		
	}
	else{
	if (atual == 1){
		patual = palavra[1];
		return "Pista para pouso de aviões";
		
	}
	if (atual == 2){
		patual = palavra[2];
		return "Maior aerofólio de sustentação de uma aeronave";
		
	}
	if (atual == 3){
		patual = palavra[3];
		return "Nuvem mais perigosa para um voo";
		
	}
	if (atual == 4){
		patual = palavra[4];
		return "Tubo onde entra a pressão estática e dinâmica de uma aeronave.";
		
	}
	}
	
}

$scope.letra = function (x){
	if (parajogo){
	
    letradig = "";
	return tracos;	
	}
	else{
	
	letradig = x;
	jogo();	
		
	}
	
	
}

$scope.tracos = function (){		
	
	if (formados == false ){
		
		tracos = traco[atual];
		$scope.dica();
		erros = 0;
		formados = true;
		tracoexc = [];
		return tracos;
		
		
	}
	else {
		
	$scope.dica();
    verificavitoria();	
	return tracos;	
		
		
	}
	
	
}



var atualizatraco = function (){
	
	if (letradig != ""){
		tracos = "";
	
	for (i = 0; i < patual.length; i++){
		
		
		var max = patual.length - 1;
		
		if (tracoexc[i] == undefined){tracos = tracos + "___-"}
		if ((i != max)&&(tracoexc[i] != undefined)){ tracos = tracos + tracoexc[i] + "-";}
		if ((i == max)&&(tracoexc[i] != undefined)){ tracos = tracos + tracoexc[i];}
		if ((i == max)&&(tracoexc[i] == undefined)){ tracos = tracos + "___"}
		
	}
	
	$scope.tracos();
	$scope.homemforca();
	letradig = "";
	}
}


var jogo = function (){
	
	
	verificavitoria();
	//leitura da palavra por letras
	for (i = 0; i<patual.length; i++){
		
		patualarray	[i] = patual.charAt(i);	
		
	}
	// leitura da casa de traço
	var palavrajogo = [patual.length - 1];
	var entrou = false;
	for (i = 0; i<patual.length; i++){
		
		if ((letradig == patualarray[i])&&(letradig != undefined)){
			
			tracoexc[i] = letradig;
			entrou = true;
		}
		else{
			if (tracoexc[i] != "___"){
				
				tracoexc[i] = tracoexc[i];
				
			}
			else{
				
				tracoexc[i] = "___";
				
			}
				
		}
	}
	if (entrou){erros = erros;}else{
		if (erros == 6){parajogo = true;}
		else{erros = erros + 1;}
	}
	atualizatraco();
}
$scope.homemforca = function (){
	
	if (erros == 0){return "img/boneco0.jpg";}
	if (erros == 1){return "img/boneco1.jpg";}
	if (erros == 2){return "img/boneco2.jpg";}
	if (erros == 3){return "img/boneco3.jpg";}
	if (erros == 4){return "img/boneco4.jpg";}
	if (erros == 5){return "img/boneco5.jpg";}
	if (erros == 6){return "img/boneco6.jpg";}
	if (erros == 7){return "img/bonecoganhou.jpg";}	
}

$scope.proximo = function (){
	
	erros = 0;
	if (atual == 4){atual = 1;} else {atual = atual + 1;}
	formados = false;
	$scope.tracos();
	parajogo = false;
	ganhou = false;
}

$scope.qtderro = function (){
	
	if (ganhou){
		return "";			
	}
	else{return erros;}
	
		
}

var verificavitoria = function (){
	var contador = 0;
	var tampal = patual.length;
	
	if (erros == 6){
		
		parajogo = true;
		$scope.gfim = "Voce Perdeu .. ";
		atualizatraco();
		
		
	}
	
	for (i = 0; i < patual.length; i++){
		
		if ((tracoexc[i] != "___")&&(tracoexc[i] != undefined)){
			
			contador = contador + 1;
			
		}
	}
		
		if ((contador == tampal) && (erros < 6)){
			
			ganhou = true;
		}
	if (ganhou){
		
		parajogo = true;
		erros = 7;
		$scope.homemforca(); 
		$scope.qtderro ();
		$scope.gfim = "Voce Ganhou... !!!";
	}

}
});