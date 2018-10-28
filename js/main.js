$(window).load(function(){
   $('#overlay').fadeOut();
   [...document.querySelectorAll('.scroll-link')].forEach(el => el.addEventListener('click', e => document.getElementById(el.getAttribute('data-scroll')).scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })));
});