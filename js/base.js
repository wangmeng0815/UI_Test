/*
 * 基类  
 * Editor ：wm
 * time：2015-11-30
 * function： 方便每个页面调用
 */
function Base(){}

Base.prototype.num="3";					//页面每行的控件个数
Base.prototype.popGrid = "list";		//表格ID
Base.prototype.popPager = "grid-pager";	//翻页ID

Base.prototype.popButton = null; /*[{id:'cancel',style:'btn',value:'取消'},{id:'confirm',style:'btn-primary',value:'确定'}];*/ //弹出框按妞


Base.prototype.queryForm = "query-form"; //搜索框ID
Base.prototype.queryButton = [ { id:'search', value:'查询', type:'primary'},{ id:'reset', value:'重置', type:'reset'}];
Base.prototype.condition = [
      	     { label: 'User Name', name: 'user_name', type: 'text'},
      	     { label: '下拉列表', name: 'item_name', type: 'selected', options: [{key: '10001', value: '第一项'}, {key: '10002', value: '第二项'}]},
    	     { label: 'Login ID1', name: 'login_id', type: 'text', id:'a1' },
    	     { label: 'Login ID2', name: 'login_id', type: 'text', id:'a2' },
    	     { label: 'Login ID4', name: 'login_id', type: 'text', id:'a4' },
    	     { label: 'Radio ID3', x: '5', y: '7', name: 'test-radio', type: 'radio', options:[{id:"1",value:'测试1'}, {id: "2", value: '测试2'}] },
    	     { label: '测试checkbox', x: '5', y: '7', name: 'test-checkbox', type: 'checkbox', options:[{id:"1",value:'测试1'}, {id: "2", value: '测试2'}] }
    	];

//快速搜索框 初始化
Base.prototype.initCondition = function(tab,strMethod,strAction){
	if(tab!=null&& tab== true){
		tab = true;
	}
	
	$.createQueryForm($("#"+ this.queryForm), {
    	action: '',
    	method: 'post',
    	number:this.num, 	//text select每行的个数
    	isTab: tab,
    	x:4, 	//label 宽度
    	y:8,	//input 宽度 (text select)
    	z:4,	//radio 宽度  checkbox宽度=12-z
    	fieldModel: this.condition,
    	buttons: this.queryButton
    });
	
};

//弹出框(不带表格)
Base.prototype.popLayer = function(text,btnList){
	
	$.popLayer({
	    title : text,
	    buttons: this.popButton,
	    tableID: table,
	    pagerName: pager,
	    content:'',
	    flag:false
	});
}

//弹出框 (带表格  带查询)
Base.prototype.popLayerWithTable = function(text,o){
	var div = "<div id='"+ this.queryForm +"' class='deline'></div>";
	
	$.popLayer({
	    title : text,
	    buttons: this.popButton,
	    tableID: this.popGrid,
	    pagerName: this.popPager,
	    content: div,
	    _obj:o
	    
	});
}

Base.prototype.gridInit = function(){
	var that = this;
	jQuery("#"+ that.popGrid).jqGrid(
      {
        datatype : "local",
        width: $("#"+ that.popGrid).parent().width(),
        autowidth: true,
//      height:350,
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
        rowNum : 10,
        rowList: [10, 20, 30],
        pager: "#"+ that.popPager,
//      caption : "Manipulating Array Data"
		loadComplete : function(){
			var table = this;
			setTimeout(function(){
				that.gridPage(table);
			}, 0);
			var ids = jQuery("#" + that.popGrid).jqGrid('getDataIDs');
			if(ids.length===0){
		        $(".no-tableMsg").remove();
		        $("#" + that.popGrid).parent().append('<div class="no-tableMsg"><img src="./img/warning.png" />没有符合条件的交易</div>');
		    }				
		}
      });
  	var mydata = [ 
//               {id : "1",invdate : "2007-10-01",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
//               {id : "2",invdate : "2007-10-02",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
//               {id : "3",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
//               {id : "4",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
//               {id : "5",invdate : "2007-10-05",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
//               {id : "6",invdate : "2007-09-06",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
//               {id : "7",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
//               {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
//               {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"} 
               ];
  	for ( var i = 0; i <= mydata.length; i++){
    	jQuery("#"+ that.popGrid).jqGrid('addRowData', i + 1, mydata[i]);
  	}
}


//右上角提示
Base.prototype.gritter = function( word, classType){
	var css = "gritter-light ";
	
	if(classType == "success"){
		css += "gritter-success";
	}else if(classType == "warn"){
		css += "gritter-warning";
	}else if(classType == "error"){
		css += "gritter-error";
	}else{
		css += "gritter-info";
	}
	//右上角提示（auto）
	$.gritter.add({
		//title: 'This is a notice without an image!',
		text: word,
		class_name: css
	});
    	
}

//遮罩提示
Base.prototype.autoclose = function(Msg, classType){
	$.autoclose({
//		    icon : ctx+'/common/images/autoclose/fail.png',
			type : classType,  //成功
//			type : "warn",     //提示
//			type : "fail",	   //失败 
		    msg:	Msg, 
		    second:2000
		});
}

//表格翻页方法
Base.prototype.gridPage = function(table){

	var replacement = 
		{
			'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
			'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
			'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
			'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
		var icon = $(this);
		var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
			
		if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	})

}


