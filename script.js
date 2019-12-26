

var cipherText = document.getElementById('cipherText'); 
var plainText = document.getElementById('plainText');
var encryptBtn = document.getElementById('encryptBtn');
var decryptBtn = document.getElementById('decryptBtn');
var resultShow =  document.getElementById('result'); 
var cipherText2 = document.getElementById('cipherText2');
var analyseBtn = document.getElementById('analyseBtn');
var processing = document.getElementById('process');
var result2 = document.getElementById('result2');
var selectedChar = document.getElementById('highestFrequencyChar');




function encryption(){
	var encryptionType = document.querySelector('input[name="cipher"]:checked').value;
	var keyValue = Number(document.getElementById('key').value);
	var plainText = document.getElementById('plainText').value;
	
	switch(encryptionType){
	
			case "ceasar":
							var ciphertxt = ceasarEncryption(plainText,keyValue);
							resultShow.innerText = ciphertxt;
							break;
			case "poly":
							;
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
		case "ceasar":
				var plaintxt = ceasarDecryption(cipherText,keyValue);
				resultShow.innerText = plaintxt;
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

	var  highestFrequencyChar = selectedChar.value;


	switch(encryptionType){

		case "ceasar":  ceasarCryptAnalysis(ciphertxt); 
						frequencyAnalysis(ciphertxt,highestFrequencyChar);
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
function ceasarEncryption(plainText,keyValue){
	var ciphertxt ='' ;
	for( i = 0; i < plainText.length ; i++){
			ciphertxt += String.fromCharCode(((Number((plainText[i]).toUpperCase().charCodeAt(0))-65)+keyValue)%26 + 65);
			}


		return ciphertxt;
		}


function ceasarDecryption(cipherText,keyValue){

	var plaintxt ='' ;
	
	for( i = 0; i < cipherText.length ; i++){
	
		plaintxt += String.fromCharCode(((Number((cipherText[i]).toUpperCase().charCodeAt(0))-65)-keyValue+26)%26 + 65);	

	}

	return plaintxt;
}
	


function ceasarCryptAnalysis(cipherText){
	var plaintxt;
	processing.value = ''; //processing display box 
	for (keyValue = 0 ; keyValue < 26 ; keyValue++){
		plaintxt = ''; 
		for (i = 0 ; i < cipherText.length ; i++)
			plaintxt += String.fromCharCode(((Number((cipherText[i]).toUpperCase().charCodeAt(0))-65)-keyValue+26)%26 + 65);	

	processing.value += plaintxt + ", ";

	}
}

function frequencyAnalysis(cipherText,letter){ //char highest frequency character 
	var frqCount ={};
	var key;
	for (i = 0 ; i < cipherText.length ; i++ ){  //counting the frequency of the char in cipherText
		key = cipherText[i];
			if (key in frqCount)
					frqCount[key]++;
			else
				frqCount[key] = 1; 
	}


	//key having highest frequency

	var highestFrqChar ; //highest frequency character
	var highestFrq = 0;
	for (key in frqCount){
		if (frqCount[key] > highestFrq){
			highestFrqChar = key;
			highestFrq = frqCount[key];
		}
	}

	//////

	// 'e' is the english letter that has a highest frequency . so highestFreqChar has the highest chance of being an 'e'.
	//ascii value of e = 69;

	var keyValue = Math.abs(letter.toUpperCase().charCodeAt() - Number( highestFrqChar.toUpperCase().charCodeAt() ) );

	console.log(keyValue);
	var possiblePlainText = ceasarDecryption(cipherText,keyValue);
	
	result2.innerText= possiblePlainText;


}