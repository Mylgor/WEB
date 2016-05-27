var clients = {
    users: ko.observableArray()
};

function sendAjaxRequest(httpMethod, callback, url) {
    $.ajax("/api/Dialog" + (url ? "/" + url : ""), {
        type: httpMethod,
        success: callback
    });
}

function getAllItems() {
    sendAjaxRequest("GET", function (data) {
        clients.users.removeAll();
        for (var i = 0; i < data.length; i++) {
            clients.users.push(data[i]);
        }
    });
}

$(document).ready(function () {
    getAllItems();
    ko.applyBindings(clients);
});