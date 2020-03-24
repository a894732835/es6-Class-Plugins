class fontRoll{
	constructor(_id,_class,_speed) {
	    this.node = document.getElementById(_id);
		this.childNode = [...this.node.querySelectorAll('.'+_class)];
		this.speed = _speed?_speed:50;
		this.width = this.node.clientWidth;
		this.scrollVaue = 0;
		this.childWidth=0;
		this.Interval;
		this.init();
	}
	init(){
		this.childNode.map((item)=>{
			this.childWidth += item.offsetWidth;
		})
		this.node.onmouseover = ()=>{
			this.mouseover();
		}
		this.node.onmouseout = ()=>{
			this.mouseout();
		}
		this.isScoll();
	}
	isScoll(){
		if(this.childWidth>this.width){
			this.childNode.map((item)=>{
				let cloneChildNode = item.cloneNode(true);
				this.node.appendChild(cloneChildNode);
			})
			this.Interval = setInterval(()=>{
				this.marquee(this.childWidth*2);
			}, this.speed)
		}
	}
	marquee(cWidth) {
	    if (cWidth - this.node.scrollLeft <= 0){
	        this.scrollVaue = this.node.scrollLeft - cWidth;
	        this.node.scrollLeft=this.scrollVaue;
	    } else{
	        this.scrollVaue = this.scrollVaue + 1;
	        this.node.scrollLeft=this.scrollVaue;
	    }
	}
	mouseover(){
		clearInterval(this.Interval);
	}
	mouseout(){
		this.Interval = setInterval(()=>{
			this.marquee(this.childWidth*2);
		}, this.speed)
	}
}
export {fontRoll}