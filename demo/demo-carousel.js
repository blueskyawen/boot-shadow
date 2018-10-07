/**
 * Created by liuxuwen on 18-9-30.
 */
$(function() {
    var count = 0;
    var optionss = [
        {name: 'fuzhi',url: 'http://dimg04.c-ctrip.com/images/t1/vacations/203000/202469/ef1ae815bbef4a0698d4fa2ac15614e0.jpg'},
        {name: 'qingshuisi',url: 'http://upload.shunwang.com/2014/0625/1403670070972.JPG'},
        {name: 'xiaodao',url: 'http://digitalphoto.cocolog-nifty.com/photos/uncategorized/2008/08/02/dsc_d300_0006950_2.jpg'},
        {name: 'xiaodao2',url: 'http://f4.topitme.com/4/b3/e5/1118294546054e5b34o.jpg'},
        {name: 'xiaodao3',url: 'http://img17.3lian.com/d/file/201701/19/fd92ea2409b6b157c247b78ce4eda95a.jpg'}
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