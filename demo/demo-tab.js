/**
 * Created by liuxuwen on 18-10-7.
 */
$(function() {
    $("#tab1").bootTab();
    $("#tab2").bootTab({defaultActive: 0});
    $("#tab3").bootTab({defaultActive: 1});
    $("#tab4").bootTab();

    $("#btn01").click(function() {
        $("#tab4").bootTab(0);
    });
    $("#btn02").click(function() {
        $("#tab4").bootTab('javascript');
    });
});