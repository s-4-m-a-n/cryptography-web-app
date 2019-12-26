

var plainText = document.getElementById('plainText');
var cipherText = document.getElementById('cipherText'); 
var encryptBtn = document.getElementById('encryptBtn');
var decryptBtn = document.getElementById('decryptBtn');
var resultShow =  document.getElementById('result'); 
var cipherText2 = document.getElementById('cipherText2');
var analyseBtn = document.getElementById('analyseBtn');
var processing = document.getElementById('process');


function disableDecrypt(){
	
	if (plainText.value.length > 0) {
		cipherText.value ="" ;
		encryptBtn.disabled = false;
		decryptBtn.disabled = true;
	}
	else
		encryptBtn.disabled = true;

}

function disableEncrypt(){
	if (cipherText.value.length > 0){
		plainText.value = "";
		decryptBtn.disabled = false;
		encryptBtn.disabled = true; 
	}
	else 
		decryptBtn.disabled = true; 

}

function encryption(){
	var keyValue = Number(document.getElementById('key').value);
	var ciphertxt ='' ;
	
	
	for( i = 0; i < plainText.value.length ; i++){

		ciphertxt += String.fromCharCode(((Number((plainText.value[i]).toUpperCase().charCodeAt(0))-65)+keyValue)%26 + 65);
		
		
	}

	resultShow.innerText = ciphertxt;



}



function decryption(){

	var keyValue = Number(document.getElementById('key').value);
	var plaintxt ='' ;
	
	
	for( i = 0; i < cipherText.value.length ; i++){
	
		plaintxt += String.fromCharCode(((Number((cipherText.value[i]).toUpperCase().charCodeAt(0))-65)-keyValue+26)%26 + 65);	

	}

	resultShow.innerText = plaintxt;


}


function enableBtn(){
	if (cipherText2.value.length > 0){
		analyseBtn.disabled = false;
	}
	else 
		analyseBtn.disabled = true;
}

function startCryptAnalysis(){
	
	var plaintxt;
	processing.value = '';
	for (keyValue = 0 ; keyValue < 26 ; keyValue++){
		plaintxt = ''; 

		for (i = 0 ; i < cipherText2.value.length ; i++)
			plaintxt += String.fromCharCode(((Number((cipherText2.value[i]).toUpperCase().charCodeAt(0))-65)-keyValue+26)%26 + 65);	
 	 
	console.log(keyValue);
	processing.value += plaintxt + ", ";

	}
}