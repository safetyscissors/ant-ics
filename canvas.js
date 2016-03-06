	function drawPixel(x,y,color){
		d[0]   = color[0];
		d[1]   = color[1];
		d[2]   = color[2];	
		d[3]   = 255;
		gctx.putImageData( id, x, y );     
	}
	function setDest(x,y,w,h){
		gctx.beginPath();
		gctx.rect(x,y,w,h);
		gctx.stroke();
		return [x,y,w,h];
	}
	function checkDest(ax,ay,params){
		var x,y,w,h;
		x=params[0];
		y=params[1];
		w=params[2];
		h=params[3];
		
		if(ax>x&&ax<w+x){
			if(ay>y&&ay<y+h){
				return true;
			}
		}
		return false;
	}
	function setTrail(x,y,nextx,nexty,time,steps){
		x=Math.round(x);
		y=Math.round(y);
		nextx=Math.round(nextx);
		nexty=Math.round(nexty);
		if(trails[x][y]===undefined){
			trails[x][y]=[];
		}else{
		}
		trails[x][y].push([nextx,nexty,time,steps]);
		return steps--;
	}
	function getTrail(x,y){
		x=Math.round(x);
		y=Math.round(y);
		if(trails[x][y]===undefined)
			return -1;
		var idealcase=99999999,idealroute;
		for(var j=0;j<trails[x][y].length;j++){
			if(trails[x][y][j][3]<idealcase){//get the most recent shortest path
				idealcase=trails[x][y][j][3];
				idealroute=j;
			}
		}
		var nextx = trails[x][y][idealroute][0];
		var nexty = trails[x][y][idealroute][1];
		return [nextx,nexty];

	}

