var socket,
            $txt = document.getElementById('messageBox'),
            $user = document.getElementById('userName'),
            $messages = document.getElementById('messagesBox');
if (typeof (WebSocket) != 'undefined') {
    socket = new WebSocket("ws://localhost/Lab3/ChatHandler.ashx");
}
else {
    socket = new MozWebSocket("ws://localhost/Lab3/ChatHandler.ashx");
}

socket.onmessage = function (msg) {
    var $el = document.createElement('p');
    $el.innerHTML = msg.data;
    $messages.appendChild($el);
}

socket.onclose = function (event) {
    alert('Ошибка подключения, перезагрузите страницу');
};

function sendClick() {
    if ($txt.value != "") {
        socket.send($user.innerHTML + ' <br> ' + $txt.value);
        $txt.value = '';
    }
    else {
        $txt.value = 'Введите сообщение';
    }
}