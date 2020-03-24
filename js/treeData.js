class treeData {
	constructor(_jsonData,_pid,_id,_children,_jsonStr) {
		// this.jsonData=_jsonData;
		this.children=_children?_children:'children';
		if(_jsonStr){
			this.jsonStr=_jsonStr;
			this.jsonData = this.getJsonStr(_jsonData);
			_jsonStr[_pid]?this.pid=_jsonStr[_pid]:this.pid=_pid;
			_jsonStr[_id]?this.id=_jsonStr[_id]:this.id=_id;
		}else{
			this.jsonData = _jsonData;
			this.pid=_pid;
			this.id=_id;
		}
	}
	getTreeDate(){
		//temp为临时对象，将json数据按照id值排序.
		let [result,temp] =[[],{}];
		for(let i in this.jsonData){
			temp[this.jsonData[i][this.id]] = this.jsonData[i];
		}
		for(let j in this.jsonData){
		    let list = this.jsonData[j];
		    // 临时变量里面的当前元素的父元素，即pid的值，与找对应id值
		    let sonlist = temp[list[this.pid]] 
		    // 如果存在父元素，即如果有pid属性
		    if (sonlist) { 
		        // 如果父元素没有children键
		        if (!sonlist[this.children]) { 
		        // 设上父元素的children键
		        sonlist[this.children] = [] 
		        }
		        // 给父元素加上当前元素作为子元素
		        sonlist[this.children].push(list) 
		    } 
		    // 不存在父元素，意味着当前元素是一级元素
		    else { 
		        result.push(list);
		    }
		}
		return result;
		
	}
	getJsonStr(result){
		let json = result;
		json.map((item)=>{
			for(let key in item){
			    let newKey = this.jsonStr[key];
			    if(newKey){
			            item[newKey] = item[key];
			            delete item[key];
			    }
			}
		})
		return json;
	}
}
export {treeData}