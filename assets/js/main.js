
$(function(){
	drawItems();
	var parent = $(".list-group-item-my");
	for(var i=0; i<parent.length; i++){
		parent[i].addEventListener("click", hidenClick, false);
	}
	$('.next-item').hide();
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	$('#bg-img').height(winHeight);
	$('#bg-img').width(winWidth);
	$('#top-wrapper').css('max-height', 500);
	$('#custom-bg').css('height', 500);
	console.log($('#top-wrapper').height());
	$('[data-toggle="tooltip"]').tooltip();
});

function hidenClick(e){
	e = e || event;						
	try{
		e.preventDefault();
	}catch(x){
		e.returnValue = false;
	};
	var obj = $(e.target);
	if(obj.hasClass("obj-count")){
		return false;
	}else if(obj.hasClass("updated")){
		return false;
	}else if(obj.hasClass("glyphicon glyphicon-pencil")){
		return false;
	}else if(obj.hasClass("glyphicon")){
		if(obj.attr("class") == "glyphicon glyphicon-eye-close"){
			var p = obj.parent();
			obj.parent().html("<span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span>");
			p.find('span').css('color', 'orange');
		}else if(obj.attr("class") == "glyphicon glyphicon-eye-open"){
			var p = obj.parent();
			obj.parent().html("<span class=\"glyphicon glyphicon-eye-close\" aria-hidden=\"true\"></span>");
			p.find('span').css('color', 'black');
		}
		return false;
	}
	var classN = obj.find('i').attr("class");
	if(classN.indexOf('plus') !== -1){
		obj.find('i').removeClass( "fa fa-plus-square-o" ).addClass( "fa fa-minus-square-o" );
	}else if (classN.indexOf('minus') !== -1){
		obj.find('i').removeClass( "fa fa-minus-square-o" ).addClass( "fa fa-plus-square-o" );
	}
	obj.toggleClass('gray');
	var sibl = obj.next("span").find(".next-item:first ~ .next-item");
	for(var i=0; i<sibl.length; i++){
		$(sibl[i]).toggle();
	}
}

function drawItems(){	
	var myHTML = '';
	var temporaryString1 = '';
	var temporaryString2 = '';
	
	var template = "<div class='list-group-item-my'>#name#<div class='icons-wrapper'><span class='obj-count float-r' data-toggle='tooltip' data-placement='top' title='Всего&nbsp;объектов'>#objcount#</span><div class='visible-layer float-l' data-toggle='tooltip' data-placement='top' title='Видимость слоя'><span class='glyphicon glyphicon-eye-close' aria-hidden='true'></span></div><div class='visible-scale float-l' data-toggle='tooltip' data-placement='top' title='Видимость&nbsp;на&nbsp;текущем&nbsp;масштабе'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></div><div class='updated float-l' data-toggle='modal' data-target='.bs-example-modal-sm'><span class='glyphicon glyphicon-pencil' aria-hidden='true' data-toggle='tooltip' data-placement='top' title='Последние&nbsp;обновления'></span></div></div></div>";
	
	var template1 = "<div class='list-group-item-my'><i class='fa fa-plus-square-o' aria-hidden='true'></i> #name#<div class='icons-wrapper'><span class='obj-count float-r' data-toggle='tooltip' data-placement='top' title='Всего&nbsp;объектов'>#objcount#</span><div class='visible-layer float-l' data-toggle='tooltip' data-placement='top' title='Видимость слоя'><span class='glyphicon glyphicon-eye-close' aria-hidden='true'></span></div><div class='visible-scale float-l' data-toggle='tooltip' data-placement='top' title='Видимость&nbsp;на&nbsp;текущем&nbsp;масштабе'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></div><div class='updated float-l' data-toggle='modal' data-target='.bs-example-modal-sm'><span class='glyphicon glyphicon-pencil' aria-hidden='true' data-toggle='tooltip' data-placement='top' title='Последние&nbsp;обновления'></span></div></div></div>";
			
	var template2 = "<span><div class='list-group-item-my next-item'></div>";
	
	var template3 = "<div class='list-group-item-my next-item'>#name#<div class='icons-wrapper'><span class='obj-count float-r' data-toggle='tooltip' data-placement='top' title='Всего&nbsp;объектов'>#objcount#</span><div class='visible-layer float-l' data-toggle='tooltip' data-placement='top' title='Видимость слоя'><span class='glyphicon glyphicon-eye-close' aria-hidden='true'></span></div><div class='visible-scale float-l' data-toggle='tooltip' data-placement='top' title='Видимость&nbsp;на&nbsp;текущем&nbsp;масштабе'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></div><div class='updated float-l' data-toggle='modal' data-target='.bs-example-modal-sm'><span class='glyphicon glyphicon-pencil' aria-hidden='true' data-toggle='tooltip' data-placement='top' title='Последние&nbsp;обновления'></span></div></div></div>";
	
	var template4 = "</span>";
		
	for(var key in items){
		if(items[key].hasSubitem === false){
			temporaryString1 = template;
		}else{
			temporaryString1 = template1;
		}
		temporaryString1 = temporaryString1.replace('#name#', items[key].name);
		temporaryString1 = temporaryString1.replace('#objcount#', items[key].objcount);
		temporaryString1 += template2;
		if(items[key].hasSubitem === true){
			var subitems = items[key].subitem;
			for(var k in subitems){
				temporaryString2 = template3;
				temporaryString2 = temporaryString2.replace('#name#', subitems[k].name);
				temporaryString2 = temporaryString2.replace('#objcount#', subitems[k].objcount);
				temporaryString1 += temporaryString2;
			}		
		}
		temporaryString1 += template4;
		myHTML = myHTML + temporaryString1;	
	}	
	$('.list-group-my').html(myHTML);
}	