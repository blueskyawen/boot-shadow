/**
 * Created by liuxuwen on 18-10-7.
 */
import './bootaffix.css';

;(function($) {
    "use strict";
    var Name = 'bootAffix';
    var EventKey = '.bc.affix';
    var DataApiKey = '.data-api';
    var Default = {
        offset:10
    };
    var Event = {
    };
    var ClassName = {
    };

    var Affix = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Affix.prototype.init = function() {
        var that = this;
        this.options.targets = [];
        this.options.scrollspy = this.$element.closest('#myScrollspy');
        this.options.curActive;
        this.options.state = 'affix-top';
        this.options.body = $(document);
        this.options.scrollspy
            .next('.content').find('[id]').each(function() {
            that.options.targets.push($(this).attr("id"));
        });
        this.options.body.scroll(function() {
            that.checkNavbarPosition();
            that.processNavbar();
        });
    };
    Affix.prototype.checkNavbarPosition = function() {
        var newstate = this.getState();
        if(this.options.state === newstate) {
            return;
        }
        if(this.options.state === 'affix-top' && newstate === 'affix') {
            this.$element.addClass('affix');
            return this.options.state = newstate;
        }
        if(this.options.state === 'affix' && newstate === 'affix-top') {
            this.$element.removeClass('affix');
            return this.options.state = newstate;
        }
        if(this.options.state === 'affix' && newstate === 'affix-bottom') {
            var tmpHeight = this.options.scrollspy.outerHeight() - this.$element.outerHeight() - this.options.offset;
            this.options.scrollspy.addClass('spy-relative');
            this.$element.removeClass('affix')
                .addClass('affix-bottom').css('top',tmpHeight+'px');
            return this.options.state = newstate;
        }
        if(this.options.state === 'affix-bottom' && newstate === 'affix') {
            this.options.scrollspy.removeClass('spy-relative');
            this.$element.removeClass('affix-bottom')
                .addClass('affix').css('top',this.options.offset+'px');
            return this.options.state = newstate;
        }

    };
    Affix.prototype.getState = function() {
        if(this.options.state === 'affix-top') {
            if((this.options.scrollspy.offset().top - this.options.body.scrollTop()) <= this.options.offset) {
                return 'affix';
            } else {
                return 'affix-top'
            }
        }
        if(this.options.state === 'affix') {
            if((this.options.scrollspy.offset().top - this.options.body.scrollTop()) > this.options.offset) {
                return 'affix-top'
            }
            if(this.options.body.scrollTop()+
                this.$element.outerHeight(true)+
                this.options.offset >=
                this.options.body.find('.footer').eq(0).offset().top) {
                return 'affix-bottom'
            }
            return 'affix'
        }
        if(this.options.state === 'affix-bottom') {
            if(this.options.body.scrollTop()+
                this.$element.outerHeight(true)+
                this.options.offset >=
                this.options.body.find('.footer').eq(0).offset().top) {
                return 'affix-bottom'
            } else {
                return 'affix'
            }
        }
    };
    Affix.prototype.processNavbar = function() {
        for(var index = this.options.targets.length - 1;index >= 0;index--) {
            var targetTop = $("#"+this.options.targets[index]).offset().top - this.options.body.scrollTop();
            if(targetTop < 20) {
                this.activeBar(this.options.targets[index]);
                break;
            }
        }
    }
    Affix.prototype.activeBar = function(title) {
        this.$element.find('li').removeClass('active').end()
            .find("li [href=#"+title+"]").closest('li').addClass("active");
    };


    var old = $.fn.bootAffix;
    $.fn.bootAffix = function(option) {
        var $this = $(this),data = $this.data('affix');
        var _options = {};
        _options = $.extend({},$.fn.bootAffix.defaults,option);
        if(!data) {
            data = new Affix(this,_options);
            $this.data('affix', data);
        }
        data.init();
        return this;
    };
    $.fn.bootAffix.defaults = {
        offset:10
    };
    $.fn.bootAffix.Constructor = Affix;
    $.fn.bootAffix.noConflict = function () {$.fn.bootAffix = old;return this;};

})(jQuery);