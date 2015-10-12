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

$(document).ready(function(){
	console.log('jia');
	$('jiaForm').keypress(function(e){
		if(e.which == 13){
			//console.log('enter pressed!');
			logIn();
		}
	});
	
});