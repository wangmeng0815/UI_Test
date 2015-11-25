/********************************************
 *文件功能描述：项目弹出层控件
 * 创建人wm
 * 创建时间：2015/07/22
******************************************/
(function($){
	$.extend({
		popLayer : function(options) {
			var defaults = {
				style : 'modal-lg',//
				title : null,
				tableID: "temp",
				pagerName: "temp",
				content: null,
				button: null//[{id:'confirm',style:'btn-primary',value:'确定'}]
			};
			$.extend(defaults, options);
			var objLayer = createlayer(defaults);
			
			if(typeof gridInit == 'function' ){
				gridInit();
			}
			
			$(document.body).addClass("modal-open");
			$('#myModal').modal('show');
		}
	});
	/**
	 * 创建弹出层
	 */
	var createlayer = function(options){
		var defaults={};
		$.extend(defaults, options);
		
		var myModel = $("<div id='myModal' class='modal fade bs-example-modal-lg' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel'></div>");
		
		var modelDialog = $("<div class='modal-dialog "+ defaults.style +"'></div>");
		
		var content = $("<div class='modal-content'></div>");
		
		modelDialog.append(content).appendTo(myModel);
		
		myModel.appendTo($(document.body));
		
		if(defaults.title){
			var header = $("<div class='modal-header'></div>");
			var close = $("<button id='closeBtn' type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
			var head = $("<h4 class='modal-title' id='exampleModalLabel'>" + defaults.title + "</h4>")
		
			header.append(close).append(head).appendTo(content);
		}
		
		var contentBody = $("<div class='modal-body'></div>");
		if(defaults.tableID != "temp"){
			var tableTemp = "<table id='"+ defaults.tableID +"'></table>";
			var pager = "<div id='"+ defaults.pagerName +"'></div>"
			$(tableTemp).appendTo(contentBody);
			$(pager).appendTo(contentBody);
		}
		
		contentBody.append(defaults.content).appendTo(content);
		
		if(defaults.button){
			var modelFooter = $("<div class='modal-footer'></div>");
			$.each(defaults.button, function(index, obj){
				var btnConfirm = $("<button id='"+ obj.id +"' type='button' class='btn " + obj.style + "'>"+ obj.value +"</button>");
				
				btnConfirm.appendTo(modelFooter);
				
			});
		
			modelFooter.appendTo(content);
		}
		
		return myModel;
	};
	
//	$('#myModal').on('hidden.bs.modal', function (e) {
//		$(document.body).remove("#myModel");
//		$(document.body).removeClass("modal-open");
//		alert(123);
//	})
	
})(jQuery);

