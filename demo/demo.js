/**
 * Created by liuxuwen on 18-9-27.
 */
$(function() {
    $(".content-body").hide().eq(0).show();
    $("#demo-navbar .navbar-brand .fa-github").click(function() {
        window.open("https://github.com/blueskyawen/ng-shadow-cat");
    });
    $("#demo-navbar .collapse .navbar-nav li").click(function() {
        var tmpName = $(this).find("a").attr("name");
        $(this).addClass("active").siblings(".nav-item").removeClass("active");
        $("#"+tmpName).show(600).siblings(".content-body").hide();
    });
});