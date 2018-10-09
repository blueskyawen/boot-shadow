/**
 * Created by liuxuwen on 18-10-7.
 */
$(function() {
    var columnDefs = [{checkbox: true},
        {field: 'name',title: '姓名'},
        {field: 'sex',title: '性别'},
        {field: 'address',title: '地址'},
        {field: 'oper',title: '操作'}];
    $.getJSON("./table-data01.json",function (data) {
        $("#table1").bootTable({caption: '表格标题',
            column: columnDefs,
            data: data.rowData,
            perPage: 5,
            option: {oper:'操作'}});
        $("#table3").bootTable({caption: '表格标题',
            column: columnDefs,
            data: data.rowData.slice(0,8),
            perPage: 10,
            option: {oper:'操作'}});
    });
    $(".tips button").click(function() {
        var selections = $("#table1").bootTable('getSelection');
        $(".tips p").text(JSON.stringify(selections));
    });
    $("#table1").on("load.bc.table",function() {
        console.log("load");
    });
    $("#table1").on("checkAll.bc.table",function() {
        alert("checkAll");
    });
    $("#table1").on("uncheckAll.bc.table",function() {
        alert("uncheckAll");
    });
    $("#table1").on("check.bc.table",function() {
        alert("check");
    });
    $("#table1").on("uncheck.bc.table",function() {
        alert("uncheck");
    });
});