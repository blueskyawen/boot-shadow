/**
 * Created by liuxuwen on 18-10-7.
 */
import './boottable.css';

;(function($) {
    "use strict";
    var Name = 'table';
    var EventKey = '.bc.table';
    var DataApiKey = '.data-api';
    var Default = {
        caption: '',
        column:[],
        data:[],
        option:{}
    };
    var Event = {
        change: 'click'+EventKey
    };
    var ClassName = {
        Search: 'search',
        Checked: 'checked',
    };
    var Selector = {
    };

    var Table = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Table.prototype.init = function() {
        var that=this;
        var $tmpTbody = $("<tbody></tbody>");
        $tmpTbody.append("<tr id='noData'><td colspan='4'>没有匹配的记录</td></tr>");
        if(this.options.data.length > 0) {
            this.options.data.forEach(function(row) {
                var $tmpTr = $("<tr></tr>");
                if(that.options.column[0] && that.options.column[0].radio) {
                    $tmpTr.append("<td><input type='radio' /></td>");
                }
                if(that.options.column[0] && that.options.column[0].checkbox) {
                    $tmpTr.append("<td><input type='checkbox' /></td>");
                }
                for(var key in row) {
                    $tmpTr.append("<td>"+row[key]+"</td>");
                }
                $tmpTbody.append($tmpTr);
            });
            $tmpTbody.find("#noData").hide();
        }

        this.$element.append($tmpTbody);
        var $tmpHead = $("<tr></tr>");
        var $thead = $("<thead></thead>");
        this.options.column.forEach(function(col) {
            if(col.radio) {
                $tmpHead.append("<th></th>")
            }
            if(col.checkbox) {
                $tmpHead.append("<th><input type='checkbox' /></th>")
            }
            if(col.field && col.title) {
                $tmpHead.append("<th>"+col.title+"</th>");
            }
        });
        $thead.append($tmpHead);
        this.$element.prepend($thead);
        this.$element.prepend("<caption>"+this.options.caption+"</caption>");
        this.$element.prepend("<div class='search'><label>搜索</label><input id='search' type='text' placeholder='请输入搜索'/></div>");
        this.$element.find("tbody > tr:odd").addClass(this.options.option.odd);
        this.$element.find("tbody > tr:even").addClass(this.options.option.even);
    };
    Table.prototype.addEvent = function() {
        var that=this;
        this.$element.find("tbody > tr").hover(function() {
            $(this).addClass("hover");
        },function() {
            $(this).removeClass("hover");
        });
        this.$element.find("tbody > tr:has(:radio)").click(function() {
            $(this).parent().find(":radio").attr("checked",false);
            $(this).addClass('selected')
                .siblings().removeClass('selected')
                .end().find(":radio").attr("checked",true);
        });


        this.$element.find("tbody > tr td :checkbox").click(function() {
            var $temps = $(this).closest("tbody")
                .children(":not(#noData)");
            $(this).closest("table")
                .find("thead tr th :checkbox")
                .attr("checked",$temps.length == $temps.filter(":has(:checked)").length);
            if(this.checked) {
                that.trigger("check.bc.table");
            } else {
                that.trigger("uncheck.bc.table");
            }
        });
        this.$element.find("thead > tr th :checkbox").click(function() {
            $(this).closest("table").find("tbody tr td :checkbox")
                .attr("checked",this.checked);
            if(this.checked) {
                that.trigger("checkAll.bc.table");
            } else {
                that.trigger("uncheckAll.bc.table");
            }
        });

        $("#search").keyup(function() {
            var $dataTr = that.$element.find("tbody tr:not(#noData)");
            if(this.value) {
                $dataTr.hide().filter(":contains('"+this.value+"')").show();
            } else {
                $dataTr.show();
            }
            if($dataTr.filter(":visible").length) {
                $("#noData").hide();
            } else {
                $("#noData").show();
            }
        });
        setTimeout(function() {
            that.trigger("load.bc.table");},50);
    };
    Table.prototype.getSelection = function() {
        var temps = [];
        this.$element.find("tbody > tr:has(:checked)").each(function() {
            temps.push($(this).find("td:eq(1)").text());
        });
        var selects = this.options.data.filter(function(item) {
            return temps.includes(item.name);
        });
        return selects;
    };

    var old = $.fn.bootTable;
    $.fn.bootTable = function(option) {
        var $this = $(this),data = $this.data('table');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootTable.defaults,_options);
        if(!data) {
            data = new Table(this,_options);
            $this.data('table', data);
        }
        if(typeof option == 'string' && option === 'getSelection') {
            return data.getSelection();
        } else if(typeof option == 'object') {
            data.init();
            data.addEvent();
            return this;
        }
    };
    $.fn.bootTable.defaults = {
        caption: '',
        column:[],
        data:[],
        option:{}
    };
    $.fn.bootTable.Constructor = Table;
    $.fn.bootTable.noConflict = function () {$.fn.bootTable = old;return this;};

})(jQuery);