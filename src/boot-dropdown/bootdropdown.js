/**
 * Created by liuxuwen on 18-10-7.
 */
import './bootdropdown.css';

;(function($) {
    "use strict";
    var Name = 'bootDropdown';
    var EventKey = '.bc.dropdown';
    var DataApiKey = '.data-api';
    var Default = {
        type: 'click',
        place: 'down'
    };
    var Event = {
    };
    var ClassName = {
        Dropdown: 'nc-dropdown'
    };

    var Dropdown = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Dropdown.prototype.init = function() {
        var that=this;
        this.setPlace();
        var $tempEventDom = this.$element;
        if(this.options.divi) {
            $tempEventDom = this.$element.find(".dropdown-divi .dropdown-toggle");
        }
        if(this.options.type === 'click') {
            $tempEventDom.on("mouseenter mouseleave",function() {
                that.options.isHover = !that.options.isHover;
            }).click(function() {
                $(this).closest('.nc-dropdown').find('.dropdown-content').toggle();
            });
            $(document).on('click',function() {
                if(!that.options.isHover ) {
                    that.$element.find('.dropdown-content').hide();
                }
            });
        }
        if(this.options.type === 'hover') {
            $tempEventDom.hover(function() {
                $(this).closest('.nc-dropdown').find('.dropdown-content').toggle();
            },function() {
                $(this).closest('.nc-dropdown').find('.dropdown-content').toggle();
            });
        }
    };
    Dropdown.prototype.setPlace = function() {
        if(this.options.place === 'up') {
            this.$element.addClass("dropup");
        }
        if(this.options.place === 'left') {
            this.$element.addClass("dropleft");
        }
        if(this.options.place === 'right') {
            this.$element.addClass("dropright");
        }
    };
    Dropdown.prototype.toggleIt = function() {
        this.$element.find('.dropdown-content').toggle();
    };

    var old = $.fn.bootDropdown;
    $.fn.bootDropdown = function(option) {
        var $this = $(this),data = $this.data('dropdown');
        var _options = (option && typeof option == 'object') ? option : {};
        _options = $.extend({},$.fn.bootDropdown.defaults,_options);
        _options.isHover = false;
        if(!data) {
            data = new Dropdown(this,_options);
            $this.data('dropdown', data);
        }
        if(typeof option == 'string' && option == 'toggle') {
            data.toggleIt();
        } else {
            data.init();
        }
        return this;
    };
    $.fn.bootDropdown.defaults = {
        type: 'click',
        place: 'down'
    };
    $.fn.bootDropdown.Constructor = Dropdown;
    $.fn.bootDropdown.noConflict = function () {$.fn.bootDropdown = old;return this;};

})(jQuery);