/**
 * Created by liuxuwen on 18-9-30.
 */
import './bootcollapse.css';

;(function($) {
    "use strict";
    var Name = 'bootCollapse';
    var EventKey = '.bc.collapse';
    var DataApiKey = '.data-api';
    var Default = {
        type: 'normal'
    };
    var Event = {
    };
    var ClassName = {
    };

    var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Collapse.prototype.init = function() {
        var that=this;
        if(this.options.width) {
            this.$element.css('width',this.options.width+'px');
        }
        if(this.options.type === 'normal') {
            this.$element.find(".nc-collapse header").click(function() {
                if($(this).parent().hasClass("active")) {
                    $(this).parent().removeClass("active")
                        .children("article").slideToggle();
                } else {
                    $(this).parent().addClass("active")
                        .children("article").slideToggle();
                }
            });
        } else if(this.options.type === 'eachOne') {
            this.$element.find(".nc-collapse header").click(function() {
                if($(this).parent().hasClass("active")) {
                    $(this).parent().removeClass("active")
                        .children("article").slideToggle();
                } else {
                    that.$element.find("header").parent().removeClass("active")
                        .children("article").slideUp();
                    $(this).parent().addClass("active").children("article").slideToggle();
                }
            });
        }
    };

    var old = $.fn.bootCollapse;
    $.fn.bootCollapse = function(option) {
        var $this = $(this),data = $this.data('collapse');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootCollapse.defaults,_options);
        if(!data) {
            data = new Collapse(this,_options);
            $this.data('collapse', data);
        }
        data.init();
        return this;
    };
    $.fn.bootCollapse.defaults = {
        type: 'normal'
    };
    $.fn.bootCollapse.Constructor = Collapse;
    $.fn.bootCollapse.noConflict = function () {$.fn.bootCollapse = old;return this;};

})(jQuery);