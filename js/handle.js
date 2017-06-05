var meTemplate = Handlebars.compile($("#me-template").html());
var youTemplate = Handlebars.compile($("#you-template").html());

chat.getChatHistory(function(data) {
    var out = "";
    for (var msg of data) {
        msg.datetime = moment(msg.datetime).format('MMMM Do YYYY, h:mm a');
        if (msg.from === 'Visitor') {
            out += meTemplate(msg);
        } else {
            out += youTemplate(msg);
        }
    }

    $('#chatHistory ul').html(out);
    $('#chatHolder').animate({
        scrollTop: $('#chatHistory ul').height()
    }, 1000);
});


chat.addListener('chatreceived', function(msg) {

    msg.chat.datetime = moment(msg.chat.datetime).format('MMMM Do YYYY, h:mm a');
    var out = "";
    if (msg.chat.from === 'Visitor') {
        out += meTemplate(msg.chat);
    } else {
        out += youTemplate(msg.chat);
    }
    $('#liveChat ul').append(out);

    $('#chatHolder').animate({
        scrollTop: $('#liveChat ul').height() + $('#chatHistory ul').height()
    }, 1000);
})



$('#chatInput').keyup(function(e) {
    if (e.keyCode == 13) {
        chat.sendChat($('#chatInput').val());
        $('#chatInput').val('');
    }
});

$('#chatSubmit').click(function(e) {
    if ($('#chatInput').val()) {

        chat.sendChat($('#chatInput').val());
        $('#chatInput').val('');
    }
})
