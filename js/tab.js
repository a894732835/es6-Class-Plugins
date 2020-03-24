//id:父级id；title:id下title，detaile:要展示的详情，acitve:激活class,_type:切换类型(默认为'click',可选'hover','autoPlay',_time:可选(如果_type配置为'autoPlay'设置自动切换时间默认1000))
class tab {
	constructor(_id,_title,_detaile,_active,_type,_time) {
		this.node = document.getElementById(_id);
		this.title = [...this.node.querySelectorAll('.'+_title)];
		this.detaile = [...this.node.querySelectorAll('.'+_detaile)];
		this.active = _active;
		this.type = _type?_type:'click';
		this.time = _time?_time:1000;
		this.index = 0;
		switch(true){
			case this.type=='click': 
				this.init();
				break;
			case this.type=='hover':
				this.hover();
				break;
			case this.type=='autoPlay':
				this.autoPlay();
				this.init();
				break;
			default: 
				this.init();
				break;
		}
	}
	init(){
		this.title.map((item,index)=>{
			item.onclick = () => {
				this.hide();
				this.show(index);
				this.index=index;
			};
		})
	}
	hide(){
		this.title.map((item)=>{
			item.classList.remove(this.active);
		})
		this.detaile.map((item)=>{
			item.classList.remove(this.active);
		})
	}
	show(i){
		this.title[i].classList.add(this.active);
		this.detaile[i].classList.add(this.active);
	}
	hover(){
		this.title.map((item,index)=>{
			item.onmouseenter = () => {
				this.hide();
				this.show(index);
			};
		})
	}
	autoPlay(i){
		setInterval(()=>{
			this.index==this.title.length-1?this.index=0:this.index++;
			this.hide();
			this.show(this.index);
		},this.time)
	}
}
export {tab}