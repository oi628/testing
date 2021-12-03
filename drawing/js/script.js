$(document).ready(function(){
	
	$("#save-popup").hide();
	$("#first-popup").fadeIn(1000);
	
	let mode=0;
	let size = 10;
	let color = "black";
	let x;
	let y;
	let isPressed;
	let eraser=0;
	let sizeField = $("#size");

	const canvas = $("canvas");
	const colorElement = $("#color");
	const clearElement = $("#clear");
	const save = $("#save");
	const ctx = canvas[0].getContext("2d");
	const canvass = document.getElementById("myCanvas");
	
    ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	//function drawStuff(){
		
		
	function download() {
		var dt = canvass.toDataURL('image/jpeg');
		this.href = dt;
		$("#save-popup").fadeIn(1000);
	};
	downloadLnk.addEventListener('click', download, false);
		
		
	/*save.click(()=>{
		var link = document.createElement('a');
		link.setAttribute('download', 'amn.png');
		link.setAttribute('href', document.getElementById("myCanvas").toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"));
		link.click();
		$("#save-popup").fadeIn(1000);
	});*/
	
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
				$("#mode").css({"background":"black","color":"white","border":"2px solid white"});
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

	sizeField.on("change",()=>{
		sizeChange = parseInt(sizeField.val());
		if(sizeChange<=0)	sizeChange=1;
		else if(sizeChange>50)	sizeChange=50;
		size = sizeChange;
		sizeField.val(size);
	});
	
	canvas.on("mousedown",(e)=>{
		isPressed = true;
		prevX = x;
		prevY = y;
		x = e.pageX - ctx.canvas.offsetLeft;
        y = e.pageY - ctx.canvas.offsetTop;
	});

	canvas.on("mouseup",(e)=>{
		isPressed = false;
		if(eraser!=1)	drawCircle(x,y);
		x = undefined;
		y = undefined;
	});

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

	canvas.on("touchend",(e)=>{
		isPressed = false;
		if(eraser!=1)	drawCircle(x,y);
		x = undefined;
		y = undefined;
	});

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

	colorElement.on("change",(e)=>{
		color = e.target.value;
		eraser = 0;
	});

	$("#eraser").click(()=>{
		eraser = 1;
	});
	
	clearElement.click(()=>{
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		eraser = 0;
	});
	//};
	$("#save-close").click(()=>{
		$("#save-popup").fadeOut(1000);
	});
	$("#first-close").click(()=>{
		$("#first-popup").fadeOut(1000);
	});
});
