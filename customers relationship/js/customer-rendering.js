/*
 * Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.
 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */
//customer wrapper contains functions that make requests
var operations = {
    QueryCustomer: 0,
    QueryCustomers: 1,
    UpdateCustomer: 2
};

function customerWrapper() {
    this._lastCustomersHttpRequest = null;
    this._lastGetCustomerHttpRequest = null;
    this._lastUpdateCustomerRequest = null;
    this._lastDeleteCustomerRequest = null;
    this._rootPath = "/";
}
var companylist = [];
var companylist2 = [];
$(document).ready(function() {
    $("#inputEmail1").keyup(function() {
  if ( $("#inputEmail1").val() != "") {
    $('#newRelationshipListField').show();
  }else{
     $('#newRelationshipListField').hide();
  }
});
$(".newselectedCompany").select2();
    var customerW = new customerWrapper();
    var access_token = BCAPI.Helper.Site.getAccessToken();
    var addressId=0;
    var companyRequest = customerW.getCompanies("/webresources/api/v3/sites/current/companies?limit=490&order=company");

    var customerTypeRequest = customerW.getCustomerTypes();
    companyRequest.done(function(data) {
        companylist = data.items;
        // $.each(companylist, function(index, value) {
        //     $("#selectedCompany").append($("<option/>", {
        //         value: value.id
        //     }).append(value.company));
        // });

  var companyRequest2 = customerW.getCompanies("/webresources/api/v3/sites/current/companies?skip=490&limit=490&order=company");
  companyRequest2.done(function(data) {
            companylist2 = data.items;
            companylist.push.apply(companylist, companylist2);
        $.each(companylist, function(index, value) {
            $("#selectedCompany").append($("<option/>", {
                value: value.id
            }).append(value.company));
        });

        /*get customer type and company list*/
        customerTypeRequest.done(function(customerTypes) {
            //sort customer type by customer label
            var objs = customerTypes.items;
            objs.sort(function(a, b) {
                return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);
            });
            $.each(objs, function(index, value) {
                $("#selectedCustomerTypeId").append($("<option/>", {
                    value: value.id
                }).append(value.label));
            });
        });
          });
    });


    $("#testAllRelationships").click(function() {
        var allRelationships = customerW.getAllRelationships();
        allRelationships.done(function(data) {
            console.log("all relationships:");
            console.log(data);
        });
            allRelationships.fail(function(jqXHR) {
            console.log("Request failed.");
            console.log("Error code: " + jqXHR.status);
            console.log("Error text: " + jqXHR.statusText);
            console.log("Response text: " + jqXHR.responseText);
        });
    });

    $("#testAllRelationshipTypes").click(function() {
        var testAllRelationshipTypes = customerW.getAllRelationshipTypes();
        testAllRelationshipTypes.done(function(data) {
            console.log("all relationship types:");
            console.log(data);
        });
            testAllRelationshipTypes.fail(function(jqXHR) {
            console.log("Request failed.");
            console.log("Error code: " + jqXHR.status);
            console.log("Error text: " + jqXHR.statusText);
            console.log("Response text: " + jqXHR.responseText);
        });
    });

    $("#addRelationship").click(function() {
        var customerId = 17162334; //linc
        var companyId = 17161635;//serjourn
        var addRelationship = customerW.createRelationship(customerId,1001,companyId,1002);
        addRelationship.done(function(data) {
            console.log("create relationship:");
            console.log(data);
        });
        addRelationship.fail(function(jqXHR) {
            console.log("Request failed.");
            console.log("Error code: " + jqXHR.status);
            console.log("Error text: " + jqXHR.statusText);
            console.log("Response text: " + jqXHR.responseText);
        });
    });

    $("#updateRelationship").click(function() {
        var customerId = 17162334; //linc
        var companyId = 17177073;//fake

        var updateRelationship = customerW.updateRelationship(2159748,17161636);
        updateRelationship.done(function(data) {
            console.log("update relationship:");
            console.log(data);
        });
        updateRelationship.fail(function(jqXHR) {
            console.log("Request failed.");
            console.log("Error code: " + jqXHR.status);
            console.log("Error text: " + jqXHR.statusText);
            console.log("Response text: " + jqXHR.responseText);
        });
    });

    $("#testGetAllCustomers").click(function() {
        var testGetAllCustomers = customerW.getAllCustomers();
        testGetAllCustomers.done(function(data) {
            console.log("all customers:");
            console.log(data);

        });
        testGetAllCustomers.fail(function(jqXHR) {
            console.log("Request failed.");
            console.log("Error code: " + jqXHR.status);
            console.log("Error text: " + jqXHR.statusText);
            console.log("Response text: " + jqXHR.responseText);
        });
    });

 $("#getIMSCustomers").click(function() {
                for(i = 0; i < 3; i++){
                var skip = 0;
                if (i==0) {
                    skip = 0;
                }else if (i==1){
                    skip=500;
                }else if(i==2){
                    skip=1000;
                }
                console.log("customers skip "+ skip)
        var testGetAllCustomers =customerW.getAllCustomers("/webresources/api/v3/sites/current/customers?skip="+skip+"&limit=500&where={'$and': [{'lastUpdateDate':{'$lte':'2017-05-31'}},{'leadSourceTypeId':1701237}]}");
         testGetAllCustomers.done(function(data) {
                console.log('all ims customers count: '+ data.totalItemsCount)
                       for(index in data.items){
                        console.log(index+"xxxx customer0 - 500")
                        var customerId = data.items[index].id;

                        //get all relationships by customer id
                        var getAllRelationships = customerW.getAllRelationshipsByCustomer(customerId);
                        getAllRelationships.done(function(data){

                                var relationships = data.items;
                                var tempRelationships = data.items;
                                console.log(relationships)

                                $.each(relationships, function(i){
                                    // console.log("need to be deleted relationship id: "+ relationships[i].id)
                                    var deleteRelationship = customerW.deleteRelationship(relationships[i].id)
                                    deleteRelationship.done(function(data){
                                        console.log(relationships[i].id+"...be deleted")
                                            }).fail(function(jqXHR) {
      
                                                console.log("Request failed.");
                                                console.log("Error code: " + jqXHR.status);
                                                console.log("Error text: " + jqXHR.statusText);
                                                console.log("Response text: " + jqXHR.responseText);
                                                console.log(relationindex+"...........relationship fail");
                                                })
                                    });  
                        }).fail(function(jqXHR) {
                        console.log("Request failed.");
                        console.log("Error code: " + jqXHR.status);
                        console.log("Error text: " + jqXHR.statusText);
                        console.log("Response text: " + jqXHR.responseText);
                        console.log(relationindex+"...........relationship fail")
                        })
                    }
                 }).fail(function(jqXHR) {
                        console.log("Request failed.");
                        console.log("Error code: " + jqXHR.status);
                        console.log("Error text: " + jqXHR.statusText);
                        console.log("Response text: " + jqXHR.responseText);
                    });  
            } 
            });

        $("#testUpdateAllRelationships").click(function() {
            var primaryRelationshipTypeId = 997142;
            var workLocationRelationshipTypeId = 997143;

            //loop get customer request 3 times, every time get 500 records
           for(i = 0; i < 3; i++){
                var skip = 0;
                if (i==0) {
                    skip = 0;
                }else if (i==1){
                    skip=500;
                }else if(i==2){
                    skip=1000;
                }
            
            var testGetAllCustomers = customerW.getAllCustomers("/webresources/api/v3/sites/current/customers?skip="+skip+"&limit=500&order=id&where={'leadSourceTypeId':1701237}");
            testGetAllCustomers.done(function(data) {
                console.log("skip "+skip+" customers:");
                // console.log(data.items);
                for(index in data.items){
                    console.log(index+"xxxx customer0 - 500");
                    var customerId = data.items[index].id;

                    //get all relationships by customer id
                    var getAllRelationships = customerW.getAllRelationshipsByCustomer(customerId);
                    getAllRelationships.done(function(data){
                        console.log(index+"..... customer0 - 500");
                        //if has relationship
                        if (data.totalItemsCount == 1) {
                                var relationship = data.items[0];
                                var relationshipId = relationship.id;
                                console.log(relationship.relationshipTypeId + "relationship type");

                                 var updateRelationshipType = customerW.updateRelationshipType(relationshipId, primaryRelationshipTypeId); 
                                 updateRelationshipType.done(function(data){

                                   console.log("customer id: "+ relationship.referrerId+"-------- update to primaryRelationshipTypeId");
                                 }).fail(function(jqXHR) {
                                    console.log("Request failed.");
                                    console.log("Error code: " + jqXHR.status);
                                    console.log("Error text: " + jqXHR.statusText);
                                    console.log("Response text: " + jqXHR.responseText);
                                });    
                        }else if(data.totalItemsCount >1){ 
                            var relationships = data.items;
                            var tempRelationships = data.items;
                            var currentItemsCount = data.totalItemsCount;
                            // console.log(relationships);
                            var dumpRelationships = [];
                            $.each(relationships, function(i){
                                    console.log('......');
                                    console.log(relationships);
                                    console.log(i);
                                    console.log(relationships[i+1]);
                                    // console.log(data.totalItemsCount);
                                  if (relationships[i+1]) {   
                                      console.log("company: "+relationships[i].refereeId);
                                        if (relationships[i].refereeId == relationships[i+1].refereeId) {
                                         dumpRelationships.push(relationships[i].id);
                                        } else {
                                            console.log("Company doesn't exist");
                                            var getCurrentCompany = customerW.getCompanies("/webresources/api/v3/sites/current/companies/"+relationships[i].refereeId);
                                            console.log(getCurrentCompany);
                                            getCurrentCompany.done(function(data){
                                                
                                            }).fail(function(jqXHR) {
                                                console.log("Request failed.");
                                                console.log("Error code: " + jqXHR.status);
                                                console.log("Error text: " + jqXHR.statusText);
                                                console.log("Response text: " + jqXHR.responseText);                                
                                                 if (jqXHR.statusText == "Not Found") {
                                                       dumpRelationships.push(relationships[i].id);
                                                 }
                                                
                                            }); 
                                        }
                                 }else{
                                            console.log("Last relationship");
                                            var getCurrentCompany = customerW.getCompanies("/webresources/api/v3/sites/current/companies/"+relationships[i].refereeId);
                                            console.log(getCurrentCompany);
                                            getCurrentCompany.done(function(data){
                                                
                                            }).fail(function(jqXHR) {
                                                console.log("Request failed.");
                                                console.log("Error code: " + jqXHR.status);
                                                console.log("Error text: " + jqXHR.statusText);
                                                console.log("Response text: " + jqXHR.responseText); 
                                                 if (jqXHR.statusText == "Not Found") {
                                                       dumpRelationships.push(relationships[i].id);
                                                 }
                                                
                                            }); 
                                 }
                                });
                            
                        console.log('dumpRelationships....')
                        console.log(dumpRelationships)
                            for(index in dumpRelationships){
                                 var dumpRelationshipId = dumpRelationships[index];
                                 // var i=0;
                                  $.each(relationships, function(i){
                                    var relationshipId = relationships[i].id;    
                                    if (dumpRelationshipId == relationshipId) {
                                           relationships.splice(i,1);
                                           return false;
                                    }      
                                 });
                                var deleteRelationship = customerW.deleteRelationship(dumpRelationshipId);

                                deleteRelationship.done(function(data){
                                                     console.log(dumpRelationshipId+"...be deleted");
                                                     //currentItemsCount = currentItemsCount - 1;
                                             }).fail(function(jqXHR) {
                                                 console.log("Request failed.");
                                                 console.log("Error code: " + jqXHR.status);
                                                 console.log("Error text: " + jqXHR.statusText);
                                                 console.log("Response text: " + jqXHR.responseText);
                                                 console.log(dumpRelationships[index]+"...........relationship fail");
                                                 });
                                       
                                console.log(dumpRelationshipId+".......dumpRelationshipId");
                            }
                            console.log("updated relationships.......")
                            console.log(relationships)
                            //console.log("No. of relationships after deletion: "+currentItemsCount);                           
                            if (relationships.length==1) {
                                // var getUpdatedRelationship = customerW.getAllRelationshipsByCustomer(data.items[0].referrerId);
                                // getUpdatedRelationship.done(function(data){
                                
                                var relationship = data.items[0];
                                    var relationshipId = relationship.id;
                                    console.log(relationship.relationshipTypeId + "relationship type");

                                     var updateRelationshipType = customerW.updateRelationshipType(relationshipId, primaryRelationshipTypeId); 
                                     updateRelationshipType.done(function(data){

                                       console.log("customer id: "+ relationship.referrerId+"-------- update to primaryRelationshipTypeId");
                                     }).fail(function(jqXHR) {
                                        console.log("Request failed.");
                                        console.log("Error code: " + jqXHR.status);
                                        console.log("Error text: " + jqXHR.statusText);
                                        console.log("Response text: " + jqXHR.responseText);
                                    });
                                // });  
                                }else{
                                    var getUpdatedRelationships = customerW.getAllRelationshipsByCustomer(customerId);
                                    getUpdatedRelationships.done(function(data){
                                        var relationships = data.items;
                                        $.each(relationships, function(i){
                                            var relationshipId = relationships[i].id;
                                            var updateRelationshipType = customerW.updateRelationshipType(relationshipId, workLocationRelationshipTypeId); 
                                            updateRelationshipType.done(function(data){
                                                console.log("customer id: "+ relationships[i].referrerId+"-------- update to workLocationRelationshipTypeId");
                                            }).fail(function(jqXHR) {
                                                console.log("Request failed.");
                                                console.log("Error code: " + jqXHR.status);
                                                console.log("Error text: " + jqXHR.statusText);
                                                console.log("Response text: " + jqXHR.responseText);
                                            }) ; 
                                         });
                                    });
                                }      
                        } 
                    }).fail(function(jqXHR) {
                    console.log("Request failed.");
                    console.log("Error code: " + jqXHR.status);
                    console.log("Error text: " + jqXHR.statusText);
                    console.log("Response text: " + jqXHR.responseText);
                    console.log(relationindex+"...........relationship fail");
                    });
                }
        });
        testGetAllCustomers.fail(function(jqXHR) {
            console.log("Request failed.");
            console.log("Error code: " + jqXHR.status);
            console.log("Error text: " + jqXHR.statusText);
            console.log("Response text: " + jqXHR.responseText);
        });
        }
    });

         $("#testUpdateAllCustomers").click(function() {         
          var get500Customers_3 = customerW.getAllCustomers("/webresources/api/v3/sites/current/customers?skip=0&limit=200");
                get500Customers_3.done(function(data) {
                    console.log("all customers:");
                    console.log(data);
                    for(index in data.items){
                         (function(index){
                        var customer = data.items[index];          
                          customer.middleName = "";

                         customer.externalId = customer.id.toString();
                         console.log("externalId....."+customer.externalId);
                         console.log(customer.externalId);
                        var updateRequest = customerW.updateCustomerExternalId(customer.id, customer.externalId, access_token, true);
                        updateRequest.done(function(date){
                            console.log("update external id success 1000 - 1500");
                        });
                        updateRequest.fail(function(jqXHR) {
                            console.log("Request failed.");
                            console.log("Error code: " + jqXHR.status);
                            console.log("Error text: " + jqXHR.statusText);
                            console.log("Response text: " + jqXHR.responseText);
                        });
                    })(index);
                    }   
        });

    });

         $('#newSelectedCountry').change(function(){
            if ($('#newSelectedCountry').val() == 'AU') {
                $('#auStatesList').show();
                $('#nzStatesList').hide();
            }else{
                $('#auStatesList').hide();
                $('#nzStatesList').show();
            }
         })
    $("#submit").click(function() {
      $("#submit").append($("<div/>", {
            style: "text-align:center",
            id: "loaderNewCustomer"
        }).append($("<img/>", {
            src: "images/loading.gif"
        })));
        var titleId = parseInt($("#selectedTitleId").val());
        var customerTypeId = parseInt($("#selectedCustomerTypeId").val());
        var ratingTypeId = parseInt($("#selectedRatingTypeId").val());
        var firstName = $("#inputFirstName").val();
        var midName = "";
        var lastName = $("#inputLastName").val();
        var email = $("#inputEmail1").val();
        var workPhone = $("#inputWorkPhone").val();

        var company =  $("#selectedCompany option:selected").text();
        var companyId = $("#selectedCompany option:selected").val();
        var countryCode = $('#newSelectedCountry').val();
        var stateCode="";
        if (countryCode == 'AU') {
            stateCode = $('#auStatesList').val();
        }else{
              stateCode = $('#nzStatesList').val();
        }

if (email=="") {
 var request = $.ajax({
            url: "/webresources/api/v3/sites/current/customers",
            type: "POST",
            connection: "keep-alive",
            contentType: "application/json",
            mimeType: "application/json ",
            processData: false,
            dataType: "text",
            headers: {
                "Authorization": access_token,
            },
            data: JSON.stringify({
                "titleTypeId":titleId,
                "firstName": firstName,
                "middleName": midName,
                "lastName": lastName,
                "workPhone": {
                    "value": workPhone,
                    "default": false
                },
                "customerTypeId": customerTypeId,
                "ratingTypeId": ratingTypeId,
                "username": email,
                "company": company
            })
        });
      request.done(function(msg) {
         $('#loaderNewCustomer').html("")
          $('#showCreateBox').fadeToggle(100);
          ajaxSuccess();
      }).fail(function(jqXHR) {
          console.log("Request failed.");
          console.log("Error code: " + jqXHR.status);
          console.log("Error text: " + jqXHR.statusText);
          console.log("Response text: " + jqXHR.responseText);
         })
}else{


        var request = $.ajax({
            url: "/webresources/api/v3/sites/current/customers",
            type: "POST",
            connection: "keep-alive",
            contentType: "application/json",
            mimeType: "application/json ",
            processData: false,
            dataType: "text",
            headers: {
                "Authorization": access_token,
            },
            data: JSON.stringify({
                "titleTypeId":titleId,
                "firstName": firstName,
                "middleName": midName,
                "lastName": lastName,
                "email1": {
                    "value": email,
                    "default": true
                },
                "workPhone": {
                    "value": workPhone,
                    "default": false
                },
                "customerTypeId": customerTypeId,
                "ratingTypeId": ratingTypeId,
                "username": email,
                "company": company
            })
        });

        request.done(function(msg) {
              $.ajax({
                  url: "/webresources/api/v3/sites/current/customers?fields=id,email1&skip=0&limit=10&order=id&where={'email1.value':'"+email+"'}",
                  type: "GET",
                  contentType: "application/json",
                  headers: {
                       "Authorization": BCAPI.Helper.Site.getAccessToken()
                  }
              }).done(function(data) {
                  var customerId = data.items[0].id;
                  console.log(countryCode)
                  var createAddress = $.ajax({
                        url: "/webresources/api/v3/sites/current/addresses",
                        data: JSON.stringify({
                            "addressType": 1,
                            "objectId": customerId,
                            "objectType": 1001,
                            "address1": "",
                            "address2": null,
                            "zipCode": "",
                            "city": "",
                            "countryCode": countryCode,
                            "state": stateCode
                        }),
                        type: "POST",
                        contentType: "application/json",
                        headers: {
                            "Authorization": access_token
                        }
                    });

                    createAddress.done(function(){
                      /*create relation */
                      var addRelation = customerW.createRelationship(customerId,1001,companyId,1002);
                        addRelation.done(function(data) {
                              $('#loaderNewCustomer').html("")
                              $('#showCreateBox').fadeToggle(100);
                              ajaxSuccess();
                        })
                        addRelation.fail(function(jqXHR) {
                               $('#loaderNewCustomer').html("")
                               // alert("New record has created, but company field add fail, please update manual.");
                                $('#showCreateBox').fadeToggle(100);
                                ajaxSuccess();
                                console.log("Request failed.");
                                console.log("Error code: " + jqXHR.status);
                                console.log("Error text: " + jqXHR.statusText);
                                console.log("Response text: " + jqXHR.responseText);
                        })
                    })
                    createAddress.fail(function(){
                       $('#loaderNewCustomer').html("")
                       alert("New record has created, but Country field add fail, please update manual.");
                      $('#showCreateBox').fadeToggle(100);
                      ajaxSuccess();
                    })
              }).fail(function(jqXHR) {
                  console.log("Request failed.");
                  console.log("Error code: " + jqXHR.status);
                  console.log("Error text: " + jqXHR.statusText);
                  console.log("Response text: " + jqXHR.responseText);
              })
        });
        request.fail(function(jqXHR) {
            $('#showCreateBox').fadeToggle(100);
            ajaxFailed();
            console.log("Request failed.");
            console.log("Error code: " + jqXHR.status);
            console.log("Error text: " + jqXHR.statusText);
            console.log("Response text: " + jqXHR.responseText);
        });
        }
    });
});

customerWrapper.prototype.queryCustomers = function(resource, queryString, access_token, abortLastRequest) {
    if (typeof this._lastCustomersHttpRequest !== "undefined" && this._lastCustomersHttpRequest != null && abortLastRequest) {
        this._lastCustomersHttpRequest.abort();
    }

    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/" + resource,
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        data: queryString,
        processData: false,
        cache: false,
        timeout: 10000,
        headers: {
            "Authorization": access_token,
            "X-Adobe-SSL": true
        }
    });
    this._lastCustomersHttpRequest = requestBase;
    return requestBase;
};

customerWrapper.prototype.queryCustomer = function(customerId, queryString, access_token, abortLastRequest) {
    if (typeof this._lastGetCustomerHttpRequest !== "undefined" && this._lastGetCustomerHttpRequest != null && abortLastRequest) {
        this._lastGetCustomerHttpRequest.abort();
    }
    var url = this._rootPath + "webresources/api/v3/sites/current/customers/" + customerId;
    var requestBase = $.ajax({
        url: url,
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        processData: false,
        data: queryString,
        cache: false,
         async:false,
        timeout: 10000,
        headers: {
            "Authorization": access_token,
            "X-Adobe-SSL": true
        }
    });
    this._lastGetCustomerHttpRequest = requestBase;
    return requestBase;
};

customerWrapper.prototype.updateCustomer = function(customerId, jsonData, access_token, abortLastRequest) {
    if (typeof this._lastUpdateCustomerRequest !== "undefined" && this._lastUpdateCustomerRequest != null && abortLastRequest) {
        this._lastUpdateCustomerRequest.abort();
    }
    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/customers/" + customerId,
        type: "PUT",
        conection: "keep-alive",
        contentType: "application/json",
        cache: false,
        timeout: 10000,
        processData: false,
        data: JSON.stringify(jsonData),
        headers: {
            "Authorization":$.cookie('access_token'),
            "X-Adobe-SSL": true
        }
    });
    this._lastUpdateCustomerRequest = requestBase;
    return requestBase;
};

customerWrapper.prototype.deleteCustomer = function(customerId, access_token, abortLastRequest) {
    if (typeof this._lastDeleteCustomerRequest !== "undefined" && this._lastDeleteCustomerRequest != null && abortLastRequest) {
        this._lastUpdateCustomerRequest.abort();
    }

    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/customers/" + customerId,
        type: "DELETE",
        conection: "keep-alive",
        contentType: "application/json",
        cache: false,
        timeout: 10000,
        processData: false,
        headers: {
            "Authorization": access_token,
            "X-Adobe-SSL": true
        }
    });

    this._lastDeleteCustomerRequest = requestBase;
    return requestBase;
};

customerWrapper.prototype.getCustomerTypes = function() {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customertypes?limit=50",
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        mimeType: "application/json ",
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

customerWrapper.prototype.getAllCustomers = function(url) {
    var request = $.ajax({
        url: url,
        type: "GET",
        connection: "keep-alive",    
        contentType: "application/json",
        mimeType: "application/json ",
        async:false,
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

customerWrapper.prototype.updateCustomerExternalId = function(customerId, externalId, access_token, abortLastRequest) {
    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/customers/" + customerId,
        type: "PUT",
        conection: "keep-alive",
        contentType: "application/json",
        cache: false,
        timeout: 10000,
        processData: false,
        data: JSON.stringify({
        "externalId":externalId
        }),
        headers: {
            "Authorization": $.cookie('access_token'),
            "X-Adobe-SSL": true
        }
    });
    return requestBase;
};

customerWrapper.prototype.getCompanies = function(url) {
    var request = $.ajax({
        url: url,
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        mimeType: "application/json ",
        async: false,
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

customerWrapper.prototype.getLastRequest = function(operationType) {
    if (!(operationType in operations)) {
        return;
    }
    switch (operationType) {
        case operations.QueryCustomer:
            return _lastGetCustomerHttpRequest;
        case operations.QueryCustomers:
            return _lastCustomersHttpRequest;
        case operations.UpdateCustomer:
            return _updateCustomerHttpRequest;
    }
};

customerWrapper.prototype.createAddress = function(customerId, countryCode,customerState){
        var request = $.ajax({
            url: "/webresources/api/v3/sites/current/addresses",
            data: JSON.stringify({
                "addressType": 1,
                "objectId": customerId,
                "objectType": 1001,
                "address1": "",
                "address2": null,
                "zipCode": "",
                "city": "",
                "countryCode": countryCode,
                "state": customerState
            }),
            type: "POST",
            contentType: "application/json",
            headers: {
                "Authorization": access_token
            }
        });
        return request;
}

customerWrapper.prototype.updateAddress = function (objectId, countryCode,customerState){
        var request = $.ajax({
            url: "/webresources/api/v3/sites/current/addresses/"+objectId,
            data: JSON.stringify({
                "countryCode": countryCode,
                "state":customerState
            }),
            type: "PUT",
            contentType: "application/json",
            headers: {
                "Authorization": access_token
            }
        });
         return request;
}

customerWrapper.prototype.getAddress = function (customerId){
  var request = $.ajax({
            url: "/webresources/api/v3/sites/current/addresses?fields=objectId,id,countryCode,state,customer&skip=0&limit=10&order=id&where={'customer.id':'"+customerId+"'}",
            type: "GET",
            contentType: "application/json",
            headers: {
                "Authorization": BCAPI.Helper.Site.getAccessToken()
            }
        })
         return request;
}

//getAllRelationshipTypes
customerWrapper.prototype.getAllRelationshipTypes = function() {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/relatioshiptypes",
        type: "GET",
        connection: "keep-alive",    
        contentType: "application/json",
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

//getAllRelationships
customerWrapper.prototype.getAllRelationships = function() {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customerrelationships",
        type: "GET",
        connection: "keep-alive",    
        contentType: "application/json",
        async: false,
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

//getAllRelationships by customer
customerWrapper.prototype.getAllRelationshipsByCustomer = function(customerId) {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customerrelationships?where={'referrerId':'" + customerId + "'}",
        type: "GET",
        connection: "keep-alive",    
        contentType: "application/json",
        async: false,
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

//get relationhip
customerWrapper.prototype.getRelationship = function(id) {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customerrelationships/"+id,
        type: "GET",
        connection: "keep-alive",    
        contentType: "application/json",
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

//create ralationship
customerWrapper.prototype.createRelationship = function(referrerId,referrerType, refereeId,refereeType) {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customerrelationships",
        type: "POST",
        connection: "keep-alive",    
            contentType: "application/json",
        headers: {
            "Authorization": $.cookie('access_token')
        },
        processData: false,
        data: JSON.stringify({
              referrerId: referrerId,
              referrerType: referrerType,
              refereeId: refereeId,
              refereeType: refereeType,
              relationshipTypeId:997142
            })
    });
    return request;
};

//update relationship
customerWrapper.prototype.updateRelationship = function(id, refereeId) {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customerrelationships/"+id,
        type: "PUT",
        connection: "keep-alive",    
            contentType: "application/json",
        headers: {
            "Authorization": $.cookie('access_token')
        },
        processData: false,
        data: JSON.stringify({
            "refereeId": refereeId
            })
    });
    return request;
};

//update relationship
customerWrapper.prototype.updateRelationshipType = function(id, relationshipTypeId) {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customerrelationships/"+id,
        type: "PUT",
        connection: "keep-alive",    
            contentType: "application/json",
        headers: {
            "Authorization": $.cookie('access_token')
        },
        processData: false,
        async:false,
        data: JSON.stringify({
            "relationshipTypeId": relationshipTypeId
            })
    });
    return request;
};

//delete relationship
customerWrapper.prototype.deleteRelationship = function(id) {
    var request = $.ajax({
        url: "/webresources/api/v3/sites/current/customerrelationships/"+id,
        type: "DELETE",
        connection: "keep-alive",    
        contentType: "application/json",
        async:false,
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });
    return request;
};

var customerW = new customerWrapper();
var expandedCustomer = false;
var expandedOrders = false;
var access_token = BCAPI.Helper.Site.getAccessToken();

//This function it is used when receiveing an answer from a get customer request and populate the customer list
function renderCustomersFromObject(jsonObject) {
    console.log(jsonObject);
    var totalItems = jsonObject.totalItemsCount;
    if (totalItems == 0) {
        $("#main_content_table").append("No results found.");
        return;
    }

    for (var i = 0; i < jsonObject.items.length; i++) {
        var customer = jsonObject.items[i];
        renderCustomerFromObject(customer);
    }

    var nrPages = totalItems / 50;

    if (nrPages > 1) {
        showPagination(nrPages);
    }
}


function showPagination(nrPages) {
    var $ul = $("<ul/>", {
        class: "pagination"
    });

    for (var i = 0; i < nrPages; i++) {
        var skip = i * 50;
        $ul.append($("<li>").append($("<a/>", {
            onClick: "searchWithLimit(" + skip + ",50)"
        }).append(i + 1)));
    }

    $("#mainContentPanelBody").append($("<div/>", {
        class: "text-center",
        id: "paginationContainer"
    }).append($ul));
}

//This function it is used to render each customer row and append it to main table content.
function renderCustomerFromObject(jsonObject) {
    //query address, to get state field
     var addressRequest = customerW.getAddress(jsonObject.id)
     addressRequest.done(function(data){

            //render first table row content
    var $customerTableRow = $("<tr/>", {
        class: "customer" + jsonObject.id
    });

    if (jsonObject.titleType) {
        var titleTypeValue = jsonObject.titleType.label;
    } else {
        var titleTypeValue = "";
    }
    var $customerTitleTypeTableData = $("<td/>").append($("<input/>", {
        class: "form-control firstFieldsDisabled",
        value: titleTypeValue,
        type: "text",
        id: "titleType"
    }));
    $customerTitleTypeTableData.appendTo($customerTableRow);

    var $customerName = $("<td/>").append($("<input/>", {
        value: jsonObject.firstName + " " + jsonObject.lastName,
        class: "form-control firstFieldsDisabled",
        type: "text",
        id: "customerName"
    }));
    $customerName.appendTo($customerTableRow);


    if (!jsonObject.email1) {
        var emailValue = "";
    } else {
        var emailValue = jsonObject.email1.value;
    }
    var $customerEmailTableData = $("<td/>").append($("<input/>", {
        class: "form-control firstFieldsDisabled",
        value: emailValue,
        type: "text",
        id: "email1"
    }));
    $customerEmailTableData.appendTo($customerTableRow);

    if (jsonObject.customerType) {
        var typeValue = jsonObject.customerType.label;
    } else {
        var typeValue = "";
    }

    if (jsonObject.industryType) {
        var $industryTypeTableData = $("<td/>").append($("<input/>", {
            class: "form-control firstFieldsDisabled",
            value: jsonObject.industryType.label,
            type: "text",
            id: "industyType"
        }));
    }else{
            var $industryTypeTableData = $("<td/>").append($("<input/>", {
            class: "form-control firstFieldsDisabled",
            value: " ",
            type: "text",
            id: "industyType"
        }));
    }
    $industryTypeTableData.appendTo($customerTableRow);

    var $customerTypeTableData = $("<td/>").append($("<input/>", {
        class: "form-control firstFieldsDisabled",
        value: typeValue,
        type: "text",
        id: "customerType"
    }));
    $customerTypeTableData.appendTo($customerTableRow);


//render state field
        if (data.totalItemsCount>0) {
            var $customerStateTableData = $("<td/>").append($("<input/>", {
                class: "form-control firstFieldsDisabled",
                value: data.items[0].state,
                type: "text",
                id: "state"
            }));

        }else{
            var $customerStateTableData = $("<td/>").append($("<input/>", {
                class: "form-control firstFieldsDisabled",
                value: "",
                type: "text",
                id: "state"
            }));
        }


    $customerStateTableData.appendTo($customerTableRow);

    //render rating field
    if (jsonObject.ratingType) {
        var ratingValue = jsonObject.ratingType.label;
    } else {
        var ratingValue = "";
    }
    
    var $customerPriorityTableData = $("<td/>").append($("<input/>", {
        class: "form-control firstFieldsDisabled",
        value: ratingValue,
        type: "text",
        id: "ratingType"
    }));
    $customerPriorityTableData.appendTo($customerTableRow);

    var $chooseActionTableData = $("<td/>");
    $chooseActionTableData.appendTo($customerTableRow);

    var $buttonDivContainer = $("<div/>", {
        class: "btn-group"
    });
    $buttonDivContainer.appendTo($chooseActionTableData);
    //expand button
    var $customerShowDetailsTableData = $("<td/>");
    $customerShowDetailsTableData.appendTo($customerTableRow);
    var $customerShowDetailsButton = $("<button/>", {
        class: "btn btn-default accordion-toggle",
        onClick: "advancedSearch(" + jsonObject.id + ")"
    });
    $customerShowDetailsButton.attr("data-target", "#" + jsonObject.id.toString());
    $customerShowDetailsButton.attr("data-toggle", "collapse");
    $customerShowDetailsButton.appendTo($customerShowDetailsTableData);
    var $customerShowDetailsSpan = $("<span/>", {
        class: "glyphicon glyphicon-chevron-down",
        id: "expandBtn_" + jsonObject.id
    });
    $customerShowDetailsSpan.appendTo($customerShowDetailsButton);

    //delete button
    var $customerDeleteColumn = $("<td/>");
    $customerDeleteColumn.appendTo($customerTableRow);
    var $customerDeleteButton = $("<button/>", {
        class: "btn btn-default",
        onClick: "deleteCustomerWrap(" + jsonObject.id + ")"
    });
    $customerDeleteButton.appendTo($customerDeleteColumn);
    var $customerDeleteSpan = $("<span/>", {
        class: "glyphicon glyphicon-remove"
    });
    $customerDeleteSpan.appendTo($customerDeleteButton);


    //append customer row to main table
    $customerTableRow.appendTo("#main_content_table");


    //disable inputs for editing
    $(".firstFieldsDisabled").attr('disabled', true);


    //add the div with the expandable content
    var $customerExpandedFieldsRow = $("<tr/>", {
        class: "customer" + jsonObject.id
    });
    var $customerExpandedTableData = $("<td/>", {
        colspan: "12",
        class: "hiddenRow"
    });
    var $colapsableDiv = $("<div/>", {
        class: "accordian-body collapse",
        id: jsonObject.id
    });
    $colapsableDiv.appendTo($customerExpandedTableData);
    $customerExpandedTableData.appendTo($customerExpandedFieldsRow);
    $customerExpandedFieldsRow.appendTo("#main_content_table");

     }) 

}

//This function is used for extracting all input data from a customer and form a json object that will be used for update.
function extractCustomerData(customerId,access_token,relationships) {
    var countryCode = $("#selectedCountry"+customerId).val();
     var customerState = $("#selectedState"+customerId).val();
    values = new Object;
    var title, name, email, customerType, ratingType;
    $(".form_" + customerId).each(function(index) {
        if ($(this).val() != 0) {
            propertyName = $(this).attr('id');
            field = values;
            if (propertyName.indexOf('.') > -1) {
                str = propertyName.split(".");
                for (var i = 0; i < str.length - 1; i++) {
                    if (!field.hasOwnProperty(str[i])) {
                        field[str[i]] = new Object();
                    }
                    field = field[str[i]];
                }
                field[str[str.length - 1]] = $(this).val();
            } else {
                  values[propertyName] = $(this).val();
            }
        }
    });
    $("#" + customerId).html("");
    $("#" + customerId).append($("<div/>", {
        style: "text-align:center",
        id: "loaderCustomer" + customerId
    }).append($("<img/>", {
        src: "images/loading.gif"
    })));

    var request = customerW.updateCustomer(customerId, values, access_token, true);
    request.done(function() {
      /*update company realtion*/
      /*if no relationship before, check if need create new relation*/
      if (!relationships) {
        /*create new relationship*/
        if (values.hasOwnProperty('company-x-'+customerId)) {
            var refereeId = parseInt(values['company-x-'+customerId])
            var addRelationReqeust = customerW.createRelationship(customerId,1001,refereeId,1002);
            addRelationReqeust.done(function(data) {}).fail(function(jqXHR) {
                console.log("Request failed.");
                console.log("Error code: " + jqXHR.status);
                console.log("Error text: " + jqXHR.statusText);
                console.log("Response text: " + jqXHR.responseText);
            })
        }
        /*end create relation ship*/
      }else{
        //update relationships
        for(var index in relationships){
            var relationshipId = relationships[index].id
            var refereeId = parseInt(values['company-'+index+'-'+customerId])
            if (isNaN(refereeId)) {
               var deleteCompanyRelation = customerW.deleteRelationship(relationshipId)
            }else{
                console.log(relationshipId+'/'+refereeId)
                var updateCompanyRelation = customerW.updateRelationship(relationshipId,refereeId)
                updateCompanyRelation.done(function(data) {console.log("update relationship success")}).fail(function(jqXHR) {
                    console.log("Request failed.");
                    console.log("Error code: " + jqXHR.status);
                    console.log("Error text: " + jqXHR.statusText);
                    console.log("Response text: " + jqXHR.responseText);
                })        
            }
        }

        var maxRelation = relationships.length;
        var newRefereeId = parseInt(values['company-'+maxRelation+'-'+customerId]);
        while (!isNaN(newRefereeId)) {
            console.log("1..."+newRefereeId)
            var addRelationReqeust = customerW.createRelationship(customerId,1001,newRefereeId,1002);
            addRelationReqeust.done(function(data) {   
            }).fail(function(jqXHR) {
                console.log("Request failed.");
                console.log("Error code: " + jqXHR.status);
                console.log("Error text: " + jqXHR.statusText);
                console.log("Response text: " + jqXHR.responseText);
            })
             maxRelation = maxRelation+1
                newRefereeId = parseInt(values['company-'+maxRelation+'-'+customerId]);
                console.log("2..."+newRefereeId)          
        }

      }

      /*end update company relation*/

      /*update country*/
        if (addressId == 0) {
          var createAddress = customerW.createAddress(customerId,countryCode,customerState);
          createAddress.done(function(){
            $("#" + customerId).html("");
            $("#" + customerId).removeClass("in");
            changeExpandButtonIcon(customerId);
          })
        createAddress.fail(function() {
           console.log("Request failed.");
              console.log("Error code: " + jqXHR.status);
              console.log("Error text: " + jqXHR.statusText);
              console.log("Response text: " + jqXHR.responseText);
              ajaxFailed();
          });
        }else{
            var updateAddress = customerW.updateAddress(addressId,countryCode,customerState);
            updateAddress.done(function(){
              changeExpandButtonIcon(customerId);
            })
          updateAddress.fail(function() {
                console.log("Request failed.");
                console.log("Error code: " + jqXHR.status);
                console.log("Error text: " + jqXHR.statusText);
                console.log("Response text: " + jqXHR.responseText);
                ajaxFailed();
        });
        }
          /*end update country*/

          $("#" + customerId).html("");
          $("#" + customerId).removeClass("in");
          changeExpandButtonIcon(customerId);
          ajaxSuccess();
          // searchWithLimit(0,50);
    });

    request.fail(function() {
        $("#" + customerId).html("");
        $("#" + customerId).removeClass("in");
        changeExpandButtonIcon(customerId);
        ajaxFailed();
    });
}

function createQuery(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    query = {
        '$or': [{
            'firstName': {
                '$contains': searchTerm
            }
        }, {
            'lastName': {
                '$contains': searchTerm
            }
        }, {
            'middleName': {
                '$contains': searchTerm
            }
        }, {
            'username': {
                '$contains': searchTerm
            }
        }]
    };

    return JSON.stringify(query);
}


$(function() {
    searchWithLimit(0, 50);
});

function cancelExpand(customerId) {
    $("#" + customerId).removeClass("in");
    changeExpandButtonIcon(customerId);
}

function disableSelects() {
    $(".disableSelect").attr("disabled", true);
    $("#valuesFilter").fadeToggle(100);
    $("#refreshButton").fadeToggle(100);
}

function refresh() {
    $("#refreshButton").fadeToggle(100);

    $(".disableSelect").attr("disabled", false);
    $('.disableSelect').val("0");

    $(".disableInputs").attr("disabled", false);
    $(".disableInputs").val("");

    $("#valuesFilter").fadeToggle(100);
    $("#searchButton").hide(100);
}

function disableInputsAndStartSearch() {
    $(".disableInputs").attr("disabled", true);
    $("#searchButton").fadeToggle(100);
}

function startSearch() {
    var property;
    $(".disableSelect").each(function(index) {
        if ($(this).val() != 0) {
            property = $(this).val();
        }
    });

    var operator;
    var propertyValue;

    $(".disableInputs").each(function(index) {
        if ($(this).val() != "") {
            propertyValue = $(this).val();
            operator = $(this).attr('id');
        }
    });

    query = new Object;

    switch (operator) {
        case 'lowerThan':
            {
                query[property] = new Object;
                query[property]['$lte'] = propertyValue;
            }
            break;

        case 'greaterThan':
            {
                query[property] = new Object;
                query[property]['$gte'] = propertyValue;
            }
            break;

        case 'notEquals':
            {
                query[property] = new Object;
                query[property]['$ne'] = propertyValue;
            }
            break;

        case 'equals':
            {
                query[property] = propertyValue;
            }
            break;

        case 'contains':
            {
                query[property] = new Object;
                query[property]['$contains'] = propertyValue;
            }
            break;

        case 'beginsWith':
            {
                query[property] = new Object;
                query[property]['$beginsWith'] = propertyValue;
            }
            break;
    }

    serializedQuery = JSON.stringify(query);
    console.log("........." + serializedQuery);

    refresh();
    $('#showFilter').fadeToggle(500);

    customerW.queryCustomers("customers", "where=" + serializedQuery + "&fields= id, username, middleName,  lastName, firstName, email1,ratingType,customerType,industryType,company,titleType", access_token, true).done(function(data) {
        renderCustomersFromObject(data);
    });
}

var queryTimeoutSet = false;


function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

function simpleSearch() {
    if (!queryTimeoutSet) {
        queryTimeoutSet = true;
        setTimeout(function() {
            queryString = $('#simpleSearchField').val();

            customerW.queryCustomers("customers", "where=" + createQuery(queryString) + "&fields= id, username, middleName,lastName, firstName, email1,ratingType,industryType,customerType,titleType", access_token, true).done(function(data) {
                renderCustomersFromObject(data);
                queryTimeoutSet = false;
            })
        }, 300)
    }
};

function changeExpandButtonIcon(customerId) {
    expandButton = $('#expandBtn_' + customerId);
    currentClass = expandButton.attr('class');
    if (currentClass == 'glyphicon glyphicon-chevron-down') {
        expandButton.attr("class", "glyphicon glyphicon-chevron-up");
    } else {
        expandButton.attr("class", "glyphicon glyphicon-chevron-down");
    }
}

function advancedSearch(customerId) {
    changeExpandButtonIcon(customerId);
            var referType;
            var relationshipId = 0;
    $("#" + customerId).append($("<div/>", {
        style: "text-align:center",
        id: "loaderCustomer" + customerId
    }).append($("<img/>", {
        src: "images/loading.gif"
    })));

    var addressTypeNames = {
        "1": "Home Address",
        "2": "Work Address",
        "3": "PO Box",
        "8": "Billing Address"
    }
    var fields = "id,firstName,lastName,middleName,titleTypeId,email1,email2,email3,homeFax,homePhone,mobilePhone,pager,webAddress,workFax,workPhone,anniversary,titleType,ratingType,leadSourceType,industryType,customerType,company";
    var request = customerW.queryCustomer(customerId, "fields=" + fields, access_token, true);
    var customerTypeRequest = customerW.getCustomerTypes();
    var securezonesRequest = $.ajax({
        url: "/webresources/api/v3/sites/current/securezones",
        type: "GET",
        connection: "keep-alive",
        contentType: "application/json",
        headers: {
            "Authorization": $.cookie('access_token')
        }
    });

    //var ratingTypeRequest = customerW.queryCustomers("ratingTypes","",access_token,true);
    request.done(function(data) {
        customer = data;
        console.log(customer);
        $('#' + customer.id).html("");
        $("#" + customerId).append($("<div/>", {
            style: "text-align:center",
            id: "loaderCustomer" + customerId
        }).append($("<img/>", {
            src: "images/loading.gif"
        })));

        var request2 = customerW.queryCustomers("titletypes", "", access_token, true);

        request2.done(function(titleTypes) {
            var $detailsTable = ""
             $detailsTable = $("<table/>", {
                class: "table"
            }).
            append($("<thead/>").append($("<tr/>").append($("<th/>").append("Contact details"))));

            if (customer.ratingType) {
                var ratingValue = customer.ratingType.label
                  var ratingTypeId = customer.ratingType.id
            } else {
                var ratingValue = "";
                 var ratingTypeId = 0;
            }
            if (customer.customerType) {
                var customerTypeValue = customer.customerType.label
            } else {
                var customerTypeValue = "";
            }
            if (customer.titleType) {
                var titleTypeValue = customer.titleType.label
            } else {
                var titleTypeValue = "";
            }

            if (customer.industryType) {
                console.log(customer.industryType)
                var industryValue = customer.industryType.label
                var industryTypeId = customer.industryType.id
            } else {
                var industryValue = "";
                var industryTypeId = 0;
            }

            /*render title type dropdown list*/
            var $titleDiv = $("<div/>", {
                class: "form-group"
            });

            $titleDiv.append($("<label/>", {
                for: "titleTypeId"
            }).append("Title Type"));

            var $titleTypeSelect = $("<select/>", {
                class: "form-control form_" + customer.id,
                id: "titleTypeId"
            });


            $.each(titleTypes.items, function(index, value) {
                if (value.id == customer.titleTypeId) {
                    $titleTypeSelect.append($("<option/>", {
                        value: value.id,
                        selected: "selected"
                    }).append(value.label))
                } else {
                    $titleTypeSelect.append($("<option/>", {
                        value: value.id
                    }).append(value.label))
                }
            });

            $titleTypeSelect.appendTo($titleDiv);
            /*end title type dropdown list*/
            var $firstName = $("<div/>", {
                class: "form-group"
            }).
            append($("<label/>", {
                for: "firstName"
            }).append("First Name")).
            append($("<input/>", {
                type: "text",
                class: "form-control form_" + customer.id,
                id: "firstName",
                placeholder: "First Name",
                value: customer.firstName
            }));

            var $lastName = $("<div/>", {
                class: "form-group"
            }).
            append($("<label/>", {
                for: "lastName"
            }).append("Last Name ")).
            append($("<input/>", {
                type: "text",
                class: "form-control form_" + customer.id,
                id: "lastName",
                placeholder: "Last Name",
                value: customer.lastName
            }));
            /*render work phone*/
            if (!customer.workPhone) {
                var customerWorkPhone = "";
            } else {
                var customerWorkPhone = customer.workPhone.value;
            }
            var $workPhone = $("<div/>", {
                class: "form-group"
            }).append($("<label/>", {
                for: "workPhone.value"
            }).append("Phone Number")).
            append($("<input/>", {
                type: "text",
                class: "form-control form_" + customer.id,
                id: "workPhone.value",
                placeholder: "Work Phone",
                value: customerWorkPhone
            }));

            /*end render workphone*/
            
            /*render email*/
            if (!customer.email1) {
                var customerEmail = "";
            } else {
                var customerEmail = customer.email1.value;
            }
            var $email1 = $("<div/>", {
                class: "form-group"
            }).append($("<label/>", {
                for: "email1.value"
            }).append("Email")).
            append($("<input/>", {
                type: "text",
                class: "form-control form_" + customer.id,
                id: "email1.value",
                placeholder: "Email",
                value: customerEmail
            }));
            /*end rend email*/

            var ratingList = [
            {id:466005,label:'1'},
            {id:466006,label:'2'},
            {id:466008,label:'3'},
            {id:466009,label:'4'}]

            //render industry type dropdown list
             var $ratingType = $("<div/>", {
                                    class: "form-group"
                                }).append($("<label/>", {
                                        for: "ratingType.label"
                                    }).append("Priority")).
                                    append($("<select/>", {
                                            class: "form-control form_" + customer.id,
                                            id: "ratingTypeId"
                                        }).append($("<option/>")));

                       for(index in ratingList){
                            var rating = ratingList[index];
                            console.log('ratingTypeId............'+rating.id+"/"+ratingTypeId)
                            if (ratingTypeId == rating.id) {
                                $ratingType.find("select").append($("<option/>", {
                                        value: rating.id,
                                        selected: "selected"
                                    }).append(rating.label));
                            }else{
                                $ratingType.find("select").append($("<option/>", {
                                        value: rating.id
                                    }).append(rating.label));
                            }  
                       }
                        var industryList = [
                        {id:3990210,label:'General Practice'},
                        {id:3990211,label:'Metabolic Medicine'},
                        {id:3990212,label:'Neonatology'},
                        {id:3990213,label:'Pain Management'},            
                        {id:3990214,label:'Pharmacy - Hospital'},
                        {id:3990215,label:'Pharmacy - Retail'},
                        {id:3990216,label:'Pharmacy - SAS'},
                        {id:3990217,label:'Paediatrics'},
                        {id:3990218,label:'Gastroenterology'},
                        {id:3990219,label:'Endocrinology'},
                        {id:3990212,label:'Neonatology'},
                        {id:3990220,label:'Neurology'},            
                        {id:3990221,label:'Internal Medicine'},
                        {id:3990222,label:'Emerge Health - staff/partners'},
                        {id:2699989,label:'Other'}]
                       //render industry type dropdown list

             var $industryType = $("<div/>", {
                                    class: "form-group"
                                }).append($("<label/>", {
                                        for: "industryType.label"
                                    }).append("Therapy Area")).
                                    append($("<select/>", {
                                            class: "form-control form_" + customer.id +" industrySelect_"+customer.id,
                                            id: "industryTypeId"
                                        }).append($("<option/>")));

           for(index in industryList){
                var industry = industryList[index];
                console.log('industry............'+industry.id+"/"+industryTypeId)
                if (industryTypeId == industry.id) {
                    $industryType.find("select").append($("<option/>", {
                            value: industry.id,
                                selected: "selected"
                        }).append(industry.label));
                }else{
                    $industryType.find("select").append($("<option/>", {
                            value: industry.id
                        }).append(industry.label));
                }  
           }


            //render customer type dropdown list
            customerTypeRequest.done(function(data) {
                customerTypes = data;
                $customerTypeList = $("<div/>", {
                    class: "form-group"
                }).append($("<label/>", {
                    for: "customerType.label"
                }).append("Customer Type")).
                append($("<select>", {
                    id: "customerTypeId",
                    class: "form-control form_" + customer.id,
                }));
                var customerTypesArray = customerTypes.items
                customerTypesArray.sort(function(a, b) {
                    return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);
                });

                for (i = 0; i < customerTypesArray.length; i++) {
                    if (customerTypesArray[i].label == customerTypeValue) {
                        $customerTypeList.find("select").append($("<option/>", {
                            value: customerTypesArray[i].id,
                            selected: "selected"
                        }).append(customerTypesArray[i].label));
                    } else {
                        $customerTypeList.find("select").append($("<option/>", {
                            value: customerTypesArray[i].id
                        }).append(customerTypesArray[i].label));
                    }
                }


          /*get customer country code*/
          console.log(customer.id)
            var addressRequest = customerW.getAddress(customer.id)
            addressRequest.done(function(data){
                 console.log('..........................')
                console.log(data)
                    if (data.totalItemsCount>0) {
                         addressId = data.items[0].id;
                      var countryCode = data.items[0].countryCode
                      var customerState = data.items[0].state
                  }else{
                     addressId = 0;
                    var countryCode = 0
                    var customerState = ''
                }
                  /*render country list*/
                  var $countryList = $("<div/>", {
                      class: "form-group"
                  }).
                  append($("<label/>", {
                      for: "country"
                  }).append("Country")).
                  append($("<select/>", {
                      class: "form-control",
                      id: "selectedCountry"+customer.id,
                  }).append($("<option/>", {
                        value: "0"
                    }).append("----")));
                  

                  var $stateList =$("<div/>", {
                          class: "form-group"
                      }).
                      append($("<label/>", {
                          for: "state"
                      }).append("State")).
                      append($("<select/>", {
                          class: "form-control",
                          id: "selectedState"+customer.id,
                      }).append($("<option/>", {
                            value: ""
                        }).append("----")));

            var countryList = [
            {id:'AU',label:'Australia'},
            {id:'NZ',label:'New Zealand'}]

            var auStateList = [
            {id:'VIC'},
            {id:'NSW'},
            {id:'QLD'},
            {id:'WA'},
            {id:'SA'},
            {id:'TAS'},
            {id:'ACT'},
            {id:'NT'}
            ]

             var nzStateList = [
            {id:'Northland'},
            {id:'Auckland'},
            {id:'Waikato'},
            {id:'Bay of Plenty'},
            {id:'Gisborne'},
            {id:"Hawke's Bay"},
            {id:'Taranaki'},
            {id:'Manawatu-Wanganui'},
            {id:'Wellington'},
            {id:'Tasman'},
            {id:'Nelson'},
            {id:'Marlborough'},
            {id:'West Coast'},
            {id:"Canterbury"},
            {id:'Otago'},
            {id:'Southland'}
            ]


               for(index in countryList){
                    var country = countryList[index];
                    console.log('country............'+country.id+"/"+countryCode)
                    if (countryCode == country.id) {
                        $countryList.find("select").append($("<option/>", {
                                value: country.id,
                                selected: "selected"
                            }).append(country.label));
                    }else{
                        $countryList.find("select").append($("<option/>", {
                                value: country.id
                            }).append(country.label));
                    }  
               }


            /*render state list*/
               if (countryCode == 'AU') {
                for(index in auStateList){
                    var state = auStateList[index].id;
                    if (customerState == state) {
                            $stateList.find("select").append($("<option/>", {
                                value: state,
                                selected: "selected"
                            }).append(state));
                    }else{
                          $stateList.find("select").append($("<option/>", {
                                value: state
                            }).append(state));
                    }
                }
               }else if(countryCode == 'NZ'){
                   for(index in nzStateList){
                    var state = nzStateList[index].id;
                    if (customerState == state) {
                            $stateList.find("select").append($("<option/>", {
                                value: state,
                                selected: "selected"
                            }).append(state));
                    }else{
                          $stateList.find("select").append($("<option/>", {
                                value: state
                            }).append(state));
                    }
                }
               }
             /*end render state list*/
            
            /*request company info*/
            //relationship create from the customer
            $.ajax({
                url: "/webresources/api/v3/sites/current/customerrelationships?fields=id,referrerId,refereeId,referrerType,refereeType&skip=0&limit=10&order=id&where={'referrerId':'" + customer.id + "'}",
                type: "GET",
                contentType: "application/json",
                headers: {
                    "Authorization": BCAPI.Helper.Site.getAccessToken()
                }
            }).done(function(data) { 
                    var relationships;
                    var $company= $("<div/>", {class: "form-group",id:"relationshipListField"}).append($("<label/>", {for: "company"}).append("Hospital"));
                    if (data.totalItemsCount > 0) {
                        console.log("customer is referrerId")
                        relationships = data.items;
                        for(var index in relationships){
                            //render company
                             $company.append($("<div/>",{
                                class:"row"
                              }).append($("<div/>",{
                                class:"col-xs-9"
                              }).append($("<select/>", {
                                  class: "form-control hospitalDropDown form_" + customer.id ,
                                  id: "company"+ "-"+index+"-"+customer.id,
                              }))).                          
                             append($("<div/>",{
                                class:"col-xs-1"
                              }).append($("<span/>",{
                                class:"glyphicon glyphicon-minus",
                                onClick:"deleteRelationship("+index+","+customer.id+")"
                              }))).                          
                             append($("<div/>",{
                                class:"col-xs-1"
                              }).append($("<span/>",{
                                class:"glyphicon glyphicon-plus",
                                onClick:"addRelationship("+relationships.length+","+customer.id+")"
                              }))));
                              $company.find("#company"+ "-"+index+"-"+customer.id).append($("<option/>"));
                              for (i = 0; i < companylist.length; i++) {
                                  if (relationships[index].refereeId == companylist[i].id) {
                                      $company.find("#company"+ "-"+index+"-"+customer.id).append($("<option/>", {
                                          value: companylist[i].id,
                                          selected: "selected"
                                      }).append(companylist[i].company));
                                  } else {
                                      $company.find("#company"+ "-"+index+"-"+customer.id).append($("<option/>", {
                                          value: companylist[i].id,
                                      }).append(companylist[i].company));
                                  }
                              }
                            //end render company
                        }
                    } else {
                        /*if there is no company relationship, add default dropdown list */
                          $company.append($("<div/>",{
                                class:"row"
                              }).append($("<div/>",{
                                class:"col-xs-9"
                              }).append($("<select/>", {
                              class: "form-control hospitalDropDown form_" + customer.id,
                              id: "company-x-"+ customer.id,
                          }))));
                          $company.find("select").append($("<option/>"));
                          for (i = 0; i < companylist.length; i++) {
                              $company.find("select").append($("<option/>", {
                                  value: companylist[i].id,
                              }).append(companylist[i].company));
                          }
                    }
                    /*render button*/                  
                  var $saveButton = $("<button/>", {
                      class: "btn btn-default pull-right",
                      onClick: "extractCustomerData(" + customer.id + "," + "\"" + access_token.toString() + "\"" + "," + JSON.stringify(relationships) +")",
                      id: "saveBtn_" + customer.id,
                      style: "margin-left:10px"
                  });

                  var $customerSaveSpan = $("<span/>", {
                      class: "glyphicon glyphicon-save"
                  }).append("Save");
                  $customerSaveSpan.appendTo($saveButton);

                  var $cancelButton = $("<button/>", {
                      class: "btn btn-default pull-right",
                      onClick: "cancelExpand(" + customer.id + ")",
                  });

                  var $customerCancelSpan = $("<span/>", {
                      class: "glyphicon glyphicon-remove-sign"
                  }).append("Cancel");
                  $customerCancelSpan.appendTo($cancelButton);

                  var $tableBody = $("<tbody/>").append($("<tr/>").append($("<td/>").append($titleTypeSelect).append($firstName).append($lastName).append($email1).append($ratingType).append($industryType).append($customerTypeList).append($company).append($workPhone).append($countryList).append($stateList))).append($("<tr/>").append($("<td/>")).append($("<td/>")).append($("<td/>").append($saveButton).append($cancelButton)));

                  $tableBody.appendTo($detailsTable);
              
                  var $expandableDiv = $('#' + customer.id);
                  $detailsTable.appendTo($expandableDiv);
                 
                  $('#loaderCustomer'+customer.id).hide();
                  /*end render button*/
              });
            }).fail(function(jqXHR) {
                console.log("Request failed.");
                console.log("Error code: " + jqXHR.status);
                console.log("Error text: " + jqXHR.statusText);
                console.log("Response text: " + jqXHR.responseText);
            })
        })
        /*end get customer country code*/
            });
    });

    request.fail(function() {
        $('#' + customerId).html("");
        $("#" + customerId).removeClass("in");
        changeExpandButtonIcon(customerId);
        ajaxFailed();
    })

    $(document).ajaxComplete(function() {
        $(".hospitalDropDown").select2();
        });

}

function deleteRelationship(index,customerId){
    $("#company"+ "-"+index+"-"+customerId).val('');
     $("#company"+ "-"+index+"-"+customerId).parent().parent().hide()
}

//add new relationship dropdown list for new create customer
// function addRelationship(index){
//     $("#newRelationshipListField").
//           append($("<div/>",{
//             class:"row"
//           }).append($("<div/>",{
//             class:"col-xs-9"
//           }).append($("<select/>", {
//               class: "form-control hospitalDropDown form_" + customerId,
//               id: "company"+ "-"+index+"-"+customerId,
//           }))).                          
//          append($("<div/>",{
//             class:"col-xs-1"
//           }).append($("<span/>",{
//             class:"glyphicon glyphicon-minus",
//             onClick:"deleteRelationship("+index+","+customerId+")"
//           }))).                          
//          append($("<div/>",{
//             class:"col-xs-1"
//           }).append($("<span/>",{
//             class:"glyphicon glyphicon-plus",
//             onClick:"addRelationship("+(index+1)+","+customerId+")"
//           }))))

//           $("#relationshipListField").find("#company"+ "-"+index+"-"+customerId).append($("<option/>"));
//           for (i = 0; i < companylist.length; i++) {
//               $("#relationshipListField").find("#company"+ "-"+index+"-"+customer.id).append($("<option/>", {
//                   value: companylist[i].id,
//               }).append(companylist[i].company));
//           }
//             $(".hospitalDropDown").select2();
// }

//add relationship dropdwon list for edit customer
function addRelationship(index,customerId){
    $("#relationshipListField").
          append($("<div/>",{
            class:"row"
          }).append($("<div/>",{
            class:"col-xs-9"
          }).append($("<select/>", {
              class: "form-control hospitalDropDown form_" + customerId,
              id: "company"+ "-"+index+"-"+customerId,
          }))).                          
         append($("<div/>",{
            class:"col-xs-1"
          }).append($("<span/>",{
            class:"glyphicon glyphicon-minus",
            onClick:"deleteRelationship("+index+","+customerId+")"
          }))).                          
         append($("<div/>",{
            class:"col-xs-1"
          }).append($("<span/>",{
            class:"glyphicon glyphicon-plus",
            onClick:"addRelationship("+(index+1)+","+customerId+")"
          }))))

          $("#relationshipListField").find("#company"+ "-"+index+"-"+customerId).append($("<option/>"));
          for (i = 0; i < companylist.length; i++) {
              $("#relationshipListField").find("#company"+ "-"+index+"-"+customer.id).append($("<option/>", {
                  value: companylist[i].id,
              }).append(companylist[i].company));
          }
            $(".hospitalDropDown").select2();
            // 
}

function enableForEdit(customerId) {
    $(".form_" + customerId).attr("disabled", false);
    $("#editBtn_" + customerId).hide();
    $('#saveBtn_' + customerId).show();
}

function ajaxSuccess() {
    $("#panelHeadingToAddAlert").
    append($("<div/>", {
        class: "row",
        id: "removeSuccessMessage",
        style: "margin-top:10px;margin-bottom:10px;text-align:center"
    }).append($("<div/>", {
        class: "alert alert-success",
        role: "alert",
        style: "margin-bottom:0px"
    }).append("<strong>Operation succesfull.")))

    window.setTimeout(function() {
        $("#removeSuccessMessage").fadeTo(500, 0).slideUp(500, function() {
            $(this).remove();
        });
    }, 1000);
}

function ajaxFailed() {

    $("#panelHeadingToAddAlert").
    append($("<div/>", {
        class: "row",
        id: "removeFailedMessage",
        style: "margin-top:10px;margin-bottom:10px;text-align:center"
    }).append($("<div/>", {
        class: "alert alert-danger",
        role: "alert",
        style: "margin-bottom:0px"
    }).append("<strong>An error occurred.")))

    window.setTimeout(function() {
        $("#removeFailedMessage").fadeTo(500, 0).slideUp(500, function() {
            $(this).remove();
        });
    }, 1000);
}

function searchWithLimit(skip, limit) {
    $('#main_content_table tbody').html("");

    var oldPagination = $("#paginationContainer");
    if (oldPagination != null) {
        oldPagination.remove();
    }

    $("#searchLoader").show();

    var operator = 'default';
    //big filter check
    $(".disableInputs").each(function(index) {
        if ($(this).val() != "") {
            propertyValue = $(this).val();
            operator = $(this).attr('id');
        }
    });

    var orderBy = "";
    if ($("#orderBy").val() != 0) {
        orderBy = "&order=" + $("#orderBy").val();
    }


    if (operator == 'default') {
        //simple search check
        if (!queryTimeoutSet) {
            queryTimeoutSet = true;
            setTimeout(function() {
                queryString = $('#simpleSearchField').val();
                query = "where=" + createQuery(queryString) + "&fields= id, username, middleName,  lastName, firstName, workPhone, email1,ratingType,industryType,customerType,company,titleType&skip=" + skip + "&limit=" + limit + orderBy;
                var request = customerW.queryCustomers("customers", query, access_token, true);
                request.always(function() {
                    $("#searchLoader").hide();
                    queryTimeoutSet = false;
                })

                request.done(function(data) {
                    renderCustomersFromObject(data);
                })
                request.fail(function() {
                    ajaxFailed();
                })

            }, 300)
        };
    } else {
        var property;
        $(".disableSelect").each(function(index) {
            if ($(this).val() != 0) {
                property = $(this).val();
            }
        });
        query = new Object;
        switch (operator) {
            case 'lowerThan':
                {
                    query[property] = new Object;
                    query[property]['$lte'] = propertyValue;
                }
                break;

            case 'greaterThan':
                {
                    query[property] = new Object;
                    query[property]['$gte'] = propertyValue;
                }
                break;

            case 'notEquals':
                {
                    query[property] = new Object;
                    query[property]['$ne'] = propertyValue;
                }
                break;

            case 'equals':
                {
                    query[property] = propertyValue;
                }
                break;

            case 'contains':
                {
                    query[property] = new Object;
                    query[property]['$contains'] = propertyValue;
                }
                break;

            case 'beginsWith':
                {
                    query[property] = new Object;
                    query[property]['$beginsWith'] = propertyValue;
                }
                break;
        }

        serializedQuery = JSON.stringify(query);



        refresh();
        $('#showFilter').fadeToggle(500);

        skipQuery = "where=" + serializedQuery + "&fields= id, username, middleName,  lastName, firstName,workPhone, email1,ratingType,industryType,customerType,company,titleType&skip=" + skip + "&limit=" + limit;

        var filterRequest = customerW.queryCustomers("customers", skipQuery, access_token, true);

        filterRequest.done(function(data) {
            $("#searchLoader").hide();
            renderCustomersFromObject(data);
        });

        filterRequest.fail(function() {
            $("#searchLoader").hide();
            ajaxFailed();
        })
    }
}

function deleteCustomerWrap(customerId) {

    var x = confirm("Are you sure you want to delete this customer?");

    if (x) {
        request = customerW.deleteCustomer(customerId, access_token);
        request.done(function() {
            ajaxSuccess();
            $(".customer" + customerId).remove();
        })
        request.fail(function() {
            ajaxFailed();
        })
    }
}