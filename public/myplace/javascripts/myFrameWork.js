//event for jia form

console.log('setting files ' + settings.test);

var logIn = function(){
	var email = $('input#inputEmail').val();
	var ps = $('input#inputPassword').val();
	//alert(email + ' ' + ps);
	$("jiaForm input[name = 'ps']").val('');
	$.ajax({
		url: settings.host + '/users/login',
		type: 'post',
		//dataType: 'jsonp',
		//jsonp: 'jsonp', // mongod is expecting the parameter name to be called "jsonp"
		data: {email: email, ps: ps},
		success: function (data) {
			//console.log(data.id);
			if(typeof(Storage) !== "undefined") {
				localStorage.id = data.id;
				//$('#showLoginDiv').append(' | ' + data.id);
			} 
			logIn_sign();			
			changeBtn();
			$('p#log_out').append(' | ' +localStorage.id);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('error', errorThrown);
		}
	});
	
};

var makeEntry = function(){
	var jiaEntry = document.createElement('jiaEntry');
	this.body = jiaEntry;
	//this.test = function(){alert("Don't go gentle into that good night");}
	this.addDemo = function(media){
		var demo = document.createElement('demo');
		$(demo).append(media);
		$(this.body).append(demo);
	}
	this.addTitle = function(){
		var tag;
		var title;
		if(arguments.length == 1) title = arguments[0];
		else if(arguments.length > 1) {
			tag = arguments[0];
			title = arguments[1];
		}
		if(tag == undefined) tag = 'div';
		var title_ele= document.createElement(tag);
		$(title_ele).attr('class','title');
		$(title_ele).append(title);
		$(this.body).append(title_ele);
	}
	this.addContent = function(){
		var tag;
		var content;
		if(arguments.length == 1) content = arguments[0];
		else if(arguments.length > 1) {
			tag = arguments[0];
			content = arguments[1];
		}
		if(tag == undefined) tag = 'div';
		var content_ele = document.createElement(tag);
		$(content_ele).attr('class', 'content');
		$(content_ele).append(content);
		$(this.body).append(content_ele);
	}
	
	this.addEle = function(tag, content){
		var content_ele = document.createElement(tag);
		$(content_ele).append(content);
		$(this.body).append(content_ele);
	}
}

$(document).ready(function(){
	console.log('jia');
	$('jiaForm').keypress(function(e){
		if(e.which == 13){
			//console.log('enter pressed!');
			logIn();
		}
	});
	
});