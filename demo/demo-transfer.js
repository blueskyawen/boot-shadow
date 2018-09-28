/**
 * Created by liuxuwen on 18-9-28.
 */
$(function() {
    var sourceItems = [{value:'content01',name:'content01'},
        {value:'content02',name:'content02'},
        {value:'content03',name:'content03'},
        {value:'content04',name:'content04'},
        {value:'content05',name:'content05'},
        {value:'content06',name:'content06'},
        {value:'content07',name:'content07'},
        {value:'content08',name:'content08'}];
    var targetItems = [{value:'content09',name:'content09'},
        {value:'content10',name:'content10'}];

    $("#myTranfer").bootTransfer({sourOptions: sourceItems,
        targOptions: targetItems,
        disableItems: [],
        itemText:'项目',
        sourceText:'源',
        targetText:'目标'});

    $(".tips:eq(0) button").click(function() {
        var selections = $("#myTranfer").bootTransfer('getSource');
        $(this).next().text(JSON.stringify(selections));
    });
    $(".tips:eq(1) button").click(function() {
        var selections = $("#myTranfer").bootTransfer('getTarget');
        $(this).next().text(JSON.stringify(selections));
    });

    $("#myTranfer2").bootTransfer({sourOptions: sourceItems,
        targOptions: targetItems,
        disableItems: [],
        itemText:'items',
        sourceText:'source',
        targetText:'target'});
    $("#myTranfer3").bootTransfer({sourOptions: sourceItems,
        targOptions: targetItems,
        disableItems: [],
        itemText:'items',
        sourceText:'source',
        targetText:'target',
        width:300,
        height:150});
});