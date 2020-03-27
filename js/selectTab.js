class selectTab{
	constructor(_id,_active,_type,_height) {
	    this.node = document.getElementById(_id);
		this.width = this.node.offsetWidth;
		this.height = this.node.offsetHeight;
		this.childMaxHeight = _height?_height:200+'px';
		this.type = _type?_type:'single';//single||check
		this.oDiv = document.createElement('div');
		this.active = _active;
		this.oLiActive = this.active+this.newGuid();
		this.oUlActive = '_Ul_Select';
		this.insertAfter(this.oDiv,this.node);
		this.init();
	}
	init(){
		this.oDiv.style.width = this.width+'px';
		this.oDiv.style.height = this.height+'px';
		this.oDiv.style.display = "inline-block";
		this.oDiv.style.position = "relative";
		let _index = this.node.selectedIndex;
		let _text = this.node.options[_index].text;
		let _value = this.node.options[_index].value;
		let template = `
			<div style="height:100%" id="${this.active}" value="${_value}">${_text}</div>
			<ul class="${this.oUlActive}" style="display:none;overflow:auto;max-height:${this.childMaxHeight};position:absolute;left:0;top:${this.height+5+'px'};border:1px solid #ddd;border-bottom:0;background:#fff;z-index:999;width:100%">
				${[...this.node.options].map((item,index)=>{
					return _index==index?`<li class="${this.active} ${this.oLiActive}" style="border-bottom:1px solid #ddd;padding:10px" value="${item.value}">${item.text}</li>`:`<li class="${this.oLiActive}" style="border-bottom:1px solid #ddd;padding:10px" value="${item.value}">${item.text}</li>`
				}).join('')}			
			</ul>
		`;
		let checkTemplate = `
			<div style="height:100%" id="${this.active}" value="${_value}">${_text}</div>
			<ul class="${this.oUlActive}" style="display:none;overflow:auto;max-height:${this.childMaxHeight};position:absolute;left:0;top:${this.height+5+'px'};border:1px solid #ddd;border-bottom:0;background:#fff;z-index:999;width:100%">
				${[...this.node.options].map((item,index)=>{
					return _index==index?`<li class="${this.active} ${this.oLiActive}" style="border-bottom:1px solid #ddd;padding:10px" value="${item.value}"><input type="checkbox" checked />${item.text}</li>`:`<li class="${this.oLiActive}" style="border-bottom:1px solid #ddd;padding:10px" value="${item.value}"><input type="checkbox"/>${item.text}</li>`
				}).join('')}			
			</ul>
		`;
		switch(true){
			case this.type=='check': 
				this.oDiv.innerHTML = checkTemplate;
				this.checkHandleClick();
				break;
			default: 
				this.oDiv.innerHTML = template;
				this.singleHandleClick();
				break;
		}
		this.handleClick();
		this.node.style.display = 'none';
		
	}
	insertAfter(newElement,targetElement ){
		var parent = targetElement.parentNode; // 找到指定元素的父节点 
		if( parent.lastChild == targetElement ){ // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法 
		parent.appendChild( newElement, targetElement ); 
		}else{ 
		parent.insertBefore( newElement, targetElement.nextSibling ); 
		};
	}
	handleClick(){
		document.addEventListener('click', ()=>{
			[...document.querySelectorAll('.'+this.oUlActive)].map(item =>{
				item.style.display = 'none';
			})
		}, false)
		this.oDiv.onclick = (e)=>{
			e.stopPropagation();
			this.oDiv.lastElementChild.style.display = this.oDiv.lastElementChild.style.display=='block'?'none':'block';
		}
	}
	singleHandleClick(){
		[...this.oDiv.querySelectorAll('li')].map(item =>{
			item.onclick = (e)=>{
				e.stopPropagation();
				item.parentNode.previousElementSibling.innerText = item.innerText;
				item.parentNode.previousElementSibling.setAttribute("value",item.getAttribute('value'));
				this.removeAllClass();
				item.classList.add(this.active);
				this.oDiv.lastElementChild.style.display = 'none';
			}
		})
	}
	checkHandleClick(){
		[...this.oDiv.querySelectorAll('li')].map(item =>{
			item.onclick = (e)=>{
				e.stopPropagation();
				const pDiveNode=item.parentNode.previousElementSibling;
				if(item.classList.contains(this.active)){
					let [arrT,arrV] = [pDiveNode.innerText.split(','),pDiveNode.getAttribute('value').split(',')];
					arrT.splice(arrT.indexOf(item.innerText),1);
					arrV.splice(arrV.indexOf(item.innerText),1);
					let [strT,strV] = [arrT.join(),arrV.join()];
					pDiveNode.innerText = strT;
					pDiveNode.setAttribute("value",strV);
					item.querySelector('input').checked = false;
					item.classList.remove(this.active);
				}else{
					item.querySelector('input').checked = true;
					item.classList.add(this.active);
					pDiveNode.innerText = pDiveNode.innerText +',' + item.innerText;
					pDiveNode.setAttribute("value",pDiveNode.getAttribute('value') + ',' + item.getAttribute('value'))
				}
			}
		})
	}
	removeAllClass(){
		[...this.oDiv.querySelectorAll('li')].map(item =>{
			item.classList.remove(this.active);
			if(this.type == 'check'){
				item.querySelector('input').checked = false;
			}
		})
	}
	newGuid() {
	    let guid = "";
		let n;
	    for (let i = 1; i <= 8; i++) {
	        n = Math.floor(Math.random() * 16.0).toString(16);
	        guid += n;
	    }
	    return guid;
	}
	getValue(){
		return this.oDiv.firstElementChild.getAttribute("value");
	}
	setSingleValue(val,name){
		const booler = [...this.oDiv.querySelectorAll('li')].some(item =>{
				return (item.innerText==name) && (item.getAttribute('value')==val)
			})
			if(booler){
				this.oDiv.firstElementChild.setAttribute("value",val);
				this.oDiv.firstElementChild.innerText = name;
				[...this.oDiv.querySelectorAll('li')].find(item =>{
						if( (item.innerText==name) && (item.getAttribute('value')==val) ){
							item.classList.add(this.active);
						}else{
							item.classList.remove(this.active);
						}
				})
				console.log('插入成功')
			}else{
				console.log('插入失败，数据异常')
			}
		
	}
	setCheckValue(arr){
		let arrT=[];
		let arrV=[];
		arr.map(item=>{
			arrT.push(item.name);
			arrV.push(item.value);
		})
		this.oDiv.firstElementChild.innerText=arrT.join();
		this.oDiv.firstElementChild.setAttribute("value",arrV.join());
		this.removeAllClass();
		[...this.oDiv.querySelectorAll('li')].map(item =>{
			if(arrV.includes(item.getAttribute('value'))){
				item.querySelector('input').checked = true;
				item.classList.add(this.active);
			}
		})
	}
}
export {selectTab}