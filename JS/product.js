function postList(){
  $.ajax({
    url: 'https://gameland-webshop.azurewebsites.net/api/products',
    type : 'GET',
    dataType : 'json',
    success: function(products){
      postListSuccess(products);
    },
  });
}

function postListSuccess(products) {
  /*if ($("#table tbody").length === 0) {
    $("#table").append("<tbody></tbody>");
  }
$("#table tdody").empty();*/
$.each(products, function(index, product){
postAddRow(product);
});
}

function postAddRow(product) {
  $(".table tbody").append(postBuildTableRow(product));
}

function postBuildTableRow(product) {
    var ret =

        "<td class='items'>"+
        "<img id='image' src=" + product.image + ">" +
        "<p>" + product.title + "<p>" +
        "<p>" + product.price + "</p>" +
        "</td>";
    return ret;
}

$('#customerform').on('submit',function(e){
  e.preventDefault();
  var firstName = $( "#firstname" ).val();
  var lastName = $( "#lastname" ).val();
  var password = $("#password").val();
  var email = $("#email").val();
  var address = $("#address").val();
  var platform = $("#platform").val();
  $.ajax({
    url: 'https://gameland-webshop.azurewebsites.net/api/customers',
    type: 'POST',
    data: JSON.stringify({
        "name": firstName,
        "lastName": lastName,
        "email": email,
        "address": address,
        "preferredConsole": platform,
        "orders": null,
        "password": password
      }),
    processData: false,
    contentType: 'application/json',
    success: function (comments) {
      console.log("You create a new customer");
    },

  });
});
function dropMenu(){
var box = document.getElementById("dropBox");
box.style.display = "block";
}

function Close(){
var box = document.getElementById("dropBox");
box.style.display = "none";
}
function LogIn(){
$.ajax({
  url: 'https://gameland-webshop.azurewebsites.net/api/customers',
  type : 'GET',
  dataType : 'json',
  success: function(customers){
    var firstName = $("#FirstName1").val();
    var password = $("#Password1").val();
    var correctName = false;
    var correctPassword = false;
    var customerPassword = customers.password;
    var nameList = new Array();
    var passwordList = new Array();
    $.each(customers, function(index, customer){
      var names = customer.name;
      nameList.push(names);
    });
    $.each(customers, function(index, customer){
      var passwords = customer.password;
      passwordList.push(passwords);
    });
    console.log("Checking the name");
    if ($.inArray(firstName, nameList) != -1) {
      correctName = true;
      console.log("Correct name...");
    }
    console.log("Checkin the password");
    if ($.inArray(password, passwordList) != -1) {

        correctPassword = true;
    }
    if (correctName && correctPassword) {
      console.log("Welcome to this wonderful land full of bugs :D");
      var admin = document.getElementById("ADMINLABEL");
      admin.style.opacity = '1';
    }else{
      console.log("yo hacker, go away :c");
    }
  },

});
}
function GetProductsByID(){
  var numberForID = $("#textBox").val();
  $.ajax({
    url: 'https://gameland-webshop.azurewebsites.net/api/products/' + numberForID,
    type : 'GET',
    dataType : 'json',
    success: function(products){
      $(".table td").remove();
      postAddRow(products);
    },
  });
}
