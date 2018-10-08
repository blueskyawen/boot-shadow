/**
 * Created by liuxuwen on 18-10-9.
 */
$(function() {
    $("#steps01").bootSteps({type: "bottom-lines"});
    $("#steps01").find(".buttons button:contains('上一步')").click(function() {
        $("#steps01").bootSteps('prev');
    });
    $("#steps01").find(".buttons button:contains('下一步')").click(function() {
        $("#steps01").bootSteps('next');
    });
    $("#steps01").find(".buttons button:contains('完成')").click(function() {
        alert("最终结束");
    });
    $("#steps02").bootSteps({type: "middle-lines"});
    $("#steps02").find(".buttons button:contains('上一步')").click(function() {
        $("#steps02").bootSteps('prev');
    });
    $("#steps02").find(".buttons button:contains('下一步')").click(function() {
        $("#steps02").bootSteps('next');
    });
    $("#steps02").find(".buttons button:contains('完成')").click(function() {
        alert("最终结束");
    });
});