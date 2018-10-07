/**
 * Created by liuxuwen on 18-10-7.
 */
import './bootmodel.css';

;(function($) {
    "use strict";
    var Name = 'bootModel';
    var EventKey = '.bc.model';
    var DataApiKey = '.data-api';
    var Default = {
        type: 'normal'
    };
    var Event = {
    };
    var ClassName = {
        Contain: '.nc-dialog-container',
        Dialog: '.nc-Dialog'
    };

    var Model = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Model.prototype.init = function() {
        var that=this;
        this.$element.find(ClassName.Dialog+" header .cancel").click(function() {
            that.$element.hide();
        });
        this.$element.find(ClassName.Dialog+" footer button.cancel").click(function() {
            that.$element.hide();
        });
    };
    Model.prototype.showModel = function() {
        this.$element.show();
    };
    Model.prototype.hideModel = function() {
        this.$element.hide();
    };

    var old = $.fn.bootModel;
    $.fn.bootModel = function(option) {
        var $this = $(this),data = $this.data('model');
        var _options = {};
        _options = $.extend({},$.fn.bootModel.defaults,_options);
        if(!data) {
            data = new Model(this,_options);
            $this.data('model', data);
        }
        if(typeof option == 'string') {
            if(option === 'show') {
                data.showModel();
            } else {
                data.hideModel();
            }
        } else {
            data.init();
        }
        return this;
    };
    $.fn.bootModel.defaults = {};
    $.fn.bootModel.Constructor = Model;
    $.fn.bootModel.noConflict = function () {$.fn.bootModel = old;return this;};

})(jQuery);