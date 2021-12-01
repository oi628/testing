$(document).ready(function(){
	let mode=0;
	let size = 10;
	let color = "black";
	let x;
	let y;
	let isPressed;
	let eraser=0;
	let sizeField = $("#size");
	/*var canvas = document.getElementById("myCanvas");
	var colorElement = document.getElementById("color");
	var clearElement  = document.getElementById("clear");

	var ctx = canvas.getContext("2d");*/
	const canvas = $("canvas");
	const colorElement = $("#color");
	const clearElement = $("#clear");
	const save = $("#save");
	//const bounds = document.getElementById("myCanvas").getBoundingClientRect();
	const ctx = canvas[0].getContext("2d");
	const canvass = document.getElementById("myCanvas");
	//const ctx = canvass.getContext("2d");
	//canvass.width = window.innerWidth;
	//canvass.height = window.innerHeight;
	
	//window.addEventListener('resize', resizeCanvas, false);
	
	//function resizeCanvas() {
    ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
    //drawStuff(); 
  //}
  
  //resizeCanvas();
	$(".popup").hide();
	//function drawStuff(){
	save.click(()=>{
		var link = document.createElement('a');
		link.setAttribute('download', 'amn.png');
		//var image = document.getElementById("myCanvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
		link.setAttribute('href', document.getElementById("myCanvas").toDataURL("image/png").replace("image/png", "image/octet-stream"));
		link.click();
		//window.location.href=image;
		//window.location = document.getElementById("myCanvas").toDataURL('image/png');
		$(".popup").fadeIn(1000);
	});
	
	$("#mode").click(()=>{
		$("html").fadeOut(500);
		setTimeout(function(){
			mode = (mode+1)%2;
			$("#mode-icon").toggleClass('fa-moon fa-sun');
			if(mode==1){
				canvas.css("background","black");
				canvas.css("border","2px solid #48dbfb");
				$(".container").css({"border":"2px solid #48dbfb","background":"black"});
				$("button").css({"border":"2px solid #48dbfb","background":"black","color":"#48dbfb"});
				$("#mode").css({"background":"white","color":"#ff9900"});
			}
			else{
				canvas.css("background","white");
				canvas.css("border","2px solid #1E5128");
				$(".container").css({"border":"0","background":"#1E5128"});
				$("button").css({"border":"0","background":"white","color":"black"});
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

	let prevX,prevY;
	//document.querySelector("#size").addEventListener("change",function () {
	sizeField.on("change",()=>{
		sizeChange = parseInt(sizeField.val());
		if(sizeChange<=0)	sizeChange=1;
		else if(sizeChange>50)	sizeChange=50;
		size = sizeChange;
		sizeField.val(size);
	});
	
	//canvas.addEventListener("mousedown",(e)=>{
	canvas.on("mousedown",(e)=>{
		isPressed = true;
		prevX = x;
		prevY = y;
		x = e.pageX - ctx.canvas.offsetLeft;
        y = e.pageY - ctx.canvas.offsetTop;
	});
	//canvas.addEventListener("mouseup",(e)=>{
	canvas.on("mouseup",(e)=>{
		isPressed = false;
		x = undefined;
		y = undefined;
	});
	//canvas.addEventListener("mousemove",(e)=>{
	canvas.on("mousemove",(e)=>{
		if(isPressed){
			e.preventDefault();
			e.stopPropagation();
			x = e.pageX - ctx.canvas.offsetLeft;
			y = e.pageY - ctx.canvas.offsetTop;
			if(eraser==1){
				removeCircle(x,y);
				removeLine(prevX,prevY,x,y);
			}
			else{
				drawCircle(x,y);
				drawLine(prevX,prevY,x,y);
			}
			prevX = x;
			prevY = y;
		}
	});
	
	canvas.on("touchstart",(e)=>{
		isPressed = true;
		prevX = x;
		prevY = y;
		x = e.touches[0].pageX - ctx.canvas.offsetLeft;
		y = e.touches[0].pageY - ctx.canvas.offsetTop;
	});
	//canvas.addEventListener("mouseup",(e)=>{
	canvas.on("touchend",(e)=>{
		isPressed = false;
		if(eraser!=1)	drawCircle(x,y);
		x = undefined;
		y = undefined;
	});
	//canvas.addEventListener("mousemove",(e)=>{
	canvas.on("touchmove",(e)=>{
		if(isPressed){
			e.preventDefault();
			e.stopPropagation();
			x = e.touches[0].pageX - ctx.canvas.offsetLeft;
			y = e.touches[0].pageY - ctx.canvas.offsetTop;
			if(eraser==1){
				removeCircle(x,y);
				removeLine(prevX,prevY,x,y);
			}
			else{
				drawCircle(x,y);
				drawLine(prevX,prevY,x,y);
			}
			prevX = x;
			prevY = y;
		}
	});
	
	
	/*canvass.addEventListener("touchmove", function (e) {
		e.preventDefault();
		e.stopPropagation();
		let touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvass.dispatchEvent(mouseEvent);
	}, false);
	canvass.addEventListener("touchstart", function (e) {
		let touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvass.dispatchEvent(mouseEvent);
	}, false);
	canvass.addEventListener("touchend", function (e) {
		let touch = e.touches[0];
		var mouseEvent = new MouseEvent("mouseup", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvass.dispatchEvent(mouseEvent);
	}, false);*/
	function drawCircle(x,y){
		ctx.beginPath();
		ctx.arc(x,y,size,0,Math.PI * 2);
		ctx.globalCompositeOperation = "source-over"; 
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}
	
	function removeCircle(x,y){
		ctx.beginPath();
		ctx.globalCompositeOperation = "destination-out";  
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.arc(x,y,size,0,Math.PI * 2,false);
		//ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}
	function drawLine(x,y,x2,y2){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.globalCompositeOperation = "source-over"; 
		ctx.strokeStyle = color;
		ctx.lineWidth = size*2;
		ctx.stroke();
		ctx.closePath();
	}
	function removeLine(x,y,x2,y2){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.globalCompositeOperation = "destination-out";  
		ctx.strokeStyle = "rgba(255,255,255,1)";
		ctx.lineWidth = size*2;
		ctx.stroke();
		ctx.closePath();
	}
	//colorElement.addEventListener("change",(e)=>{
	colorElement.on("change",(e)=>{
		color = e.target.value;
		eraser = 0;
	});

	$("#eraser").click(()=>{
		/*if(mode==0)	color = "white";
		else	color = "black";
		colorElement.onchange = function() {
			backRGB = this.value;
		}*/
		eraser = 1;
	});
	
	//clearElement.addEventListener("click",()=>{
	clearElement.click(()=>{
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		eraser = 0;
	});
	//};
	$("#close").click(()=>{
		$(".popup").fadeOut(1000);
	});
});
