$(function () {

    var $orders = $('#orders');
    var $title = $('#title');
    var $rating = $('#rating');

    $.ajax({
        type: 'GET',
        url: 'api/movies',
        success: function (orders) {
            $.each(orders, function (i, order) {
                $('#orders').append('<li><strong>Title:</strong> ' + '<input class="edit title">' + order.title + '<br><strong>Rating: </strong>' + '<input class="edit rating">' + order.rating + ' Stars'
                    + '<br>'
                    + ' <button data-id="' + order.id + '" ' + 'class="remove btn btn-danger">Delete</button>'
                    + ' <button class="editOrder noEdit btn btn-secondary">Edit</button>'
                    + ' <button class="saveEdit edit btn btn-outline-primary btn-sm">Save</button>'
                    + ' <button class="cancelEdit edit btn btn-outline-primary btn-sm">Cancel</button></li>');
            });
        },
        error: function () {
            alert('error loading movies');
        }
    });
    $('#add-movie').on('click', function () {

        var order = {
            title: $title.val(),
            rating: $rating.val(),
        };

        $.ajax({
            type: 'POST',
            url: 'api/movies',
            data: order,
            success: function (newOrder) {
                $('#orders').append('<li><strong>Title:</strong> ' + '<input class="edit title">' + newOrder.title + '<br><strong>Rating: </strong>' + '<input class="edit rating">' + newOrder.rating + ' Stars'
                    + '<br>'
                    + ' <button data-id="' + order.id + '" class="remove btn btn-danger">Delete</button>'
                    + ' <button class="editOrder noEdit btn btn-secondary">Edit</button>'
                    + ' <button class="saveEdit edit btn btn-outline-primary btn-sm">Save</button>'
                    + ' <button class="cancelEdit edit btn btn-outline-primary btn-sm">Cancel</button></li>');
            },
            error: function () {
                alert('error saving order');
            }
        });
    });
    $orders.delegate('.remove', 'click', function () {

        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: 'api/movies/' + $(this).data("id"),
            success: function () {
                $li.fadeOut(500, function () {
                    $(this).remove();
                });
            }
        });
    });

    $orders.delegate('.editOrder', 'click', function () {
        var $li = $(this).closest('li');
        $li.find('input.title').val($li.find('li.title').html());
        $li.find('input.rating').val($li.find('li.rating').html());
        $li.addClass('edit');
    });
    $orders.delegate('.cancelOrder', 'click', function () {
        $(this).closest('li').removeClass('edit');
    });

    $orders.delegate('.saveEdit', 'click', function () {
        var $li = $(this).closest('li');
        var order = {
            title: $li.find('newOrder.title').val(),
            rating: $li.find('newOrder.rating').val(),
        };

        $.ajax({
            type: 'PUT',
            url: 'api/movies/' + $(this).data("id"),
            data: order,
            success: function (newOrder) {
                $li.find('li.title').html(order.title);
                $li.find('li.rating').html(order.rating);
                $li.removeClass('edit');
            },
            error: function () {
                alert('error updating order');
            }
        });
    });
});

