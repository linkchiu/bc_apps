

function test(){
var access_token = BCAPI.Helper.Site.getAccessToken();


var request = $.ajax({
    url: "/webresources/api/v3/sites/current/users/me",
    type: "GET",
    connection: "keep-alive",    
    contentType: "application/json",
    mimeType: "application/json ",
    headers: {
        "Authorization": $.cookie('access_token')
    }
});
request.done(function (msg) {
    console.log(msg);
})
request.fail(function (jqXHR) {
    console.log("Request failed.");
    console.log("Error code: " + jqXHR.status);
    console.log("Error text: " + jqXHR.statusText);
    console.log("Response text: " + jqXHR.responseText);
})
}

