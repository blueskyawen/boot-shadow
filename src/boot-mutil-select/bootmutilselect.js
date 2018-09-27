/**
 * Created by liuxuwen on 18-9-28.
 */
import './bootmutilselect.css';

;(function($) {
    "use strict";
    var Name = 'bootMultilSelect';
    var EventKey = '.bc.nultilselect';
    var DataApiKey = '.data-api';
    var Default = {
        options: [],
        defalutSelected: [],
        disable:[]
    };
    var Event = {
    };
    var ClassName = {
        Dropdown: 'nc-mutil-select-dropdown',
        Content: 'nc-mutil-dropdown-content',
        Selected: 'selected',
        Disable:'disable',
        Unselected: 'unselected'
    };

    var MultilSelect = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Default, options);
    };
    MultilSelect.prototype.init = function() {
        this.$element.addClass(ClassName.Dropdown);
        if(this.options.disabled) {
            this.$element.addClass(ClassName.Disable);
        }
        if(this.options.width) {
            this.$element.css('width',this.options.width+'px');
        }

        if(this.options.showNum) {
            this.initSelectionWithNum();
        } else {
            this.initSelectionWithItem();
        }

        if(this.options.checkbox) {
            this.InitContentHasCheckbox();
        } else {
            this.initContentNoCheckbox();
        }
    };
    MultilSelect.prototype.initSelectionWithItem = function() {
        var that=this;
        var $selectss = $("<div class='selectss'></div>");
        if(this.options.width) {
            $selectss.css('width',this.options.seleWidth+'px');
        }
        var tmpSelectItems = this.options.options.filter(function(item) {return item.isChecked;});
        if(tmpSelectItems.length === 0) {
            $selectss.append("<span class='holdplace'>请选择</span>");
        } else {
            tmpSelectItems.forEach(function(item1) {
                var $tmpText = $("<span class='optext' title="+item1.name+">"+item1.name+"</span>");
                if(that.options.width) {
                    $tmpText.css('max-width',that.options.selOpWidth+'px');
                }
                var $optionTmp = $("<span class='option'><span class='biao'>×</span></span>");
                $optionTmp.prepend($tmpText);
                $selectss.append($optionTmp);
            });
        }
        this.$element.append($selectss);
    };
    MultilSelect.prototype.initSelectionWithNum = function() {
        var $selectss = $("<div class='selectss'></div>");
        var tmpSelectItems = this.options.options.filter(function(item) {return item.isChecked;});
        if(tmpSelectItems.length === 0) {
            $selectss.append("<span class='holdplace'>请选择</span>");
        } else {
            $selectss.append("<span class='holdplace selectedTitle'>已选择"+tmpSelectItems.length+"个项目</span>");
        }
        this.$element.append($selectss);
    };
    MultilSelect.prototype.initContentNoCheckbox = function() {
        var $content = $("<div class='"+ClassName.Content+"'></div>");
        this.options.options.forEach(function(item2) {
            var temOption = $("<span  class='item' title="+item2.name+">"+item2.name+"</span>");
            if(item2.isChecked) {temOption.addClass(ClassName.Selected);}
            if(item2.isDisable) {temOption.addClass("disabled");}
            $content.append(temOption);
        });
        this.$element.append($content);
    };
    MultilSelect.prototype.InitContentHasCheckbox = function() {
        var $content = $("<div class='"+ClassName.Content+"'></div>");
        if(!this.options.allcheck) {
            this.options.options.forEach(function(item2) {
                var temOption = $("<span  class='option'><span class='checkbox'></span><span class='optext'>"+item2.name+"</span></span>");
                if(item2.isChecked) {
                    temOption.addClass(ClassName.Selected);
                } else {
                    temOption.addClass(ClassName.Unselected);
                }
                if(item2.isDisable) {temOption.addClass("disabled");}
                $content.append(temOption);
            });
        } else {
            $content.addClass("height-auto");
            var $allCheckDom = $("<span class='option unselected checkAll'><span class='checkbox'></span><span class='optext'>全选</span></span>");
            var temp1 = this.options.options.filter(function(item) {return item.isChecked;});
            if(temp1.length === this.options.options.length) {
                $allCheckDom.removeClass(ClassName.Unselected).addClass(ClassName.Selected);
            }
            $content.append($allCheckDom);
            var $optionContent = $("<div class='optionContent'></div>");
            this.options.options.forEach(function(item2) {
                var temOption = $("<span  class='option'><span class='checkbox'></span><span class='optext'>"+item2.name+"</span></span>");
                if(item2.isChecked) {
                    temOption.addClass(ClassName.Selected);
                } else {
                    temOption.addClass(ClassName.Unselected);
                }
                if(item2.isDisable) {temOption.addClass("disabled");}
                $optionContent.append(temOption);
            });
            $content.append($optionContent);
        }

        this.$element.append($content);
    };
    MultilSelect.prototype.InitEvent = function() {
        var that = this;
        $(document).click(function() {
            if(that.options.isContentOpen && !that.options.isMoveInSelect) {
                that.$element.find("."+ClassName.Content).hide();
                that.options.isContentOpen = false;
            } else {
                that.options.isMoveInDel = false;
            }
        });

        this.$element.hover(function() {that.options.isMoveInSelect = true;},
            function() {that.options.isMoveInSelect = false;})
            .click(function() {
                if(that.options.disabled) {return;}
                if(!that.options.isMoveInContent && !that.options.isMoveInDel) {
                    that.options.isContentOpen = !that.options.isContentOpen;
                }
                if(that.options.isContentOpen) {
                    that.$element.find("."+ClassName.Content).show();
                } else {
                    if(!that.options.isMoveInContent) {
                        that.$element.find("."+ClassName.Content).hide();
                    }
                }
            });

        this.$element.find("."+ClassName.Content).hover(function() {
                that.options.isMoveInContent = !that.options.isMoveInContent;},
            function() {that.options.isMoveInContent = !that.options.isMoveInContent;});

        this.$element.find("."+ClassName.Content+" .item").click(function() {
            if($(this).hasClass("disabled")) {
                return;
            }
            if(that.options.showNum) {
                that.selectOptionShowNum(this);
            } else {
                that.selectOptionNotShowNum(this);
            }
            that.checkSelectss();
            that.updateSelectedTitle();
            that.$element.trigger("change.bc.multilselect");
        });

        this.$element.find("."+ClassName.Content+"  .option:not(.checkAll)").click(function() {
            if($(this).hasClass("disabled")) {
                return;
            }
            if(that.options.showNum) {
                that.checkOptionShowNum(this);
            } else {
                that.checkOptionNotShowNum(this);
            }

            that.checkSelectss();
            that.checkAllSelected();
            that.updateSelectedTitle();
            that.$element.trigger("change.bc.multilselect");
        });

        this.$element.on("mouseenter mouseleave",".selectss .biao",function() {
            var tmpText = $(this).prev().text();
            if(!that.isSelectionDiasble(tmpText)) {
                that.options.isMoveInDel = !that.options.isMoveInDel;
            }
        });
        this.$element.on('click',".selectss .biao",function() {
            var tmpText = $(this).prev().text();
            if(that.isSelectionDiasble(tmpText)) {
                return;
            }
            if(that.options.checkbox) {
                var $optionNodes = that.$element.find("."+ClassName.Content+" .option");
                for(var i=0;i < $optionNodes.length;i++) {
                    var $selectOp = $optionNodes.eq(i);
                    if($selectOp.find(".optext").text() === tmpText) {
                        $selectOp.removeClass(ClassName.Selected).addClass(ClassName.Unselected);
                        $(this).closest(".option").remove();
                        break;
                    }
                }
            } else {
                var $optionNodes = that.$element.find("."+ClassName.Content+" .item");
                for(var i=0;i < $optionNodes.length;i++) {
                    var $selectOp = $optionNodes.eq(i);
                    if($selectOp.text() === tmpText) {
                        $selectOp.removeClass(ClassName.Selected);
                        $(this).closest(".option").remove();
                        break;
                    }
                }
            }
            for(var j=0;j < that.options.options.length;j++) {
                if(that.options.options[j].name == tmpText) {
                    that.options.options[j].isChecked = false;
                }
            }
            that.checkSelectss();
            that.checkAllSelected();
            that.$element.trigger("change.bc.multilselect");
        });

        this.$element.find("."+ClassName.Content+" .checkAll").click(function() {
            var checkFlag = true;
            if($(this).hasClass(ClassName.Selected)) {
                checkFlag = false;
                that.updateSelectedItems(checkFlag);
                $(this).removeClass(ClassName.Selected).addClass(ClassName.Unselected);
            } else {
                checkFlag = true;
                that.updateSelectedItems(checkFlag);
                $(this).removeClass(ClassName.Unselected).addClass(ClassName.Selected);
            }
            that.options.options.forEach(function(item) {
                if(!item.isDisable) {
                    item.isChecked=checkFlag;
                }
            });
            that.updateSelectedTitle();
            that.$element.trigger("change.bc.multilselect");
        });

    };
    MultilSelect.prototype.selectOptionNotShowNum = function(ele) {
        var $ele=$(ele),tmpText =$ele.text();
        var $selectNodes = this.$element.find(".selectss .option");
        if($ele.hasClass(ClassName.Selected)) {
            for(var i=0;i < $selectNodes.length;i++) {
                var $selectOp = $selectNodes.eq(i);
                if($selectOp.find(".optext").text() === tmpText) {
                    $ele.removeClass(ClassName.Selected);
                    $selectOp.remove();
                    break;
                }
            }
        } else {
            var $fatherdom = $("<span class='option'></span>");
            var $sondom1 = $("<span class='optext'></span>")
                .attr("title",tmpText).text(tmpText);
            if(this.options.width) {
                $sondom1.css('max-width',this.options.selOpWidth+'px');
            }
            var $sondom2 = $("<span class='biao'></span>").text("×");
            $fatherdom.append($sondom1).append($sondom2);
            $ele.addClass(ClassName.Selected);
            this.$element.find(".selectss").append($fatherdom);
        }
        for(var j=0;j < this.options.options.length;j++) {
            if(this.options.options[j].name == tmpText) {
                this.options.options[j].isChecked = !this.options.options[j].isChecked;
            }
        }
    };
    MultilSelect.prototype.selectOptionShowNum = function(ele) {
        var $ele=$(ele),tmpText =$ele.text();
        if($ele.hasClass(ClassName.Selected)) {
            $ele.removeClass(ClassName.Selected);
        } else {
            $ele.addClass(ClassName.Selected);
        }
        for(var j=0;j < this.options.options.length;j++) {
            if(this.options.options[j].name == tmpText) {
                this.options.options[j].isChecked = !this.options.options[j].isChecked;
            }
        }
        this.updateSelectedTitle();
    };
    MultilSelect.prototype.checkOptionNotShowNum = function(ele) {
        var $ele=$(ele),tmpText =$ele.text();
        var $selectNodes = this.$element.find(".selectss .option");
        if($ele.hasClass(ClassName.Selected)) {
            for(var i=0;i < $selectNodes.length;i++) {
                var $selectOp = $selectNodes.eq(i);
                if($selectOp.find(".optext").text() === tmpText) {
                    $ele.removeClass(ClassName.Selected).addClass(ClassName.Unselected);
                    $selectOp.remove();
                    break;
                }
            }
        } else {
            var $fatherdom = $("<span class='option'></span>");
            var $sondom1 = $("<span class='optext'></span>")
                .attr("title",tmpText).text(tmpText);
            if(this.options.width) {
                $sondom1.css('max-width',this.options.selOpWidth+'px');
            }
            var $sondom2 = $("<span class='biao'></span>").text("×");
            $fatherdom.append($sondom1).append($sondom2);
            $ele.addClass(ClassName.Selected).removeClass(ClassName.Unselected);
            this.$element.find(".selectss").append($fatherdom);
        }
        for(var j=0;j < this.options.options.length;j++) {
            if(this.options.options[j].name == tmpText) {
                this.options.options[j].isChecked = !this.options.options[j].isChecked;
            }
        }
    };
    MultilSelect.prototype.checkOptionShowNum = function(ele) {
        var $ele=$(ele),tmpText =$ele.text();
        if($ele.hasClass(ClassName.Selected)) {
            $ele.removeClass(ClassName.Selected).addClass(ClassName.Unselected);
        } else {
            $ele.addClass(ClassName.Selected).removeClass(ClassName.Unselected);
        }
        for(var j=0;j < this.options.options.length;j++) {
            if(this.options.options[j].name == tmpText) {
                this.options.options[j].isChecked = !this.options.options[j].isChecked;
            }
        }
        this.updateSelectedTitle();
    };

    MultilSelect.prototype.checkSelectss = function() {
        if(this.options.showNum) {return;}
        var temChecks = this.options.options.filter(function(item) {
            return item.isChecked;
        });
        if(temChecks.length !== 0) {
            this.$element.find(".selectss .holdplace").remove();
        } else {
            this.$element.find(".selectss").append("<span class='holdplace'>请选择</span>");
        }
    };
    MultilSelect.prototype.checkAllSelected = function() {
        if(!this.options.allcheck) {return;}
        var tempIndex = this.options.options.findIndex(function(option) {
            return !option.isDisable && !option.isChecked;
        });
        if(tempIndex > -1) {
            this.$element.find("."+ClassName.Content+"  .checkAll").removeClass(ClassName.Selected).addClass(ClassName.Unselected);
        } else {
            this.$element.find("."+ClassName.Content+"  .checkAll").removeClass(ClassName.Unselected).addClass(ClassName.Selected);
        }
    };
    MultilSelect.prototype.updateSelectedTitle = function() {
        if(!this.options.showNum) {return;}
        var temChecks = this.options.options.filter(function(item) {
            return item.isChecked;
        });
        if(temChecks.length !== 0) {
            this.$element.find(".selectss .holdplace").addClass("selectedTitle")
                .text("已选择"+temChecks.length+"个项目");
        } else {
            this.$element.find(".selectss .holdplace").removeClass("selectedTitle").text("请选择");
        }
    };
    MultilSelect.prototype.updateSelectedItems = function(bflag) {
        var that=this;
        if(bflag) {
            this.$element.find("."+ClassName.Content+" .option:not(.disabled,.checkAll)").each(function() {
                if($(this).hasClass(ClassName.Unselected)) {
                    $(this).removeClass(ClassName.Unselected).addClass(ClassName.Selected);
                    if(!that.options.showNum) {
                        var tmpName = $(this).find(".optext").eq(0).text();
                        var $fatherdom = $("<span class='option'></span>");
                        var $sondom1 = $("<span class='optext'></span>")
                            .attr("title",tmpName).text(tmpName);
                        if(that.options.width) {
                            $sondom1.css('max-width',that.options.selOpWidth+'px');
                        }
                        var $sondom2 = $("<span class='biao'></span>").text("×");
                        $fatherdom.append($sondom1).append($sondom2);
                        that.$element.find(".selectss").append($fatherdom);
                    }
                }
            });
        } else {
            var $selectNodes = this.$element.find(".selectss .option");
            this.$element.find("."+ClassName.Content+" .option:not(.disabled,.checkAll)").each(function() {
                if($(this).hasClass(ClassName.Selected)) {
                    $(this).removeClass(ClassName.Selected).addClass(ClassName.Unselected);
                    if(!that.options.showNum) {
                        for(var i=0;i < $selectNodes.length;i++) {
                            var $selectOp = $selectNodes.eq(i);
                            if($selectOp.find(".optext").text() === $(this).find(".optext").text()) {
                                $selectOp.remove();
                                break;
                            }
                        }
                    }
                }
            });
        }
    };
    MultilSelect.prototype.isSelectionDiasble = function(tmpText) {
        var tempDom = this.options.options.find(function(item) {
            return item.name === tmpText;
        });
        if(!tempDom || tempDom.isDisable) {
            return true;
        }	else {
            return false;
        }
    };
    MultilSelect.prototype.getSelection = function() {
        var temps = [];
        this.options.options.forEach(function(item) {
            if(item.isChecked) {
                temps.push({value:item.value,name:item.name});
            }
        });
        return temps;
    };



    var old = $.fn.bootMultilSelect;
    $.fn.bootMultilSelect = function(option) {
        var $this = $(this),data = $this.data('multilselect');
        var _options = typeof option == 'object' ? option : {};
        if(_options.options) {
            _options.options.forEach(function(item) {
                var hasInCheck = _options.defalutSelected.find(function(item2) {
                    return  item.value === item2.value;
                });
                item.isChecked = hasInCheck ? true : false;
                var hasInDisable = _options.disable.find(function(item3) {
                    return  item.value === item3.value;
                });
                item.isDisable = hasInDisable ? true : false;
            });
        }
        _options.isContentOpen = false;
        _options.isMoveInSelect = false;
        _options.isMoveInContent = false;
        _options.isMoveInDel = false;
        if(_options.width) {
            _options.seleWidth = _options.width - 40;
            _options.selOpWidth = _options.width - 90;
        }
        _options = $.extend({},$.fn.bootMultilSelect.defaults,_options);
        if(!data) {
            data = new MultilSelect(this,_options);
            $this.data('multilselect', data);
        }
        if(typeof option == 'string' && option == 'getSelection') {
            return data.getSelection();
        } else if(typeof option == 'object') {
            data.init();
            data.InitEvent();
            return this;
        }
    };
    $.fn.bootMultilSelect.defaults = {
        options: [],
        defalutSelected: [],
        disable:[]
    };
    $.fn.bootMultilSelect.Constructor = MultilSelect;
    $.fn.bootMultilSelect.noConflict = function () {$.fn.bootMultilSelect = old;return this;};
})(jQuery);

