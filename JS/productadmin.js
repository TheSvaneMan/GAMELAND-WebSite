function listProducts()
{
    $.ajax({
        url: 'https://gameland-webshop.azurewebsites.net/api/products',
        type: 'GET',
        dataType: 'json',
        success: function (products) {
            onGetProductsSuccess(products);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function onGetProductsSuccess(products) {
    //if ($("#productsTable tbody").length != 0) {
        $("#productsTable tbody").remove();
    //}
    $("#productsTable").append("<tbody></tbody>");

   // $("#productsTable tbody").empty();
    // Iterate over the collection of data
    $.each(products, function (index, product) {
        // Add a row to the post table
        addProductRow(product);
    });
}

function addProductRow(product) {
    // Check if <tbody> tag exists, add one if not
    // Append row to <table>
    $("#productsTable tbody").append(
        buildProductRow(product));
}

function buildProductRow(product) {
    var ret =
        "<tr>" +
        "<td>" + product.id + "</td>" +
        "<td>" + product.title + "</td>" +
        "<td>" + product.console + "</td>" +
        "<td>" + product.price + "</td>" +
        "<td>" +
        "<button type='button' id='delete' " +
        "class='btn btn-info' " +
        "data-id='" + product.id + "' onclick='deleteProduct(" + product.id + ")'>" +
        "<i class='fas fa-info-circle'></i>Delete" +
        "</button>" +
        "</td >" +
        "</tr>";
    return ret;
}

function deleteProduct(id) {
    $.ajax({
        url: 'https://gameland-webshop.azurewebsites.net/api/products/' + id,
        type: 'DELETE',
        dataType: 'json'
    });
    listProducts();
}

$('#newProd').on('submit',function(e){
    e.preventDefault();
    var title = $( "#productTitle" ).val();
    var productconsole = $( "#productConsole" ).val();
    var description = $( "#productDescription" ).val();
    var image = $( "#productImage" ).val();
    var releaseDate = $( "#productDate" ).val();
    var price = $( "#productPrice" ).val();
    var stock = $( "#productStock" ).val();

    // In my case, I need to fetch these data before custom actions
    $.ajax({
        url: "https://gameland-webshop.azurewebsites.net/api/products",
        type: 'POST',
        datatype: 'json',
        data: JSON.stringify({
            "title": title,
            "console": productconsole,
            "description": description,
            "image" : image,
            "releaseDate" : releaseDate,
            "price" : price,
            "stock" : stock
        }),
        processData: false,
        contentType: 'application/json',
        success: function () {
            console.log("Yiiiaaaahhhhaaaaaa");
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});

$('#updateProd').on('submit',function(e){
    e.preventDefault();
    var id = $("#id").val();
    var title = $( "#productTitle" ).val();
    var productconsole = $( "#productConsole" ).val();
    var description = $( "#productDescription" ).val();
    var image = $( "#productImage" ).val();
    var releaseDate = $( "#productDate" ).val();
    var price = $( "#productPrice" ).val();
    var stock = $( "#productStock" ).val();

    // In my case, I need to fetch these data before custom actions
    $.ajax({
        url: "https://gameland-webshop.azurewebsites.net/api/products/" + id,
        type: 'PUT',
        datatype: 'json',
        data: JSON.stringify({
            "title": title,
            "console": productconsole,
            "description": description,
            "image" : image,
            "releaseDate" : releaseDate,
            "price" : price,
            "stock" : stock
        }),
        processData: false,
        contentType: 'application/json',
        success: function () {
            console.log("Yiiiaaaahhhhaaaaaa");
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});