/**
 * Created by liuxuwen on 18-9-28.
 */
import './bootinfo.css';

;(function($) {
    "use strict";
    var Name = 'bootInfo';
    var EventKey = '.bc.info';
    var DataApiKey = '.data-api';
    var Default = {
        type: 'success',
        title: '操作成功,2s后自动消失'
    };
    var Event = {
    };
    var ClassName = {
        Root: 'rootInfo',
    };

    var Info = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Info.prototype.init = function() {
        this.$element.addClass(ClassName.Root);
        this.$element.addClass("nc-"+this.options.type);
        if(this.options.type === 'success') {
            this.$element.text(this.options.title);
        } else {
            this.$element.append("<div class='msg'>"+this.options.title+"</div>");
            this.$element.append("<div class='oper-cancel'><span>x</span></div>");
        }
    };
    Info.prototype.showIt = function() {
        var that = this;
        this.$element.css("display","flex");
        if(this.options.type === 'success') {
            setTimeout(function() {
                that.$element.css("display","none");},that.options.timelen);
        } else {
            this.$element.on('click','.oper-cancel',function() {
                that.hideIt();
            });
        }
    };
    Info.prototype.hideIt = function() {
        this.$element.css("display","none");
    };

    var old = $.fn.bootInfo;
    $.fn.bootInfo = function(option) {
        var $this = $(this),data = $this.data('info');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootInfo.defaults,_options);
        if(!data) {
            data = new Info(this,_options);
            $this.data('info', data);
        }
        if(typeof option == 'string') {
            if(option == 'show') {
                data.showIt();
            } else if(option == 'hide') {
                data.hideIt();
            }
        } else if(typeof option == 'object') {
            data.init();
            return this;
        }
    };
    $.fn.bootInfo.defaults = {
        type: 'success',
        title: '操作成功,2s后自动消失'
    };
    $.fn.bootInfo.Constructor = Info;
    $.fn.bootInfo.noConflict = function () {$.fn.bootInfo = old;return this;};
})(jQuery);