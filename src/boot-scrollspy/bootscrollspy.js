/**
 * Created by liuxuwen on 18-10-7.
 */
import './bootscrollspy.css';

;(function($) {
    "use strict";
    var Name = 'bootScrollspy';
    var EventKey = '.bc.scrollspy';
    var DataApiKey = '.data-api';
    var Default = {
        offset:10
    };
    var Event = {
    };
    var ClassName = {
    };

    var Scrollspy = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Scrollspy.prototype.init = function() {
        var that = this;
        this.$element.scroll(function() {that.process();});
        this.options.selector =(this.options.id ?  '#'+this.options.id : this.$element.data('target')) +
            ' .navbar-body .navbar-nav li';
        this.options.targets = [];
        this.$element.find('[id]').each(function() {
            that.options.targets.push($(this).attr("id"));
        });
        //alert(JSON.stringify(that.options.targets));
        this.options.curActive = this.options.targets[0];
        this.process();
    };
    Scrollspy.prototype.process = function() {
        var that=this;
        if(this.options.curActive === this.options.targets[0]) {
            this.activeBar(this.options.targets[0]);
        }
        for(var index=this.options.targets.length - 1;index >= 0;index--) {
            var targetTop = $("#"+this.options.targets[index]).position().top;
            if(targetTop < this.options.offset) {
                this.activeBar(this.options.targets[index]);
                break;
            }
        }
        var contentHeight = this.$element.outerHeight();
        var contentScrollTop = this.$element.scrollTop();
        var contentScrollHeight =  this.$element.get(0).scrollHeight;
        if(contentHeight + contentScrollTop >= contentScrollHeight) {
            this.activeBar(this.options.targets[this.options.targets.length - 1]);
        }

    };
    Scrollspy.prototype.activeBar = function(title) {
        $(this.options.selector).find('a').removeClass('active').end()
            .find("[href=#"+title+"]").addClass("active");
        if($(this.options.selector).find("a[href=#"+title+"]").parent('.dropdown-item').length) {
            $(this.options.selector).closest('.dropdown').find('a:eq(0)').addClass("active");
        }
    };


    var old = $.fn.bootScrollspy;
    $.fn.bootScrollspy = function(option) {
        var $this = $(this),data = $this.data('scrollspy');
        var _options = {};
        _options = $.extend({},$.fn.bootScrollspy.defaults,_options);
        if(!data) {
            data = new Scrollspy(this,_options);
            $this.data('scrollspy', data);
        }
        data.init();
        return this;
    };
    $.fn.bootScrollspy.defaults = {
        offset:10
    };
    $.fn.bootScrollspy.Constructor = Scrollspy;
    $.fn.bootScrollspy.noConflict = function () {$.fn.bootScrollspy = old;return this;};

})(jQuery);