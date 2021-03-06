/**
 * Created by liuxuwen on 18-9-27.
 */
$(function() {
    $(".content-body").hide().eq(0).show();
    $("#demo-navbar .navbar-brand .fa-github").click(function() {
        window.open("https://github.com/blueskyawen/boot-shadow");
    });
    $("#demo-navbar .collapse .navbar-nav li").click(function() {
        var tmpName = $(this).find("a").attr("name");
        $(this).addClass("active").siblings(".nav-item").removeClass("active");
        $("#"+tmpName).show(600).siblings(".content-body").hide();
    });

    $("#start").load("./demo/demo-start.html");
    $("#switch").load("./demo/demo-switch.html");
    $("#select").load("./demo/demo-select.html");
    $("#multiselect").load("./demo/demo-mutil-select.html");
    $("#transfer").load("./demo/demo-transfer.html");
    $("#info").load("./demo/demo-info.html");
    $("#collapse").load("./demo/demo-collapse.html");
    $("#carousel").load("./demo/demo-carousel.html");
    $("#model").load("./demo/demo-modal.html");
    $("#tab").load("./demo/demo-tab.html");
    $("#scrollspy").load("./demo/demo-scrollspy.html");
    $("#affix").load("./demo/demo-affix.html");
    $("#dropdown").load("./demo/demo-dropdown.html");
    $("#table").load("./demo/demo-table.html");
    $("#backtop").load("./demo/demo-backTop.html");
    $("#steps").load("./demo/demo-steps.html");

    // 检测浏览器是否支持SW
    if(navigator.serviceWorker != null){
        navigator.serviceWorker.register('sw.js')
            .then(function(registartion){
                console.log('支持sw:',registartion.scope)
            }).catch(function(err) {
                console.log('不支持sw:',err)
            })
    }
});
