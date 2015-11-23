
//读取配置文件
$(function(){
	$.ajax({
		type: "get",
		url: "js/config.json",
		dataType: "json",
		async: false,
		success: function(strJson){
			var obj = eval(strJson);
			var strCss="";
			var strJs="";
			if(obj.global!=""){
			
				$.each(obj.css, function(index, temp) {
					var link = "<link rel='stylesheet' href='" + obj.global + "/css/" + temp.value + "' />";
					strCss+=link;
				});
				
				$.each(obj.js, function(index, temp){
					var script = "<script type='text/javascript' src='" + obj.global + "/js/" + temp.value + "' ></script>";
				
					strJs+=script;
				});
			}else{
				
				$.each(obj.css, function(index, temp){
					
					//http协议 ftp协议
					if(temp.value.indexOf("//")!=-1){
						var link = "<link rel='stylesheet' href='" + temp.value + "' />"
					}else if(){
						
						
					}
					
					
				});
				
				
				
				
			}
			
			
		},
		error: function(e){
			alert(e);
		}
	});
	
});
