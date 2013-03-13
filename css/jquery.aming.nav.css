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
*    $("img").amingimage();
*/
(function ($) {
    $.extend($.fn, {
        amingimage: function (setting, callback) {//默认值
            var sdata = $.extend({
                /**显示的时间*/
                time: 800,
                /**图片加载完后的触发的方法*/
                loaded: {},
                //加载完显示的过渡效果
                effect: function (obj, p_time, p_callback) {
                    jQuery(obj).fadeIn(p_time, p_callback);
                    if (sdata.loaded && (sdata.loaded instanceof Function)) {
                        sdata.loaded();
                    }
                },
                //隐藏起img
                hide: function (obj) {
                    jQuery(obj).hide();
                }
            }, setting);

            var renderTo = jQuery(this);
            var img = new Image();

            sdata.hide(this);
            img.src = renderTo.attr("src");

            if (img.complete) {
                sdata.effect(this, sdata.time, callback);

                return this;
            }

            renderTo.bind("load", function () {
                sdata.effect(this, sdata.time, callback);
            });

            return this;
        }
    });
})(jQuery)