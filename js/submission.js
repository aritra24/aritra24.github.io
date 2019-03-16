var onSuccess = function(e) {

    if(grecaptcha === undefined){
        alert("No grecaptcha");
        return;
    }
    var response = grecaptcha.getResponse();
    console.log(response);
    if (!response) {
        alert("No response");
        return;
    }
    $(".contact-submit").html("sending...");
    $(".contact-submit").prop("disabled", true);
    if($("#honeypot").val()) return;
    var formData = $('.form-input').serialize();
    console.log($('.form-input').filter(function(){return !$(this).val()}).length);
    if ($('.form-input').filter(function(){return !$(this).val()}).length > 0) {
            toast("fields can't be empty", false);
            $(".contact-submit").html("submit");
            return;
    }
    $.post("https://script.google.com/macros/s/AKfycby6gAujhzOIQCPmBcAu2Kq2XooD87r0OeUoes4jRGlpxeFnhOs/exec", formData)
    .done(function(data) {
        if(data.result === "success")
            toast("Your message has been sent",true);
        else
            toast("Couldn't send your message :(", false);
        $(".contact-submit").html("submit");
        $('.form-input').each(function() {
           $(this).val("");   
       });
    }).fail(function (e) {
        toast("Couldn't send your message :(", false);
    });
    grecaptcha.reset();
};

$('#toast-close').on('click', function(e) {
    $('#message').fadeOut();
    $(".contact-submit").prop("disabled", false);
});

function toast(m,v) {
    $("#message p:first-child").html(m);
    $("#message").css('display','block');
    if (v) {
        $("#message").removeClass('error');        
        $("#message").addClass('success');
    }
    else{
        $("#message").removeClass('success');
        $("#message").addClass('error');
    }
}