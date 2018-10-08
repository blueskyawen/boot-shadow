/**
 * Created by liuxuwen on 18-10-9.
 */
import './bootbacktop.css';

;(function($) {
    "use strict";
    var Name = 'bootBackTop';
    var EventKey = '.bc.BackTop';
    var DataApiKey = '.data-api';
    var Default = {
    };
    var Event = {
    };
    var ClassName = {
    };

    var BackTop = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    BackTop.prototype.init = function() {
        this.$element.addClass("nc-backTop-recket");
        this.$element.append("<div class='rocket-left'></div><div class='rocket-body'><div class='body-mark'></div></div><div class='rocket-right'></div>");
        if($(window).scrollTop() > 0) {
            this.$element.show();
        } else {
            this.$element.hide();
        }
        this.initEvents();
    };
    BackTop.prototype.initEvents = function() {
        var that = this;
        $(window).scroll(function() {
            if($(window).scrollTop() > 0) {
                that.$element.show();
            } else {
                that.$element.hide();
            }
        });
        this.$element.click(function() {
            that.scrollWindow();
        });
    };
    BackTop.prototype.scrollWindow = function() {
        var that = this;
        this.options.timerId = setInterval(function () {
            var tmpbacktop = $(window).scrollTop();
            if(tmpbacktop > 0) {
                $(window).scrollTop(tmpbacktop - 50);
            } else {
                clearInterval(that.options.timerId);
                that.options.timerId = undefined;
            }
        },100);
    };

    var old = $.fn.bootBackTop;
    $.fn.bootBackTop = function(option) {
        var $this = $(this),data = $this.data('backTop');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootBackTop.defaults,_options);
        _options.timerId = undefined;
        if(!data) {
            data = new BackTop(this,_options);
            $this.data('backTop', data);
        }
        data.init();
        return this;
    };
    $.fn.bootBackTop.defaults = {
    };
    $.fn.bootBackTop.Constructor = BackTop;
    $.fn.bootBackTop.noConflict = function () {$.fn.bootBackTop = old;return this;};
})(jQuery);