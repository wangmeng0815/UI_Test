/********************************************
 *文件功能描述：整个项目工程的自动关闭提示框 autoclose({})，默认不关闭，当有时间时会自动关闭
 * 创建人chunfeng.bi
 * 创建时间：2014/12/02
******************************************/
(function($){
	$.extend({
		autoclose : function(options) {
			var defaults = {
				icon : null,
				msg : '操作成功',
				seconds : 3000,
				type: null,  //1 默认样式,warn警告样式success,成功样式fail,失败样式
				closeable:true
			};
			$.extend(defaults, options);
			var objLayer = createlayer(defaults);
			var timer=defaults.seconds;
			if(timer!== undefined && timer!==null &&timer!==''){
				disapper(defaults,objLayer);
			}
			var closebtn=objLayer.find("#ui_close");
			closelayer(closebtn,objLayer);
		}
	});
	$(window).resize(function(){
		$("#ui_dialog").css({
			left:($(window).width()- $("#ui_dialog").width())/2+'px',
			top:($(window).height()-$(document.body).scrollTop()- $("#ui_dialog").height())/2+'px'
	    });
	});
	/**
	 * 创建弹出层
	 */
	var createlayer=function(options){
		var defaults={};
		$.extend(defaults, options);
		
		var str='';
			str+='<div class="ui_dialog_mask" id="ui_dialog_mask"></div>';
		    str+='<div class="ui_dialog" id="ui_dialog">';
		    str+='<div class="ui_dialogbox">';
		    str+='<div class="ui_dialogbox_inner">';
		    if(defaults.closeable){
		    	str+='<button class="ui_close" id="ui_close">×</button>';
		    }
		    str+='<p class="ui_text">';
		    if(defaults.icon != null){
		    	str+='<img class="ui_icon" alt="图标" src="'+defaults.icon+'" />';
		    }
		    str+='<span>'+defaults.msg+'</span></p>';
		    str+='<div class="ui_clear"></div>';
		    str+='</div></div></div>';
		var objLayer = $(str);
		objLayer.appendTo($(document.body));
		if(defaults.type == "warn"){
			$(".ui_dialog").addClass("w_ui_dialog");
			$(".ui_close").addClass("w_ui_close");
			$(".ui_dialogbox_inner").addClass("w_ui_dialogbox_inner");
		}else if(defaults.type == "success"){
			$(".ui_dialog").addClass("s_ui_dialog");
			$(".ui_close").addClass("s_ui_close");
			$(".ui_dialogbox_inner").addClass("s_ui_dialogbox_inner");
		}else if(defaults.type == "fail"){
			$(".ui_dialog").addClass("d_ui_dialog");
			$(".ui_close").addClass("d_ui_close");
			$(".ui_dialogbox_inner").addClass("d_ui_dialogbox_inner");
		}else{
			$(".ui_dialog").addClass("ui_dialog");
			$(".ui_close").addClass("ui_close");
		}
		var docheight='';
		if($(document.body).height()>=$(window).height()){
			docheight=$(window).height();
		}else{
			docheight=$(window).height()- $(document.body).scrollTop();
		}
		var iWeight=($(document.body).width()-$(".ui_dialog").width())/2;
		var iHeight=(docheight-$(".ui_dialog").height())/2;
		$(".ui_dialog").css({'left':iWeight+'px','top':iHeight+'px',"display":"none"});
		$(".ui_dialog").fadeIn(700);
		return objLayer;
	};
	/**
	 * 开启定时器
	 */
	var disapper=function(options,obj){
		var defaults={};
		$.extend(defaults,options);
		setInterval(function(){
			obj.fadeOut(700,function(){
				obj.remove();
			});
			
		},defaults.seconds);
	}
	/**
	 * 点击按钮关闭层
	 */
	var closelayer = function(btn,obj){
		btn.click(function(){
			obj.remove();
		});
	}
})(jQuery);

