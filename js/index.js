//继承基类方法
var temp = new Base();
var temp1 = new Base();
var temp2 = new Base();

$(function($){
	temp.condition = [
      	     { label: 'User Name', name: 'user_name', type: 'text'},
      	     { label: '下拉列表', name: 'item_name', type: 'selected', options: [{key: '10001', value: '第一项'}, {key: '10002', value: '第二项'}]},
    	     { label: 'Login ID1', name: 'login_id', type: 'text', id:'a1' },
    	     { label: 'Login ID2', name: 'login_id', type: 'text', id:'a2' },
    	     { label: 'Login ID4', name: 'login_id', type: 'text', id:'a4' }
//  	     { label: 'Radio ID3', x: '5', y: '7', name: 'test-radio', type: 'radio', options:[{id:"1",value:'测试1'}, {id: "2", value: '测试2'}] },
//  	     { label: '测试checkbox', x: '5', y: '7', name: 'test-checkbox', type: 'checkbox', options:[{id:"1",value:'测试1'}, {id: "2", value: '测试2'}] }
    	];
	temp.initCondition();
	
	init();
	
	$("#btn1").click(function(){
		temp1.queryForm = "test-div1";
		temp1.num = "2";
		
		temp1.condition = [
				{ label: 'User Name', name: 'user_name', type: 'text'},
      	     	{ label: '下拉列表1', name: 'item_name', type: 'selected', options: [{key: '10001', value: '第一项'}, {key: '10002', value: '第二项'}]},
    	     	{ label: 'Login ID1', name: 'login_id', type: 'text', id:'a1' },
    	     	{ label: 'Login ID2', name: 'login_id', type: 'text', id:'a2' }
    	     	];
		temp1.buttons = [{id:'ceshi',style:'btn',value:'测试'}];
		//弹出框
		temp1.popLayerWithTable("测试弹出框",temp1);
	});
    
    $("#btn2").on("click",function(){
    	temp2.queryForm = "test-div2";
    	
    	temp2.popGrid = "list2";
    	temp2.popPager = "grid-pager2";
    	temp2.Name = "temp2";
    	temp2.condition =[
				{ label: '第二个', name: 'user_name', type: 'text'},
      	     	{ label: '列表2', name: 'item_name', type: 'selected', options: [{key: '10001', value: '第一项'}, {key: '10002', value: '第二项'}]},
    	     	{ label: '测试A', name: 'login_id', type: 'text', id:'a1' },
    	     	{ label: '测试B', name: 'login_id', type: 'text', id:'a2' },
    	     	{ label: '测试C', name: 'login_id', type: 'text', id:'a3' }
    	     	];
    	temp2.buttons = [{id:'cancel',style:'btn',value:'取消'},{id:'confirm',style:'btn-primary',value:'确定'}];
		temp2.popLayerWithTable("测试弹出框2",temp2);
		

		
		
    });
    
    $("#btn3").on("click",function(){
    	// success warn fail
    	temp.autoclose("测试提示框" , "success");
    });
    
    $("#btn4").on("click",function(){
    	//success warn error
    	temp.gritter("测试失败");
    });
	
	
	
	
//	$.createQueryForm($('#query-form'), {
//  	action: '',
//  	method: 'post',
//  	number:'2', 	//text select每行的个数
////  	isTab: true,
//  	x:4, 	//label 宽度
//  	y:8,	//input 宽度 (text select)
//  	z:4,	//radio 宽度  checkbox宽度=12-z
//  	fieldModel: [
//    	     { label: 'User Name', name: 'user_name', type: 'text'},
//    	     { label: '下拉列表', name: 'item_name', type: 'selected', options: [{key: '10001', value: '第一项'}, {key: '10002', value: '第二项'}]},
//  	     { label: 'Login ID1', name: 'login_id', type: 'text', id:'a1' },
//  	     { label: 'Login ID2', name: 'login_id', type: 'text', id:'a2' },
////  	     { label: 'Login ID4', name: 'login_id', type: 'text', id:'a4' },
////  	     { label: 'Radio ID3', x: '5', y: '7', name: 'test-radio', type: 'radio', options:[{id:"1",value:'测试1'}, {id: "2", value: '测试2'}] },
////  	     { label: '测试checkbox', x: '5', y: '7', name: 'test-checkbox', type: 'checkbox', options:[{id:"1",value:'测试1'}, {id: "2", value: '测试2'}] }
//  	],
//  	buttons: [ 
//  		{ id:'search', value:'查询', type:'primary'},
//  		{ id:'reset', value:'重置', type:'reset'}
//  	]
//  });
//  
////  jQuery("#list2").jqGrid({ 
////  	url:'server.php?q=2', 
////  	datatype: "json", 
////  	colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'], 
////  	colModel:[ 
////  		{name:'id',index:'id', width:55}, 
////  		{name:'invdate',index:'invdate', width:90}, 
////  		{name:'name',index:'name asc, invdate', width:100}, {name:'amount',index:'amount', width:80, align:"right"}, {name:'tax',index:'tax', width:80, align:"right"}, {name:'total',index:'total', width:80,align:"right"}, {name:'note',index:'note', width:150, sortable:false} ], rowNum:10, rowList:[10,20,30], pager: '#pager2', sortname: 'id', viewrecords: true, sortorder: "desc", caption:"JSON Example" }); jQuery("#list2").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});
////  
//	$(".btn-primary").click(function(){
//		$.popLayer({
//	    	title : 'asdasfdsfdsfd',
//	    	button:[{id:'confirm',style:'btn-primary',value:'确定'},{id:'confirm1',style:'btn-primary',value:'确定'}],
//	    	tableID:"list4",
//	    	content:''
//	    });
//	});
    
   
    
    
//  $('#myModal').on('shown.bs.modal', function () {
//		$('#myInput').focus()
//	})
//  
	
});

function init(){
  	jQuery("#listTable").jqGrid(
      {
        datatype : "local",
        width : $("#listTable").parent().width(),
        autoWidth : true,
        height : "30%", 
        colNames : [ 'Inv No', 'Date', 'Client', 'Amount', 'Tax','Total', 'Notes' ],
        colModel : [ 
                     {name : 'id',index : 'id',width : 80,sorttype : "int"}, 
                     {name : 'invdate',index : 'invdate',width : 150,sorttype : "date"}, 
                     {name : 'name',index : 'name',width : 150}, 
                     {name : 'amount',index : 'amount',width : 150,align : "center",sorttype : "float"}, 
                     {name : 'tax',index : 'tax',width : 150,align : "left",sorttype : "float"}, 
                     {name : 'total',index : 'total',width : 150,align : "right",sorttype : "float"}, 
                     {name : 'note',index : 'note',width : 160,sortable : false} 
                   ],
        multiselect : true,
        rowNum:10,
        rowList: [10, 15, 20],
        pgbuttons : true, 	//是否显示翻页按钮
        viewrecords : true, //是否显示 总记录数
        pager: "#pager",
        loadComplete : function(){
			var table = this;
			setTimeout(function(){
				temp.gridPage(table);
			}, 0);
		}
      });
  	var mydata = [ 
                 {id : "1",invdate : "2007-10-01",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
                 {id : "2",invdate : "2007-10-02",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
                 {id : "3",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
                 {id : "4",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
                 {id : "5",invdate : "2007-10-05",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
                 {id : "6",invdate : "2007-09-06",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
                 {id : "7",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
                 {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"} 
               ];
//  jQuery("#listTable").jqGrid("setGridHeight", countMainTable()-getTopHeight()-GLOBAL_TABLE_OFFSET);
  for ( var i = 0; i <= mydata.length; i++){
    jQuery("#listTable").jqGrid('addRowData', i + 1, mydata[i]);
  }
}


temp2.gridInit = function(){
		var that = this;
	jQuery("#"+ that.popGrid).jqGrid(
      {
        datatype : "local",
        width: $("#"+ that.popGrid).parent().width(),
        autowidth: true,
        height:350,
        colNames : [ 'Inv No', 'Date', 'Client', 'Amount', 'Tax','Total', 'Notes' ],
        colModel : [ 
                     {name : 'id',index : 'id',width : 60,sorttype : "int"}, 
                     {name : 'invdate',index : 'invdate',width : 150,sorttype : "date"}, 
                     {name : 'name',index : 'name',width : 100}, 
                     {name : 'amount',index : 'amount',width : 80,align : "right",sorttype : "float"}, 
                     {name : 'tax',index : 'tax',width : 100,align : "right",sorttype : "float"}, 
                     {name : 'total',index : 'total',width : 180,align : "right",sorttype : "float"}, 
                     {name : 'note',index : 'note',width : 150,sortable : false} 
                   ],
        multiselect : true,
//      rowNum : 10,
//      rowList: [10, 20, 30],
        pager: "#"+ that.popPager,
//      caption : "Manipulating Array Data"
		loadComplete : function(){
			var table = this;
			setTimeout(function(){
				that.gridPage(table);
			}, 0);
		}
      });
  	var mydata = [ 
                 {id : "1",invdate : "2007-10-01",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "330.00"}, 
                 {id : "2",invdate : "2007-10-02",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "330.00"}, 
                 {id : "3",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "330.00"}, 
                 {id : "4",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "330.00"}, 
                 {id : "5",invdate : "2007-10-05",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "330.00"}, 
                 {id : "6",invdate : "2007-09-06",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "330.00"}, 
                 {id : "7",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "330.00"}, 
                 {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "330.00"}, 
                 {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
                 {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
                 {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
                 {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
                 {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"} 
               ];
  	for ( var i = 0; i <= mydata.length; i++){
    	jQuery("#"+ that.popGrid).jqGrid('addRowData', i + 1, mydata[i]);
  	}	
			
}		
