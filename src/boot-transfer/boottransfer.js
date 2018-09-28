/**
 * Created by liuxuwen on 18-9-28.
 */
import './boottransfer.css';

;(function($) {
    $.fn.extend({
        bootTransfer: function(obj) {
            if(typeof(obj) == 'object') {
                this.removeData("items");
                this.data("items",obj);
                this.addClass("nc-transferContainer");
                if(obj.height) {
                    this.css('height',obj.height+'px');
                }
                var $leftContent = $("<div class='content'></div>");
                if(obj.sourOptions && obj.sourOptions.length !== 0) {
                    obj.sourOptions.forEach(function(option) {
                        if(obj.disableItems.includes(option.value)) {
                            $leftContent.append("<span class='option disable'><span class='checkbox'>✔</span><span class='item' name="+option.value+">"+option.name+"</span></span>");
                        } else {
                            $leftContent.append("<span class='option'><span class='checkbox'>✔</span><span class='item' name="+option.value+">"+option.name+"</span></span>");
                        }
                    });
                }
                var $leftContainer = $("<div id='toright' class='optionsContain'></div>");
                if(obj.width) {
                    $leftContainer.css('width',obj.width+'px');
                }
                $leftContainer.append($leftContent);
                var leftTest = '0/'+
                    (obj.sourOptions.length !== 0 ? obj.sourOptions.length : 0) + ' ' +
                    obj.itemText;
                $leftContainer.prepend("<div class='header'><span class='select-all'><span class='checkbox'>✔</span><span class='items'>"+leftTest+"</span></span><span class='text'>"+obj.sourceText+"</span></div>");
                this.append($leftContainer);
                this.append("<div class='transfer'><div class='toleft'>‹</div><div class='toright'>›</div></div>");

                var $rightContent = $("<div class='content'></div>");
                if(obj.targOptions && obj.targOptions.length !== 0) {
                    obj.targOptions.forEach(function(option) {
                        $rightContent.append("<span class='option'><span class='checkbox'>✔</span><span class='item' name="+option.value+">"+option.name+"</span></span>");
                    });
                }
                var $rightContainer = $("<div id='toleft' class='optionsContain'></div>");
                if(obj.width) {
                    $rightContainer.css('width',obj.width+'px');
                }
                $rightContainer.append($rightContent);
                var rightTest = '0/'+
                    (obj.targOptions.length !== 0 ? obj.targOptions.length : 0) + ' ' +
                    obj.itemText;
                $rightContainer.prepend("<div class='header'><span class='select-all'><span class='checkbox'>✔</span><span class='items'>"+rightTest+"</span></span><span class='text'>"+obj.targetText+"</span></div>");
                this.append($rightContainer);

                var updateSourceText = function($item) {
                    var tenmpText = $item.children(".checked").length+"/"+
                        $item.children().length + ' ' + obj.itemText;
                    $item.closest(".optionsContain")
                        .find(".header .items").text(tenmpText);
                };
                var checkIfAllCheck = function($item) {
                    var checkedLen = $item.children(".checked").length;
                    var allLen = $item.children().length;
                    $item.closest(".optionsContain")
                        .find(".header .select-all")[checkedLen === allLen ? "addClass" : "removeClass"]("checked");
                };
                var activeTransfer = function($item) {
                    var temp = $item.closest(".optionsContain").attr("id");
                    var isActive = $item.children(".checked:not(.disable)").length > 0;
                    $item.closest(".nc-transferContainer").find(".transfer ."+temp)[isActive ? "addClass" : "removeClass"]("active");
                };

                $(".optionsContain .content .option",this).click(function() {
                    if($(this).hasClass("disable")) {
                        return;
                    }
                    if($(this).hasClass("checked")) {
                        $(this).removeClass("checked");
                    } else {
                        $(this).addClass("checked");
                    }
                    updateSourceText($(this).closest(".content"));
                    checkIfAllCheck($(this).closest(".content"));
                    activeTransfer($(this).closest(".content"));
                });
                $(".optionsContain .header .select-all",this).click(function() {
                    var ischecked = $(this).hasClass("checked");
                    $(this).toggleClass("checked").closest(".optionsContain")
                        .find(".content .option:not(.disable)")[ischecked ? "removeClass" : "addClass"]("checked");
                    updateSourceText($(this).closest(".optionsContain").find(".content"));
                    activeTransfer($(this).closest(".optionsContain").find(".content"));
                });
                var tranferItems = this.data("items");
                $(".transfer .toright",this).click(function() {
                    var $leftCon = $(this).closest(".nc-transferContainer").find("#toright .content");
                    $leftCon.children(".checked:not(.disable)")
                        .removeClass("checked").unbind()
                        .on("click",function() {
                            if($(this).hasClass("disable")) {
                                return;
                            }
                            if($(this).hasClass("checked")) {
                                $(this).removeClass("checked");
                            } else {
                                $(this).addClass("checked");
                            }
                            updateSourceText($(this).closest(".content"));
                            checkIfAllCheck($(this).closest(".content"));
                            activeTransfer($(this).closest(".content"));
                        }).each(function() {
                        var temp = $(this).find(".item").attr("name");
                        var tmpOption = tranferItems.sourOptions.find(function(sour) {
                            return sour.value === temp;
                        });
                        tranferItems.sourOptions = tranferItems.sourOptions.filter(function(sour) {
                            return sour.value !== tmpOption.value;
                        });
                        tranferItems.targOptions.push(tmpOption);
                    }).appendTo($(this).closest(".nc-transferContainer").find("#toleft .content"));
                    updateSourceText($leftCon);
                    checkIfAllCheck($leftCon);
                    activeTransfer($leftCon);
                });

                $(".transfer .toleft",this).click(function() {
                    var $rightCon = $(this).closest(".nc-transferContainer").find("#toleft .content");
                    $rightCon.children(".checked:not(.disable)")
                        .removeClass("checked").unbind()
                        .on("click",function() {
                            if($(this).hasClass("disable")) {
                                return;
                            }
                            if($(this).hasClass("checked")) {
                                $(this).removeClass("checked");
                            } else {
                                $(this).addClass("checked");
                            }
                            updateSourceText($(this).closest(".content"));
                            checkIfAllCheck($(this).closest(".content"));
                            activeTransfer($(this).closest(".content"));
                        }).each(function() {
                        var temp = $(this).find(".item").attr("name");
                        var tmpOption = tranferItems.targOptions.find(function(sour) {
                            return sour.value === temp;
                        });
                        tranferItems.targOptions = tranferItems.targOptions.filter(function(sour) {
                            return sour.value !== tmpOption.value;
                        });
                        tranferItems.sourOptions.push(tmpOption);
                    }).appendTo($(this).closest(".nc-transferContainer").find("#toright .content"));
                    updateSourceText($rightCon);
                    checkIfAllCheck($rightCon);
                    activeTransfer($rightCon);
                });

                return this;
            } else if(typeof(obj) == 'string') {
                var tranferItems = this.data("items");
                if(obj === 'getSource') {
                    return tranferItems.sourOptions;
                }
                if(obj === 'getTarget') {
                    return tranferItems.targOptions;
                }
            }
        }
    })
})(jQuery);
