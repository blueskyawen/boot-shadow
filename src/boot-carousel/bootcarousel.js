/**
 * Created by liuxuwen on 18-9-30.
 */
import './bootcarousel.css';

;(function($) {
    "use strict";
    var Name = 'bootCarousel';
    var EventKey = '.bc.carousel';
    var DataApiKey = '.data-api';
    var Default = {
        options: [],
        type: 'fade',
        height:'650',
        width:'100%'
    };
    var Event = {
    };
    var ClassName = {
        Carousel: 'nc-carousel',
        Fade: 'fadeType',
        Slide: 'slideType',
    };

    var Carousel = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    Carousel.prototype.init = function() {
        var that=this
        this.$element.addClass(ClassName.Carousel);
        this.$element.css({
            'width': this.options.width,
            'height': this.options.height+'px'
        });
        if(this.options.type === 'slide') {
            this.$element.addClass(ClassName.Slide);
        } else {
            this.$element.addClass(ClassName.Fade);
        }
        var $tempContainer = $("<ul class='img-container'></ul>");
        var $bars = $("<div class='bars'></div>");
        var num=0;
        this.options.options.forEach(function(item) {
            $tempContainer.append("<li><img src="+item.url+" alt="+item.name+"/></li>");
            if(that.options.dataApi) {
                $bars.append("<span data-slide="+num+"></span>");
            } else {
                $bars.append("<span></span>");
            }
            num++;
        });

        if(that.options.dataApi) {
            this.$element.append($tempContainer).append($bars)
                .append("<div class='left' data-slide='prev'></div>")
                .append("<div class='right' data-slide='next'></div>");
            this.options.curIndex = 0;
            this.initFirstPage();
        } else {
            this.$element.append($tempContainer).append($bars)
                .append("<div class='left'></div>").append("<div class='right'></div>");
            this.initFirstPage();
        }
        this.addEvent();
    };
    Carousel.prototype.initFirstPage = function() {
        if(this.options.type === 'fade') {
            this.$element.find(".img-container > li").hide()
                .eq(this.options.curIndex).show();
        }
        if(this.options.type === 'slide') {
            //this.$element.addClass(ClassName.Fade);
        }
        this.$element.find(".bars span").eq(this.options.curIndex).addClass("active");
        if(this.options.interval) {
            var that = this;
            this.options.timer = setInterval(function() {
                that.$element.find(".right").trigger('click');
            },this.options.interval);
        }
    };
    Carousel.prototype.addEvent = function() {
        var that = this;
        this.$element.find(".right").click(function() {
            that.$element.trigger("change.bc.carousel");
            if(that.options.type === 'slide') {
                that.getNextIndex();
                that.toNext();
            } else {
                that.getAddcreaseCurIndex();
                that.$element.find(".img-container > li").eq(that.options.curIndex)
                    .fadeIn(1000).siblings().fadeOut(1000);
                that.setBarActive();
            }
        });
        this.$element.find(".left").click(function() {
            that.$element.trigger("change.bc.carousel");
            if(that.options.type === 'slide') {
                that.getPreIndex();
                that.toPre();
            } else {
                that.getDecreaseCurIndex();
                that.$element.find(".img-container > li").eq(that.options.curIndex)
                    .fadeIn(1000).siblings().fadeOut(1000);
                that.setBarActive();
            }
        });
        this.$element.find(".bars span").click(function() {
            if($(this).hasClass("active")) {return;}

            that.$element.trigger("change.bc.carousel");
            if(that.options.type === 'slide') {
                that.options.nextIndex = $(this).index();
                if(that.options.nextIndex > that.options.curIndex) {
                    that.toNext()
                } else {
                    that.toPre();
                }
            } else {
                that.options.curIndex = $(this).index();
                that.$element.find(".img-container > li").eq(that.options.curIndex)
                    .fadeIn(1000).siblings().fadeOut(1000);
                that.setBarActive();
            }

        });
        this.$element.hover(function() {
            if(that.options.pause && that.options.timer ) {
                clearInterval(that.options.timer );
                that.options.timer = undefined;
            }
        },function() {
            if(that.options.pause && that.options.interval) {
                that.options.timer = setInterval(function() {
                    that.$element.find(".right").trigger('click');
                },that.options.interval);
            }
        });
    };
    Carousel.prototype.getAddcreaseCurIndex = function() {
        this.options.curIndex++;
        if(this.options.curIndex > this.options.options.length - 1) {
            this.options.curIndex = 0;
        }
    };
    Carousel.prototype.getDecreaseCurIndex = function() {
        this.options.curIndex--;
        if(this.options.curIndex < 0) {
            this.options.curIndex = this.options.options.length - 1;
        }
    };
    Carousel.prototype.setBarActive = function() {
        if(this.options.type === 'slide') {
            this.$element.find(".bars span").eq(this.options.nextIndex)
                .addClass("active").siblings().removeClass("active");
        } else {
            this.$element.find(".bars span").eq(this.options.curIndex)
                .addClass("active").siblings().removeClass("active");
        }
        this.$element.trigger("changed.bc.carousel");
    };
    Carousel.prototype.getNextIndex = function() {
        if(this.options.curIndex < this.options.options.length - 1) {
            this.options.nextIndex = this.options.curIndex + 1;
        } else {
            this.options.nextIndex = 0;
        }
    };
    Carousel.prototype.getPreIndex = function() {
        if(this.options.curIndex > 0) {
            this.options.nextIndex = this.options.curIndex - 1;
        } else {
            this.options.nextIndex = this.options.options.length - 1;
        }
    };
    Carousel.prototype.recoverImgState = function() {
        this.$element.find(".img-container > li").eq(this.options.curIndex)
            .css({
                "top":"100%",
                "left":"0%"
            });
    };
    Carousel.prototype.toNext = function() {
        var that = this;
        var $carouseItems = this.$element.find(".img-container > li");
        $carouseItems.eq(this.options.nextIndex)
            .css({
                "transition":"none",
                "top":"0%",
                "left":"100%"
            });
        setTimeout(function() {
            $carouseItems.eq(that.options.nextIndex).css({
                "transition":"left 1s ease-out",
                "left":"0%"
            });
            $carouseItems.eq(that.options.curIndex).css("left","-100%");
            that.setBarActive();
            setTimeout(function() {
                that.recoverImgState();
                that.options.curIndex = that.options.nextIndex;
            },1000);
        },50);
    };
    Carousel.prototype.toPre = function() {
        var that = this;
        var $carouseItems = this.$element.find(".img-container > li");
        $carouseItems.eq(this.options.nextIndex)
            .css({
                "transition":"none",
                "top":"0%",
                "left":"-100%"
            });
        setTimeout(function() {
            $carouseItems.eq(that.options.nextIndex).css({
                "transition":"left 1s ease-out",
                "left":"0%"
            });
            $carouseItems.eq(that.options.curIndex).css("left","100%");
            that.setBarActive();
            setTimeout(function() {
                that.recoverImgState();
                that.options.curIndex = that.options.nextIndex;
            },1000);
        },50);
    };
    Carousel.prototype.setItemByIndex = function(index) {
        if(index < 0 || index >= this.options.options.length) {
            return;
        }
        this.$element.find(".bars span").eq(index).trigger('click');
    };
    Carousel.prototype.setItemByOper = function(oper) {
        var that=this;
        if(oper === 'pause') {
            if(this.options.pause && this.options.timer) {
                clearInterval(that.options.timer );
                that.options.timer = undefined;
            }
        }
        if(oper === 'cycle' && that.options.interval && !this.options.timer) {
            that.options.timer = setInterval(function() {
                that.$element.find(".right").trigger('click');
            },that.options.interval);
        }
        if(oper === 'prev') {
            this.$element.find(".left").trigger('click');
        }
        if(oper === 'next') {
            this.$element.find(".right").trigger('click');
        }
    };

    var old = $.fn.bootCarousel;
    $.fn.bootCarousel = function(option) {
        var $this = $(this),data = $this.data('carousel');
        var _options = option && typeof option == 'object' ? option : {};
        _options = $.extend({},$.fn.bootCarousel.defaults,_options);
        _options.curIndex = 0;
        _options.nextIndex = 0;
        if(!data) {
            data = new Carousel(this,_options);
            $this.data('carousel', data);
        }
        if(typeof option == 'object') {
            data.init();
            return this;
        }
        if(typeof option == 'number') {
            data.setItemByIndex(option);
        }
        if(typeof option == 'string') {
            data.setItemByOper(option);
        }
    };
    $.fn.bootCarousel.defaults = {
        options: [],
        type: 'fade',
        height:'650',
        width:'100%'
    };
    $.fn.bootCarousel.Constructor = Carousel;
    $.fn.bootCarousel.noConflict = function () {$.fn.bootCarousel = old;return this;};

    $(document).on('click.bc.carousel.data-api', '[data-slide]', function (e) {
        var $this = $(e.target);
        var $target = $this.closest(ClassName.Carousel);
        var dataValue = $this.attr('data-slide');
        if(isNaN(+dataValue)) {
            $target.data('carousel').setItemByOper(dataValue);
        } else {
            var operNum = +dataValue;
            $target.data('carousel').setItemByIndex(operNum);
        }
        e.preventDefault();
    });

})(jQuery);