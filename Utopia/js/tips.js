/*
*只接受类传入
*
*/
(function($){
    $.fn.tips = function(options){
        defaults = {
            timeout: 1000,
            delay: 10,
            attribute: 'title',
            content: false,
            alive: false,
            enter: function(){},
            exit: function(){}
        };

        var opts = $.extend(defaults, options);
        
        if($("#tip_container").length <= 0){
            var $tip_container = $("<div id='tip_container'></div>");
            var $tip_content = $("<div id='tip_content'></div>");
            $("body").append($tip_container.html($tip_content));
            //$tip_content.html("222");
        }
        else{
            var $tip_container = $("#tip_container");
            var $tip_content = $("#tip_content");
        }
        
        return this.each(function(){
            var $element = $(this);
            $data = opts.content ? opts.content : $element.attr(opts.attribute);
            if($data != ''){
                $timeout = false;
                $temp = false;
                //var $act = opts.act;
                //alert($act) 方法设置
                $element.hover(function(e){
                    $tdata = opts.content ? opts.content : $element.attr(opts.attribute);
                    $data = "<div class='new_add'>" + $tdata + "</div>";
                    if($tdata != undefined){
                        $temp = $element.attr(opts.attribute);
                        $element.removeAttr(opts.attribute);
                    }else{
                        $temp = false;
                        return false;
                    }
                    $po_left = e.pageX;
                    //$po_top = e.pageY;
                    $height = $(this).height();
                    $po_top = $(this).offset().top + $height;
                    show_tip($po_left, $po_top, $timeout);
                },function(){
                    if(!opts.alive){
                        if($temp){
                            $element.attr(opts.attribute, $temp);
                        }
                        hide_tip($timeout);
                    }
                })
                //显示tip框
                function show_tip(){
                    $tip_content.html($data);
                    $tip_container.css({position:"absolute", left:$po_left, top:$po_top})
                    //$tip_container.delay(opts.delay).fadeIn(opts.timeout);
                    if ($timeout){ clearTimeout($timeout); }
                    $timeout = setTimeout(function(){ $tip_container.stop(true,true).fadeIn(opts.timeout);}, opts.delay);
                }
                //隐藏tip框
                function hide_tip(){
                    //$tip_container.delay(opts.delay).fadeOut(opts.timeout);
                    if ($timeout){ clearTimeout($timeout); }
                    $tip_container.fadeOut(opts.timeout);
                }
            }else{
            return false;
            }
        })


        /*
        //为元素element绑定事件
        $(opts.element).bind(opts.act, function(e){
            if(!$(this).children().hasClass("new_add")){
                //显示内容从该标签的自定义属性origin-title读取
                var $cur_content = $(this).attr("origin-title") ? $(this).attr("origin-title") : $(this).attr("title");
                if($cur_content == undefined){
                    return false;
                }
                $(this).attr("title", "");
                //alert($(this).offset().left + " , " + $(this).offset().top);
                //var $width = $(this).width();
                //var $po_left = $(this).offset().left + $width/2;
                var $po_left = e.pageX;
                var $height = $(this).height();
                var $po_top = e.pageY;
                //var $po_top = $(this).offset().top + $height;
                //清除title内容，避免重复显示
                //$(this).attr("title", "");
                //显示tips框
                var $new_id = "new_" + $po_left + "_" + $po_top;
                $(this).append("<div class='new_add' id='" + $new_id + "'>" + $cur_content + "</div>");
                $("#"+$new_id).css({position:"absolute", left:$po_left, top:$po_top})
                $("#"+$new_id).delay(opts.delay).fadeIn(opts.timeout);
                //unact时，清除格式
                $(this).bind(opts.unact, function(){
                    if(opts.element == 'a' || opts.element == 'img'){
                        $(this).attr("title", $cur_content);
                    }
                    $("#"+$new_id).fadeOut(opts.timeout);
                    //$("#"+$new_id).delay(opts.timeout).remove();
                });
            }
            else{
                //alert($new_id)
                $("#"+$new_id).delay(opts.delay).fadeIn(opts.timeout);
                $(this).bind(opts.unact, function(){
                    $("#"+$new_id).fadeOut(opts.timeout);
                    //$("#"+$new_id).delay(opts.timeout).remove();
                });
            }
        });
        */
    };
})(jQuery);