

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
	var keyValue = document.getElementById('key').value;
	var plainText = document.getElementById('plainText').value;
	var ciphertxt;
	switch(encryptionType){
	
			case "ceasar":
							keyValue =Number(document.getElementById('key').value);
							ciphertxt = ceasarEncryption(plainText,keyValue);
							break;
			case "playFair":
							keyValue = document.getElementById('key').value;
							ciphertxt = playFairEncryption(plainText,keyValue);
							break;
				
			default :
						alert("error");

		}


		resultShow.innerText = ciphertxt;

}





function decryption(){
	var encryptionType = document.querySelector('input[name="cipher"]:checked').value;
	var cipherText = document.getElementById('cipherText').value; 
	var plaintxt;
	var keyValue;
	switch(encryptionType){
		case "ceasar":
				keyValue = Number(document.getElementById('key').value); //takes number only 
				plaintxt = ceasarDecryption(cipherText,keyValue);
				break;
		case "playFair":
				keyValue = document.getElementById('key').value;
				plaintxt = playFairDecryption(cipherText,keyValue);
				break;
		default :
				alert("error");
	}

	resultShow.innerText = plaintxt;

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

/*
function playFairEncryption(plaintxt,keyValue){
		var mappingKey = new Array(5);
		for (i = 0 ; i < 5 ; i++){
			mappingKey[i] = new Array(5);
		}

		var keyValuePtr = 0;
		var pointerChar = 'A'; 
		for (i = 0 ; i < 5 ; i++){
			for (j = 0 ; j < 5 ; j++){
				 console.log(keyValue[i*5+j]);
				 if ( keyValue[keyValuePtr] != undefined && !mappingKey.some(row => row.includes(keyValue[keyValuePtr].toUpperCase())) )
				 {

				 		if ((mappingKey.some(row => row.includes('I')) && keyValue[keyValuePtr] == 'J') || (mappingKey.some(row => row.includes('J')) && keyValue[keyValuePtr] =='I'))
				 				continue;

					mappingKey[i][j]= keyValue[keyValuePtr].toUpperCase(); 

				 }

				 else{
				 		if (keyValue[keyValuePtr] != undefined)
				 			continue;

				 		while( (mappingKey.some(row => row.includes(pointerChar))) || (mappingKey.some(row => row.includes('I')) && pointerChar == 'J') ||(mappingKey.some(row => row.includes('J')) && pointerChar == 'I' ) )
				 			{	
				 				pointerChar = String.fromCharCode(Number(pointerChar.toUpperCase().charCodeAt()) + 1 ); 
				 				console.log("ok");
				 			}
				 		mappingKey[i][j] = pointerChar;
				 }

			}
		}

		console.log(mappingKey);
}
*/


function playFairEncryption(plaintxt,keyValue){
		
		plaintxt = plaintxt.toUpperCase().split('J').join('I'); //replacing all 'J's by 'I's  
	    plaintxt = splitIntoPairs(plaintxt);  // pairing two words ; returns array;

	var mappingKey = getMappingKey(keyValue); //returns 2d mapping key 
    var ciphertxt = '';
    var firstLetter ;
    var secondLetter;
    var indexOfFirst;
    var indexOfSecond;

    console.log(plaintxt);
    console.log(mappingKey);

    for (var i = 0 ; i < plaintxt.length ; i++) {
    		
    		firstLetter = plaintxt[i][0];
    		secondLetter = plaintxt[i][1];

    		indexOfFirst = getIndexOf(mappingKey,firstLetter);
    		indexOfSecond = getIndexOf(mappingKey,secondLetter);

    		if (indexOfFirst.row == indexOfSecond.row) { //same row
    				ciphertxt += mappingKey[indexOfFirst.row][(indexOfFirst.col+1)%5];
    				ciphertxt += mappingKey[indexOfSecond.row][(indexOfSecond.col+1)%5];
    			}
    		else if (indexOfFirst.col == indexOfSecond.col){ //same colm
    				ciphertxt += mappingKey[(indexOfFirst.row+1)%5][indexOfFirst.col];
    				ciphertxt += mappingKey[(indexOfSecond.row+1)%5][indexOfSecond.col];
    		}
    		else{  // adjacent
    				ciphertxt += mappingKey[indexOfFirst.row][indexOfSecond.col];
    				ciphertxt += mappingKey[indexOfSecond.row][indexOfFirst.col];
    		}

   	}
   
   return ciphertxt;

   }


   function playFairDecryption(cipherText,keyValue){
   		cipherText = splitIntoPairs(cipherText);

   		var mappingKey = getMappingKey(keyValue);
   		var plainText = '';

    var firstLetter ;
    var secondLetter;
    var indexOfFirst;
    var indexOfSecond;

    for (var i = 0 ; i < cipherText.length ; i++) {
    		
    		firstLetter = cipherText[i][0];
    		secondLetter = cipherText[i][1];

    		indexOfFirst = getIndexOf(mappingKey,firstLetter);
    		indexOfSecond = getIndexOf(mappingKey,secondLetter);

    		if (indexOfFirst.row == indexOfSecond.row ) { //same row
    				plainText += mappingKey[indexOfFirst.row][((indexOfFirst.col-1)+5)%5];
    				plainText += mappingKey[indexOfSecond.row][((indexOfSecond.col-1)+5)%5];
    			}
    		else if (indexOfFirst.col == indexOfSecond.col){ //same colm
    				plainText += mappingKey[((indexOfFirst.row-1)+5)%5][indexOfFirst.col];
    				plainText += mappingKey[((indexOfSecond.row-1)+5)%5][indexOfSecond.col];
    		}
    		else{  // adjacent
    				plainText += mappingKey[indexOfFirst.row][indexOfSecond.col];
    				plainText += mappingKey[indexOfSecond.row][indexOfFirst.col];
    		}

   	}
   
   return plainText;

   }



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

	// 'e' is the english letter that has a highest frequency . so highestFreqChar has the highest chance of being an 'e'.
	//ascii value of e = 69;

	var keyValue = Math.abs(letter.toUpperCase().charCodeAt() - Number( highestFrqChar.toUpperCase().charCodeAt() ) );

	console.log(keyValue);
	var possiblePlainText = ceasarDecryption(cipherText,keyValue);
	
	result2.innerText= possiblePlainText;


}



//-----------------------------other functions------------------------------------------------------

function getMappingKey(keyValue){

	var alphabet = [];
	var index = 0;
	keyValue = keyValue.toUpperCase();
	keyValue = keyValue.split('J').join('I'); //replacing all 'J's by 'I's
	//*initializing alphabet :

	for(i = 0 ; i < 26 ; i++){
		if (i == 9)
			continue;

		alphabet[index++] = String.fromCharCode(i+65);
	}
	// removing repeating char form keyValue
		var set = new Set(keyValue);
		keyValue = Array.from(set);

	// removing keyValue item from alphabet 
		alphabet = alphabet.filter(x => !keyValue.includes(x))

	// creating mappingKey 
		//declaring 2d mappingKey

		var mappingKey  = new Array(5);
		var alphabetPtr  = 0;

		for (i  = 0 ; i < 5 ; i++)
			mappingKey[i]  = new Array(5);

	// initializing mappingKey

		for (i  = 0 ; i < 5 ; i++){
			for (j  = 0 ; j < 5 ; j++){
					if (keyValue[i*5+j] != undefined)
						mappingKey[i][j]  = keyValue[i*5+j];
					else
						mappingKey[i][j]  = alphabet[alphabetPtr++];

			}
		}

		return mappingKey;

}



function splitIntoPairs(plaintxt){
	 plaintxt = plaintxt.toUpperCase();
	 var pairText = new Array();
	 var index = 0;

	if (plaintxt.length % 2 != 0 )  // for odd length text , an additional char 'z' is added at the end of the word
		plaintxt += 'Z';

	for (i = 0 ; i < (plaintxt.length-1); i=i+2){

		if (plaintxt[i] == plaintxt[i+1]){
			pairText[index++] = plaintxt[i]+'X';  
			i--; 
		}

		else
			pairText[index++] = plaintxt[i]+plaintxt[i+1];
	}

	return pairText;
}




function getIndexOf(mappingKey,value){
		for (i = 0 ; i < mappingKey.length ; i++){
			for(j = 0 ; j < mappingKey[0].length ; j++ )
						if (value == mappingKey[i][j]){
								return {'row':i , 'col':j};
						
						}
		}
}