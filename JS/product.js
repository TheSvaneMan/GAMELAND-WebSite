function postList(){
  $.ajax({
    url: 'https://gameland-webshop.azurewebsites.net/api/products',
    type : 'GET',
    dataType : 'json',
    success: function(products){
      postListSuccess(products);
      console.log("you fucking clicked a fucking useless stupid button");
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
        "<img src=" + product.image + " style='width:100%'>" +
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
