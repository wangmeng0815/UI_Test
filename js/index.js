$(function($){
	$.createQueryForm($('#query-form'), {
    	action: '',
    	method: 'post',
    	number:'3', 	//text select每行的个数
    	isTab: true,
    	x:4, 	//label 宽度
    	y:8,	//input 宽度 (text select)
    	z:4,	//radio 宽度  checkbox宽度=12-z
    	fieldModel: [
      	     { label: 'User Name', name: 'user_name', type: 'text'},
      	     { label: '下拉列表', name: 'item_name', type: 'selected', options: [{key: '10001', value: '第一项'}, {key: '10002', value: '第二项'}]},
    	     { label: 'Login ID1', name: 'login_id', type: 'text', id:'a1' },
    	     { label: 'Login ID2', name: 'login_id', type: 'text', id:'a2' },
    	     { label: 'Login ID3', name: 'login_id', type: 'radio', id:'a3' },
    	     { label: 'Login ID4', name: 'login_id', type: 'text', id:'a4' }
    	],
    	buttons: [ 
    		{ id:'search', value:'查询', type:'primary'},
    		{ id:'reset', value:'重置', type:'reset'}
    	]
    });
    
//  jQuery("#list2").jqGrid({ 
//  	url:'server.php?q=2', 
//  	datatype: "json", 
//  	colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'], 
//  	colModel:[ 
//  		{name:'id',index:'id', width:55}, 
//  		{name:'invdate',index:'invdate', width:90}, 
//  		{name:'name',index:'name asc, invdate', width:100}, {name:'amount',index:'amount', width:80, align:"right"}, {name:'tax',index:'tax', width:80, align:"right"}, {name:'total',index:'total', width:80,align:"right"}, {name:'note',index:'note', width:150, sortable:false} ], rowNum:10, rowList:[10,20,30], pager: '#pager2', sortname: 'id', viewrecords: true, sortorder: "desc", caption:"JSON Example" }); jQuery("#list2").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});
//  
	$(".btn-primary").click(function(){
		$.popLayer({
	    	title : 'asdasfdsfdsfd',
	    	button:[{id:'confirm',style:'btn-primary',value:'确定'},{id:'confirm1',style:'btn-primary',value:'确定'}],
	    	tableID:"list4",
	    	content:''
	    });
	});
    
    
//  $('#myModal').on('shown.bs.modal', function () {
//		$('#myInput').focus()
//	})
//  
	
});

function gridInit(){
  jQuery("#list").jqGrid(
      {
        datatype : "local",
        height : 250,
        colNames : [ 'Inv No', 'Date', 'Client', 'Amount', 'Tax','Total', 'Notes' ],
        colModel : [ 
                     {name : 'id',index : 'id',width : 60,sorttype : "int"}, 
                     {name : 'invdate',index : 'invdate',width : 90,sorttype : "date"}, 
                     {name : 'name',index : 'name',width : 100}, 
                     {name : 'amount',index : 'amount',width : 80,align : "right",sorttype : "float"}, 
                     {name : 'tax',index : 'tax',width : 80,align : "right",sorttype : "float"}, 
                     {name : 'total',index : 'total',width : 80,align : "right",sorttype : "float"}, 
                     {name : 'note',index : 'note',width : 150,sortable : false} 
                   ],
        multiselect : true,
        caption : "Manipulating Array Data"
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
                 {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"} 
               ];
  for ( var i = 0; i <= mydata.length; i++){
    jQuery("#list").jqGrid('addRowData', i + 1, mydata[i]);
  }
}
