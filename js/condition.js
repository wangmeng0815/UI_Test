$.createQueryForm = function (div, obj){
	var qf = $("<form class='form-horizontal '></form>");
	
	qf.attr("action", obj.url);
	qf.attr("method", obj.method);
	var num = Math.floor(12/obj.number);
	var row = $("<div class='row'></div>");
	var btnWidth = 2;
	if(obj.isTab){
		btnWidth = 3;
	}
	var conWidth = 12-btnWidth;
	var condition = $("<div class='col-md-" + conWidth + "'></div>");
	var hideDiv = $("<div id='hideDiv' style='display:none'></div>");
	var buttons = obj.buttons;
	
	$.each(obj.fieldModel, function(index, value){
		
		if(obj.fieldModel.length<=obj.number&&index==(obj.fieldModel.length-1)){
			row.append($.field.button(obj.buttons,false,btnWidth));
		}
		
		if(value.type!="checkbox"&&value.type!="radio"){
			
			if(index%obj.number==0&&index!=0){//当需要换行的时候 ->进入
				
				row.append(condition);
				
				if(index==obj.number){
					row.append($.field.button(obj.buttons,true,btnWidth));
					row.appendTo(qf);
				}else{
					row.appendTo(hideDiv);
				}
				
				row = $("<div class='row'></div>");
				condition = $("<div class='col-md-"+ conWidth +"'></div>");
			}
		
			if(value.type == 'text') {
				condition.append($.field.text(value,num,obj.x,obj.y));//.appendTo(row)
				row.append(condition);
			}else if(value.type == 'selected'){
				condition.append($.field.selected(value,num,obj.x,obj.y));//.appendTo(row);
				row.append(condition);
			}else if(value.type == 'date'){
				condition.append($.field.dates(value,num,obj.x,obj.y));//
				row.append(condition);
			}
			
		}else{ // (value.type=="checkbox"||value.type=="radio"){
			
			if(value.type=="checkbox"){//
				
				if(obj.z==0){
					row.appendTo(hideDiv);
					row = $("<div class='row'></div>");
				}
				
				row.append($.field.checkbox(value,12-obj.z));
			}else{//radioButton
				row.appendTo(hideDiv);
			
				row = $("<div class='row'></div>");
				
				row.append($.field.radio(value,obj.z));
				
			}
		}
		
		if(index < obj.number){
			row.appendTo(qf);
		}else{
			row.appendTo(hideDiv);
		}
		
	});
	
	qf.append(hideDiv).appendTo(div);	
//	qf.appendTo(div);
}

$.field = {
	text: function(f,n,x,y) {
		var f_text =  "<div class='col-md-"+ n +" no-padding'>"  
						+ "<label class='col-md-"+ x +" control-label' for='form-field-1'> " + f.label + " </label>"
				       	+ "<input type='"+ f.type +"' id='" + f.id + "' class='col-md-"+ y +"' name='" + f.name + "'/>"
				      + "</div>";
		
		return $(f_text);
	},
	selected: function(f,n,x,y) {
		var temp="<div class='col-md-"+ n +" no-padding'></div>"
		var d = $(temp);
		var label = "<label class='col-md-"+ x +" control-label' for='form-field-select-1'>" + f.label + "</label>";
		var selected = $("<select class='col-md-"+ y +" no-margin-left' id='" + f.id + "' name='" + f.name + "'></select>");
		selected.append($("<option value=''></option>"))
		$.each(f.options, function(index, opt){
			if(opt.select){
				selected.append($("<option value='"+opt.key+"' selected = 'selected'>"+opt.value+"</option>"));
			}else{
				selected.append($("<option value='"+opt.key+"'>"+opt.value+"</option>"));
			}
			
		});
		
		return d.append(label).append(selected);
	},
	dates: function(f,n,x,y){
		
		var temp = "<div class='col-md-" + n + " no-padding'></div>";
		var d = $(temp);
		var label = "<label class='col-md-" + x + " control-label'>" + f.label + "</label>";
		var t = $("<div class='col-md-" + y + " no-padding-left'></div>");
		t.append($("<input type='text' id='" + f.startID+ "' class='col-md-5' style='min-width:90px;' /><label style='float:left; line-height:30px; margin:0 5px;'>—</label><input type='text' id='" + f.endID + "' class='col-md-5' style='min-width:90px;' />"));
		return d.append(label).append(t);
	},
	
	checkbox: function(f,n) {
		var d = $("<div class='col-md-"+ n +" no-padding'></div>");
		var label = "<label class='col-md-" + f.x + " control-label'>" + f.label + "</label>";
		var checkDiv=$("<div class='col-md-" + f.y + "'></div>");
		d.append(label);
		$.each(f.options, function(index, opt){
			var span = $("<span class='bus-check'></span>");
			var chx = $("<input type='" + f.type + "' name='" + f.name + "' id='" + opt.id + "'  />");
			var title = $("<label class='check-label'>" + opt.value + "</label>");
			span.append(chx).append(title);
			checkDiv.append(span);
		});
		
		return d.append(checkDiv);
	},
	radio : function(f,n){
		var d = $("<div class='col-md-" + n + " no-padding'></div>");
		var label = $("<label class='control-label col-md-"+ f.x +"'>" + f.label + "</label>");
		var radioDiv = $("<div class='col-md-" + f.y + "'></div>");
		d.append(label);
		$.each(f.options, function(index, opt) {
			var span = $("<span class='bus-check'></span>");
			var radio = $("<input type='radio' name='"+ f.name +"' id='" + opt.id + "' />");
			var title = $("<label class='check-label'>" + opt.value + "</label>");
			span.append(radio).append(title);
			radioDiv.append(span);
		});
		
		return d.append(radioDiv);
		
	},
	button : function(buttons,more,n){
		var d = $("<div class='col-md-" + n + " pull-right'></div>");
		
		$.each(buttons, function(index, obj) {
			var btn=null;
		  	if(obj.id=='reset'){
		    	btn=$("<input type='reset' id='"+obj.id+"' class='col-md-4 btn aBtn btn-"+obj.type+"'"+"value='"+obj.value+"'/>")
			}
		   	else{
		   	 	btn=$("<input type='button' id='"+obj.id+"' class='col-md-4 btn aBtn btn-"+obj.type+"'"+"value='"+obj.value+"'/>")
		   	}
		   	
			if(obj.event){
				btn.on("click",function(){
					obj.event();
				});
			}
			btn.appendTo(d);
		});
		
		if(more){
			var aMore = $("<a class='more' style='margin-top:5px;display:inline-block'>更多<i class=' icon-angle-down'></i></a>");
			aMore.appendTo(d);
			
			aMore.on('click',function() {
				var temp = $(this).closest('form').find('#hideDiv');
				if($(temp).attr("style")=="display:none"){
					$(temp).attr("style","display:block");
					$(this).text("收起");
				}else{
					$(temp).attr("style","display:none");
					$(this).text("更多");
				}
			});	
			
		}
		return d;
	}
	
}

    


