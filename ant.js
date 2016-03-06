function newAnt(x,y,type){
	antIdIndex++;
	var color=[randcolor(),randcolor(),randcolor()];
	var angle=Math.floor(Math.random()*90)-45;
	var path=[];
	var antData=[antIdIndex,x,y,angle,type,color,path];
	return antData;
}
function randcolor(){
	return Math.floor(Math.random()*255);
}
function walk(x,y,antdata){
	antdata[1]=x;
	antdata[2]=y;
}
function randomWalk(antdata){
	var canvasObj=document.getElementById("antpath");
	antdata[3]+=Math.floor(Math.random()*11)-5;
	antdata[2]+=Math.sin(antdata[3]*Math.PI/180);//y value
	antdata[1]+=Math.cos(antdata[3]*Math.PI/180);//x value		
	reorient(antdata);
}
function markPos(systime,antdata){
	antdata[6].push([systime,antdata[1],antdata[2]]);//time, x, y, 
}
function setReturnPheromone(antdata){
	var s=antdata[6].length;
	var time=antdata[6][antdata[6].length-1][0];
	for(var i=0;i<antdata[6].length-1;i++){ //crops off last step.
		s--;
		x=Math.round(antdata[1]);
		y=Math.round(antdata[2]);
		if(trails[x][y]===undefined){
		}else{
			var idealcase=s;
			for(var j=0;j<trails[x][y].length;j++){
				if(trails[x][y][j][3]<idealcase){
					s=trails[x][y][j][3];
				}
			}
		}
		setTrail(antdata[6][i][1],
			 antdata[6][i][2],
			 antdata[6][i+1][1],
			 antdata[6][i+1][2],
			 time,
			 s);
	}
document.getElementById("debug").innerHTML="yay";
}
function reorient(antdata){
	var canvasObj=document.getElementById("antpath");
	var signvalue=1;
	antdata[3]=antdata[3]%360
	if(antdata[3]<0){
		antdata[3]=360+antdata[3];
	}

	if(antdata[1]<5){
		document.getElementById("debug").innerHTML="leftx "+antdata[3];
		if(antdata[3]>90||antdata[3]<270){
			antdata[3]=180-antdata[3];
			return;
		}
	}
	if(antdata[1]>canvasObj.width-5){
		document.getElementById("debug").innerHTML="rightx "+antdata[3];
		if(antdata[3]<90||antdata[3]>270){
			antdata[3]=180-antdata[3];
			return;
		}
	}
	if(antdata[2]<5){
		document.getElementById("debug").innerHTML="topy "+antdata[3];
		if(antdata[3]>180){
			antdata[3]=360-antdata[3];
		}
	}
	else if(antdata[2]>canvasObj.height-5){
		document.getElementById("debug").innerHTML="bottomy "+antdata[3];
		if(antdata[3]<180){
			antdata[3]=360-antdata[3];
		}
	}
}		 
