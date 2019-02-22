/**
 * Created by liuxuwen on 18-9-30.
 */
$(function() {
    var count = 0;
    var optionss = [
        {name: 'fuzhi',url: 'images/casel01.jpg'},
        {name: 'qingshuisi',url: 'images/casel02.jpg'},
        {name: 'xiaodao',url: 'images/casel03.jpg'},
        {name: 'xiaodao2',url: 'images/casel04.jpg'},
        {name: 'xiaodao3',url: 'images/casel05.jpg'}
    ];
    var optionss2 = JSON.parse(JSON.stringify(optionss));
    $("#carousel-fade").bootCarousel({options: optionss,type: 'fade'});
    $("#carousel-slide").bootCarousel({options: optionss2,type: 'slide',
        interval:5000,pause:true});
    $("#carousel-slide-data-api").bootCarousel({options: optionss,
        type: 'fade',
        dataApi:true});
    $("#carousel-slide-2").bootCarousel({options: optionss2,type: 'slide',
        width:'80%',height:450});
    $("#carousel-slide-oper").bootCarousel({options: optionss2,type: 'slide',
        width:'90%',height:500,interval:5000,pause:true});

    $(".btn-groupss button").click(function() {
        var tmpIndex = $(this).index();
        if(tmpIndex === 0) {$("#carousel-slide-oper").bootCarousel('cycle');}
        if(tmpIndex === 1) {$("#carousel-slide-oper").bootCarousel('pause');}
        if(tmpIndex === 2) {$("#carousel-slide-oper").bootCarousel('prev');}
        if(tmpIndex === 3) {$("#carousel-slide-oper").bootCarousel('next');}
        if(tmpIndex === 4) {$("#carousel-slide-oper").bootCarousel(1);}
        if(tmpIndex === 5) {$("#carousel-slide-oper").bootCarousel(3);}
    });

    $("#carousel-slide-oper").on("change.bc.carousel",function() {
        count++;
        if(count == 50) {$(this).bootCarousel('pause');}
    });
    $("#carousel-slide-oper").on("changed.bc.carousel",function() {
        count++;
        if(count == 50) {$(this).bootCarousel('pause');}
    });
});
