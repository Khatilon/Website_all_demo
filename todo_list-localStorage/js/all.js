var btn=document.querySelector('.btn');
var list=document.querySelector('.add-list');
var need=document.querySelector('.need-todo-number');
var data = JSON.parse(localStorage.getItem('listData')) || [];  //因為add的function已經有先將data存成字串，故這邊只要用parse找就可以了
console.log(data);

update(data); //讓每次重新整理時，都可以

function add(e) {
	var text=document.querySelector('.content').value;
	var hour=document.querySelector('.hour').value;
	var min=document.querySelector('.min').value;
	console.log(text);
	console.log(hour);
	console.log(min);

	if(text=='' || hour=='' || min=='' ){
		alert('Content can not be null');
		return 0;
	}

	if(hour>24 || min>60){
		alert('Time can not out off range');
		return 0;
	}

	var todo={	//建立一個object來存放內容
		content:text,
		content2:hour,
		content3:min,
	};

	data.push(todo);  //將todo所存的資料塞入data

	localStorage.setItem('listData',JSON.stringify(data)); //用JSON先儲存成字串 放在listData裡面
	update(data);
}

function update(items){		//update這個function主要是為了顯示在網頁上，並且給予data的id。
	var len=items.length;
	var str='';
	var str_need='';
	var str_origin=0;
	var count=0;
	for(var i=0;i<len;i++){
		count++;
		str=str+'<li>'+'<div class="package">'+items[i].content2+'時'+items[i].content3+'分'+'<br>'+items[i].content+'<br>'+'<a href="#" data-id="'+i+'" class="delete-item">Delete</a>'+'</div>'+'</li>';
	}
	str_need=str_need+'您尚有'+count+'筆代辦事項';
	list.innerHTML=str;
	need.innerHTML=str_need;
}

function del(e){
	if(e.target.nodeName=='A'){
		var determine=confirm('Delete?');
		if(determine){
			//console.log(e.target);

			var item=e.target.dataset.id;
			console.log(item);

			data.splice(item,1);  //因為item是指到了點擊Delete後的那個a的id，故用item當作位置,消除1個數字。

			//增加或刪減完資料後，都要記得將data重新存回去，否則資料庫的資料無法被更改。
			localStorage.setItem('listData',JSON.stringify(data));
			update(data);
		}
	}
	else{
		return 0;
	}

}

btn.addEventListener('click',add,false);
list.addEventListener('click',del,false);


