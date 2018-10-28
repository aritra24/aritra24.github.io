$("#gform").submit(function(e) {
        e.preventDefault();
        $(".contact-submit").html("sending...");
        $(".contact-submit").prop("disabled", true);
        if($("#honeypot").val()) return;
        var formData = $('.form-input').serialize();
        $.post("https://script.google.com/macros/s/AKfycby6gAujhzOIQCPmBcAu2Kq2XooD87r0OeUoes4jRGlpxeFnhOs/exec", formData)
        .done(function(data) {
            if(data.result === "success")
                toast("Your message has been sent",true);
            else
                toast("Couldn't send your message :(", false);
            $(".contact-submit").html("submit");
            $(".contact-submit").prop("disabled", false);
        });
    });

$('.btn-close').on('click', function(e) {
    $('#message').css('display','none');
});

function toast(m,v) {
    $("#message p:first-child").html(m);
    $("#message").css('display','block');
    if (v) {
        $("#message").addClass('success')
    }
    else{
        $("#message").addClass('error')
    }
}