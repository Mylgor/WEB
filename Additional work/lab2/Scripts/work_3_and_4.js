function minus(){
	var number1 = document.getElementById('firstNumber'),
		number2 = document.getElementById('secondNumber'),
		answer = document.getElementById('answer');
	
	if (number1 == null || number2 ==null){
		answer.innerHTML = "NULL";
		return;
	}
	if (number1.value == '' || number2.value == ''){
		answer.innerHTML = "NULL";
		return;
	}
	
	number1 = reverseStr(number1.value);
	number2 = reverseStr(number2.value);

	var len = 0,
		k = 3;
	if (number1.length > number2.length){
		len = number1.length;
		k = 1;
	}else {
		if (number2.length > number1.length){
			len = number2.length;
			k = 2;
		}else{
			for (var i = 0; i < number1.length; i++){
				if (number1[i] > number2[i]){
					len = number1.length;
					k = 1;
					break;
				}
				if (number2[i] > number1[i]){
					len = number2.length;
					k = 2;
					break;
				}
			}
		}
	}

	if (k == 1)
		answer.innerHTML = doMinus(number1, number2, len);
	else if (k ==2)
		answer.innerHTML = doMinus(number2, number1, len) + '-';
	else if (k ==3)
		answer.innerHTML = "NULL";
	
	
	if (k != 3){
		while (answer.innerHTML[len - 1] == 0 && len > 1){
			len--;
			answer.innerHTML = answer.innerHTML.substring(0, len);
		}
		answer.innerHTML = reverseStr(answer.innerHTML);
	}
}

function doMinus(number1, number2, len){
	var answer = '';
	for (var i = 0; i < len; i++){
		if (i < number2.length){
			if (number1[i] >= number2[i]){
				answer += number1[i] - number2[i];
			}else{
				number1 = replSymbolInStr(number1, parseInt(number1[i + 1]) - 1, i + 1);
				answer += 10 - parseInt(number2[i]) + parseInt(number1[i]);			
			}
		} else {			
			if (number1[i] == '-'){
				if (i != len){
					i++;
					answer += 9;
					number1 = replSymbolInStr(number1, parseInt(number1[i + 1]) - 1, i + 1);
				}
			} else {
				answer += number1[i];
			}
		}
	}
	return answer;
}

function reverseStr(str) {
    return str.split("").reverse().join("");
}

function replSymbolInStr(str, symbol, pos){
	path1 = str.substr(0, pos);
	path2 = str.substr(pos + 1, str.length);
	return path1 + symbol + path2;
}






var sec;
var interval;
var isTimerGo = false;
function timer(){
	if (!isTimerGo){
		var res = document.getElementById('result');
		if (res != null)
			res.innerHTML = "";
		console.log("start tick");
		isTimerGo = true;
		initTimer();
	}	  
}

function initTimer(){
	sec = 0;
	interval = setInterval(tick, 1000);
}

function tick(){
	sec++;
	if (sec == 5)
	{
		len = document.getElementById('inputfiled').value.length;
		document.getElementById('result').innerHTML = len + " symbols for " + sec + " sec";
		isTimerGo = false;
		document.getElementById('inputfiled').value = "";
		clearInterval(interval);
	}
}
