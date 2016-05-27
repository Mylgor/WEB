function findWords(){
	eraseMark();
	var text = document.getElementById("text"),
		word = document.getElementById("inputField"),
		body = document.querySelector("body");
	
	if (word != null)
		word = word.value;
	if (word == '' || word.length < 2)
		return;
	
	text.innerHTML = text.innerHTML.replace(new RegExp(word, 'g'), "<span>" + word + "</span>");
}

function eraseMark(){
	document.getElementById("text").innerHTML = text.innerHTML.replace(new RegExp("</span>", 'g'), "");
	document.getElementById("text").innerHTML = text.innerHTML.replace(new RegExp("<span>", 'g'), "");
}