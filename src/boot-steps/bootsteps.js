/**
 * Created by liuxuwen on 18-10-9.
 */
import './bootsteps.css';

;(function($) {
    "use strict";
    var Name = 'bootSteps';
    var EventKey = '.bc.steps';
    var DataApiKey = '.data-api';
    var Default = {
        type: 'bottom-lines'
    };
    var Event = {
    };
    var ClassName = {
    };

    var Steps = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
        this.options.$tmpSteps = this.$element.find(".nc-steps .nc-step");
        this.options.stepNum = this.options.$tmpSteps.length;
    };
    Steps.prototype.init = function() {
        var that=this;
        this.$element.find(".nc-steps")
            .addClass("nc-steps-"+this.options.type);
        this.initStepIndex();
        this.initCurStep();
    };
    Steps.prototype.initStepIndex = function() {
        this.options.$tmpSteps.each(function() {
            var tmpNum = $(this).index() + 1;
            $(this).addClass("nc-step-"+tmpNum);
            $(this).append("<style>.nc-step-"+tmpNum+"::before{content:'"+tmpNum+"';}</style>");
        });
    };
    Steps.prototype.initCurStep = function() {
        this.options.$tmpSteps.removeClass("active").removeClass("actived");
        for(let index=0;index < this.options.curIndex+1;index++) {
            if(index == this.options.curIndex) {
                this.options.$tmpSteps.eq(index).addClass("active");
            } else {
                this.options.$tmpSteps.eq(index).addClass("actived");
            }
        }
        var tmpTarget = this.options.$tmpSteps.eq(this.options.curIndex).attr("data-target");
        this.$element.find("[data-id="+tmpTarget+"]").show()
            .siblings(".nc-step_content").hide();
    };
    Steps.prototype.prevStep = function() {
        if(this.options.curIndex > 0) {
            this.options.curIndex--;
            this.initCurStep();
        }
    };
    Steps.prototype.nextStep = function() {
        if(this.options.curIndex < this.options.stepNum - 1) {
            this.options.curIndex++;
            this.initCurStep();
        }
    };

    var old = $.fn.bootSteps;
    $.fn.bootSteps = function(option) {
        var $this = $(this),data = $this.data('steps');
        var _options = typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootSteps.defaults,_options);
        _options.curIndex = 0;
        if(!data) {
            data = new Steps(this,_options);
            $this.data('steps', data);
        }
        if(typeof option == 'string') {
            if(option === 'prev') {
                data.prevStep();
            }
            if(option === 'next') {
                data.nextStep();
            }
        } else if(typeof option == 'object') {
            data.init();
            return this;
        }
    };
    $.fn.bootSteps.defaults = {
        type: 'bottom-lines'
    };
    $.fn.bootSteps.Constructor = Steps;
    $.fn.bootSteps.noConflict = function () {$.fn.bootSteps = old;return this;};

})(jQuery);
