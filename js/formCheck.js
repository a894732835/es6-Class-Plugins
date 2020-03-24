class formCheck{
	constructor(_obj) {
		this.obj = _obj;
	    this.key = Object.keys(_obj);
	}
	check(){
		return this.key.filter(item=>{
			return this.obj[item].trim()=='';
		})
	}
}
export {formCheck}