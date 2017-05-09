//Para calcular el tamaño del footer
$(function()  {    
    $('.content').height($('.content').height()  +  $('.footer').height());    
    window.scrollTo(0,  1);
});