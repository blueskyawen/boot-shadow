/**
 * Created by liuxuwen on 18-10-7.
 */
$(function() {
    var columnDefs = [{checkbox: true},
        {field: 'name',title: '姓名'},
        {field: 'sex',title: '性别'},
        {field: 'address',title: '地址'}];
    var rowData = [{name:'张山',sex:'男',address:'上海'},
        {name:'李四',sex:'男',address:'苏州'},
        {name:'王五',sex:'女',address:'嘉兴'},
        {name:'张麻子',sex:'男',address:'宁波'},
        {name:'赵六',sex:'男',address:'长沙'}];
    $("#table1").bootTable({caption: '表格标题',
        column: columnDefs,
        data: rowData,
        option: {odd: 'odd2', even: 'even2'}});

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