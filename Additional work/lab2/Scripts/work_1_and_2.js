function setValidator(id, regex) {
  var inputField = document.getElementById(id);
  if (inputField) {
    var lastValue = inputField.value;
    if (!regex.test(lastValue))
      lastValue = '';
  
    setInterval(function() {
      var value = inputField.value;
      if (value != lastValue) {
        if (regex.test(value))
          lastValue = value;
        else
          inputField.value = lastValue;
      }
    }, 10);
  }
}

function createTable(){
	var mCount = document.getElementById('mCount').value,
		nCount = document.getElementById('nCount').value,
		width = document.getElementById('width').value,
		height = document.getElementById('height').value,
		body = document.querySelector("body"),
		firstTable = document.querySelector("table"),
		tr = "",
		td = "";
	
	table = document.createElement("table");
	
	table.setAttribute("border", "2px");
	for (var j = 0; j < mCount; j++){
		tr = document.createElement("tr");
		for (var i = 0; i < nCount; i++){
			td = document.createElement("td");
			td.setAttribute("width", width);
			td.setAttribute("height", height);
			text = document.createTextNode(rand());
			
			td.appendChild(text);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	if (firstTable == null) {
        return body.appendChild(table);
      } else {
        var newTable = body.appendChild(table);
        return document.body.replaceChild(newTable, firstTable);
      }
}

function rand(){
	var result = '',
		words = 'abcdefghijklmnopqrstuvwxyz',
		maxPosition = words.length - 1;
		
	position = Math.floor(Math.random() * maxPosition);
	result = words.substring(position, position + 1);
	return result;
}