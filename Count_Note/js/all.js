

window.onload=function(){

	//CRUD 
	var data=JSON.parse(localStorage.getItem('DataTest')) || [];
	console.log(data);

	var date=new Date();
	console.log(typeof(date));
	var year=date.getFullYear();
	var month=date.getMonth()+1; //month從0算
	var day=date.getDate();
	var today=year+"-"+month+"-"+day;
	console.log(year+"-"+month+"-"+day);

	var btnsubmit=document.querySelector(".btn-submit");
	var btnclearall=document.querySelector(".btn-clear");
	var btncal=document.querySelector(".btn-cal");

	var inputtext=document.querySelector(".input");
	var choosetext=document.querySelector("select");
	var list=document.querySelector(".list");
	var search=document.querySelector(".select");

	console.log(choosetext.value);

	function nowDays(){
		document.querySelector(".now-days").innerText=today;
	}

	//Create

	function submit(e){
		console.log(inputtext.value);
		if(inputtext.value==""){
			alert("The input can not be empty!");
			return;
		
		}
		console.log(choosetext.value);

		var nowinput=inputtext.value;
		var nowchoose=choosetext.value;
		console.log(nowchoose);

		var count={
			class:nowchoose,
			fee:nowinput,
			data:today,	
		}

		console.log(count);
		data.push(count);
		console.log(data);
		
		update(data);
		localStorage.setItem("DataTest",JSON.stringify(data));
	}

	function update(item){
		var html="";
		console.log(item);
	
		item.forEach( function(element, index) {
			console.log(element);
			console.log(index);
			html=html+'<div class="list-item col-2">';
			html=html+'<p>'+element.data+'</p>';
			html=html+'<p>'+element.class+'</p>';
			html=html+'<p>'+element.fee+'</p>';
			html=html+'<a href="#" data-id="'+index+'">Delete</a></div>';
		});

		list.innerHTML=html;
	}

	function clearitem(e){

		var id=e.target.dataset.id;
		console.log(e.target); //不可用this or e.currentTarget, 否則永遠指到ul
		console.log(e.target.nodeName);
		if(e.target.nodeName!=="A"){
			return;
		}
		var result=confirm("Ensure to delete the item ?");

		if(result){
			console.log(id);
			data.splice(id,1);
			console.log(data);

			update(data);

			localStorage.setItem("DataTest",JSON.stringify(data));
		}
		

	}

	function clearall(e){
		data=[];
		update(data);
		localStorage.setItem("DataTest",JSON.stringify(data));

	}

	function calall(e){ //calall step: add all the item --> class all --> clear the initial state

		var arrclass=["收入","食物費","醫療費","旅遊費","孝親費","生活必需品"];
		var arrmoney=[];

		for(var i=0;i<arrclass.length;i++){
			arrmoney[i]=0;
		}

		data.forEach( function(element, index) {
			// statements
			// console.log(element);
			// console.log(index);
			for(var i=0;i<arrclass.length;i++){
				if(arrclass[i]==data[index].class){
					arrmoney[i]=arrmoney[i]+Number(data[index].fee); //對應到arrclass的順序
				}
			}
		});
		console.log(arrclass);
		console.log(arrmoney);


		clearall();//先清掉全部的data;

		for(var i=0;i<arrclass.length;i++){

			var count={			//count一定要放在裡面,否則會變成全部都一樣的狀況
				class:"",
				fee:0,
				data:today,	
			}
			count.class=arrclass[i];
			count.fee=arrmoney[i];
			data.push(count);
		}

		console.log(data);
		update(data);
		localStorage.setItem("DataTest",JSON.stringify(data));

	}

	function keysearch(){

		var arrclass=["收入","食物費","醫療費","旅遊費","孝親費","生活必需品"];
		// console.log(this.value);
		var searchNow=this.value;
		var temp=[];
		for(var i=0;i<arrclass.length;i++){
			if(searchNow==arrclass[i]){
				data.forEach( function(element, index) {
					// statements
					// console.log("data");
					if(element.class==searchNow){
						// console.log(element.class);
						var count={			//count一定要放在裡面,否則會變成全部都一樣的狀況
							class:"",
							fee:0,
							data:today,	
						}

						count.class=element.class;
						count.fee=element.fee;

						temp.push(count);
					}
				});
			}
		}

		console.log(temp);

		update(temp);
		
	}


	update(data);

	nowDays();


	btnsubmit.addEventListener("click",submit);
	btnclearall.addEventListener("click",clearall);
	list.addEventListener("click",clearitem);
	btncal.addEventListener("click",calall);
	search.addEventListener("keyup",keysearch);
	

}