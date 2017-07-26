
$(document).ready(function() {
var access_token = BCAPI.Helper.Site.getAccessToken();
console.log('XXX');
console.log(access_token)
//get All companies
 // var companyRequest = $.ajax({
 //        url: "/webresources/api/v3/sites/current/companies?limit=490&order=company",
 //        type: "GET",
 //        conenection: "keep-alive",
 //        contentType: "application/json",
 //        mimeType: "application/json ",
 //        headers: {
 //            "Authorization": access_token
 //        }
 //    });

 //    companyRequest.done(function(data) {
 //        companylist = data;
 //        console.log('........')
 //        console.log(companylist)

 //    });

}); 