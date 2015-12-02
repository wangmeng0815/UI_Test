//function fun(n,o) {
//console.log(o)
//return {
//  fun:function(m){
//    return fun(m,n);
//  }
//};
//}
//var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
//var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
//var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?
//
////问:三行a,b,c的输出分别是什么？


//var bb = 1;
//function aa(bb) {
//  bb = 2;
//  alert(bb);
//};
//aa(bb);
//alert(bb);


function Foo() {
    var i = 0;
    return function() {
        console.log(i++);
    }
}
 
var f1 = Foo(),
    f2 = Foo();
f1();
f1();
f2();


