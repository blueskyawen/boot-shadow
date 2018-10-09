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
        perPage: 5,
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
        var that = this;
        var operClumn = this.options.column.find(function(colu) {
            return colu.field === 'oper';
        });
        if(operClumn) {
            this.options.data.forEach(function(item) {
                item.operation = '-';
            });
        }
        this.initTableHead();
        this.initTableBody();
        this.initTableCaption();
        this.initPageBars();
        this.initTableOption();
    };
    Table.prototype.initTableHead = function() {
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
    };
    Table.prototype.initTableCaption = function() {
        this.$element.prepend("<caption>"+this.options.caption+"</caption>");
        this.$element.prepend("<div class='search'><label>搜索</label><input id='search' type='text' placeholder='请输入搜索'/></div>");
    };
    Table.prototype.initTableBody = function() {
        var $tmpTbody = $("<tbody></tbody>");
        $tmpTbody.append("<tr class='noData'><td colspan='"+this.options.column.length+"'>没有匹配的记录</td></tr>");
        this.options.loadData = this.options.data;
        if(this.options.loadData.length > this.options.perPage) {
            this.options.curPageData =
                this.options.loadData.slice(0,this.options.perPage);
        } else {
            this.options.curPageData = this.options.loadData;
        }
        this.loadTData($tmpTbody);
        this.$element.append($tmpTbody);
    };
    Table.prototype.loadTData = function($tableBody) {
        var that = this;
        if(this.options.curPageData.length > 0) {
            this.options.curPageData.forEach(function(row) {
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
                $tableBody.append($tmpTr);
            });
            $tableBody.find(".noData").hide();
        } else {
            $tableBody.find(".noData").show();
        }
    };
    Table.prototype.initPageBars = function() {
        var dataLeng = this.options.loadData.length;
        if(dataLeng === 0) {return;}
        var pageNum = Math.ceil(dataLeng / this.options.perPage);
        var $paginBarss = $("<div class='nc-paginaBars'></div>");
        $paginBarss.append("<span class='numTitle'>共 "+ dataLeng +" 条<span>");
        var $pagin = $("<ul class='nc-pagination'></ul>");
        $pagin.append("<li><a href='javascript:void(0)'>❮</a></li>");
        for(var index = 1;index < pageNum+1;index++) {
            var $tmpBar = $("<li><a href='javascript:void(0)'>"+index+"</a></li>");
            $pagin.append($tmpBar);
        }
        $pagin.append("<li><a href='javascript:void(0)'>❯</a></li>");
        $pagin.find("li").eq(1).addClass("active");
        $paginBarss.append($pagin);
        this.$element.append($paginBarss);
    };
    Table.prototype.initTableOption = function() {
        this.$element.find("tbody > tr:odd")
            .addClass(this.options.option.odd);
        this.$element.find("tbody > tr:even")
            .addClass(this.options.option.even);
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
            var $tmTbody = that.$element.find("tbody");
            var searchVal = this.value;
            if(searchVal) {
                that.options.loadData = that.options.data.filter(function(row) {
                    return that.isContains(row,searchVal);
                });
            } else {
                that.options.loadData = that.options.data;
            }
            if(that.options.loadData.length > that.options.perPage) {
                that.options.curPageData =
                    that.options.loadData.slice(0,that.options.perPage);
            } else {
                that.options.curPageData = that.options.loadData;
            }
            $tmTbody.find("tr:not(.noData)").remove();
            that.loadTData($tmTbody);
            that.$element.find(".nc-paginaBars").remove();
            that.initPageBars();
            that.addBarEvent();
        });
        this.addBarEvent();
        setTimeout(function() {
            that.trigger("load.bc.table");},50);
    };
    Table.prototype.addBarEvent = function() {
        var that=this;
        this.$element.find(".nc-paginaBars .nc-pagination li:not(:first):not(:last)")
            .click(function() {
                var cIndex = $(this).index();
                var bIndex = cIndex - 1;
                $(this).addClass("active").siblings().removeClass("active");
                var $tmTbody = that.$element.find("tbody");
                $tmTbody.find("tr:not(.noData)").remove();
                that.options.curPageData =
                    that.options.loadData
                        .slice(bIndex*that.options.perPage,that.options.perPage*cIndex);
                that.loadTData($tmTbody);
            });
        this.$element.find(".nc-paginaBars .nc-pagination li").last().click(function() {
            that.$element.find(".nc-paginaBars .nc-pagination li.active")
                .eq(0).next().click();
        });
        this.$element.find(".nc-paginaBars .nc-pagination li").first().click(function() {
            that.$element.find(".nc-paginaBars .nc-pagination li.active")
                .eq(0).prev().click();
        });
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
    Table.prototype.isContains = function(data,value) {
        for(var key in data) {
            if(data[key].toString().indexOf(value) !== -1) {
                return true;
            }
        }
        return false;
    };

    var old = $.fn.bootTable;
    $.fn.bootTable = function(option) {
        var $this = $(this),data = $this.data('table');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootTable.defaults,_options);
        _options.loadData = [];
        _options.curPageData = [];
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
        perPage: 5,
        option:{}
    };
    $.fn.bootTable.Constructor = Table;
    $.fn.bootTable.noConflict = function () {$.fn.bootTable = old;return this;};

})(jQuery);