function inner(){
	alert(arguments.callee);//指向拥有这个arguments对象的函数，即inner()
	alert(arguments.callee.caller);//这个属性保存着调用当前函数的函数的引用,即outer()
}
function outer(){
	inner();
}

