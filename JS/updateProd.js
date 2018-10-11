$(document).Ready(function()
{
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
});