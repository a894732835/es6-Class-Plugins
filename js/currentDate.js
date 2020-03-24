class currentDate{
	constructor() {
	    this.init();
	}
	init(){
		this.date = new Date();
		this.year = this.date.getFullYear();
		this.mouth = (this.date.getMonth() + 1)<10?'0'+(this.date.getMonth() + 1):this.date.getMonth() + 1;
		this.day = this.date.getDate()<10?'0' + this.date.getDate():this.date.getDate();
		this.week = '星期'+'日一二三四五六'.charAt(this.date.getDay());
		this.hours = this.date.getHours()<10?'0'+this.date.getHours():this.date.getHours();
		this.minutes = this.date.getMinutes()<10?'0'+this.date.getMinutes():this.date.getMinutes();
		this.seconds = this.date.getSeconds()<10?'0'+this.date.getSeconds():this.date.getSeconds();
		this.seperator1 = "-";
		this.seperator2 = ":";
	}
	getCurrentDate(){
		let nowDate = this.year + "年" + this.mouth + "月" + this.day + "日" + " " + this.week;
		return nowDate;	
	}
	getCurrentTime(){
		let nowDate = this.hours + this.seperator2 + this.minutes + this.seperator2 + this.seconds
		return nowDate;
	}
	getAllCurrentDate(){
		let nowDate = this.year + this.seperator1 + this.mouth + this.seperator1 + this.day
		            + " " + this.hours + this.seperator2 + this.minutes
		            + this.seperator2 + this.seconds + ' ' + this.week;
		return nowDate;
	}
}
export {currentDate}