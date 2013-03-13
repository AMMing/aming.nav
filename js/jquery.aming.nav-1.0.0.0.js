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

(function ($) {
    //create_nav_item: new Array(),
    $.extend($.fn, {

        newitem_list: new Array(),

        aming_nav: function (setting, callback) {//默认值
            var sdata = $.extend({
                datalist: []
            }, setting);
            var r_id = parseInt(99999 * Math.random());
            var $renderTo = jQuery(this);
            var $nav_mainframe = jQuery("<div></div>");
            $nav_mainframe.addClass("aming_nav_mainframe");
            $nav_mainframe.addClass("aming_nav_mainframe" + r_id);
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
                $nav_title.css("padding", "15px 10px 0px 10px;");
                $nav_title.css("font-size", "24px");
                $nav_title.css("bottom", "0");
                $nav_title.css("right", "0");

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


            var list = this.newitem_list;

            $.each(sdata.datalist, function (index, item) {
                var $newitem = create_nav_item(item, $nav_mainframe);
                $newitem.attr("data-index", index);
                $newitem.css("z-index", 1000 - index);
                list.push($newitem);

                //Temp
                $newitem.css("top", "-120px");
            });
            this.create_nav_item


            return this;
        },

        ////动画执行中
        //nav_moveing: false,
        ////导航是否显示
        //nav_isshow: false,

        shownav: function (time) {
            //if (this.nav_moveing || this.nav_isshow) {
            //    return;
            //}
            if (!time)
                time = 300;

            //var moveing = this.nav_moveing;
            //var isshow = this.nav_isshow;
            //moveing = true;
            $.each(this.newitem_list, function (index, item) {
                var itemcount = this.newitem_list.length;
                var newtop = index * (100 + 14);
                var newtime = (index + 1) * time;
                item.animate({ top: newtop }, newtime, function () {
                    //if (index + 1 == itemcount) {
                    //    moveing = false;
                    //    isshow = true;
                    //    debugger;
                    //}
                });
            });
        },

        hidenav: function (time) {
            //if (this.nav_moveing || !this.nav_isshow) {
            //    return;
            //}
            if (!time)
                time = 300;

            //var moveing = this.nav_moveing;
            //var isshow = this.nav_isshow;
            //moveing = true;
            $.each(this.newitem_list, function (index, item) {
                var itemcount = this.newitem_list.length;
                var newtop = index * (100 + 14);
                var newtime = (index + 1) * time;
                var delaytime = (this.newitem_list.length - index) * time;
                item.delay(delaytime).animate({ top: -120 }, newtime, function () {
                    //if (index + 1 == itemcount) {
                    //    moveing = false;
                    //    isshow = false;
                    //}
                });
            });
        }
    });
})(jQuery)