/**
 * Created by liuxuwen on 18-9-27.
 */
import './bootswitch.css';

;(function($) {
    "use strict";
    var Name = 'ncswitch';
    var EventKey = '.bc.switch';
    var DataApiKey = '.data-api';
    var Default = {
        titles: [],
        checked:true,
        size:'normal'
    };
    var Event = {
        change: 'change'+EventKey
    };
    var ClassName = {
        End: 'nc-switch-end',
        Start: 'nc-switch-start',
        Row: 'nc-switch-row',
        Reverse: 'nc-switch-reverse'
    };
    var Selector = {
        Switch: '.switch',
        mySwitch: '.nc-switch'
    };

    var Switch = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Switch.prototype.setChange = function() {
        if(this.options.titles.length == 0) {
            if(this.options.checked) {
                this.$element.removeClass(ClassName.End).addClass(ClassName.Start);
            } else {
                this.$element.removeClass(ClassName.Start).addClass(ClassName.End);
            }
        } else {
            if(this.options.checked) {
                this.$element.find("span").text(this.options.titles[1]);
                this.$element.removeClass(ClassName.Reverse).addClass(ClassName.Row);
            } else {
                this.$element.find("span").text(this.options.titles[0]);
                this.$element.removeClass(ClassName.Row).addClass(ClassName.Reverse);
            }
        }
        this.options.checked = !this.options.checked;
        this.$element.trigger("change.bc.switch");
    };
    Switch.prototype.setSwitch = function() {
        var that = this;
        this.$element.append("<div class='switch'></div>");
        if(this.options.titles && this.options.titles.length !== 0 ) {
            if(this.options.checked) {
                this.$element.append("<span class='swicth-title'>"+this.options.titles[0]+"</span>");
                this.$element.addClass("nc-switch nc-switch-reverse");
            } else {
                this.$element.addClass("nc-switch nc-switch-row");
                this.$element.append("<span class='swicth-title'>"+this.options.titles[1]+"</span>");
            }
        } else {
            if(this.options.checked) {
                this.$element.addClass("nc-switch nc-switch-end");
            } else {
                this.$element.addClass("nc-switch nc-switch-start");
            }
        }
        this.procSwitchSize();
        this.$element.on('click',function() {
            that.setChange();
        });
    };
    Switch.prototype.getChecked = function() {
        return this.options.checked;
    };
    Switch.prototype.procSwitchSize = function() {
        var sizeArray = ['big','normal','small']
        var size_class = this.options.size ? sizeArray.includes(this.options.size) ? 'switch-'+this.options.size : 'switch-normal' : 'switch-normal';
        this.$element.addClass(size_class);
    };

    var old = $.fn.bootSwitch;
    $.fn.bootSwitch = function(option) {
        var $this = $(this),data = $this.data('switch');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootSwitch.defaults,_options);
        if(!data) {
            data = new Switch(this,_options);
            $this.data('switch', data);
        }
        if(typeof option == 'string' && option === 'getChecked') {
            return data.getChecked();
        } else if(typeof option == 'object') {
            data.setSwitch();
            return this;
        }
    };
    $.fn.bootSwitch.defaults = {
        titles: [],
        checked:true,
        size:'normal'
    };
    $.fn.bootSwitch.Constructor = Switch;
    $.fn.bootSwitch.noConflict = function () {$.fn.bootSwitch = old;return this;};

    /*$(document).on('click.bs.switch.data-api', '[data-toggle^=switch]', function (e) {
     var $switch= $(e.target);
     $switch.setChange();
     e.preventDefault();
     });*/
})(jQuery);