/**
 * Created by liuxuwen on 18-9-27.
 */
import './bootselect.css';

;(function($) {
    "use strict";
    var Name = 'ncselect';
    var EventKey = '.bc.select';
    var DataApiKey = '.data-api';
    var Default = {
        options: [],
        defalutChecked: 'Paas',
        placeholder: '请选择',
        disable: false
    };
    var Event = {
        change: 'change'+EventKey
    };
    var ClassName = {
        End: 'switch-end',
    };
    var Selector = {
    };

    var Select = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Select.prototype.init = function() {
        var that=this;
        if(this.options.disable) {
            this.$element.addClass("nc-select-dropdown disable");
            this.$element.append("<input type='text' placeholder="+this.options.placeholder+" disabled='true' />");
        } else {
            this.$element.addClass("nc-select-dropdown");
            this.$element.append("<input type='text' placeholder="+this.options.placeholder+"  />");
        }
        if(this.options.width) {
            this.$element.css('width',this.options.width+'px');
        }
        var $content = $("<div class='nc-dropdown-content'></div>");
        if(this.options.options && this.options.options.length > 0) {
            this.options.options.forEach(function(option) {
                $content.append("<span title="+option.name+">"+option.name+"</span>");
            });
        }
        this.$element.append($content);
        if(this.options.defalutChecked) {
            this.$element.find("input").val(this.options.defalutChecked);
        }

        $(window).click(function() {
            if(that.options.isContentOpen && !that.options.isMoveInSelect) {
                that.$element.find(".nc-dropdown-content").hide();
                that.options.isContentOpen = false;}
        });
        that.$element.hover(function() {
            that.options.isMoveInSelect = !that.options.isMoveInSelect;
        },function() {
            that.options.isMoveInSelect = !that.options.isMoveInSelect;
        }).click(function() {
            if($(this).hasClass("disable")) {
                return;
            }
            that.options.isContentOpen = !that.options.isContentOpen;
            if(that.options.isContentOpen) {
                $(this).find(".nc-dropdown-content").show();
            } else {
                $(this).find(".nc-dropdown-content").hide();
            }
        });
        that.$element.find(".nc-dropdown-content span").click(function() {
            $(this).closest(".nc-select-dropdown").find("input").val($(this).text());
            $(this).closest(".nc-dropdown-content").hide()
        });
    };

    var old = $.fn.bootSelect;
    $.fn.bootSelect = function(option) {
        var $this = $(this),data = $this.data('select');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootSelect.defaults,_options,{isContentOpen: false,
            isMoveInSelect: false,isSelected: false});
        if(!data) {
            data = new Select(this,_options);
            $this.data('select', data);
        }
        data.init();
        return this;
    };
    $.fn.bootSelect.defaults = {
        options: [],
        defalutChecked: 'Paas',
        placeholder: '请选择',
        disable: false
    };
    $.fn.bootSelect.Constructor = Select;
    $.fn.bootSelect.noConflict = function () {$.fn.bootSelect = old;return this;};

})(jQuery);