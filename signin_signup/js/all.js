var send=document.querySelector('.enter');
var sign=document.querySelector('.send');
var hidden=document.querySelector('.hidden');
var hiddenFail=document.querySelector('.hidden-fail');

function enter(){
	var email=document.querySelector('.account').value;
	var password=document.querySelector('.password').value;

	var account={	//物件
		email:email,
		password:password,
	}
	//或用 account={} , account.email=email; 及 account.password=password;
	console.log(account);

	var xhr = new XMLHttpRequest();
	xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signin',true);
	xhr.setRequestHeader('Content-type', 'application/json'); //送進去的格式是JSON

	//傳進去的data要是字串的格式，所以將物件轉成字串
	var data=JSON.stringify(account);
	console.log(data);
	xhr.send(data); //送data到後端去

	xhr.onload=function(){
		console.log(xhr);
		
		var callbackData=JSON.parse(xhr.responseText); //將回傳的字串變成json格式，要轉回object才能利用下面的callbackData.message
		console.log(callbackData);
		
		var veriStr=callbackData.message;
		console.log(veriStr);
		if(veriStr=="登入成功"){
			hiddenFail.style.display="none";
			alert('Account enter success!!!');
			hidden.style.display = "block";

		}
		else{
			hidden.style.display="none";
			alert('Account fail! Please retype account or sign up');
			hiddenFail.style.display = "block";
		}
		
		
	}	
}

function signup(){
	var email=document.querySelector('.account').value;
	var password=document.querySelector('.password').value;

	var account={	//物件
		email:email,
		password:password,
	}
	//或用 account={} , account.email=email; 及 account.password=password;
	console.log(account);

	var xhr = new XMLHttpRequest();
	xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signup',true);
	xhr.setRequestHeader('Content-type', 'application/json'); //格式是JSON

	//傳進去的data要是字串的格式，所以將物件轉成字串
	var data=JSON.stringify(account);
	xhr.send(data); //送data到後端去

	xhr.onload=function(){
		console.log(xhr); //會發現xhr.responseText是字串
			
		var callbackData=JSON.parse(xhr.responseText); //將回傳的字串變成json格式
		console.log(callbackData);

		var veriStr=callbackData.message;
		if(veriStr=="帳號註冊成功"){
			hidden.style.display="none";
			hiddenFail.style.display="none";
			alert('Account create success!!!');
		}
		else{
			hidden.style.display="none";
			hiddenFail.style.display="none";
			alert('Account create fail');
		}
		
	}	
}


send.addEventListener('click',enter,false);
sign.addEventListener('click',signup,false);