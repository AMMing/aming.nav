/**
* $.amingimage
* @extends jquery.1.7.1
* @fileOverview 预加载图片后显示
* @author 阿命
* @email y2443@163.com
* @site wwww.y2443.com
* @version 1.01.04.1
* @date 2013-01-04
* Copyright (c) 2012-2013 AMing
* @example
*    $("input").amingui_text();
*/

(function (window, document, $, undefined) {
    $.extend($.fn, {
        //随机的ID
        random_id: 0,
        //动画执行中
        nav_moveing: false,
        //导航是否显示
        nav_isshow: false,

        aming_nav: function (setting, callback) {//默认值
            var sdata = $.extend({
                datalist: []
            }, setting);

            $.fn.random_id = parseInt(99999 * Math.random());

            var $renderTo = jQuery(this);
            var $nav_mainframe = jQuery("<div></div>");
            $nav_mainframe.addClass("aming_nav_mainframe");
            $nav_mainframe.addClass("aming_nav_mainframe" + $.fn.random_id);
            $nav_mainframe.css("position", "relative");
            $renderTo.append($nav_mainframe);

            var create_nav_item = function (data, $frame) {
                var $nav_frame = jQuery("<div></div>");
                var $nav_img_button = jQuery("<div></div>");
                var $nav_img = jQuery("<img />");
                var $nav_title = jQuery("<div></div>");
                var $nav_img_button_defilade = jQuery("<span></span>");
                //set Class
                $nav_frame.addClass("aming_nav_frame");
                $nav_img_button.addClass("aming_nav_img_button");
                $nav_title.addClass("aming_nav_title");
                $nav_img_button_defilade.addClass("aming_nav_img_button_defilade");

                $nav_frame.css("position", "absolute");
                $nav_frame.css("width", "400px");
                $nav_frame.css("height", "104px");
                $nav_frame.css("padding", "5px");

                $nav_img_button.css("position", "absolute");
                $nav_img_button.css("width", "204px");
                $nav_img_button.css("height", "104px");
                $nav_img_button.css("z-index", "999");
                $nav_img_button.css("overflow", "hidden");
                $nav_img_button.css("border", "2px solid white");
                $nav_img_button.css("cursor", "pointer");

                $nav_img.css("position", "absolute");
                $nav_img.css("width", "400px");
                $nav_img.css("height", "100px");
                $nav_img.css("border", "2px solid white");

                $nav_title.css("position", "absolute");
                $nav_title.css("font-family", '"Microsoft YaHei" , "Microsoft JhengHei"');
                $nav_title.css("line-height", "40px");
                $nav_title.css("padding", "15px 10px 0px 10px");
                $nav_title.css("font-size", "24px");
                $nav_title.css("bottom", "0");
                $nav_title.css("right", "0");

                //css3 text_shadow
                var text_shadow = "#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0";
                $nav_title.css("-webkit-text-shadow", text_shadow);
                $nav_title.css("-moz-text-shadow", text_shadow);
                $nav_title.css("text-shadow", text_shadow);


                $nav_img_button_defilade.css("position", "absolute");
                $nav_img_button_defilade.css("width", "400px");
                $nav_img_button_defilade.css("height", "104px");


                $frame.append($nav_frame);
                $nav_frame.append($nav_img_button);
                $nav_img_button.append($nav_img);
                $nav_img_button.append($nav_title);
                $nav_img_button.append($nav_img_button_defilade);

                //Set Attribute
                $nav_frame.attr("data-left", data.left);
                $nav_img_button.css("border-color", data.color);
                $nav_img_button.css("color", data.color);
                $nav_img.attr("src", data.imgurl);
                $nav_img.css("left", data.left);
                $nav_title.html(data.title);

                //bind event
                $nav_img_button.bind("mouseover", function () {
                    $nav_img_button.stop().animate({ width: 400 }, 300);
                    $nav_img.stop().animate({ left: 0 }, 300);
                });

                $nav_img_button.bind("mouseout", function () {
                    $nav_img_button.stop().animate({ width: 204 }, 300);
                    $nav_img.stop().animate({ left: data.left }, 300);
                });

                $nav_img_button.bind("click", function () {
                    if (data.target) {
                        window.open(data.link);
                    } else {
                        window.location.href = data.link;
                    }
                });

                return $nav_frame;
            };

            $.each(sdata.datalist, function (index, item) {
                var $newitem = create_nav_item(item, $nav_mainframe);
                $newitem.attr("data-index", index);
                $newitem.css("z-index", 1000 - index);
                $newitem.addClass("aming_nav_frame_" + $.fn.random_id);
                //Temp
                $newitem.css("top", "-120px");
            });

            return this;
        },


        shownav: function (time) {
            if ($.fn.nav_moveing || $.fn.nav_isshow) {
                return;
            }

            if (!time)
                time = 300;

            var $navs = $(".aming_nav_frame_" + $.fn.random_id);
            var newtop = 0;
            var index = 0;
            var move_animate = function () {
                if ($navs.length <= index) {
                    $.fn.nav_moveing = false;
                    $.fn.nav_isshow = true;
                    return;
                }

                newtop = index * (100 + 14);
                $navs.animate({ top: newtop }, time, function () {
                    move_animate();
                });
                $navs[index] = null;
                index++;
            };

            $.fn.nav_moveing = true;
            move_animate();
        },

        hidenav: function (time) {
            if ($.fn.nav_moveing || !$.fn.nav_isshow) {
                return;
            }

            if (!time)
                time = 300;

            var $navs = $(".aming_nav_frame_" + $.fn.random_id);
            var newtop = 0;
            var index = $navs.length;
            var move_animate = function () {
                if (index < 0) {
                    $.fn.nav_moveing = false;
                    $.fn.nav_isshow = false;
                    return;
                }

                $navs = $(".aming_nav_frame_" + $.fn.random_id);

                index--;


                for (var i = 0; i < index; i++) {
                    $navs[i] = null;
                }




                newtop = index * (100 + 14);

                $navs.animate({ top: newtop }, time, function () {
                    move_animate();
                });

                $navs[index] = null;
            };

            $.fn.nav_moveing = true;
            move_animate();
        }
    });
})(window, document, jQuery);