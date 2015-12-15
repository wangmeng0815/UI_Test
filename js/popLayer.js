/********************************************
 *文件功能描述：项目弹出层控件
 * 创建人wm
 * 创建时间：2015/11/22
******************************************/
(function($){
	$.extend({
		popLayer : function(options) {
			var defaults = {
				alayer : 'myModal',
				style : 'modal-lg',//
				title : null,
				tableID: "temp",
				pagerName: "temp",
				content: null,
				buttons: null,  //[{id:'confirm',style:'btn-primary',value:'确定'}]
				_obj: Base
			};
			$.extend(defaults, options);
			var objLayer = createlayer(defaults);
			
			
			$(document.body).addClass("modal-open");
			$('#' + defaults.alayer).modal('show');
		}
	});
	/**
	 * 创建弹出层
	 */
	var createlayer = function(defaults){
//		var defaults={};
//		$.extend(defaults, options);
		
		var myModel = $("<div id='" + defaults.alayer + "' class='modal fade bs-example-"+ defaults.style +"' tabindex='-1' role='dialog' ></div>");
		
		var modelDialog = $("<div class='modal-dialog "+ defaults.style +"'></div>");
		
//		var myModel = $("<div id='myModal' class='modal fade bs-example-modal-lg' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel'></div>");
//		
//		var modelDialog = $("<div class='modal-dialog modal-lg'></div>");
		
		var Content = $("<div class='modal-content'></div>");
		
		modelDialog.append(Content).appendTo(myModel);
		
		myModel.appendTo($(document.body));
		
		if(defaults.title){
			var header = $("<div class='modal-header'></div>");
			var close = $("<button id='closeBtn' type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
			var head = $("<h4 class='modal-title' id='exampleModalLabel'>" + defaults.title + "</h4>")
		
			header.append(close).append(head).appendTo(Content);
		}
		
		var contentBody = $("<div class='modal-body'></div>");
//		contentBody.append(defaults.content).appendTo(Content);
		$(defaults.content).appendTo(contentBody).appendTo(Content);
		
		//添加搜索插件
		if(typeof defaults._obj.initCondition == 'function' ){
			defaults._obj.initCondition(true);
		}
		
		if(defaults.tableID != "temp"){
			var tableTemp = "<table id='"+ defaults.tableID +"'></table>";
			var pager = "<div id='"+ defaults.pagerName +"'></div>";
			$(tableTemp).appendTo(contentBody);
			$(pager).appendTo(contentBody);
		}
		contentBody.appendTo(Content);
		
		//表格建立
		if(typeof defaults._obj.gridInit == 'function' ){
			defaults._obj.gridInit();
		}
		
		
		if(defaults.buttons){
			var modelFooter = $("<div class='modal-footer'></div>");
			$.each(defaults.buttons, function(index, obj){
				var btnConfirm;
				if(obj.bClose){
					btnConfirm = $("<button id='"+ obj.id +"' type='button' class='btn " + obj.style + "' data-dismiss='modal'>"+ obj.value +"</button>");
				}else{
					btnConfirm = $("<button id='"+ obj.id +"' type='button' class='btn " + obj.style + "'>"+ obj.value +"</button>");
				}
				
				btnConfirm.appendTo(modelFooter);
				
			});
		
			modelFooter.appendTo(Content);
		}
		
		return myModel;
	};
	
//	$('#myModal').on('hidden.bs.modal', function (e) {
//		$(document.body).remove("#myModel");
//		$(document.body).removeClass("modal-open");
//		alert(123);
//	})
	
})(jQuery);


