var play;
var autoTime=play.auto;
var playtype=play.type;
album(autoTime,playtype);
function album(autoTime,type){
	var olen=$(".module").length;
	for(i=0;i<olen;i++){
		var ospan=document.createElement("span");
		$(".step").append(ospan);
		$($(".module")[i]).data("type",playtype[i]);//进入方式编号
	}

	//初始化item=0;
	var item=0,oT=0,oL=0;
	begin(item);
	function begin(item){
		if($($(".module")[item]).data("type")=="Top"){
			$(".module").css({top:"-100%",opacity:0,left:0});
			oT="100%",oL=0;
		}else if($($(".module")[item]).data("type")=="Bottom"){
			$(".module").css({top:"100%",opacity:0,left:0});
			oT="-100%",oL=0;
		}else if($($(".module")[item]).data("type")=="Left"){
			$(".module").css({top:0,opacity:0,left:"-100%"});
			oT=0,oL="100%";
		}else if($($(".module")[item]).data("type")=="Right"){
			$(".module").css({top:0,opacity:0,left:"100%"});
			oT=0,oL="-100%";
		}
		$($(".module")[item]).addClass("show");
		$($(".module")[item]).stop(true,false).animate({top:0,opacity: 1,left:0},800);
		$($(".step span")[item]).addClass("active");
	}
	
	
	
	
	var oplay="on";
	//鼠标滚动事件
	document.onmousewheel=function(e){
		var ev=e||event;
		var decoration=ev.wheelDelta>0?"up":"down";
		hand(decoration);
	}
	//手指滑动事件
	var oYS=0,oYE=0;
	document.ontouchstart=function(event){
		var event = event || window.event;
		oYS=event.touches[0].pageX;
	}
	document.ontouchend=function(event){
		var event = event || window.event;
		oYE=event.changedTouches[0].pageX;
		var oY=oYE-oYS;
		var decoration=oY>0?"up":"down";
		hand(decoration);
	}
	
	//手动播放
	function hand(decoration){
		if(decoration=="up"&&oplay=="on"){
			oplay="off";
			var s=$(".show").index();
			var num=s-1;
			if(num==-1){
				num=$(".module").length-1;
			}
			panduan(s,num);
		}else if(decoration=="down"&&oplay=="on"){
			oplay="off";
			var s=$(".show").index();
			var num=s+1;
			if(num>=$(".module").length){
				num=0;
			}
			panduan(s,num);
		}
		clearInterval(timer);
		autoplay();
	}
	
	//自动播放
	var timer;
	autoplay();
	function autoplay(){
		if(typeof(autoTime)!="number"){
			return;
		}
		timer=setInterval(function(){
			if(oplay=="on"){
				oplay="off";
				var s=$(".show").index();
				var num=s+1;
				if(num>=($(".module").length)){
					num=0;
				}
				panduan(s,num);
			}
		},autoTime);
	}
	

	//判断哪种进入方式
	function panduan(s,num){
		if($($(".module")[num]).data("type")=="Top"){
			Top(s,num);
		}else if($($(".module")[num]).data("type")=="Bottom"){
			Bottom(s,num);
		}else if($($(".module")[num]).data("type")=="Left"){
			Left(s,num);
		}else if($($(".module")[num]).data("type")=="Right"){
			Right(s,num);
		}
	}
	//进入
	function ImgShow(num){
		$(".show").removeClass("show");
		$(".step span").removeClass("active");
		$($(".module")[num]).addClass("show");
		$($(".step span")[num]).addClass("active");
	}
	
	//进入方式
	function Top(s,num){
		$($(".module")[s]).stop(true,false).animate({top:oT,opacity: 0,left:oL},600,function(){
			ImgShow(num);
			$(".module").css({top:"-100%",opacity:0,left:0});
			$($(".module")[num]).stop(true,false).animate({top:0,opacity: 1,left:0},800,function(){
				oplay="on";
			});
			oT="100%",oL=0;
		});
	}
	function Bottom(s,num){
		$($(".module")[s]).stop(true,false).animate({top:oT,opacity: 0,left:oL},600,function(){
			ImgShow(num);
			$(".module").css({top:"100%",opacity:0,left:0});
			$($(".module")[num]).stop(true,false).animate({top:0,opacity: 1,left:0},800,function(){
				oplay="on";
			});
			oT="-100%",oL=0;
		});
	}
	function Left(s,num){
		$($(".module")[s]).stop(true,false).animate({top:oT,opacity: 0,left:oL},600,function(){
			ImgShow(num);
			$(".module").css({top:0,opacity:0,left:"-100%"});
			$($(".module")[num]).stop(true,false).animate({top:0,opacity: 1,left:0},800,function(){
				oplay="on";
			});
			oT=0,oL="100%";
		});
	}
	function Right(s,num){
		$($(".module")[s]).stop(true,false).animate({top:oT,opacity: 0,left:oL},600,function(){
			ImgShow(num);
			$(".module").css({top:0,opacity:0,left:"100%"});
			$($(".module")[num]).stop(true,false).animate({top:0,opacity: 1,left:0},800,function(){
				oplay="on";
			});
			oT=0,oL="-100%";
		});
	}
	
	//音乐播放暂停
	var play="on";
	$(".music i").click(function(){
		if(play=="on"){
			document.getElementById("music").pause();
			play="off";
			$(".music i").css({animationPlayState:"paused"});
		}else if(play=="off"){
			document.getElementById("music").play();
			play="on";
			$(".music i").css({animationPlayState:"running"});
		}
	})
}