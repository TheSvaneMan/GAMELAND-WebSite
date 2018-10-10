function postList() {
    // Call Web API to get a list of post
    $.ajax({
        url: 'https://gameland-webshop.azurewebsites.net/api/products',
        type: 'GET',
        dataType: 'json',
        success: function (products) {
            console.log('hello world');
            postListSuccess(products);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function postListSuccess(posts) {
    // Iterate over the collection of data
    $.each(posts, function (index, post) {
        // Add a row to the post table
        postAddRow(post);
    });
}

function postAddRow(post) {
    // Check if <tbody> tag exists, add one if not
    if ($("#table tbody").length == 0) {
        $("#table").append("<tbody></tbody>");
    }
    // Append row to <table>
   /* if($("#table tbody").length % 6) {
        $("#table tbody").append(*/
            postBuildTableRow(post);
    //}
}

function postBuildTableRow(post) {
    var ret =
        "<tr>" +
        "<td><img src=" + post.image + "></td>" +
        "<td>" + post.title + "</td>" +
        "<td>" + post.price + "</td>" +
        "</tr>";
    return ret;
}