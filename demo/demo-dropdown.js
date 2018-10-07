/**
 * Created by liuxuwen on 18-10-7.
 */
$(function() {
    $("#dropdown1").bootDropdown();
    $("#dropdown2").bootDropdown({place:'right'});
    $("#dropdown3").bootDropdown({place:'up'});
    $("#dropdown4").bootDropdown({type: 'click',place:'left'});
    $("#dropdown5").bootDropdown({type: 'hover',place:'down'});
    $("#dropdown6").bootDropdown({type: 'hover',place:'right'});
    $("#dropdown7").bootDropdown({type: 'hover',place:'up'});
    $("#dropdown8").bootDropdown({type: 'hover',place:'left'});
    $("#dropdown9").bootDropdown({type: 'click',place:'down',divi:true});
    $("#dropdown10").bootDropdown({type: 'hover',place:'right',divi:true});
    $("#dropdown11").bootDropdown();

    $("#manal-drop").click(function() {
        $("#dropdown11").bootDropdown('toggle');
        setTimeout(function() {
            $("#dropdown11").bootDropdown('toggle');
        },2000);
    });
});