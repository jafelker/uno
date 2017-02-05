$(document).ready(function() {

    $(".rules-content").hide();

    $(".dropdown-arrow").click(function() {
        var temp = $(this).parent();
        var rules = temp.find(".rules-content");
        if($(rules).is(':visible')) {
            $(rules).slideUp("fast", "linear");
            $(this).attr('src', 'static/images/dropdown_arrow_closed.jpg');
        }
        else {
            $(rules).slideDown("fast", "linear");
            $(this).attr('src', 'static/images/dropdown_arrow_open.jpg');
        }
    });
    $('#howToPlayModal').on('show.bs.modal', function () {
           $(this).find('.modal-dialog').css({
                  width:'80%', //probably not needed
                  'max-height':'100%'
           });
           // console.log("howToPlayModal has been shown");
    });

});
