/**
 * Created by liuxuwen on 18-9-27.
 */
$(function() {
    $("#switch1").bootSwitch({titles: [],
        checked: true,
        size:'normal'});
    $("#switch2").bootSwitch({titles:['开','关'],
        checked: true,
        size:'normal'});

    $("#switch1").on("change.bc.switch",function() {
        $(this).next(".text").text($(this).bootSwitch('getChecked'));
    });
    $("#switch2").on("change.bc.switch",function() {
        $(this).next(".text").text($(this).bootSwitch('getChecked'));
    });

    $("#switch3").bootSwitch({titles:['是','否'],
        checked: true,
        size:'big'});
    $("#switch4").bootSwitch({titles:[],
        checked: true,
        size:'big'});
    $("#switch5").bootSwitch({titles:['开','关'],
        checked: true,
        size:'small'});
    $("#switch6").bootSwitch({checked: true,
        size:'small'});
});