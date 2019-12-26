

var cipherText = document.getElementById('cipherText'); 
var plainText = document.getElementById('plainText');
var encryptBtn = document.getElementById('encryptBtn');
var decryptBtn = document.getElementById('decryptBtn');
var resultShow =  document.getElementById('result'); 
var cipherText2 = document.getElementById('cipherText2');
var analyseBtn = document.getElementById('analyseBtn');
var processing = document.getElementById('process');





function encryption(){
	var encryptionType = document.querySelector('input[name="cipher"]:checked').value;
	var keyValue = Number(document.getElementById('key').value);
	var plainText = document.getElementById('plainText').value;
	
	switch(encryptionType){
	
			case "crips":
							cripsEncryption(plainText,keyValue);
							break;
			case "next":
							alert("error");
							break;
				
			default :
						alert("error");

		}

}





function decryption(){
	var encryptionType = document.querySelector('input[name="cipher"]:checked').value;
	var keyValue = Number(document.getElementById('key').value);
	var cipherText = document.getElementById('cipherText').value; 

	switch(encryptionType){
		case "crips":
				cripsDecryption(cipherText,keyValue);
				break;
		case "next":
				alert("error");
				break;
		default :
				alert("error");
	}

}





function startCryptAnalysis(){
	var encryptionType = document.querySelector('input[name="cipher"]:checked').value;
	var ciphertxt = cipherText2.value;
	switch(encryptionType){

		case "crips": cripsCryptAnalysis(ciphertxt);
							break;
		case "next" : 
						alert("ok !1");
						break;

		default :
				alert("error");
	}

}
//-------------- button enable disable functions -----------------

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

function enableBtn(){
	if (cipherText2.value.length > 0){
		analyseBtn.disabled = false;
	}
	else 
		analyseBtn.disabled = true;
}





//-------------------------------------------------------
//-----------------algorithms ------------------------
//-----------------------------------------------------
function cripsEncryption(plainText,keyValue){
	var ciphertxt ='' ;
	for( i = 0; i < plainText.length ; i++){
			ciphertxt += String.fromCharCode(((Number((plainText[i]).toUpperCase().charCodeAt(0))-65)+keyValue)%26 + 65);
			}

		resultShow.innerText = ciphertxt;

		}


function cripsDecryption(cipherText,keyValue){

	var plaintxt ='' ;
	
	for( i = 0; i < cipherText.length ; i++){
	
		plaintxt += String.fromCharCode(((Number((cipherText[i]).toUpperCase().charCodeAt(0))-65)-keyValue+26)%26 + 65);	

	}

	resultShow.innerText = plaintxt;
}
	


function cripsCryptAnalysis(cipherText){
	var plaintxt;
	processing.value = ''; //processing display box 
	for (keyValue = 0 ; keyValue < 26 ; keyValue++){
		plaintxt = ''; 
		for (i = 0 ; i < cipherText.length ; i++)
			plaintxt += String.fromCharCode(((Number((cipherText[i]).toUpperCase().charCodeAt(0))-65)-keyValue+26)%26 + 65);	

	processing.value += plaintxt + ", ";

	}
}