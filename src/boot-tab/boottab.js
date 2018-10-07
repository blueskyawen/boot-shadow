/**
 * Created by liuxuwen on 18-10-7.
 */
import './boottab.css';

;(function($) {
    "use strict";
    var Name = 'tab';
    var EventKey = '.bc.tab';
    var DataApiKey = '.data-api';
    var Default = {
        defaultActive: 0
    };
    var Event = {
        change: 'change'+EventKey
    };
    var ClassName = {
        Active: 'active'
    };
    var Selector = {
        Nav: '.nc-nav-tabs'
    };

    var Tab = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Tab.prototype.init = function() {
        this.$element.find(".tab-bars li").click(function() {
            if($(this).hasClass("disabled")) {
                return;
            }
            var tmpName = $(this).attr("name");
            $(this).addClass("active").siblings().removeClass("active")
                .end().closest(Selector.Nav).find(".tab-content div").hide()
                .filter(function() {
                    return $(this).attr("name") === tmpName;
                }).show(600);
        });

        this.setDefault();
    };
    Tab.prototype.setDefault = function() {
        var that=this;
        var firstDom,firstName;
        if(this.options && this.options.defaultActive) {
            if(typeof this.options.defaultActive == 'number' ) {
                firstDom = this.$element.find(".tab-bars li").eq(this.options.defaultActive);
            }
            if(typeof this.options.defaultActive == 'string' ) {
                firstDom = this.$element.find(".tab-bars li")
                    .filter(function() {
                        return $(this).attr('name') === that.options.defaultActive;
                    }).first();
            }
        } else {
            firstDom = this.$element.find(".tab-bars li:not(.disabled)").eq(0);
        }
        if(firstDom) {
            firstName = firstDom.attr('name');
            firstDom.addClass("active");
            this.$element.find(".tab-content div").hide().filter(function() {
                return $(this).attr('name') === firstName;
            }).show();
        }
    };
    Tab.prototype.showTab = function(index) {
        var tmpDom,tmpName;
        if(typeof index == 'number' ) {
            tmpDom = this.$element.find(".tab-bars li").eq(index);
        }
        if(typeof index == 'string' ) {
            tmpDom = this.$element.find(".tab-bars li")
                .filter(function() {
                    return $(this).attr('name') === index;
                }).first();
        }
        if(tmpDom) {
            tmpName = tmpDom.attr('name');
            tmpDom.addClass("active").siblings().removeClass("active");
            this.$element.find(".tab-content div").hide().filter(function() {
                return $(this).attr('name') === tmpName;
            }).show();
        }
    };

    var old = $.fn.bootTab;
    $.fn.bootTab = function(option) {
        var $this = $(this),data = $this.data('tab');
        var _options = option && typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootTab.defaults,_options);
        if(!data) {
            data = new Tab(this,_options);
            $this.data('tab', data);
        }
        if(typeof option == 'string' || typeof option == 'number') {
            data.showTab(option);
        } else {
            data.init();
            return this;
        }
    };
    $.fn.bootTab.defaults = {
        defaultActive: 0
    };
    $.fn.bootTab.Constructor = Tab;
    $.fn.bootTab.noConflict = function () {$.fn.bootTab = old;return this;};
})(jQuery);