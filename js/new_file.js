$(document).ready(function(){
	//resize to fit page size
	var contentWidth=$(".page-content").width();
	$(window).on('resize.jqGrid', function () {
		var parent_width = $("#grid-table").closest('.tab-pane').width();
		$("#grid-table").jqGrid( 'setGridWidth', parent_width );
    })

	function updatePagerIcons(table) {
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
	
	function eidtable(cellValue, options, rowObject) {
		
		//return '<a href=./' + cellValue + '/get.html>'+cellValue+'</a>';
		
		return '<a href="javascript:void(0)" onclick="eidtableWin();">'+cellValue+'</a>';
	}
 
	 

	 
			$.createQueryForm($('#query-form'), {
		    	action: '',
		    	method: 'post',
		    	number:'2', 	//text select每行的个数
		    	isTab: true,
		    	x:4, 	//label 宽度
		    	y:6,	//input 宽度 (text select)
		    	z:4,	//radio 宽度  checkbox宽度=12-z
		    	fieldModel: [
		             { id:'userName',label: '支付宝姓名', name: 'userName', type: 'typeahead'},
		             { id:'activityName',label: '活动名称', name: 'activityName', type: 'text'},
		    	     { id:'codeId',label: '活动代码', name: 'codeId', type: 'text'},
		    	     { id:'sellerNick',label: '旺旺号', name: 'sellerNick', type: 'text'},
		    	     { id:'startTime',label: '申请时间起始', name: 'startTime', type: 'text'},
		    	     { id:'endTime',label: '申请时间结束', name: 'endTime', type: 'text'},
		    	     { id:'mobile',label: '手机号', name: 'mobile', type: 'text'}
    		    	],
		    	buttons :[         
		    				{ id:'search', value:'查询', type:'primary'},
		    				{ id:'reset', value:'重置', type:'reset'}
		    			]
		    });
		    
			$('#grid-table').jqGrid({
				 jsonReader: {
					 root: "items",
					 page: "page",
				     total: "totalPages",
				     records: "totalCount",
				     id: "id"
				 },
				 url: '../salesManageAction/querySalesListInfo.json',
		         mtype: 'POST',
		         datatype: "json",
		         postData: {    
		             'payStatus': 0,    
		           },  
		         colModel: [
						{ label:'活动名称', name: 'activity_name', width: 150, formatter:showDetail},
						{ label:'活动代码', name: 'code_id', width: 105},
						{ label:'手机号', name: 'mobile', width: 120},
						{ label:'申请时间', name: 'create_time', width: 150},
		   				{ label:'旺旺号', name: 'seller_nick', width: 150},
		   				{ label:'支付宝姓名', name: 'name', width: 150},
		   				{ label:'活动金额', name: 'money', width: 100},
		   				{ label:'活动负责人', name: 'sale_user', width: 100},
		   				{ label:'操作', name: 'operate', width: 100,formatter:status_0},
		   				
		         ],
		         /*shrinkToFit:false,*/
				 viewrecords: true,
				 autowidth: true,
		         height: 'auto',
		         rowNum: 15,
		         sortorder: "desc", //倒序
		         pager: "#grid-pager",
//		         multiselect: true,
		         loadComplete : function() {
					var table = this;
					var ids = jQuery("#grid-table").jqGrid('getDataIDs');
					
					$("div[name='no-tableMsg']").each(function(){
				    	$(this).remove();
				    });
					if(ids.length==0){
						$("#grid-table").find(".no-tableMsg").remove();
				    	$("#grid-table").parent().append('<div name="no-tableMsg" class="no-tableMsg"><img src="'+getNoMsgImage()+'" />没有符合条件的交易</div>');
					}
					setTimeout(function(){
						updatePagerIcons(table);
					}, 0);
					
				},
			});
			function status_0( cellvalue, options, rowObject){
				var mobile= rowObject.mobile || '';
				var seller_nick = rowObject.seller_nick||'';
				var name = rowObject.name|| '';
				var data = [];
				data.push('<a href="javascript:void(0);"  onclick="doEdit1(\''+rowObject.id+'\', '+1+', '+0+','+rowObject.mobile+',\''+rowObject.seller_nick+'\')"  >已付</a>&nbsp&nbsp');
				data.push('<a href="javascript:void(0);"  onclick="doEdit1(\''+rowObject.id+'\', '+2+', '+0+','+rowObject.mobile+',\''+rowObject.seller_nick+'\')"   >拒付</a>');
				return data.join('');
			};
			
			// 绑定查询
			$("#unpaid .btn.btn-primary").unbind("click");
			$("#unpaid .btn.btn-primary").click(function(){
				reload_0();
			});
			
			// 绑定重置 
			$("#unpaid .btn.btn-reset").unbind("click");
			$("#unpaid .btn.btn-reset").click(function(){
				
				$("#unpaid .form-horizontal").find("input").val("");
				
			});
			
			$.fn.datepicker.defaults.format = "yyyy-mm-dd";
			$("#startTime,#endTime,#payStartTime,#payEndTime").attr("autocomplete","off");
			$('#payStartTime,#payEndTime').datepicker({
				todayBtn: true,
//				startDate: '0d',
				autoclose:true,
				todayHighlight: true,
				language: 'cn'
			});
			$('#startTime,#endTime').datepicker({
				todayBtn: true,
//				startDate: '0d',
				autoclose:true,
				todayHighlight: true,
				language: 'cn'
			});
			
			var substringMatcher = function() {
				return function findMatches(q, cb) {
					var matches, substringRegex;
					matches = [];
					substrRegex = new RegExp(q, 'i');
					$.ajax({
						 dataType:"json",
						 type:"POST",
						 url:"../account/getNamesForTypeahead.json",
						 data: {payStatus:0},
						 async:false,
						 success: function(data){
							 $.each(data, function(i, str) {
								if (substrRegex.test(str)) {
									matches.push({ value: str });
								}
							});
						 }
					 });
		
					cb(matches);
				}
			 }
		
			 $('#userName').typeahead({
				hint: true,
				highlight: true,
				minLength: 1
			 }, {
				name: 'states',
				displayKey: 'value',
				source: substringMatcher()
			 });
			 //添加导出功能
			 $("#export_btn").click(function(){
				 var userName=$.trim($("#userName").val());
				 var activityName=$.trim($("#activityName").val());
				 var sellerNick=$.trim($("#sellerNick").val());
				 var startTime =	$.trim($("#startTime").val());
				 var endTime = $.trim($("#endTime").val());
//				 'activityName':activityName,
//					'userName':userName,
//					'sellerNick':sellerNick,
//					'startTime':startTime,
//					'endTime	':endTime
				 var url="../salesManageAction/exportSalesListInfo?payStatus=0"
			     if(activityName.trim()!=''){
			    	 url += "&activityName="+activityName.trim();
			     }
				 if(userName.trim()!=''){
			    	 url += "&userName="+userName.trim();
			     }
				 if(sellerNick.trim()!=''){
			    	 url += "&sellerNick="+sellerNick.trim();
			     }
				 if(startTime.trim()!=''){
			    	 url += "&startTime="+startTime.trim()+" 00:00:00";
			     }
				 if(endTime.trim()!=''){
			    	 url += "&endTime="+endTime.trim()+" 23:59:59";
			     }
				 $('#export_btn').attr('href',url); 
			 });
		 
});
 

/***加入方法*****/


function doEdit1(id,payStatus,tab,mobile,seller_nick){
	//alert("sdfsdf");
	 $.ajax({
		 data: {id:id,payStatus:payStatus,mobile:mobile,sellerNick:seller_nick},
         dataType: "json",
		   type: "POST",
		   url: "../salesManageAction/updateActivityUser",
		   success: function(data){
				  $("#grid-table").jqGrid('setGridParam', {//刷新界面
				    url: '../salesManageAction/querySalesListInfo.json',
				    mtype: "POST",
			        datatype: "json",
			        pager: "#grid-pager"
				  }).trigger("reloadGrid");   
		   }
		});	
};
 






/****方法结束*****/

function reload_0(){
	var userName=$.trim($("#userName").val());
	var activityName=$.trim($("#activityName").val());
	var sellerNick=$.trim($("#sellerNick").val());
	var codeId=$.trim($("#codeId").val());
	var startTime =	$.trim($("#startTime").val());
	var endTime = $.trim($("#endTime").val());
	var mobile = $.trim($("#mobile").val());
	payStatus = 0;
	$('#grid-table').jqGrid('setGridParam',{  
		datatype:'json',  
		postData:{
			'activityName':activityName,
			'userName':userName,
			'sellerNick':sellerNick,
			'startTime':startTime,
			'endTime	':endTime,
			'codeId':codeId,
			'mobile':mobile
		}, //发送数据  
		  pager: "#grid-pager" 
	}).trigger("reloadGrid"); //重新载入  
}

function showDetail(cellValue, options, rowObject){
	var reid = rowObject.activity_id.toString();
	return '<a href="javascript:void(0)" onclick="showtableS(\''+reid+'\');">'+cellValue+'</a>';
}
function showtableS(id) {
	
	$.ajax({
		type: "POST",
        url: "../sales/queryactDetail.json",
        data: {id:id.toString()},
        dataType: "json",
        async:false,
       success: function(data){
    	 //初始化  负责人选择框
    		$.ajax( {
    			type : "post",
    			url : "../salesManageAction/getAllUser.json",
    			async : false,
    			success:function(data){
    				$("#form_sale_user").html("");
    				var data = eval(data);
    				var arr = data;
    				for(var tmp in arr){
    					arr.push("<option value='"+arr[tmp].id+"'>"+arr[tmp].name+"</option>");
    				}
    				$("#new_form_sale_user").append(arr.join(""));
    				$("#form_sale_user").append(arr.join(""));
    				return;
    			}
    		});
    	   
        	var daat = data.items;
        	var chanType = daat[0].payment_type;
        	var typeTitle="";
        	if(chanType == 0){
        		typeTitle = "一次付清";
        	}else if(chanType == 1){
        		typeTitle = "按活动人头数";
        	}
        	var s_Time = daat[0].start_time.split(" ")[0];
        	var e_Time = daat[0].end_time.split(" ")[0];
        	jQuery("#form_activity_name").val(daat[0].activity_name);
        	jQuery("#form_code_id").val(daat[0].code_id);
        	jQuery("#form_extended_address").val(daat[0].extended_address);
        	jQuery("#form_marketing_order_address").val(daat[0].marketing_order_address);
        	jQuery("#form_money").val(daat[0].money);
        	jQuery("#form_start_time").val(s_Time);
        	jQuery("#form_end_time").val(e_Time);
        	jQuery("#form_sale_user").val(daat[0].name);//活动负责人
        	jQuery("#form_channel_type").val(daat[0].channel_type_name);//渠道类型
        	jQuery("#form_channel_name").val(daat[0].channel_name);//渠道名称
        	jQuery("#form_payment_type").val(typeTitle);//佣金支付方式
        	jQuery("#form_payment_money").val(daat[0].payment_money);
        },
        error:function(){
        	alert("error");
        }
	});
	// 弹出框
	//显示活动详细信息
	var title = "详细活动信息";
	$("#box-title").text(title);
	$('#modal-form').modal('show');
	//$("#myModal-alertNoPlus").modal("show");
}



 
 
