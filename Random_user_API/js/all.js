window.onload=function(){
	var personCount=document.getElementById("personCount");
	var personImg=document.getElementsByClassName("personImg");
	var imgShow=document.querySelector(".imgShow");
	var show=false;

	function showPicture(e){
		e.stopPropagation(); //停止冒泡事件
		console.log(e.target);
		console.log(e.target.src);
		document.querySelector(".imgShow img").src=e.target.src;
		document.querySelector(".imgShow").classList.add("show");
		show=true;
	}

	function removeShow(){
		if(show){
			document.querySelector(".imgShow").classList.remove("show");
		}
	}

	function getPerson(e){
		// console.log(this.value);
		// console.log(e.keyCode);

		if(e.keyCode!==13){
			return
		}
		if(isNaN(this.value)){
			alert("Please input the real number");
			return
		}


		axios.get('https://randomuser.me/api/?results='+this.value)

		.then(function (response) {
			// handle success
			// console.log(response.data.results);

			var result=response.data.results;
			var html="";

			result.forEach(function(element){
				// console.log(element);
				html+='<div class="col-4 person"><img src="'+element.picture.large+'" alt="" class="img-fluid personImg">';
				html+='<h3>'+element.name.title+' '+element.name.first+' '+element.name.last+'</h3>';
				html+='<a href="#">'+element.email+'</a>'
				html+='</div>';
			})

			document.querySelector(".RandomAPI .person .row").innerHTML=html;

			for(var i=0;i<personImg.length;i++){
				personImg[i].addEventListener("click",showPicture);
			}
			
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
	}

	
	personCount.addEventListener("keyup",getPerson);
	imgShow.addEventListener("click",removeShow);
	
	

	
}