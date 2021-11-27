$(document).ready(function(){
	var mode=0;
	var size = 10;
	var color = "black";
	var x;
	var y;
	var isPressed;
	var sizeField = $("#size");
	/*var canvas = document.getElementById("myCanvas");
	var colorElement = document.getElementById("color");
	var clearElement  = document.getElementById("clear");

	var ctx = canvas.getContext("2d");*/
	var canvas = $("canvas");
	var colorElement = $("#color");
	var clearElement = $("#clear");
	var bounds = document.getElementById("myCanvas").getBoundingClientRect();
	var ctx = canvas[0].getContext("2d");
	
	ctx.canvas.width = screen.width;
	ctx.canvas.height = screen.height;
	$("#mode").click(()=>{
		$("html").fadeOut(500);
		setTimeout(function(){
			mode = (mode+1)%2;
			$("#mode-icon").toggleClass('fa-moon fa-sun');
			if(mode==1){
				canvas.css("background","black");
				canvas.css("border","2px solid #00A8CC");
				$(".container").css("background","#00A8CC");
				$("#mode").css({"background":"white","color":"#ff9900"});
			}
			else{
				canvas.css("background","white");
				canvas.css("border","2px solid #1E5128");
				$(".container").css("background","#1E5128");
				$("#mode").css({"background":"black","color":"white"});
			}
			$("html").fadeIn(500);
		},1000);
	});

	$("#decrease").click(()=>{
		if(size<=5)	size = 1;
		else{
			if(size%5==0)	size = size - 5;
			else	size=size-size%5;
		}
		sizeField.val(size);
	});

	$("#increase").click(()=>{
		if(size>=50)	size = 50;
		else{
			if(size%5==0)	size = size + 5;
			else	size = size + (5-size%5);
		}
		sizeField.val(size);
	});

	//document.querySelector("#size").addEventListener("change",function () {
	sizeField.on("change",()=>{
		sizeChange = parseInt(sizeField.val());
		if(sizeChange<=0)	sizeChange=1;
		else if(sizeChange>50)	sizeChange=50;
		size = sizeChange;
		sizeField.val(size);
	});
	var prevX,prevY;
	var flag=false,dot_flag=false;
	//canvas.addEventListener("mousedown",(e)=>{
	canvas.on("mousedown",(e)=>{
		//isPressed = true;
		//x = e.clientX - ctx.canvas.offsetLeft;
        //y = e.clientY - ctx.canvas.offsetTop;
		prevX = x;
		prevY = y;
		x = e.offsetX;
		y = e.offsetY;
		flag = true;
		dot_flag = true;
		if (dot_flag) {
            drawCircle(x,y);
            dot_flag = false;
        }
	});
	//canvas.addEventListener("mouseup",(e)=>{
	canvas.on("mouseup",(e)=>{
		//isPressed = false;
		flag = false;
		//x = undefined;
		//y = undefined;
	});
	//canvas.addEventListener("mousemove",(e)=>{
	canvas.on("mousemove",(e)=>{
		if(flag){
		x2 = e.offsetX;
		y2 = e.offsetY;
		drawCircle(x2,y2);
		drawLine(x,y,x2,y2);
		x = x2;
		y = y2;
		}
	});

	function drawCircle(x,y){
		ctx.beginPath();
		ctx.arc(x,y,size,0,Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}

	function drawLine(x,y,x2,y2){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.strokeStyle = color;
		ctx.lineWidth = size*2;
		ctx.stroke();
		ctx.closePath();
	}

	//colorElement.addEventListener("change",(e)=>{
	colorElement.on("change",(e)=>{
		color = e.target.value;
	});

	$("#eraser").click(()=>{
		if(mode==0)	color = "white";
		else	color = "black";
		colorElement.onchange = function() {
			backRGB = this.value;
		}
	});
	
	//clearElement.addEventListener("click",()=>{
	clearElement.click(()=>{
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	});
});