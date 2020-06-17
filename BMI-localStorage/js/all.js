var btn=document.querySelector('.btn');
var list=document.querySelector('.add-list');
var data=JSON.parse(localStorage.getItem('listData')) || [];  //有資料就讀資料，沒資料就data=[];  
															  //JSON.parse是用來將資料轉成JSON格式的

update(data);

function add(e){
	var height_origin=document.querySelector('.height').value;
	var weight=document.querySelector('.weight').value;
	console.log(height_origin);
	console.log(weight);


	if(height=='' || weight==''){
		alert('Height and Weight can not be null');
		return 0;
	}


	var height=height_origin/100;
	var BMI=weight/(height*height);
	BMI=BMI.toFixed(2); //小數點下兩位
	console.log('BMI is '+BMI);

	var status;
	if(BMI=='NaN'){
		alert('Input Error !');
		return 0;
	}
	else if(BMI<18.5){
		status='體重過輕';
	}
	else if(18.5<=BMI && BMI<24){
		status='健康體位';
	}
	else if(24<=BMI && BMI<27){
		status='過重';
	}
	else if(27<=BMI && BMI<30){
		status='輕度肥胖';
	}
	else{
		status='該減肥了!';
	}

	var date = new Date(); // Time object
    var MM = (date.getMonth()+1);  // 從0開始 +1（0~11月）
    var DD = date.getDate();
    var YY = date.getFullYear();
    //var hours = date.getHours();
    //var min = date.getMinutes();
    //var sec = date.getSeconds();
    var time = YY+'-'+MM+'-'+DD;//+' '+hours+':'+ min+':'+sec;

	var todo={			//建立todo的物件準備塞到localStorage
		content1:BMI,
		content2:status,
		content3:time,
	};

	console.log('content1:'+todo.content1);
	console.log('content2:'+todo.content2);
	console.log('content3:'+todo.content3);

	data.push(todo); //若一開始都沒資料的話data=[];

	//不管刪除還是增加，最後都要記得更新資料庫
	localStorage.setItem('listData',JSON.stringify(data)); //更新localStoage的data  //塞進去時要轉成string

	update(data);
}

function update(item){
	var len=item.length; //==data.length, 只是因為傳進來的資料data是以item當參數做代替，所以要改用item.length
	console.log('len is '+len);
	var str='';
	for(var i=0;i<len;i++){
		//製作出完整的html str
		str=str+'<li>'
					+'BMI:'+item[i].content1+'<br>'
					+item[i].content2+'<br>'+item[i].content3+'<br>'
					+'<a href="#" class="del" data-id="'+i+'">Delete</a>'
			   +'</li>';
	}
	list.innerHTML=str;
}


function del(e){
	var target=e.target.dataset.id;  //找data-id的值，為了下面的.splice刪除
	console.log(target);
	var check=confirm('Are you sure to delete the data ?');
	if(check){
		if(e.target.nodeName!='A'){
			console.log('hi');
			return 0;
		}		
		data.splice(target,1);  //target=目標的位置,1代表刪除一個數字
		//不管刪除還是增加，最後都要記得更新資料庫
		localStorage.setItem('listData',JSON.stringify(data));
		update(data);
	}
}


btn.addEventListener('click',add,false);
list.addEventListener('click',del,false);