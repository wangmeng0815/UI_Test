var EventUtil = {
	addHandler: function(el, type, handler){
		if(el.addEventListener){
			el.addEventListener(type,handler,false);
		}else if(el.attachEvent){
			el.attachEvent("on" + type,handler);
		}else{
			el["on" + type] = handler;
		}
	},
	//返回对event对象的引用
	getEvent: function(event){
		return event ? event : window.event;
	},
	
	//返回事件的目标
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	
	//取消事件的默认行为
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.detachEvent("on" + type, handler)
		}else{
			element["on" + type] = null;
		}
	},
	//阻止浏览器默认的时间冒泡行为
	stopProgation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},
	
	//鼠标滑动事件
	getRelatedTarget: function(event){
		
		//省略其他代码
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}
		
		//省略其他代码
	},
	
	//鼠标按钮
	getButton: function(event){
		//检查浏览器是否支持DOM2级事件 
		if(documnet.implementation.hasFeature("mouseEvents","2.0")){
			//检测浏览器是否支持上面所有事件
			//documnet.implementation.hasFeature("MouseEvent","3.0")
			
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	}
	
};

	