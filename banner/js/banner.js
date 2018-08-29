/*
	思路：
		1、先处理好左右两个按钮，来回切换，能够保证图片正常切换
		2、能正常来还切换之后，在来处理右下角的小圆点，跟随者图片切换来变化
		3、在切换中加上动画
		4、开启一个定时器，两秒调用一次右边按钮的onclick
		5、解决定时器和点击右边按钮以及图片切换动画定时器的冲突, 在点击按钮的时候，先停止轮播定时器和动画定时器,当前有可能上一张图片动画还未完成，然后又清除了动画，所以要把图片的left值设置是当前图片距离左边距）
		6、处理远点的onmouse事件，和点击左右两个按钮一致
	*/
let imgsUL = document.getElementById("imgs").getElementsByTagName("ul")[0],
      nav=document.getElementById("nav").getElementsByTagName("ul")[0],
	  //上一个
	  prious=document.getElementById("preous"),
		//下一个
      next =document.getElementById("next"),
      timer=null, animTimer=null, index=1;
	  
	  //init images set images offsetLeft PX
      function initImgs(cur_index){
          clearInterval(timer);
		  clearInterval(animTimer);
		  let off = cur_index*1280;
		  imgsUL.style.left=-off+"px";
      }

	  //init animate
	  function animate(offset){
	     let newLeft = parseInt(imgsUL.offsetLeft)+offset;
	          if(newLeft > -1280){
			      donghua(-5120);
			  }else if(newLeft < -5120){
			      donghua(-1280);
			  }else{
			     donghua(newLeft);
			  }
	  }

	  function donghua(offset){
	      clearInterval(animTimer);
		  animTimer = setInterval(function(){
		    imgsUL.style.left = imgsUL.offsetLeft + (offset-imgsUL.offsetLeft)/10+"px";
			if(imgsUL.offsetLeft-offset<10&&imgsUL.offsetLeft-offset>-10){
			   imgsUL.style.left = offset+"px";
			   clearInterval(animTimer);
			   play();
			}
		  },20);
	  }

	  function play(){
	     timer = setInterval(function(){
		    next.onclick();
		 },2000)
	  }
	
	 function btnShow(cur_index){
	    let list = nav.children;
		for(let i = 0;i<nav.children.length;i++){
		    nav.children[i].children[0].className="hidden";
		}
		nav.children[cur_index-1].children[0].className="current";
	 }

	 for(var i = 0; i < nav.children.length;i++){
	    nav.children[i].index = i;
		var sd = nav.children[i].index;
		nav.children[i].onmouseover=function(){
		   index = this.index+1;
		   initImgs(this.index+1);
		   btnShow(this.index+1);
		}
		nav.children[i].onmouseout=function(){
		   play();
		}
	 }

     prious.onclick = function(){
	    initImgs(index);
		index-=1;
		if(index<1){
		   index = 4;
		}
		animate(1280);
		btnShow(index);
	 }

	 next.onclick = function(){
	   initImgs(index);
	   index+=1;
	   if(index>4){
	       index = 1;
	   }
	   animate(-1280);
	   btnShow(index);
	 }